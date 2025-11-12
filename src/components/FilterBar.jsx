import React from "react";

export default function FilterBar({ query, setQuery, year, setYear, type, setType, onApply }) {
  return (
    <div className="flex flex-col md:flex-row gap-3 justify-center mb-6">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="🔍 Search..."
        className="flex-1 bg-white/10 border border-white/20 px-4 py-3 rounded-xl text-white"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="bg-white/10 border border-white/20 px-4 py-3 rounded-xl text-white"
      >
        <option value="all">All</option>
        <option value="movie">Movies</option>
        <option value="series">Series</option>
      </select>
      <input
        type="number"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        placeholder="Year"
        className="w-28 bg-white/10 border border-white/20 px-3 py-3 rounded-xl text-white placeholder-gray-300"
      />
      <button
        onClick={onApply}
        className="px-5 py-3 rounded-xl bg-pink-500 hover:bg-pink-600 font-semibold"
      >
        Apply
      </button>
    </div>
  );
}
