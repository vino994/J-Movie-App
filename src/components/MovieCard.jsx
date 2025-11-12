import React from "react";
import { useNavigate } from "react-router-dom";
import RatingStars from "./RatingStars";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/movie/${movie.imdbID}`, { state: movie })}
      className="cursor-pointer group bg-white/10 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-md hover:shadow-pink-400/40 hover:scale-105 transition-all duration-300"
    >
      <img
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/300x450?text=No+Image"
        }
        alt={movie.Title}
        className="w-full h-72 object-cover group-hover:opacity-90 transition"
      />
      <div className="p-3 text-left">
        <h3 className="text-lg font-semibold truncate">{movie.Title}</h3>
        <p className="text-sm text-gray-300 mb-2">{movie.Year}</p>
        <RatingStars movieId={movie.imdbID} />
      </div>
    </div>
  );
}
