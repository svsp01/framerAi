"use client"
import React, { useState } from 'react';
import { Upload, Zap, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const TrainYourModel = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [modelName, setModelName] = useState('');

  const simulateUpload = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        simulateTraining();
      }
    }, 500);
  };

  const simulateTraining = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setTrainingProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-teal-800 text-white p-8">
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold">Train Your AI Model</h1>
        <Button variant="outline" className="text-white border-white hover:bg-white hover:text-green-900">
          My Models
        </Button>
      </header>

      <div className="max-w-4xl mx-auto">
        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Step 1: Upload Your Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
              <Upload className="mx-auto mb-4" size={48} />
              <p className="mb-4">Drag and drop your images here, or click to select files</p>
              <Button onClick={simulateUpload} className="bg-blue-500 hover:bg-blue-600">
                Select Files
              </Button>
            </div>
            {uploadProgress > 0 && (
              <div className="mt-4">
                <Progress value={uploadProgress} className="w-full" />
                <p className="text-center mt-2">{uploadProgress}% Uploaded</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Step 2: Configure Your Model</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label htmlFor="modelName" className="block mb-2">Model Name</label>
                <input
                  type="text"
                  id="modelName"
                  className="w-full p-2 bg-gray-700 rounded-md"
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                  placeholder="e.g., My Portrait Model"
                />
              </div>
              <div>
                <label htmlFor="modelType" className="block mb-2">Model Type</label>
                <select id="modelType" className="w-full p-2 bg-gray-700 rounded-md">
                  <option>Portrait</option>
                  <option>Landscape</option>
                  <option>Abstract</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl">Step 3: Train Your Model</CardTitle>
          </CardHeader>
          <CardContent>
            {trainingProgress === 0 ? (
              <Button onClick={simulateTraining} className="w-full bg-green-500 hover:bg-green-600" disabled={uploadProgress < 100 || !modelName}>
                <Zap className="mr-2" /> Start Training
              </Button>
            ) : trainingProgress < 100 ? (
              <div>
                <Progress value={trainingProgress} className="w-full mb-4" />
                <p className="text-center">Training in progress... {trainingProgress}% Complete</p>
              </div>
            ) : (
              <div className="text-center">
                <CheckCircle className="mx-auto mb-4" size={48} />
                <p className="text-2xl font-bold mb-2">Training Complete!</p>
                <p>Your model "{modelName}" is now ready to use.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrainYourModel;