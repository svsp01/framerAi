import mongoose from "mongoose";

const AiDataSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  face_image: { type: String, required: true, unique: true },
  generated_images: { type: [String], default: [] }, // New field for storing generated image URLs
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Aidata || mongoose.model("Aidata", AiDataSchema);
