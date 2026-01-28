"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function VideoPlayerModal({ videoId, onClose }) {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!domLoaded || !videoId) return null;

  return (
    <div className="fixed inset-0 bg-black/95 z-[999] flex items-center justify-center p-4">
      {/* Background Overlay */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:text-zinc-400 transition-colors z-[1000]"
      >
        <X size={36} />
      </button>

      {/* Video Container */}
      <div className="w-full max-w-5xl aspect-video relative z-[1000] shadow-2xl rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  );
}