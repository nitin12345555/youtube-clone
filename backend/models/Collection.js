import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: String,
  thumbnail: String,
  videoId: String,
});

const collectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  videos: [videoSchema],
});

export default mongoose.model("Collection", collectionSchema);
