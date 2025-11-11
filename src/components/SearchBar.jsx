import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [term, setTerm] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (term.trim()) onSearch(term.trim());
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center gap-3 w-full max-w-lg bg-white/10 border border-white/20 rounded-xl p-2 backdrop-blur-md"
    >
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search movies or shows..."
        className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none px-2"
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-lg bg-[#6BA4FF] hover:opacity-90 transition"
      >
        Search
      </button>
    </form>
  );
}
