import dbConnect from "@/DataBase/dbConnect";
import { verifyToken } from "@/middle/verifyToken";
import UserModel from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        const { id } = params;
        
        // Check if the ID is provided
        if (!id) {
            return NextResponse.json(
                { error: "User ID is required" },
                { status: 400 }
            );
        }

        // Check if the ID is in a valid ObjectId format
        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ reply: "Invalid ID format" }, { status: 400 });
        }

        // Verify token for authentication
        const userId = await verifyToken(request);
        if (!userId) {
            return NextResponse.json({ reply: "Unauthorized" }, { status: 401 });
        }

        // Fetch user by the correct ObjectId
        const user = await UserModel.findById(id);  // Use `id` directly, not `{ userId: id }`

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Return the user data
        return NextResponse.json(user);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Failed to fetch user" },
            { status: 500 }
        );
    }
}
