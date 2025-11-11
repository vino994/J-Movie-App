import React, { useEffect, useState } from "react";
import { searchMovies } from "../api/omdb";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";

export default function ShowsPage() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  async function fetchShows(pageNum = 1) {
    setLoading(true);
    setError("");
    try {
      const data = await searchMovies("Friends", pageNum, "series");
      setShows(data.Search || []);
      setTotalResults(parseInt(data.totalResults) || 0);
    } catch (err) {
      setError("Failed to load shows.");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchShows(page);
  }, [page]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e293b] via-[#334155] to-[#475569] text-white py-10 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8">🍿 All TV Shows</h1>
        {loading && <p className="animate-pulse text-lg">Loading shows...</p>}
        {error && <p className="text-red-300">{error}</p>}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          {shows.map((s) => (
            <MovieCard key={s.imdbID} movie={s} />
          ))}
        </div>

        <Pagination
          currentPage={page}
          totalResults={totalResults}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
