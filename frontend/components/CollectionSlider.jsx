"use client";
import { useApp } from "../context/AppContext";
import { Settings2, Trash2, Film } from "lucide-react";
import VideoGrid from "./VideoGrid";

export default function CollectionMainPage({ onOpenSettings }) {
  const { activeCollection, deleteCollection } = useApp();

  if (!activeCollection) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-zinc-500">
        <Film className="w-16 h-16 mb-4 opacity-30" />
        <p className="text-xl">Select a collection</p>
      </div>
    );
  }

  const handleDelete = async () => {
    const ok = confirm(`Delete "${activeCollection.name}"?`);
    if (!ok) return;
    await deleteCollection(activeCollection._id);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">{activeCollection.name}</h1>
          <p className="text-sm text-zinc-400">
            {activeCollection.videos.length} videos
          </p>
        </div>

        <div className="flex gap-2">
          <button onClick={() => onOpenSettings(activeCollection)} className="btn-update">
            <Settings2 />
          </button>
          <button onClick={handleDelete} className="btn-remove">
            <Trash2 />
          </button>
        </div>
      </header>

      {activeCollection.videos.length > 0 ? (
        <VideoGrid videos={activeCollection.videos} />
      ) : (
        <p className="text-zinc-500 text-center">No videos yet</p>
      )}
    </div>
  );
}
