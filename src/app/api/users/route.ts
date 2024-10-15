import dbConnect from "@/DataBase/dbConnect";
import { verifyToken } from "@/middle/verifyToken";
import GalleryModel from "@/models/GalleryModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const user_id = await verifyToken(request);
        const { name, description, category, imageUrl } = await request.json();

        if (!user_id || !name || !description || !category || !imageUrl) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const existingGallery = await GalleryModel.findOne({ user_id, name });

        if (existingGallery) {
            existingGallery.description = description;
            existingGallery.category = category;
            existingGallery.imageUrl = imageUrl;
            await existingGallery.save();
            return NextResponse.json({ message: "Gallery updated successfully" }, { status: 200 });
        } else {
            const newGallery = await GalleryModel.create({ user_id, name, description, category, imageUrl });
            return NextResponse.json({ message: "Gallery created successfully" }, { status: 201 });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to process request" }, { status: 500 });
    }
}

// GET: Retrieve Gallery by user_id
export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const user_id = await verifyToken(request);

        if (!user_id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const galleries = await GalleryModel.find({ user_id });

        return NextResponse.json({ galleries }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to retrieve galleries" }, { status: 500 });
    }
}