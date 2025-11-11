// src/components/GlobalFilterBar.jsx
import React from "react";

export default function GlobalFilterBar({
  query,
  setQuery,
  genre,
  setGenre,
  year,
  setYear,
  genreOptions,
  onSearch,
}) {
  const years = Array.from({ length: 56 }, (_, i) => 2025 - i);

  return (
    <form
      onSubmit={onSearch}
      className="flex flex-wrap gap-3 justify-between items-center bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-lg shadow-md"
    >
      <input
        type="text"
        name="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="flex-1 min-w-[180px] bg-transparent border border-white/20 px-3 py-2 rounded-lg outline-none text-white placeholder-gray-300"
      />

      {/* Genre Filter */}
      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="bg-white text-black border border-white/20 px-3 py-2 rounded-lg outline-none"
      >
        <option value="">All Genres</option>
        {genreOptions.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>

      {/* Year Filter */}
      <select
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="bg-white text-black border border-white/20 px-3 py-2 rounded-lg outline-none"
      >
        <option value="">All Years</option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-[#6BA4FF] hover:opacity-90 text-white px-4 py-2 rounded-lg transition"
      >
        Search
      </button>
    </form>
  );
}
