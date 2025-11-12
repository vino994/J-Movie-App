import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MovieRow({ title, items = [], section = "movies", onViewAll }) {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const scrollAmount =
      direction === "left"
        ? scrollLeft - clientWidth + 100
        : scrollLeft + clientWidth - 100;
    scrollRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" });
  };

  const handleViewAllClick = () => {
    if (typeof onViewAll === "function") return onViewAll();
    if (section === "series") navigate("/series");
    else if (section === "shows") navigate("/shows");
    else navigate("/movies");
  };

  return (
    <div className="relative group mb-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 px-2">
        <h2 className="text-lg sm:text-2xl font-semibold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent truncate">
          {title}
        </h2>
        <button
          onClick={handleViewAllClick}
          className="text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg transition-all text-white whitespace-nowrap"
        >
          View All →
        </button>
      </div>

      {/* Scrollable Row */}
      <div className="relative">
        {/* Left Button */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-[#1e2233]/80 hover:bg-[#6BA4FF]/70 text-white rounded-full p-2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Scrollable Cards */}
        <div
          ref={scrollRef}
          className="flex overflow-x-scroll gap-4 pb-3 px-2 scroll-smooth scrollbar-hide"
          style={{ scrollBehavior: "smooth", WebkitOverflowScrolling: "touch" }}
        >
          {items.map((movie) => (
            <Link
              key={movie.imdbID}
              to={`/movie/${movie.imdbID}`}
              className="flex-shrink-0 w-36 sm:w-44 md:w-52 group"
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform duration-300">
                <img
                  src={
                    movie.Poster && movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://via.placeholder.com/300x450?text=No+Image"
                  }
                  alt={movie.Title}
                  className="w-full h-52 sm:h-56 object-cover"
                />
              </div>
              <p className="mt-2 text-xs sm:text-sm text-center group-hover:text-cyan-300 transition-colors line-clamp-1">
                {movie.Title}
              </p>
            </Link>
          ))}
        </div>

        {/* Right Button */}
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-[#1e2233]/80 hover:bg-[#6BA4FF]/70 text-white rounded-full p-2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
