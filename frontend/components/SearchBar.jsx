"use client";

export default function SearchBar({ onSearch }) {
  return (
    <div className="mb-4">
    <input
      className="w-[320] p-3 bg-zinc-900 border border-zinc-700 rounded-3xl"
      placeholder="Search YouTube..."
      onKeyDown={(e) => {
        if (e.key === "Enter") onSearch(e.target.value);
      }}
    />
    </div>
  );
}
