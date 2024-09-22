// "use client";
// import React, { useState, useCallback } from "react";
// import { useDropzone } from "react-dropzone";
// import { Upload, Zap, CheckCircle, ChevronRight, XCircle, Loader, ChevronsRight } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";
// import { motion, AnimatePresence } from "framer-motion";

// // Type for files
// interface FileWithPreview extends File {
//     preview: string;
// }

// const TrainYourModel: React.FC = () => {
//     const [files, setFiles] = useState<FileWithPreview[]>([]);
//     const [uploadProgress, setUploadProgress] = useState<number>(0);
//     const [trainingProgress, setTrainingProgress] = useState<number>(0);
//     const [modelType, setModelType] = useState<string>("");
//     const [isTraining, setIsTraining] = useState<boolean>(false);
//     const [isComplete, setIsComplete] = useState<boolean>(false);
//     const [isUploading, setIsUploading] = useState<boolean>(false);

//     // Handle file drop
//     const onDrop = useCallback((acceptedFiles: File[]) => {
//         simulateUpload()
//         const newFiles = acceptedFiles.map((file) =>
//             Object.assign(file, {
//                 preview: URL.createObjectURL(file),
//             })
//         ) as FileWithPreview[];
//         setFiles((prevFiles) => [...prevFiles, ...newFiles]);
//     }, []);

//     const { getRootProps, getInputProps, isDragActive } = useDropzone({
//         onDrop,
//         accept: { 'image/*': [] },
//         multiple: true,
//     });

//     // Remove file
//     const removeFile = (index: number) => {
//         setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
//     };

//     // Simulate upload
//     const simulateUpload = () => {
//         setIsUploading(true);
//         setUploadProgress(0);
//         const interval = setInterval(() => {
//             setUploadProgress((prev) => {
//                 if (prev >= 100) {
//                     clearInterval(interval);
//                     setIsUploading(false);
//                     return 100;
//                 }
//                 return prev + 10;
//             });
//         }, 500);
//     };

//     // Simulate training process
//     const simulateTraining = () => {
//         setIsTraining(true);
//         setTrainingProgress(0);
//         const interval = setInterval(() => {
//             setTrainingProgress((prev) => {
//                 if (prev >= 100) {
//                     clearInterval(interval);
//                     setIsComplete(true);
//                     setIsTraining(false);
//                     return 100;
//                 }
//                 return prev + 5;
//             });
//         }, 200);
//     };

//     return (
//         <div className="min-h-screen bg-black border border-gray-50 rounded-xl text-white p-4">
//                 <h1 className="text-2xl w-full flex  justify-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 animate-text font-mono font-bold">Train Your AI Model</h1>
//             <header className="flex justify-end items-center mb-12">
//                 <Select onValueChange={setModelType} value={modelType}>
//                     <SelectTrigger className="w-[180px] bg-white/10 border-white/20 text-white">
//                         <SelectValue placeholder="Select Model" />
//                     </SelectTrigger>
//                     <SelectContent className="bg-white/10 text-white">
//                         <SelectItem value="FLUX">FLUX.1 [dev]</SelectItem>
//                         <SelectItem value="PuLID">PuLID FLUX</SelectItem>
//                         <SelectItem value="abstract">Abstract</SelectItem>
//                     </SelectContent>
//                 </Select>
//             </header>

//             <Card className="bg-black border-white/20 mb-8 overflow-hidden">
//                 <CardContent className="p-0">
//                     <div
//                         {...getRootProps()}
//                         className={`p-8 text-center transition-all flex justify-center w-full text-white duration-300 ${isDragActive ? "bg-black" : "bg-transparent"
//                             }`}
//                     >
//                         <input {...getInputProps()} />
//                         <div >
//                             <Upload className="mx-auto mb-4 " size={48} />
//                             <p className="mb-4  ">Drag and drop your clear face image here, or click to select file</p>
//                         </div>
//                     </div>

//                     {isUploading && (
//                         <div className="p-8 text-center text-white">
//                             <Loader className="animate-spin mx-auto mb-4 " size={48} />
//                             <Progress value={uploadProgress} className="h-4 mb-4  bg-white " />
//                             <p>Uploading... {uploadProgress}%</p>
//                         </div>
//                     )}

//                     <AnimatePresence>
//                         {files.length > 0 && uploadProgress === 100 && (
//                             <motion.div
//                                 initial={{ opacity: 0, height: 0 }}
//                                 animate={{ opacity: 1, height: "auto" }}
//                                 exit={{ opacity: 0, height: 0 }}
//                                 className="p-4 bg-white/5"
//                             >
//                                 <div className="flex flex-wrap gap-4">
//                                     {files.map((file, index) => (
//                                         <motion.div
//                                             key={file.name}
//                                             initial={{ scale: 0, rotate: -180 }}
//                                             animate={{ scale: 1, rotate: 0 }}
//                                             transition={{ delay: index * 0.1 }}
//                                             className="relative w-20 h-20 overflow-hidden rounded-lg"
//                                         >
//                                             <img
//                                                 src={file.preview}
//                                                 alt={file.name}
//                                                 className="w-full h-full object-cover"
//                                                 onLoad={() => URL.revokeObjectURL(file.preview)}
//                                             />
//                                             <div
//                                                 className="absolute p-0 top-0 right-0 bg-black cursor-pointer rounded-full text-red-500"
//                                                 onClick={() => removeFile(index)}
//                                             >
//                                                 <XCircle size={16} />
//                                             </div>
//                                         </motion.div>
//                                     ))}
//                                 </div>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>
//                 </CardContent>
//             </Card>

//             <AnimatePresence>
//                 {files.length > 0 && uploadProgress === 100 && !isTraining && !isComplete && (
//                     <motion.div
//                         className="flex justify-end w-full"
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -20 }}
//                     >
//                         <Button
//                             onClick={simulateTraining}
//                             className="w-1/4 bg-gradient-to-r  from-blue-600  to-purple-600 hover:from-blue-800  hover:to-purple-800 text-lg py-6 rounded-xl shadow-lg"
//                         >
//                             <Zap className="mr-2" size={24} />
//                             Train Model
//                         </Button>
//                     </motion.div>
//                 )}
//             </AnimatePresence>

//             <AnimatePresence>
//                 {isTraining && (
//                     <motion.div
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         exit={{ opacity: 0, scale: 0.9 }}
//                         className="mt-8"
//                     >
//                         <Card className="bg-black text-white border-white/20">
//                             <CardContent className="p-8">
//                                 <h2 className="text-2xl font-bold mb-4">Training in Progress</h2>
//                                 <Progress value={trainingProgress} className="h-4 mb-4" />
//                                 <p className="text-center text-lg">{trainingProgress}% Complete</p>
//                                 <div className="mt-8 space-y-4">
//                                     <p>🧠 Neural networks initializing...</p>
//                                     <p>🎨 Learning color patterns...</p>
//                                     <p>👁️ Recognizing shapes and textures...</p>
//                                     <p>✨ Generating creative insights...</p>
//                                 </div>
//                             </CardContent>
//                         </Card>
//                     </motion.div>
//                 )}
//             </AnimatePresence>

//             <AnimatePresence>
//                 {isComplete && (
//                     <motion.div
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         exit={{ opacity: 0, scale: 0.9 }}
//                         className="mt-8"
//                     >
//                         <Card className="bg-black text-white border-white/20">
//                             <CardContent className="p-8 flex flex-col justify-center items-center text-center">
//                                 <motion.div
//                                     initial={{ scale: 0 }}
//                                     animate={{ scale: 1 }}
//                                     transition={{ type: "spring", stiffness: 260, damping: 20 }}
//                                 >
//                                     <CheckCircle className="mx-auto mb-4" size={64} color="#4ade80" />
//                                 </motion.div>
//                                 <h2 className="text-3xl font-bold mb-4">Training Complete!</h2>
//                                 <p className="text-xl mb-8">Your AI model is now ready to create magic!</p>
//                                 <Button
//                                     onClick={() => {
//                                         // Navigate to chat page
//                                         console.log("Navigating to /chat");
//                                     }}
//                                     className="w-1/4 flex gap-2 items-center bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-lg py-4 rounded-xl shadow-lg"
//                                 >
//                                     Go to AI Chat
//                                     <ChevronsRight  size={24} />
//                                 </Button>
//                             </CardContent>
//                         </Card>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// };

// export default TrainYourModel;

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Zap, CheckCircle, ChevronsRight, XCircle, Loader } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import aiService from "@/services/aiService";

interface FileWithPreview extends File {
    preview: string;
}

const FaceTraining: React.FC = () => {
    const [file, setFile] = useState<FileWithPreview | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [trainingProgress, setTrainingProgress] = useState<number>(0);
    const [modelType, setModelType] = useState<string>("");
    const [isTraining, setIsTraining] = useState<boolean>(false);
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [hasTrainedData, setHasTrainedData] = useState<boolean>(false);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("/api/aidata");
            if (data.data.face_image) {
                setImageUrl(data.data.face_image);
                setHasTrainedData(true);
                setIsComplete(true);
            }
        } catch (error) {
            console.error("Error fetching AI data:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const newFile = Object.assign(acceptedFiles[0], {
                preview: URL.createObjectURL(acceptedFiles[0]),
            }) as FileWithPreview;
            setFile(newFile);
            simulateUpload(newFile);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        multiple: false,
    });

    const removeFile = async () => {
        if (hasTrainedData) {
            try {
                await axios.delete("/api/aidata");
                setHasTrainedData(false);
            } catch (error) {
                console.error("Error deleting data:", error);
                return;
            }
        }
        setFile(null);
        setUploadProgress(0);
        setIsTraining(false);
        setIsComplete(false);
        setTrainingProgress(0);
        setImageUrl(null);
    };

    const simulateUpload = async (file: FileWithPreview) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "training_images");

        try {
            setIsUploading(true);
            const { data } = await axios.post("/api/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setImageUrl(data.imageUrl);
            setUploadProgress(100);
        } catch (error) {
            console.error("Upload failed:", error);
        } finally {
            setIsUploading(false);
        }
    };

    const simulateTraining = async () => {
        if (!imageUrl) return;
        setIsTraining(true);
        setTrainingProgress(0);

        try {
            await aiService.addAiData(imageUrl);
            const interval = setInterval(() => {
                setTrainingProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setIsComplete(true);
                        setIsTraining(false);
                        setHasTrainedData(true);
                        return 100;
                    }
                    return prev + 5;
                });
            }, 200);
        } catch (error) {
            console.error("Training failed:", error);
            setIsTraining(false);
        }
    };


    return (
        <div className="min-h-screen bg-black border border-gray-50 rounded-xl text-white p-4">
            <h1 className="text-2xl w-full flex justify-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 animate-text font-mono font-bold mb-8">
                Futuristic Face Training
            </h1>
            {loading ?
                <div className="min-h-screen flex items-center justify-center">
                    <Loader className="animate-spin" size={48} />
                    <p className="ml-4">Loading...</p>
                </div> :
                <>
                    <header className="flex justify-end items-center mb-12">
                        <Select onValueChange={setModelType} value={modelType}>
                            <SelectTrigger className="w-[180px] bg-white/10 border-white/20 text-white">
                                <SelectValue placeholder="Select Model" />
                            </SelectTrigger>
                            <SelectContent className="bg-white/10 text-white">
                                <SelectItem value="FLUX">FLUX.1 [dev]</SelectItem>
                                <SelectItem value="PuLID">PuLID FLUX</SelectItem>
                                <SelectItem value="abstract">Abstract</SelectItem>
                            </SelectContent>
                        </Select>
                    </header>

                    <Card className="bg-black border-white/20 mb-8 overflow-hidden">
                        <CardContent className="p-0">
                            {!file && !hasTrainedData && (
                                <div
                                    {...getRootProps()}
                                    className={`p-8 text-center transition-all flex justify-center w-full text-white duration-300 ${isDragActive ? "bg-black" : "bg-transparent"
                                        }`}
                                >
                                    <input {...getInputProps()} />
                                    <div>
                                        <Upload className="mx-auto mb-4" size={48} />
                                        <p className="mb-4">Drag and drop your face image here, or click to select file</p>
                                    </div>
                                </div>
                            )}

                            {isUploading && (
                                <div className="p-8 text-center text-white">
                                    <Loader className="animate-spin mx-auto mb-4" size={48} />
                                    <Progress value={uploadProgress} className="h-4 mb-4 bg-white" />
                                    <p>Uploading... {uploadProgress}%</p>
                                </div>
                            )}

                            <AnimatePresence>
                                {(file || hasTrainedData) && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="p-8 flex justify-center items-center"
                                    >
                                        <div className="relative w-64 h-64">
                                            <img
                                                src={file?.preview || imageUrl || ''}
                                                alt="Face"
                                                className="w-full h-full object-cover rounded-full"
                                                onLoad={() => file && URL.revokeObjectURL(file.preview)}
                                            />
                                            <motion.div
                                                className="absolute inset-0 rounded-full"
                                                animate={{
                                                    boxShadow: [
                                                        "0 0 0 3px rgba(59, 130, 246, 0.5)",
                                                        "0 0 0 6px rgba(147, 51, 234, 0.5)",
                                                        "0 0 0 3px rgba(59, 130, 246, 0.5)",
                                                    ],
                                                }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                            />
                                            {isTraining && (
                                                <motion.div
                                                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-600/30"
                                                    initial={{ height: "0%", top: "50%" }}
                                                    animate={{ height: ["0%", "100%", "0%"], top: ["50%", "0%", "50%"] }}
                                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                />
                                            )}
                                            <div
                                                className="absolute top-0 right-0 bg-black cursor-pointer rounded-full text-red-500"
                                                onClick={removeFile}
                                            >
                                                <XCircle size={24} />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </CardContent>
                    </Card>

                    <AnimatePresence>
                        {file && uploadProgress === 100 && !isTraining && !isComplete && (
                            <motion.div
                                className="flex justify-center w-full"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                            >
                                <Button
                                    onClick={simulateTraining}
                                    className="w-1/3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-800 hover:to-purple-800 text-lg py-6 rounded-xl shadow-lg"
                                >
                                    <Zap className="mr-2" size={24} />
                                    Train Model
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {isTraining && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="mt-8"
                            >
                                <Card className="bg-black text-white border-white/20">
                                    <CardContent className="p-8">
                                        <h2 className="text-2xl font-bold mb-4">Training in Progress</h2>
                                        <div className="relative w-full h-4 bg-gray-700 rounded-full overflow-hidden mb-4">
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                                                style={{ width: `${trainingProgress}%` }}
                                                initial={{ width: "0%" }}
                                                animate={{ width: `${trainingProgress}%` }}
                                            />
                                        </div>
                                        <p className="text-center text-lg">{trainingProgress}% Complete</p>
                                        <div className="mt-8 space-y-4">
                                            <p>🧠 Neural networks initializing...</p>
                                            <p>👤 Analyzing facial features...</p>
                                            <p>🎨 Learning unique characteristics...</p>
                                            <p>✨ Generating AI model...</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {isComplete && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="mt-8"
                            >
                                <Card className="bg-black text-white border-white/20">
                                    <CardContent className="p-8 flex flex-col justify-center items-center text-center">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                        >
                                            <CheckCircle className="mx-auto mb-4" size={64} color="#4ade80" />
                                        </motion.div>
                                        <h2 className="text-3xl font-bold mb-4">Training Complete!</h2>
                                        <p className="text-xl mb-8">Your AI face model is now ready to create magic!</p>
                                        <Button
                                            onClick={() => console.log("Navigating to /chat")}
                                            className="w-1/3 flex gap-2 items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-lg py-4 rounded-xl shadow-lg"
                                        >
                                            Go to AI Chat
                                            <ChevronsRight size={24} />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            }
        </div>
    );
};

export default FaceTraining;