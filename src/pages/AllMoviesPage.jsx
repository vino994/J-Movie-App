import React, { useEffect, useState } from "react";
import { searchMovies } from "../api/omdb";
import MovieCard from "../components/MovieCard";

export default function AllMoviesPage({ type = "" }) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true);
        const data = await searchMovies(type === "series" ? "Breaking" : "Avengers", page, type);
        setMovies(data.Search);
        setTotalResults(parseInt(data.totalResults));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadMovies();
  }, [page, type]);

  const totalPages = Math.ceil(totalResults / 10);

  if (loading) return <p className="text-center mt-6">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {type === "series" ? "All Series" : "All Movies"}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 bg-blue-600 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 bg-blue-600 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
