import SavedVideo from "../models/SavedVideo.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

export const getSavedVideos = catchAsync(async (req, res) => {
  res.json(await SavedVideo.find());
});

export const saveVideo = catchAsync(async (req, res) => {
  const video = await SavedVideo.findOneAndUpdate(
    { videoId: req.body.videoId },
    req.body,
    { upsert: true, new: true }
  );

  res.json(video);
});

export const deleteSavedVideo = catchAsync(async (req, res) => {
  const deleted = await SavedVideo.findOneAndDelete({
    videoId: req.params.videoId,
  });

  if (!deleted)
    throw new AppError("Video not found", 404);

  res.json({ success: true });
});
