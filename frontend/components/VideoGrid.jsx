"use client";
import VideoCard from "./VideoCard";

export default function VideoGrid({ videos }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {videos.map((v, i) => (
        <VideoCard key={i} video={v} />
      ))}
    </div>
  );
}
