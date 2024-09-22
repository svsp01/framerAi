import dbConnect from "@/DataBase/dbConnect";
import { verifyToken } from "@/middle/verifyToken";
import AiDataModel from "@/models/AiDataModel";
import { NextRequest, NextResponse } from "next/server";

// POST: Create or Update Data
export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const user_id = await verifyToken(request);
        const { face_image } = await request.json();

        if (!user_id || !face_image) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const existingData = await AiDataModel.findOne({ user_id });

        if (existingData) {
            existingData.face_image = face_image;
            await existingData.save();
            return NextResponse.json({ message: "Face image updated successfully" }, { status: 200 });
        } else {
            const newAiData = await AiDataModel.create({ user_id, face_image });
            return NextResponse.json({ message: "User added successfully" }, { status: 201 });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to process request" }, { status: 500 });
    }
}

// GET: Retrieve Data by user_id
export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const user_id = await verifyToken(request);

        if (!user_id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const data = await AiDataModel.findOne({ user_id });

        if (!data) {
            return NextResponse.json({ error: "Data not found" }, { status: 404 });
        }

        return NextResponse.json({ data }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to retrieve data" }, { status: 500 });
    }
}

// DELETE: Delete Data by user_id
export async function DELETE(request: NextRequest) {
    try {
        await dbConnect();
        const user_id = await verifyToken(request);

        if (!user_id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const deletedData = await AiDataModel.findOneAndDelete({ user_id });

        if (!deletedData) {
            return NextResponse.json({ error: "Data not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Data deleted successfully" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to delete data" }, { status: 500 });
    }
}
