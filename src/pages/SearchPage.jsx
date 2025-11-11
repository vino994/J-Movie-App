import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../api/omdb";
import MovieCard from "../components/MovieCard";

function SearchPage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query") || "Avengers";

  // Fetch movies
  async function fetchMovies(term, pageNum = 1) {
    if (!term) return;
    setLoading(true);
    setError("");
    try {
      const data = await searchMovies(term, pageNum);
      setMovies(data.Search || []);
      setTotalResults(parseInt(data.totalResults) || 0);

      if (term.length > 2)
        setSuggestions([`${term} 2024`, `${term} series`, `${term} movie`]);
      else setSuggestions([]);
    } catch (err) {
      setError("Something went wrong while fetching movies.");
      setMovies([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    setPage(1);
    fetchMovies(query, 1);
  }, [query]);

  useEffect(() => {
    fetchMovies(query, page);
  }, [page]);

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] text-white py-10 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 drop-shadow-md">
          🔍 Search Results for "{query}"
        </h1>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {suggestions.map((sug) => (
              <button
                key={sug}
                onClick={() => fetchMovies(sug, 1)}
                className="text-sm bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg transition-all"
              >
                {sug}
              </button>
            ))}
          </div>
        )}

        {/* Loading / Error */}
        <div className="mt-8">
          {loading && <p className="text-lg animate-pulse">Loading movies...</p>}
          {error && <p className="text-red-400">{error}</p>}
          {!loading && !error && movies.length === 0 && (
            <p className="text-gray-300">No movies found. Try another search.</p>
          )}
        </div>

        {/* Movie Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {movies.map((movie) => (
            <div
              key={movie.imdbID}
              className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-3 hover:scale-105 transition-all"
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className={`px-5 py-2 rounded-lg font-semibold transition-all ${
                page === 1
                  ? "bg-white/10 text-gray-400 cursor-not-allowed"
                  : "bg-white/20 hover:bg-white/30 text-white"
              }`}
            >
              Prev
            </button>
            <span className="text-lg">
              Page <strong>{page}</strong> of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className={`px-5 py-2 rounded-lg font-semibold transition-all ${
                page === totalPages
                  ? "bg-white/10 text-gray-400 cursor-not-allowed"
                  : "bg-white/20 hover:bg-white/30 text-white"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
