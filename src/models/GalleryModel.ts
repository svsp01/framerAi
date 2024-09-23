import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema({
    user_id: { type: String, required: true }, // User ID
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: {
        type: String,
        enum: ['portrait', 'landscape', 'abstract'], // Categories for gallery items
        required: true,
    },
    imageUrl: { type: String, required: true }, // URL for the gallery image
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Gallery || mongoose.model("Gallery", GallerySchema);
