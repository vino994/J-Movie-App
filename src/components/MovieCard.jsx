import React from "react";
import { Link } from "react-router-dom";
import RatingStars from "./RatingStars";

export default function MovieCard({ movie }) {
  if (!movie || !movie.imdbID) return null;

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 shadow-lg">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450"}
        alt={movie.Title}
        className="w-full h-80 object-cover"
      />
      <div className="p-3 text-white">
        <h3 className="font-semibold text-lg truncate mb-1">{movie.Title}</h3>
        <p className="text-sm text-gray-400">{movie.Year}</p>
        <RatingStars movieId={movie.imdbID} /> {/* ⭐ new */}
        <Link to={`/movie/${movie.imdbID}`} className="text-blue-400 hover:underline text-sm">
          View Details →
        </Link>
      </div>
    </div>
  );
}
