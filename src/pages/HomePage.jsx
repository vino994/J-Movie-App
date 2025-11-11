import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchMovies, getMovieDetails } from "../api/omdb";
import MovieRow from "../components/MovieRow";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [shows, setShows] = useState([]);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [moviesData, seriesData, showsData] = await Promise.all([
          searchMovies("Avengers", 1, "movie"),
          searchMovies("Breaking", 1, "series"),
          searchMovies("Friends", 1, "series"),
        ]);

        const getDetails = async (list) =>
          Promise.all(
            (list.Search || []).map(async (m) => {
              try {
                const d = await getMovieDetails(m.imdbID);
                return { ...m, ...d };
              } catch {
                return m;
              }
            })
          );

        const [movieDetails, seriesDetails, showsDetails] = await Promise.all([
          getDetails(moviesData),
          getDetails(seriesData),
          getDetails(showsData),
        ]);

        setMovies(movieDetails);
        setSeries(seriesDetails);
        setShows(showsDetails);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Search suggestions
  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (query.length > 2) {
        try {
          const data = await searchMovies(query);
          setSuggestions(data.Search ? data.Search.slice(0, 10) : []);
        } catch {
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [query]);

  const handleSuggestionClick = (title) => {
    setQuery(title);
    setSuggestions([]);
  };

  const handleViewAll = (section) => {
    navigate(`/${section}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#313647] via-[#435663] to-[#6BA4FF] text-white px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* 🔍 Search */}
        <div className="relative w-full sm:flex-1 min-w-[200px] mb-6">
          <input
            type="text"
            placeholder="Search movies or series..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-white/10 border border-white/20 px-3 py-2 rounded-lg outline-none text-white placeholder-gray-300"
          />
          {suggestions.length > 0 && (
            <ul className="absolute z-20 w-full bg-white text-black rounded-lg mt-1 shadow-lg max-h-60 overflow-y-auto">
              {suggestions.map((s) => (
                <li
                  key={s.imdbID}
                  onClick={() => handleSuggestionClick(s.Title)}
                  className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  {s.Title} ({s.Year})
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 🎬 Rows */}
        {loading ? (
          <p className="text-center animate-pulse text-gray-300">
            Loading content...
          </p>
        ) : (
          <>
            <MovieRow
              title="🔥 Popular Movies"
              items={movies.slice(0, 10)}
              onViewAll={() => handleViewAll("movies")}
            />
            <MovieRow
              title="🎞️ Trending Series"
              items={series.slice(0, 10)}
              onViewAll={() => handleViewAll("series")}
            />
            <MovieRow
              title="🍿 TV Shows"
              items={shows.slice(0, 10)}
              onViewAll={() => handleViewAll("shows")}
            />
          </>
        )}
      </div>
    </div>
  );
}
