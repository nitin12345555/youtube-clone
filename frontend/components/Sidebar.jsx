"use client";
import { useState } from "react";
import { useApp } from "../context/AppContext";
import CreateCollectionSlider from "./CreateCollectionSlider";
import Image from "next/image";

import {
  IoMenuOutline,
  IoHomeOutline,
  IoHome,
  IoTrashOutline,
} from "react-icons/io5";
import { BsCollectionPlay } from "react-icons/bs";
import { CiSaveDown1 } from "react-icons/ci";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import youtube from "../public/assets/logo/youtube.png";

export default function Sidebar() {
  const {
    activeMenu,
    setActiveMenu,
    collections,
    activeCollection,
    setActiveCollection,
    deleteCollection,
  } = useApp();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showSlider, setShowSlider] = useState(false);
  const [collectionToEdit, setCollectionToEdit] = useState(null);

  // ----- Handlers -----
  const goHome = () => {
    setActiveMenu("home");
    setActiveCollection(null);
    setMenuOpen(false);
  };

  const openCreate = () => {
    setCollectionToEdit(null);
    setShowSlider(true);
  };

  const editCollection = (e, collection) => {
    e.stopPropagation();
    setCollectionToEdit(collection);
    setShowSlider(true);
  };

  const removeCollection = async (e, id) => {
    e.stopPropagation();
    if (!confirm("Delete this playlist?")) return;
    await deleteCollection(id);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden p-4 flex justify-between items-center bg-black border-b border-zinc-800 z-50 relative">
        <Image src={youtube} alt="logo" width={32} height={32} />
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <IoMenuOutline size={24} />
        </button>
      </div>

      {/* Mobile Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-72 bg-black border-r border-zinc-800
        transition-transform z-50
        ${menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Logo */}
        <div
          onClick={goHome}
          className="p-6 flex items-center gap-3 cursor-pointer"
        >
          <Image src={youtube} alt="logo" width={32} height={24} />
          <span className="text-white font-bold text-xl">YouTube</span>
        </div>

        <nav className="px-4 space-y-2">
          {/* Main menu */}
          <MenuButton
            active={activeMenu === "home"}
            icon={activeMenu === "home" ? IoHome : IoHomeOutline}
            label="Home"
            onClick={() => {
              setActiveMenu("home");
              setActiveCollection(null);
              setMenuOpen(false);
            }}
          />

          <MenuButton
            active={activeMenu === "saved"}
            icon={CiSaveDown1}
            label="Saved"
            onClick={() => {
              setActiveMenu("saved");
              setActiveCollection(null);
              setMenuOpen(false);
            }}
          />

          <hr className="my-4 border-zinc-800" />

          {/* Playlists header */}
          <div className="flex justify-between items-center text-xs text-zinc-500 uppercase">
            <span>Playlists</span>
            <button onClick={openCreate}>
              <RiAddLine size={20} />
            </button>
          </div>

          {/* Playlists */}
          {collections.map((c) => (
            <div
              key={c._id}
              onClick={() => {
                setActiveCollection(c);
                setActiveMenu("collection-detail");
                setMenuOpen(false);
              }}
              className={`flex justify-between items-center px-3 py-2 rounded cursor-pointer ${
                activeCollection?._id === c._id
                  ? "bg-zinc-800 text-white"
                  : "hover:bg-zinc-900"
              }`}
            >
              <div className="flex gap-2 items-center">
                <BsCollectionPlay />
                <span>{c.name}</span>
              </div>

              <div className="flex gap-1">
                <button
                  onClick={(e) => editCollection(e, c)}
                  className="bg-color-2 py-1 px-1 rounded-md"
                >
                  <RiPencilLine />
                </button>
                <button
                  onClick={(e) => removeCollection(e, c._id)}
                  className="bg-color-1 py-1 px-1 rounded-md"
                >
                  <IoTrashOutline />
                </button>
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* Slider */}
      {showSlider && (
        <CreateCollectionSlider
          close={() => setShowSlider(false)}
          editCollection={collectionToEdit}
        />
      )}
    </>
  );
}

function MenuButton({ icon: Icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex gap-3 items-center px-3 py-2 rounded ${
        active ? "bg-zinc-800 text-white" : "hover:bg-zinc-900"
      }`}
    >
      <Icon />
      <span>{label}</span>
    </button>
  );
}
