import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getMovieDetails } from "../api/omdb";

export default function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [trailerUrl, setTrailerUrl] = useState("");

  // ⭐ Reviews + Ratings
  const [reviews, setReviews] = useState([]);
  const [userName, setUserName] = useState("");
  const [userReview, setUserReview] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    async function loadDetails() {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);

        // trailer link
        if (data?.Title) {
          const query = encodeURIComponent(`${data.Title} official trailer`);
          setTrailerUrl(`https://www.youtube.com/results?search_query=${query}`);
        }

        // load saved reviews
        const saved = JSON.parse(localStorage.getItem(`reviews-${id}`)) || [];
        setReviews(saved);
      } catch (err) {
        setError("Failed to fetch movie details.");
      } finally {
        setLoading(false);
      }
    }
    loadDetails();
  }, [id]);

  // 📝 Add Review
  const handleAddReview = (e) => {
    e.preventDefault();
    if (!userName.trim() || !userReview.trim() || rating === 0) return;

    const newReview = {
      id: Date.now(),
      name: userName.trim(),
      text: userReview.trim(),
      rating,
      date: new Date().toLocaleString(),
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem(`reviews-${id}`, JSON.stringify(updated));

    setUserName("");
    setUserReview("");
    setRating(0);
  };

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
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/800x600";

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start bg-cover bg-center p-6 relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90"></div>

      <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 flex flex-col md:flex-row items-center gap-8 max-w-6xl w-full text-white z-10 mt-8">
        {/* Poster */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={
              movie.Poster && movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/300x450"
            }
            alt={movie.Title}
            className="rounded-xl shadow-lg w-[80%] md:w-[90%] object-cover"
          />
        </div>

        {/* Details */}
        <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
          <h1 className="text-4xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400 drop-shadow-lg">
            {movie.Title}
          </h1>

          <p className="text-gray-200 mb-1">
            <strong>Year:</strong> {movie.Year}
          </p>
          <p className="text-gray-200 mb-1">
            <strong>Genre:</strong> {movie.Genre}
          </p>
          <p className="text-gray-200 mb-1">
            <strong>Director:</strong> {movie.Director}
          </p>
          <p className="text-gray-200 mb-1">
            <strong>Actors:</strong> {movie.Actors}
          </p>

          <p className="text-gray-100 mt-4 leading-relaxed italic">
            {movie.Plot}
          </p>

          <div className="flex flex-col md:flex-row gap-4 mt-6 justify-center md:justify-start">
            <button
              onClick={() => window.open(trailerUrl, "_blank")}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-semibold shadow-lg hover:scale-105 hover:shadow-pink-400/40 transform transition"
            >
              🎬 Watch Trailer
            </button>
            <button
              onClick={() =>
                navigate(location.state?.from || "/", { replace: true })
              }
              className="px-6 py-3 bg-white/20 border border-white/30 rounded-full text-white font-semibold hover:bg-white/30 hover:scale-105 transform transition"
            >
              ⬅ Back
            </button>
          </div>
        </div>
      </div>

      {/* ⭐ Reviews Section */}
      <div className="relative z-10 max-w-4xl w-full mt-12 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-lg">
        <h2 className="text-3xl font-semibold mb-4 text-center text-pink-300">
          ⭐ Reviews & Ratings
        </h2>

        <form
          onSubmit={handleAddReview}
          className="flex flex-col md:flex-row gap-4 mb-6"
        >
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Your name"
            className="flex-1 px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none"
          />
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none"
          >
            <option value="0">Rate ⭐</option>
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>
                {r} Star{r > 1 && "s"}
              </option>
            ))}
          </select>
        </form>

        <textarea
          value={userReview}
          onChange={(e) => setUserReview(e.target.value)}
          placeholder="Write your review..."
          className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none mb-4"
          rows="3"
        ></textarea>

        <button
          onClick={handleAddReview}
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-semibold shadow-lg hover:scale-105 transform transition"
        >
          ➕ Add Review
        </button>

        {/* Display Reviews */}
        <div className="mt-6 space-y-4">
          {reviews.length === 0 ? (
            <p className="text-gray-300 text-center">No reviews yet.</p>
          ) : (
            reviews.map((r) => (
              <div
                key={r.id}
                className="p-4 bg-white/10 rounded-xl border border-white/20"
              >
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-lg font-semibold text-pink-300">
                    {r.name}
                  </h3>
                  <p className="text-yellow-400">
                    {"⭐".repeat(r.rating)}{" "}
                    <span className="text-sm text-gray-400 ml-1">
                      ({r.date})
                    </span>
                  </p>
                </div>
                <p className="text-gray-200">{r.text}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
