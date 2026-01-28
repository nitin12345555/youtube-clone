"use client";
import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { X, FolderPlus, Edit3, CheckCircle2 } from "lucide-react";

export default function CreateCollectionSlider({ close, editCollection }) {
  const { createCollection, updateCollectionName } = useApp();
  const [name, setName] = useState("");

  useEffect(() => {
    setName(editCollection?.name || "");
  }, [editCollection]);

  const save = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editCollection) {
      await updateCollectionName(editCollection._id, name);
    } else {
      await createCollection(name);
    }
    close();
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] transition-opacity duration-300" 
        onClick={close} 
      />

      {/* 2. Slider Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-[350px] bg-zinc-950 border-l border-zinc-800 z-[101] shadow-2xl flex flex-col p-0 overflow-hidden">
        
        {/* Header Section */}
        <div className="p-6 border-b border-zinc-900 bg-zinc-900/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              {editCollection ? (
                <Edit3 className="w-5 h-5 text-red-600" />
              ) : (
                <FolderPlus className="w-5 h-5 text-red-600" />
              )}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white leading-none">
                {editCollection ? "Rename" : "New Collection"}
              </h2>
              <p className="text-xs text-zinc-500 mt-1">
                {editCollection ? "Change folder name" : "Organize your videos"}
              </p>
            </div>
          </div>
          <button 
            onClick={close}
            className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={save} className="flex-1 p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider ml-1">
                Collection Title
              </label>
              <input
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Favorite Tutorials"
                className="w-full p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2
                 focus:ring-red-600/50 focus:border-red-600 transition-all"
              />
            </div>
          </div>

          {/* Action Button */}
          <button 
            type="submit"
            className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98]"
          >
            <CheckCircle2 className="w-5 h-5" />
            {editCollection ? "Update Name" : "Create Collection"}
          </button>
        </form>
      </div>
    </>
  );
}