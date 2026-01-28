"use client";
import { useApp } from "../context/AppContext";
import { Play, Bookmark, Trash2, Plus, XCircle } from "lucide-react";

export default function VideoCard({ video }) {
  const {
    saveVideo,
    deleteSavedVideo,
    addToCollection,
    removeFromCollection,
    collections,
    activeMenu,
    activeCollection,
    setSelectedVideoId,
  } = useApp();

  const videoId = video.videoId || video.id?.videoId;
  if (!videoId) return null;

  const title = video.title || video.snippet?.title;
  const thumb = video.thumbnail || video.snippet?.thumbnails?.high?.url;

  return (
    <div className="group bg-zinc-900/50 border border-zinc-800/60 rounded-xl overflow-hidden hover:border-zinc-600 transition-all duration-300 flex flex-col">
      <div
        className="relative aspect-video overflow-hidden cursor-pointer"
        onClick={() => setSelectedVideoId(videoId)} // OPEN MODAL
      >
        <img
          src={thumb}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
          <Play className="text-white fill-white" size={40} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
      </div>

      <div className="p-3 flex-1 flex flex-col gap-3">
        <h3
          className="text-sm font-medium text-zinc-100 line-clamp-2 leading-snug min-h-[2.5rem] cursor-pointer hover:text-blue-400"
          onClick={() => setSelectedVideoId(videoId)}
        >
          {title}
        </h3>
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-800">
          {activeMenu === "home" && (
            <button
              onClick={() => saveVideo({ videoId, title, thumbnail: thumb })}
              className="flex items-center gap-1 bg-blue-600 text-white py-1.5 px-3 rounded-lg text-[11px] font-bold transition-all uppercase tracking-tight"
            >
              <Bookmark className="w-3 h-3 fill-white" /> Save
            </button>
          )}

          {activeMenu === "saved" && (
            <button
              onClick={() => deleteSavedVideo(videoId)}
              className="flex items-center gap-1 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white py-1.5 px-3 rounded-lg text-[11px] font-bold transition-all border border-red-500/20"
            >
              <Trash2 className="w-3 h-3" /> Delete
            </button>
          )}

          {activeMenu === "collection-detail" && (
            <button
              onClick={() => removeFromCollection(activeCollection._id, videoId)}
              className="flex items-center gap-1 bg-red-600 text-white py-1.5 px-3 rounded-lg text-[11px] font-bold transition-all"
            >
              <XCircle className="w-3 h-3" /> Remove
            </button>
          )}

          {activeMenu !== "collection-detail" &&
            collections.map((c) => (
              <button
                key={c._id}
                onClick={() => addToCollection(c._id, { videoId, title, thumbnail: thumb })}
                className="flex items-center gap-1 bg-zinc-800 hover:bg-zinc-700 text-white py-1.5 px-2.5 rounded-lg text-[10px] border border-zinc-700 transition-all"
              >
                <Plus className="w-3 h-3" /> {c.name}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
