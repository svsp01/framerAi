// "use client";
// import React, { useState, useEffect } from 'react';
// import { Image, Download, Share2, X, Crown, Search, ShoppingCart, Heart } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import { Badge } from '@/components/ui/badge';
// import { toast, Toaster } from 'react-hot-toast';

// interface ImageData {
//     id: number;
//     src: string;
//     type: string;
//     isPremium: boolean;
//     prompt: string;
//     description: string;
//     likes: number;
//     downloads: number;
// }

// const Gallery: React.FC = () => {
//     const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
//     const [filter, setFilter] = useState<string>('all');
//     const [searchTerm, setSearchTerm] = useState<string>('');
//     const [images, setImages] = useState<ImageData[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);

//     useEffect(() => {
//         const fetchImages = () => {
//             const fetchedImages: ImageData[] = Array.from({ length: 20 }, (_, i) => ({
//                 id: i + 1,
//                 src: `/api/placeholder/${300 + i * 10}/${300 + i * 10}`,
//                 type: ['portrait', 'landscape', 'abstract', 'sci-fi', 'fantasy'][i % 5],
//                 isPremium: i % 4 === 0,
//                 prompt: `Prompt for image ${i + 1}`,
//                 description: `A stunning AI-generated ${['portrait', 'landscape', 'abstract piece', 'sci-fi scene', 'fantasy world'][i % 5]} that captivates the imagination.`,
//                 likes: Math.floor(Math.random() * 1000),
//                 downloads: Math.floor(Math.random() * 500),
//             }));
//             setImages(fetchedImages);
//             setLoading(false);
//         };

//         const timer = setTimeout(fetchImages, 1500);
//         return () => clearTimeout(timer); // Cleanup timeout
//     }, []);

//     const filteredImages = images.filter(img =>
//         (filter === 'all' || img.type === filter) &&
//         (img.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             img.description.toLowerCase().includes(searchTerm.toLowerCase()))
//     );

//     const handleLike = (image: ImageData) => {
//         setImages(prevImages =>
//             prevImages.map(img => img.id === image.id ? { ...img, likes: img.likes + 1 } : img)
//         );
//         toast.success('Added to favorites!');
//     };

//     const handleDownload = (image: ImageData) => {
//         if (!image.isPremium) {
//             setImages(prevImages =>
//                 prevImages.map(img => img.id === image.id ? { ...img, downloads: img.downloads + 1 } : img)
//             );
//             toast.success('Download started!');
//         } else {
//             toast.error('This is a premium image. Upgrade to download!');
//         }
//     };

//     const handleShare = (platform: string) => {
//         toast.success(`Shared on ${platform}!`);
//     };

//     return (
//         <div className="min-h-screen bg-black border border-gray-100 rounded-xl text-white p-4">
//             <Toaster position="top-right" />
//             <header className="flex flex-col md:flex-row justify-between items-center mb-12">
//                 <div className='flex justify-center w-full'>
//                     <h1 className="text-2xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 animate-text mb-4 md:mb-0">AI Art Gallery</h1>
//                 </div>
//             </header>
//             <div className="relative mb-4 w-full md:w-64">
//                 <Input
//                     type="text"
//                     placeholder="Search prompts..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="pl-10 bg-gray-800 border-gray-700 text-white"
//                 />
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             </div>

//             <div className="mb-8 flex flex-wrap gap-4">
//                 {['all', 'portrait', 'landscape', 'abstract', 'sci-fi', 'fantasy'].map((type) => (
//                     <Button
//                         key={type}
//                         onClick={() => setFilter(type)}
//                         variant={filter === type ? 'default' : 'outline'}
//                         className="capitalize"
//                     >
//                         {type}
//                     </Button>
//                 ))}
//             </div>

//             {loading ? (
//                 <div className="flex justify-center items-center h-64">
//                     <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
//                 </div>
//             ) : (
//                 <motion.div
//                     className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.5 }}
//                 >
//                     <AnimatePresence>
//                         {filteredImages.map((image) => (
//                             <motion.div
//                                 key={image.id}
//                                 layout
//                                 initial={{ opacity: 0, scale: 0.8 }}
//                                 animate={{ opacity: 1, scale: 1 }}
//                                 exit={{ opacity: 0, scale: 0.8 }}
//                                 transition={{ duration: 0.3 }}
//                             >
//                                 <Card
//                                     className="relative bg-gray-800 border-gray-700 cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all overflow-hidden group"
//                                     onClick={() => setSelectedImage(image)}
//                                 >
//                                     {image.isPremium && (
//                                         <Badge className="absolute top-2 left-2 bg-yellow-500 text-black">
//                                             <Crown className="w-4 h-4 mr-1" /> Premium
//                                         </Badge>
//                                     )}
//                                     <CardContent className="p-0">
//                                         <img src={image.src} alt={`AI generated ${image.type}`} className="w-full h-64 object-cover" />
//                                         <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
//                                             <p className="text-sm mb-2 line-clamp-2">{image.description}</p>
//                                             <div className="flex justify-between items-center">
//                                                 <span className="flex items-center">
//                                                     <Heart className="w-4 h-4 mr-1 text-red-500" /> {image.likes}
//                                                 </span>
//                                                 <span className="flex items-center">
//                                                     <Download className="w-4 h-4 mr-1 text-green-500" /> {image.downloads}
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     </CardContent>
//                                 </Card>
//                             </motion.div>
//                         ))}
//                     </AnimatePresence>
//                 </motion.div>
//             )}

//             <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
//                 <DialogContent className="bg-gray-800 border-gray-700 max-w-4xl">
//                     <DialogHeader>
//                         <DialogTitle className="text-2xl font-bold flex items-center">
//                             AI Creation #{selectedImage?.id}
//                             {selectedImage?.isPremium && (
//                                 <Badge className="ml-2 bg-yellow-500 text-black">
//                                     <Crown className="w-4 h-4 mr-1" /> Premium
//                                 </Badge>
//                             )}
//                         </DialogTitle>
//                     </DialogHeader>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <img src={selectedImage?.src} alt={`AI generated ${selectedImage?.type}`} className="w-full rounded-lg" />
//                         <div className="space-y-4">
//                             <p className="text-gray-300">{selectedImage?.description}</p>
//                             <div className="flex justify-between items-center">
//                                 <span className="flex items-center">
//                                     <Heart className="w-5 h-5 mr-2 text-red-500" /> {selectedImage?.likes} likes
//                                 </span>
//                                 <span className="flex items-center">
//                                     <Download className="w-5 h-5 mr-2 text-green-500" /> {selectedImage?.downloads} downloads
//                                 </span>
//                             </div>
//                             <div className="space-y-2">
//                                 <Button
//                                     variant="outline"
//                                     className="w-full"
//                                     onClick={() => handleDownload(selectedImage!)}
//                                     disabled={selectedImage?.isPremium}
//                                 >
//                                     <Download className="mr-2" />
//                                     {selectedImage?.isPremium ? 'Premium Download' : 'Download'}
//                                 </Button>
//                                 <Button
//                                     variant="outline"
//                                     className="w-full"
//                                     onClick={() => handleLike(selectedImage!)}
//                                 >
//                                     <Heart className="mr-2" /> Add to Favorites
//                                 </Button>
//                                 <Button
//                                     variant="outline"
//                                     className="w-full"
//                                     onClick={() => handleShare('Social Media')}
//                                 >
//                                     <Share2 className="mr-2" /> Share
//                                 </Button>
//                             </div>
//                         </div>
//                     </div>
//                 </DialogContent>
//             </Dialog>
//         </div>
//     );
// };

// export default Gallery;

"use client";
import React, { useState, useEffect } from 'react';
import { Image, Download, Share2, X, Crown, Search, ShoppingCart, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast, Toaster } from 'react-hot-toast';
import galleryServices from '@/services/galleryService'; // Import your GalleryService

interface ImageData {
    id: string; // Assuming id is a string based on your service
    src: string;
    type: string;
    isPremium: boolean;
    prompt: string;
    description: string;
    likes: number;
    downloads: number;
}

const NoDataFound: React.FC = () => (
    <div className="text-center">
        <h2 className="text-lg font-bold">No Images Found</h2>
        <p>Please check back later or adjust your search.</p>
    </div>
);

const Gallery: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
    const [filter, setFilter] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [images, setImages] = useState<ImageData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchImages = async () => {
            setLoading(true);
            try {
                const data = await galleryServices.getGalleryItem(); 
                setImages(data.galleries); 
            } catch (error) {
                toast.error("Failed to fetch images.");
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    const filteredImages = images?.filter(img =>
        (filter === 'all' || img.category === filter) &&
        (
            // img.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
            img.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleLike = (image: ImageData) => {
        setImages(prevImages =>
            prevImages.map(img => img.id === image.id ? { ...img, likes: img.likes + 1 } : img)
        );
        toast.success('Added to favorites!');
    };

    const handleDownload = (image: ImageData) => {
        if (!image.isPremium) {
            setImages(prevImages =>
                prevImages.map(img => img.id === image.id ? { ...img, downloads: img.downloads + 1 } : img)
            );
            toast.success('Download started!');
        } else {
            toast.error('This is a premium image. Upgrade to download!');
        }
    };

    const handleShare = (platform: string) => {
        toast.success(`Shared on ${platform}!`);
    };

    return (
        <div className="min-h-screen bg-black border border-gray-100 rounded-xl text-white p-4">
            <Toaster position="top-right" />
            <header className="flex flex-col md:flex-row justify-between items-center mb-12">
                <div className='flex justify-center w-full'>
                    <h1 className="text-2xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 animate-text mb-4 md:mb-0">AI Art Gallery</h1>
                </div>
            </header>
            <div className="relative mb-4 w-full md:w-64">
                <Input
                    type="text"
                    placeholder="Search prompts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div className="mb-8 flex flex-wrap gap-4">
                {['all', 'portrait', 'landscape', 'abstract', 'sci-fi', 'fantasy'].map((type) => (
                    <Button
                        key={type}
                        onClick={() => setFilter(type)}
                        variant={filter === type ? 'default' : 'outline'}
                        className="capitalize"
                    >
                        {type}
                    </Button>
                ))}
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
                </div>
            ) : filteredImages.length === 0 ? (
                <NoDataFound /> // Show no data component if no images are found
            ) : (
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <AnimatePresence>
                        {filteredImages.map((image) => (
                            <motion.div
                                key={image.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card
                                    className="relative bg-gray-800 border-gray-700 cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all overflow-hidden group"
                                    onClick={() => setSelectedImage(image)}
                                >
                                    {image.isPremium && (
                                        <Badge className="absolute top-2 left-2 bg-yellow-500 text-black">
                                            <Crown className="w-4 h-4 mr-1" /> Premium
                                        </Badge>
                                    )}
                                    <CardContent className="p-0">
                                        <img src={image.imageUrl} alt={`AI generated ${image.name}`} className="w-full h-64 object-cover" />
                                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                            <p className="text-sm mb-2 text-white bg-black/60 line-clamp-2">{image.description}</p>
                                            <div className="flex justify-between items-center">
                                                <span className="flex items-center">
                                                    <Heart className="w-4 h-4 mr-1 text-red-500" /> {image.likes}
                                                </span>
                                                <span className="flex items-center">
                                                    <Download className="w-4 h-4 mr-1 text-green-500" /> {image.downloads}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}

            <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
                <DialogContent className="bg-gray-800 border-gray-700 max-w-4xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold flex items-center">
                            AI Creation #{selectedImage?.id}
                            {selectedImage?.isPremium && (
                                <Badge className="ml-2 bg-yellow-500 text-black">
                                    <Crown className="w-4 h-4 mr-1" /> Premium
                                </Badge>
                            )}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <img src={selectedImage?.imageUrl} alt={`AI generated ${selectedImage?.category}`} className="w-full rounded-lg" />
                        <div className="space-y-4">
                            <p className="text-gray-300 ">{selectedImage?.description}</p>
                            <div className="flex justify-between items-center">
                                <span className="flex items-center">
                                    <Heart className="w-5 h-5 mr-2 text-red-500" /> {selectedImage?.likes} likes
                                </span>
                                <span className="flex items-center">
                                    <Download className="w-5 h-5 mr-2 text-green-500" /> {selectedImage?.downloads} downloads
                                </span>
                            </div>
                            <div className="space-y-2">
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => handleDownload(selectedImage!)}
                                    disabled={selectedImage?.isPremium}
                                >
                                    <Download className="mr-2" />
                                    {selectedImage?.isPremium ? 'Premium Download' : 'Download'}
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => handleLike(selectedImage!)}
                                >
                                    <Heart className="mr-2" /> Like
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => handleShare('Social Media')}
                                >
                                    <Share2 className="mr-2" /> Share
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => setSelectedImage(null)}
                                >
                                    <X className="mr-2" /> Close
                                </Button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Gallery;
