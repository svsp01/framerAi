"use client";
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Zap, CheckCircle, ChevronRight, XCircle, Loader, ChevronsRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";

// Type for files
interface FileWithPreview extends File {
    preview: string;
}

const TrainYourModel: React.FC = () => {
    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [trainingProgress, setTrainingProgress] = useState<number>(0);
    const [modelType, setModelType] = useState<string>("");
    const [isTraining, setIsTraining] = useState<boolean>(false);
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    // Handle file drop
    const onDrop = useCallback((acceptedFiles: File[]) => {
        simulateUpload()
        const newFiles = acceptedFiles.map((file) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
            })
        ) as FileWithPreview[];
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: true,
    });

    // Remove file
    const removeFile = (index: number) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    // Simulate upload
    const simulateUpload = () => {
        setIsUploading(true);
        setUploadProgress(0);
        const interval = setInterval(() => {
            setUploadProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsUploading(false);
                    return 100;
                }
                return prev + 10;
            });
        }, 500);
    };

    // Simulate training process
    const simulateTraining = () => {
        setIsTraining(true);
        setTrainingProgress(0);
        const interval = setInterval(() => {
            setTrainingProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsComplete(true);
                    setIsTraining(false);
                    return 100;
                }
                return prev + 5;
            });
        }, 200);
    };

    return (
        <div className="min-h-screen bg-black border border-gray-50 rounded-xl text-white p-8">
            <header className="flex justify-between items-center mb-12">
                <h1 className="text-4xl font-bold">Train Your AI Model</h1>
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
                    <div
                        {...getRootProps()}
                        className={`p-8 text-center transition-all flex justify-center w-full text-white duration-300 ${isDragActive ? "bg-black" : "bg-transparent"
                            }`}
                    >
                        <input {...getInputProps()} />
                        <div >
                            <Upload className="mx-auto mb-4 " size={48} />
                            <p className="mb-4  ">Drag and drop your images here, or click to select files</p>
                        </div>
                    </div>

                    {isUploading && (
                        <div className="p-8 text-center text-white">
                            <Loader className="animate-spin mx-auto mb-4 " size={48} />
                            <Progress value={uploadProgress} className="h-4 mb-4  bg-white " />
                            <p>Uploading... {uploadProgress}%</p>
                        </div>
                    )}

                    <AnimatePresence>
                        {files.length > 0 && uploadProgress === 100 && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="p-4 bg-white/5"
                            >
                                <div className="flex flex-wrap gap-4">
                                    {files.map((file, index) => (
                                        <motion.div
                                            key={file.name}
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="relative w-20 h-20 overflow-hidden rounded-lg"
                                        >
                                            <img
                                                src={file.preview}
                                                alt={file.name}
                                                className="w-full h-full object-cover"
                                                onLoad={() => URL.revokeObjectURL(file.preview)}
                                            />
                                            <div
                                                className="absolute p-0 top-0 right-0 bg-black cursor-pointer rounded-full text-red-500"
                                                onClick={() => removeFile(index)}
                                            >
                                                <XCircle size={16} />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </CardContent>
            </Card>

            <AnimatePresence>
                {files.length > 0 && uploadProgress === 100 && !isTraining && !isComplete && (
                    <motion.div
                        className="flex justify-end w-full"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <Button
                            onClick={simulateTraining}
                            className="w-1/4 bg-gradient-to-r  from-blue-600  to-purple-600 hover:from-blue-800  hover:to-purple-800 text-lg py-6 rounded-xl shadow-lg"
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
                                <Progress value={trainingProgress} className="h-4 mb-4" />
                                <p className="text-center text-lg">{trainingProgress}% Complete</p>
                                <div className="mt-8 space-y-4">
                                    <p>🧠 Neural networks initializing...</p>
                                    <p>🎨 Learning color patterns...</p>
                                    <p>👁️ Recognizing shapes and textures...</p>
                                    <p>✨ Generating creative insights...</p>
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
                                <p className="text-xl mb-8">Your AI model is now ready to create magic!</p>
                                <Button
                                    onClick={() => {
                                        // Navigate to chat page
                                        console.log("Navigating to /chat");
                                    }}
                                    className="w-1/4 flex gap-2 items-center bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-lg py-4 rounded-xl shadow-lg"
                                >
                                    Go to AI Chat
                                    <ChevronsRight  size={24} />
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TrainYourModel;
