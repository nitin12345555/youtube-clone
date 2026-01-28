"use client";
import { createContext, useContext, useEffect, useState } from "react";
import apiFunction from "../data/apifunction";
import apiStore from "../data/api";
import Toast from "../data/toast";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [collections, setCollections] = useState([]);
  const [savedVideos, setSavedVideos] = useState([]);
  const [activeMenu, setActiveMenu] = useState("home");
  const [activeCollection, setActiveCollection] = useState(null);
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [cols, saved] = await Promise.all([
          apiFunction({ method: "get", url: apiStore.collections }),
          apiFunction({ method: "get", url: apiStore.savedVideos }),
        ]);
        setCollections(cols);
        setSavedVideos(saved);
      } catch (err) {
        console.error("Initial load failed", err);
        Toast(null);
      }
    };
    load();
  }, []);

  // Search
  const search = async (query) => {
    if (!query) return;
    try {
      const result = await apiFunction({
        method: "get",
        url: `${apiStore.search}?q=${encodeURIComponent(query)}`,
      });
      setVideos(result.items || []);
      setNextPageToken(result.nextPageToken || null);
    } catch (err) {
      console.error("Search failed", err);
      Toast(null);
    }
  };

  const loadMoreSearchResults = async (query) => {
    if (!query || !nextPageToken) return;
    try {
      const result = await apiFunction({
        method: "get",
        url: `${apiStore.search}?q=${encodeURIComponent(
          query
        )}&pageToken=${nextPageToken}`,
      });
      setVideos((prev) => [...prev, ...(result.items || [])]);
      setNextPageToken(result.nextPageToken || null);
    } catch (err) {
      console.error("Load more failed", err);
      Toast(null);
    }
  };

  // Collections
  const createCollection = async (name) => {
    const data = await apiFunction({
      method: "post",
      url: apiStore.collections,
      data: { name },
    });
    setCollections((prev) => [...prev, data]);
    Toast({ status: true, message: "Collection created" });
  };

  const updateCollectionName = async (id, name) => {
    const data = await apiFunction({
      method: "put",
      url: `${apiStore.collections}/${id}`,
      data: { name },
    });
    setCollections((prev) => prev.map((c) => (c._id === id ? data : c)));
    if (activeCollection?._id === id) setActiveCollection(data);
    Toast({ status: true, message: "Collection updated" });
  };

  const deleteCollection = async (id) => {
    await apiFunction({
      method: "delete",
      url: `${apiStore.collections}/${id}`,
    });
    setCollections((prev) => prev.filter((c) => c._id !== id));
    setActiveCollection(null);
    setActiveMenu("home");
    Toast({ status: true, message: "Collection deleted" });
  };

  const addToCollection = async (id, video) => {
    const data = await apiFunction({
      method: "post",
      url: `${apiStore.collections}/${id}/videos`,
      data: video,
    });
    setCollections((prev) => prev.map((c) => (c._id === id ? data : c)));
    if (activeCollection?._id === id) setActiveCollection(data);
    Toast({ status: true, message: "Video added to collection" });
  };

  const removeFromCollection = async (collectionId, videoId) => {
    const data = await apiFunction({
      method: "delete",
      url: `${apiStore.collections}/${collectionId}/videos/${videoId}`,
    });
    setCollections((prev) =>
      prev.map((c) => (c._id === collectionId ? data : c))
    );
    if (activeCollection?._id === collectionId) setActiveCollection(data);
    Toast({ status: true, message: "Video removed from collection" });
  };

  // Saved Videos
  const saveVideo = async (video) => {
    const data = await apiFunction({
      method: "post",
      url: apiStore.savedVideos,
      data: video,
    });
    setSavedVideos((prev) => {
      const exists = prev.find((v) => v.videoId === video.videoId);
      return exists ? prev : [...prev, data];
    });
    Toast({ status: true, message: "Video saved" });
  };

  const deleteSavedVideo = async (videoId) => {
    await apiFunction({
      method: "delete",
      url: `${apiStore.savedVideos}/${videoId}`,
    });
    setSavedVideos((prev) => prev.filter((v) => v.videoId !== videoId));
    Toast({ status: true, message: "Video removed from saved" });
  };

  return (
    <AppContext.Provider
      value={{
        videos,
        nextPageToken,
        collections,
        savedVideos,
        activeMenu,
        setActiveMenu,
        activeCollection,
        setActiveCollection,
        selectedVideoId, 
        setSelectedVideoId, 
        search,
        loadMoreSearchResults,
        createCollection,
        updateCollectionName,
        deleteCollection,
        addToCollection,
        removeFromCollection,
        saveVideo,
        deleteSavedVideo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
