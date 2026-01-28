"use client";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import VideoGrid from "../components/VideoGrid";
import CollectionMainPage from "../components/CollectionSlider";
import CreateCollectionSlider from "../components/CreateCollectionSlider";
import VideoPlayerModal from "../components/VideoPlayerModal"; // 1. Import the Modal
import { useApp } from "../context/AppContext";
import { useState } from "react";

export default function HomePage() {
  const {
    activeMenu,
    videos,
    savedVideos,
    search,
    activeCollection,
    selectedVideoId,    // 2. Get state from context
    setSelectedVideoId, // 3. Get setter from context
  } = useApp();

  const [showSlider, setShowSlider] = useState(false);
  const [editCollection, setEditCollection] = useState(null);

  const openEditSlider = (collection) => {
    setEditCollection(collection);
    setShowSlider(true);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-black text-white overflow-hidden relative">
      <Sidebar 
        setShowCreateSlider={setShowSlider} 
        setEditCollection={setEditCollection} 
      />

      <main className="flex-1 h-full overflow-y-auto p-4 md:p-8">
        <div className="max-w-[1600px] mx-auto">
          {activeMenu === "home" && (
            <>
              <SearchBar onSearch={search} />
              <VideoGrid videos={videos} />
            </>
          )}

          {activeMenu === "saved" && (
            <>
              <h1 className="text-3xl font-bold mb-6">Saved Videos</h1>
              <VideoGrid videos={savedVideos} />
            </>
          )}

          {activeMenu === "collection-detail" && activeCollection && (
            <CollectionMainPage 
              onOpenSettings={(collection) => openEditSlider(collection)}
            />
          )}
        </div>
      </main>

      {showSlider && (
        <CreateCollectionSlider
          close={() => setShowSlider(false)}
          editCollection={editCollection}
        />
      )}

      {/* 4. RENDER MODAL GLOBALLY */}
      {selectedVideoId && (
        <VideoPlayerModal 
          videoId={selectedVideoId} 
          onClose={() => setSelectedVideoId(null)} 
        />
      )}
    </div>
  );
}