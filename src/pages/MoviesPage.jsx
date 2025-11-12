import React, { useEffect, useState, useRef } from "react";
import { searchMovies } from "../api/omdb";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const controllerRef = useRef(null);

  const years = Array.from({ length: 2025 - 1980 + 1 }, (_, i) => 2025 - i);

  async function fetchMovies(pageNum = 1, search = query) {
    if (controllerRef.current) controllerRef.current.abort();
    controllerRef.current = new AbortController();

    setLoading(true);
    setError("");

    try {
      const [page1, page2] = await Promise.all([
        searchMovies(search || "movie", pageNum, "movie", year, controllerRef.current.signal),
        searchMovies(search || "movie", pageNum + 1, "movie", year, controllerRef.current.signal),
      ]);

      const combined = [...(page1?.Search || []), ...(page2?.Search || [])].slice(0, 12);
      setMovies(combined);
      setTotalResults(parseInt(page1?.totalResults || 0));
    } catch (err) {
      if (err.name !== "AbortError") setError("Failed to load movies.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const delay = setTimeout(() => fetchMovies(page * 2 - 1), 500);
    return () => {
      clearTimeout(delay);
      if (controllerRef.current) controllerRef.current.abort();
    };
  }, [page, query, year]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] text-white py-10 px-6 font-sans">
      <div className="max-w-6xl mx-auto text-center space-y-6">
        <h1 className="text-4xl font-bold">🎬 All Movies</h1>

        {/* 🔍 Search and Filter */}
        <div className="flex flex-col md:flex-row gap-3 justify-center">
          <input
            type="text"
            placeholder="🔍 Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-white/10 border border-white/20 px-5 py-3 rounded-xl outline-none text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-400"
          />
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="bg-white/10 border border-white/20 px-4 py-3 rounded-xl text-blue-400"
          >
            <option value="">All Years</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {loading && <p className="animate-pulse text-lg">Loading movies...</p>}
        {error && <p className="text-red-300">{error}</p>}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-8">
          {movies.map((m) => (
            <MovieCard key={m.imdbID} movie={m} />
          ))}
        </div>

        {!loading && (
          <Pagination
            currentPage={page}
            totalResults={Math.ceil(totalResults / 12)}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
}
