import dbConnect from "@/DataBase/dbConnect";
import { verifyToken } from "@/middle/verifyToken";
import ShopModel from "@/models/ShopModel";
import { NextRequest, NextResponse } from "next/server";

// POST: Create or Update Shop
export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const user_id = await verifyToken(request);
        const { name, description, prompt, isWishlisted, isPremium, price, discount, productDetails, category, imageUrl } = await request.json();

        if (!user_id || !name || !description || !prompt || !category || !imageUrl) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const existingShop = await ShopModel.findOne({ user_id, name });

        if (existingShop) {
            existingShop.description = description;
            existingShop.prompt = prompt;
            existingShop.isWishlisted = isWishlisted;
            existingShop.isPremium = isPremium;
            existingShop.price = price;
            existingShop.discount = discount;
            existingShop.productDetails = productDetails;
            existingShop.category = category;
            existingShop.imageUrl = imageUrl;
            await existingShop.save();
            return NextResponse.json({ message: "Shop updated successfully" }, { status: 200 });
        } else {
            const newShop = await ShopModel.create({ user_id, name, description, prompt, isWishlisted, isPremium, price, discount, productDetails, category, imageUrl });
            return NextResponse.json({ message: "Shop created successfully" }, { status: 201 });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to process request" }, { status: 500 });
    }
}

// GET: Retrieve Shop by user_id
export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const user_id = await verifyToken(request);

        if (!user_id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const shops = await ShopModel.find({ user_id });

        return NextResponse.json({ shops }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to retrieve shops" }, { status: 500 });
    }
}

// DELETE: Delete Shop by user_id and name
export async function DELETE(request: NextRequest) {
    try {
        await dbConnect();
        const user_id = await verifyToken(request);
        const { name } = await request.json();

        if (!user_id || !name) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const deletedShop = await ShopModel.findOneAndDelete({ user_id, name });

        if (!deletedShop) {
            return NextResponse.json({ error: "Shop not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Shop deleted successfully" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to delete shop" }, { status: 500 });
    }
}
