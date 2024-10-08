import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { Client } from "@gradio/client";
import AiDataModel from "@/models/AiDataModel";
import dbConnect from "@/DataBase/dbConnect";
import { verifyToken } from "@/middle/verifyToken";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.NEXT_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_CLOUDINARY_API_SECRET,
});

// const processFaceImageWithAiModel = async (faceImageUrl: string, prompt: string) => {
//     try {
//         const response_0 = await fetch(faceImageUrl);
//         if (!response_0.ok) {
//             throw new Error(`Failed to fetch face image: ${response_0.statusText}`);
//         }
//         const exampleImage = await response_0.blob();

//         const client = await Client.connect("multimodalart/FLUX.1-merged");
//         const result = await client.predict("/infer", {
//             prompt: `${prompt}`,
//             seed: 42,
//             randomize_seed: true,
//             width: 1024,
//             height: 1024,
//             guidance_scale: 3.5,
//             num_inference_steps: 8,
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

cloudinary.config({
  cloud_name: process.env.NEXT_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_CLOUDINARY_API_SECRET,
});

const processFaceImageWithAiModel = async (
  faceImageUrl: string,
  prompt: string
) => {
  try {
    const response = await fetch(faceImageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch face image: ${response.statusText}`);
    }
    const exampleImage = await response.blob();

    const client = await Client.connect("yanze/PuLID-FLUX");
    const result = await client.predict("/generate_image", {
      prompt: prompt,
      id_image: exampleImage,
      start_step: 0,
      guidance: 4,
      seed: -1,
      true_cfg: 1,
      width: 896,
      height: 1152,
      num_steps: 20,
      id_weight: 1,
      neg_prompt:
        "bad quality, worst quality, text, signature, watermark, extra limbs",
      timestep_to_start_cfg: 0,
      max_sequence_length: 128,
    });

    console.log("Processed face image with AI model:", result);

    if (
      !result.data ||
      !Array.isArray(result.data) ||
      result.data.length === 0
    ) {
      throw new Error("AI model did not return expected data");
    }

    return result.data[0];
  } catch (error) {
    console.error("Error processing face image with AI model:", error);
    throw new Error(
      "Failed to process face image with AI model: " +
        (error instanceof Error ? error.message : String(error))
    );
  }
};

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const userID = await verifyToken(request);
    if (!userID) {
      return NextResponse.json(
        { error: "User ID is required." },
        { status: 400 }
      );
    }

    const { prompt } = await request.json();
    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required." },
        { status: 400 }
      );
    }

    const userAiData = await AiDataModel.findOne({ user_id: userID });
    if (!userAiData || !userAiData.face_image) {
      return NextResponse.json(
        { error: "User face image not found." },
        { status: 404 }
      );
    }

    const generatedImageData: any = await processFaceImageWithAiModel(
      userAiData.face_image,
      prompt
    );

    if (!generatedImageData || !generatedImageData.url) {
      return NextResponse.json(
        { error: "Failed to generate image." },
        { status: 500 }
      );
    }

    let imageUrl = generatedImageData.url;

    // try {
    //     const cloudinaryImageUrl = await uploadToCloudinary(imageUrl, 'art_generations');
    //     imageUrl = cloudinaryImageUrl;
    // } catch (cloudinaryError) {
    //     console.error('Error uploading to Cloudinary:', cloudinaryError);
    // }

    userAiData.generated_images = userAiData.generated_images || [];
    userAiData.generated_images.push(imageUrl);
    await userAiData.save();

    return NextResponse.json({ imageUrl: imageUrl });
  } catch (error: any) {
    console.error("Error in upload:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
