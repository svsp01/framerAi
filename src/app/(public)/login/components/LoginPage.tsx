'use client'
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Phone, X, Loader2 } from 'lucide-react';
import axios from 'axios';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploaderProps } from '@/interface/types';
import { useRouter } from 'next/navigation';
import { useDynamicToast } from '@/lib/toastUtils';
import { stringify } from 'querystring';

const LoginPage: React.FC = () => {
    const [isSignIn, setIsSignIn] = useState(true);

    const pageVariants = {
        initial: { opacity: 0, x: '-100%' },
        in: { opacity: 1, x: 0 },
        out: { opacity: 0, x: '100%' }
    };

    const pageTransition = {
        type: 'tween',
        ease: 'anticipate',
        duration: 0.5
    };

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="m-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row w-full max-w-4xl">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isSignIn ? 'signin' : 'signup'}
                        className="w-full md:w-1/2 p-8"
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                        transition={pageTransition}
                    >
                        {isSignIn ? <SignInForm /> : <SignUpForm />}
                        <Button
                            onClick={() => setIsSignIn(!isSignIn)}
                            variant="link"
                            className="mt-4"
                        >
                            {isSignIn ? 'Create an account' : 'Already have an account? Sign In'}
                        </Button>
                    </motion.div>
                </AnimatePresence>
                <div className="w-full md:w-1/2 bg-blue-600 dark:bg-blue-800 text-white flex items-center justify-center p-8">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold mb-4">Welcome!</h2>
                        <p className="text-lg">Sign in to access your account or create a new one to get started.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface InputFieldProps {
    icon: React.FC<any>;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ icon: Icon, type, placeholder, value, onChange }) => (
    <div className="relative mb-4">
        <Label className="sr-only">{placeholder}</Label>
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900 " size={20} />
        <Input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="pl-10 text-gray-900"
            required
        />
    </div>
);
const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, initialImage }) => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(initialImage || '');
    const [localImageUrl, setLocalImageUrl] = useState('');
    const [cropDialogOpen, setCropDialogOpen] = useState(false);
    const [src, setSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState<any>({ unit: '%', width: 100, aspect: 1 });
    const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
    const imgRef = React.useRef<HTMLImageElement>(null);

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                setSrc(reader.result as string);
                setCropDialogOpen(true);
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const onCropComplete = useCallback((crop: Crop) => {
        setCompletedCrop(crop);
    }, []);

    const getCroppedImg = useCallback(() => {
        if (!completedCrop || !imgRef.current) return null;

        const canvas = document.createElement('canvas');
        const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
        const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
        canvas.width = completedCrop.width;
        canvas.height = completedCrop.height;
        const ctx = canvas.getContext('2d');

        if (ctx) {
            ctx.drawImage(
                imgRef.current,
                completedCrop.x * scaleX,
                completedCrop.y * scaleY,
                completedCrop.width * scaleX,
                completedCrop.height * scaleY,
                0,
                0,
                completedCrop.width,
                completedCrop.height
            );
        }

        return new Promise<Blob | null>((resolve) => {
            canvas.toBlob((blob) => {
                resolve(blob);
            }, 'image/jpeg');
        });
    }, [completedCrop]);

    const handleCropConfirm = useCallback(async () => {
        setLoading(true);
        const croppedImageBlob = await getCroppedImg();
        if (croppedImageBlob) {
            const formData = new FormData();
            formData.append('file', croppedImageBlob, 'cropped_image.jpg');
            formData.append('folder', 'profile_images');

            try {
                // Set local image URL for optimistic update
                const localUrl = URL.createObjectURL(croppedImageBlob);
                setLocalImageUrl(localUrl);
                setCropDialogOpen(false);

                const response = await axios.post('/api/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                if (response.status === 200) {
                    setImageUrl(response.data.imageUrl);
                    onImageUpload(response.data.imageUrl);
                } else {
                    console.error("Upload failed:", response.data.error);
                    setLocalImageUrl('');
                }
            } catch (error) {
                console.error("Upload error:", error);
                setLocalImageUrl('');
            } finally {
                setLoading(false);
            }
        }
    }, [getCroppedImg, onImageUpload]);

    const handleRemoveImage = () => {
        setImageUrl('');
        setLocalImageUrl('');
        onImageUpload('');
    };

    return (
        <div className="mb-4">
            <Label>Profile Image</Label>
            <div className="relative w-32 h-32 mx-auto mt-2">
                {(imageUrl || localImageUrl) ? (
                    <>
                        <img
                            src={imageUrl || localImageUrl}
                            alt="Profile"
                            className={`w-full h-full object-cover rounded-full ${loading ? 'blur-sm' : ''}`}
                        />
                        {loading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                                <Loader2 className="w-8 h-8 text-white animate-spin" />
                            </div>
                        )}
                        <Button
                            onClick={handleRemoveImage}
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 rounded-full"
                            disabled={loading}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </>
                ) : (
                    <div className="w-full h-full border-dashed border-2 border-gray-300 dark:border-gray-700 rounded-full flex items-center justify-center cursor-pointer">
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={onSelectFile}
                            className="hidden"
                            id="image-upload"
                            disabled={loading}
                        />
                        <Label htmlFor="image-upload" className="cursor-pointer text-center">
                            {loading ? 'Uploading...' : 'Upload Image'}
                        </Label>
                    </div>
                )}
            </div>

            <Dialog open={cropDialogOpen} onOpenChange={setCropDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Crop Image</DialogTitle>
                    </DialogHeader>
                    {src && (
                        <ReactCrop
                            crop={crop}
                            onChange={(c) => setCrop(c)}
                            onComplete={onCropComplete}
                            aspect={1}
                        >
                            <img ref={imgRef} src={src} alt="Crop me" />
                        </ReactCrop>
                    )}
                    <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setCropDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleCropConfirm} disabled={loading}>
                            {loading ? 'Uploading...' : 'Confirm & Upload'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};



const SignInForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { showToast } = useDynamicToast();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const userData = {
            email,
            password
        }
        try {
            const response = await axios.post('/api/signIn', userData);
            if (response.status === 200) {
                localStorage.setItem('userData', JSON.stringify(response.data.data))
                router.push('/dashboard');
                showToast("Success", "You have successfully logged in.", "default");
            }
        } catch (error: any) {
            showToast('Error', error.message, "destructive");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-900">Sign In</h2>
            <InputField icon={Mail} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <InputField icon={Lock} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit" className="w-full flex gap-2 items-center" disabled={isLoading} >
                {
                    isLoading && <Loader2 className='animate-spin w-4 h-4' />
                }
                Sign In
            </Button>
        </form>
    );
};

const SignUpForm: React.FC = () => {
    const [profileImageUrl, setProfileImageUrl] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [bio, setBio] = useState<string>('');

    const handleImageUpload = (imageUrl: string) => {
        setProfileImageUrl(imageUrl);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const userData = {
            username,
            email,
            firstName,
            lastName,
            password,
            phoneNumber: phone,
            bio,
            profileImageUrl,
        };

        try {
            const response = await axios.post('/api/signIn', userData);
            if (response.status === 200) {
                // Handle successful signup (e.g., redirect to login)
            }
        } catch (error) {
            console.error("Signup failed:", error);
            // Handle error (e.g., show error message)
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-900">Sign Up</h2>
            <ImageUploader onImageUpload={handleImageUpload} initialImage={profileImageUrl} />
            <InputField icon={User} type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <InputField icon={Mail} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <InputField icon={User} type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <InputField icon={User} type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <InputField icon={Lock} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <InputField icon={Phone} type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <Label htmlFor="bio">Bio</Label>
            <Textarea
                id="bio"
                placeholder="Tell us about yourself"
                value={bio}
                onChange={(e: any) => setBio(e.target.value)}
            />
            <Button type="submit" className="w-full">
                Sign Up
            </Button>
        </form>
    );
};

export default LoginPage;