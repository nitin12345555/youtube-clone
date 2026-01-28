import mongoose from "mongoose";

const savedVideoSchema = new mongoose.Schema({
  title: String,
  thumbnail: String,
  videoId: { type: String, unique: true },
});

export default mongoose.model("SavedVideo", savedVideoSchema);
