// // pages/api/upload.ts

// import { v2 as cloudinary } from "cloudinary";
// import { NextRequest, NextResponse } from "next/server";

// // Cloudinary configuration
// try {
//     cloudinary.config({
//         cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//         api_key: process.env.CLOUDINARY_API_KEY,
//         api_secret: process.env.CLOUDINARY_API_SECRET,
//     });
// } catch (error) {
//     console.error("Error configuring Cloudinary:", error);
//     throw new Error("Cloudinary configuration failed");
// }

// const uploadToCloudinary = async (file: string, folder: string): Promise<string> => {
//     try {
//         const result = await cloudinary.uploader.upload(file, {
//             folder: folder,
//         });
//         return result.secure_url;
//     } catch (error) {
//         console.error("Error uploading to Cloudinary:", error);
//         throw new Error("Failed to upload image to Cloudinary");
//     }
// };

// export async function POST(request: NextRequest) {
//     try {
//         const { file, folder }: { file: string; folder: 'profile_images' | 'ai_generations' } = await request.json();

//         const imageUrl = await uploadToCloudinary(file, folder);

//         return NextResponse.json({ imageUrl });
//     } catch (error: any) {
//         return NextResponse.json(
//             { error: error.message },
//             { status: 500 }
//         );
//     }
// }
import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import os from 'os'; // For cross-platform temp directory

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.NEXT_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_CLOUDINARY_API_SECRET,
});

// Helper function to upload a file to Cloudinary
const uploadToCloudinary = async (filePath: string, folder: string): Promise<string> => {
    try {
        const result = await cloudinary.uploader.upload(filePath, { folder });
        return result.secure_url;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw new Error('Failed to upload image to Cloudinary');
    }
};

export async function POST(request: Request) {
    try {
        const data = await request.formData(); // Extract form data

        // Retrieve file from the form data
        const file = data.get('file') as Blob;
        if (!file) {
            return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
        }

        // Retrieve folder name from the form data
        const folder = data.get('folder') as string;
        if (!folder) {
            return NextResponse.json({ error: 'No folder specified.' }, { status: 400 });
        }

        // Convert Blob to Buffer
        const buffer = Buffer.from(await file.arrayBuffer());

        // Create a temporary file path in a cross-platform way (Windows, Linux, macOS)
        const tempDir = os.tmpdir(); // System temp directory
        const filePath = path.join(tempDir, `uploaded-file-${Date.now()}`); // Generate unique temp file name

        // Write the file buffer to a temporary file
        await fs.writeFile(filePath, buffer);

        // Upload the file to Cloudinary in the specified folder
        const imageUrl = await uploadToCloudinary(filePath, folder);

        // Optionally delete the temporary file after upload
        await fs.unlink(filePath);

        // Return the uploaded image URL in the response
        return NextResponse.json({ imageUrl });
    } catch (error: any) {
        console.error('Error in upload:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
