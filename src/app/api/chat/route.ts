import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';
import { Client } from "@gradio/client";
import AiDataModel from '@/models/AiDataModel';
import dbConnect from '@/DataBase/dbConnect';
import { verifyToken } from '@/middle/verifyToken';

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function to upload a file to Cloudinary
const uploadToCloudinary = async (fileUrl: string, folder: string): Promise<string> => {
    try {
        const result = await cloudinary.uploader.upload(fileUrl, { folder });
        return result.secure_url;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw new Error('Failed to upload image to Cloudinary');
    }
};

// const processFaceImageWithAiModel = async (faceImageUrl: string, prompt: string) => {
//     try {
//         const response_0 = await fetch(faceImageUrl);
//         if (!response_0.ok) {
//             throw new Error(`Failed to fetch face image: ${response_0.statusText}`);
//         }
//         const exampleImage = await response_0.blob();

//         const client = await Client.connect("yanze/PuLID-FLUX");
//         const result = await client.predict("/generate_image", {
//             prompt: prompt,
//             id_image: exampleImage,
//             start_step: 0,
//             guidance: 1,
//             seed: "hello!",
//             true_cfg: 1,
//             width: 256,
//             height: 256,
//             num_steps: 1,
//             id_weight: 0,
//             neg_prompt: "bad quality!",
//             timestep_to_start_cfg: 0,
//             max_sequence_length: 128,
//         });

//         console.log('Processed face image with AI model:', result);

//         if (!result.data) {
//             throw new Error('AI model did not return expected data');
//         }

//         return result.data;
//     } catch (error) {
//         console.error('Error processing face image with AI model:', error);
//         throw new Error('Failed to process face image with AI model: ' + (error instanceof Error ? error.message : String(error)));
//     }
// };


const processFaceImageWithAiModel = async (faceImageUrl: string, prompt: string) => {
    try {
        const response_0 = await fetch(faceImageUrl);
        if (!response_0.ok) {
            throw new Error(`Failed to fetch face image: ${response_0.statusText}`);
        }
        const exampleImage = await response_0.blob();

        const client = await Client.connect("multimodalart/FLUX.1-merged");
        const result = await client.predict("/infer", {
            prompt: `${prompt}`,
            seed: 42,
            randomize_seed: true,
            width: 1024,
            height: 1024,
            guidance_scale: 3.5,
            num_inference_steps: 8,
        });

        console.log('Processed face image with AI model:', result);

        if (!result.data) {
            throw new Error('AI model did not return expected data');
        }

        return result.data;
    } catch (error) {
        console.error('Error processing face image with AI model:', error);
        throw new Error('Failed to process face image with AI model: ' + (error instanceof Error ? error.message : String(error)));
    }
};


export async function POST(request: NextRequest) {
    await dbConnect();
    try {
        const userID = await verifyToken(request);
        if (!userID) {
            return NextResponse.json({ error: 'User ID is required.' }, { status: 400 });
        }

        const { prompt } = await request.json();
        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required.' }, { status: 400 });
        }

        const userAiData = await AiDataModel.findOne({ user_id: userID });
        if (!userAiData || !userAiData.face_image) {
            return NextResponse.json({ error: 'User face image not found.' }, { status: 404 });
        }

        const generatedImageUrl:any = await processFaceImageWithAiModel(userAiData.face_image, prompt);

        const cloudinaryImageUrl = await uploadToCloudinary(generatedImageUrl, 'art_generations');

        userAiData.generated_images = userAiData.generated_images || [];
        userAiData.generated_images.push(cloudinaryImageUrl);
        await userAiData.save();

        return NextResponse.json({ imageUrl: cloudinaryImageUrl });
    } catch (error: any) {
        console.error('Error in upload:', error);
        return NextResponse.json({ error: error.message || 'An unexpected error occurred' }, { status: 500 });
    }
}