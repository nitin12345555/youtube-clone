import Collection from "../models/Collection.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

// GET
export const getAllCollections = catchAsync(async (req, res) => {
  const collections = await Collection.find();
  res.status(200).json(collections);
});

// CREATE 
export const createCollection = catchAsync(async (req, res) => {
  const { name } = req.body;

  if (!name || !name.trim()) {
    throw new AppError("Collection name is required", 400);
  }

  const collection = await Collection.create({
    name: name.trim(),
    videos: [],
  });

  res.status(201).json(collection);
});

// UPDATE 
export const updateCollectionName = catchAsync(async (req, res) => {
  const { name } = req.body;
  if (!name || !name.trim()) {
    throw new AppError("Collection name is required", 400);
  }
  const collection = await Collection.findByIdAndUpdate(
    req.params.id,
    { name: name.trim() },
    { new: true }
  );

  if (!collection) {
    throw new AppError("Collection not found", 404);
  }
  res.status(200).json(collection);
});

// DELETE 
export const deleteCollection = catchAsync(async (req, res) => {
  const collection = await Collection.findByIdAndDelete(req.params.id);
  if (!collection) {
    throw new AppError("Collection not found", 404);
  }
  res.status(204).send();
});

// ADD video
export const addVideoToCollection = catchAsync(async (req, res) => {
  const collection = await Collection.findById(req.params.id);

  if (!collection) {
    throw new AppError("Collection not found", 404);
  }

  collection.videos.push(req.body);
  await collection.save();

  res.status(200).json(collection);
});

// REMOVE
export const removeVideoFromCollection = catchAsync(async (req, res) => {
  const collection = await Collection.findByIdAndUpdate(
    req.params.id,
    { $pull: { videos: { videoId: req.params.videoId } } },
    { new: true }
  );

  if (!collection) {
    throw new AppError("Collection not found", 404);
  }

  res.status(200).json(collection);
});
