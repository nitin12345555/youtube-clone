import axios from "axios";
import catchAsync from "../utils/catchAsync.js";

export const searchYouTube = catchAsync(async (req, res) => {
  const { q, pageToken } = req.query;
  if (!q || typeof q !== "string" || q.trim() === "") {
    return res.status(400).json({ message: "Query (q) is required" });
  }
  // Youtube Api
  const response = await axios.get(
    "https://www.googleapis.com/youtube/v3/search",
    {
      params: {
        part: "snippet",
        q,
        type: "video",
        maxResults: 50, //use for getting more videos              
        pageToken: pageToken || "",  
        key: process.env.YOUTUBE_API_KEY,
      },
    }
  );

  const { items, nextPageToken } = response.data;
  res.status(200).json({
    items,
    nextPageToken: nextPageToken || null,
  });
});
