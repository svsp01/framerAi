import mongoose from "mongoose";

const ShopSchema = new mongoose.Schema({
    user_id: { type: String, required: true }, // User ID
    name: { type: String, required: true },
    description: { type: String, required: true },
    prompt: { type: String, required: true },
    isWishlisted: { type: Boolean, default: false },
    isPremium: { type: Boolean, default: false },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    productDetails: {
        dimensions: { type: String, required: true },
        material: { type: String, required: true },
        // Add any other details as needed
    },
    category: {
        type: String,
        enum: ['T-Shirts', 'Phone Cases', 'Laptop Skins', 'Posters', 'Frames'], // Categories for shop items
        required: true,
    },
    imageUrl: { type: String, required: true }, // URL for the shop item image
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Shop || mongoose.model("Shop", ShopSchema);
