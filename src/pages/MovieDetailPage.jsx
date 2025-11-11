import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails } from "../api/omdb";

export default function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function loadDetails() {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);

        // Automatically set YouTube trailer search link
        if (data?.Title) {
          const query = encodeURIComponent(`${data.Title} official trailer`);
          setTrailerUrl(`https://www.youtube.com/results?search_query=${query}`);
        }
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    }
    loadDetails();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-white text-xl">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-400 text-lg">
        {error}
      </div>
    );
  if (!movie) return null;

  const bgImage =
    movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/800x600";

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-6 relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90"></div>

      {/* Glass Card */}
      <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 flex flex-col md:flex-row items-center gap-8 max-w-6xl w-full text-white z-10">
        {/* Left Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/300x450"
            }
            alt={movie.Title}
            className="rounded-xl shadow-lg w-[80%] md:w-[90%] object-cover"
          />
        </div>

        {/* Right Details */}
        <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
          <h1 className="text-4xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400 drop-shadow-lg">
            {movie.Title}
          </h1>

          <p className="text-gray-200 mb-2">
            <strong>Year:</strong> {movie.Year}
          </p>
          <p className="text-gray-200 mb-2">
            <strong>Genre:</strong> {movie.Genre}
          </p>
          <p className="text-gray-200 mb-2">
            <strong>Director:</strong> {movie.Director}
          </p>
          <p className="text-gray-200 mb-2">
            <strong>Actors:</strong> {movie.Actors}
          </p>

          <p className="text-gray-100 mt-4 leading-relaxed italic">
            {movie.Plot}
          </p>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-4 mt-6 justify-center md:justify-start">
            <button
              onClick={() => window.open(trailerUrl, "_blank")}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-semibold shadow-lg hover:scale-105 hover:shadow-pink-400/40 transform transition"
            >
              🎬 Watch Trailer
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 bg-white/20 border border-white/30 rounded-full text-white font-semibold hover:bg-white/30 hover:scale-105 transform transition"
            >
              ⬅ Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
