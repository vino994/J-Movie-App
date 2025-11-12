import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { searchMovies, getMovieDetails } from "../api/omdb";
import MovieRow from "../components/MovieRow";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [shows, setShows] = useState([]);
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("");
  const [type, setType] = useState("all");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const cacheRef = useRef(new Map());
  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1980 + 1 }, (_, i) => currentYear - i);

  // ✅ Load featured content
  useEffect(() => {
    async function loadFeatured() {
      setLoading(true);
      try {
        const cacheKey = `featured-${type}-${year}`;
        const cached = cacheRef.current.get(cacheKey);
        if (cached) {
          setMovies(cached.movies);
          setSeries(cached.series);
          setShows(cached.shows);
          setLoading(false);
          return;
        }

        // ✅ Default popular searches
        const moviePromise =
          type === "all" || type === "movie"
            ? searchMovies("Avengers", 1, "movie", year)
            : { Search: [] };
        const seriesPromise =
          type === "all" || type === "series"
            ? searchMovies("Friends", 1, "series", year)
            : { Search: [] };
        const showPromise =
          type === "all" || type === "show"
            ? searchMovies("Game of Thrones", 1, "series", year)
            : { Search: [] };

        const [movieRes, seriesRes, showRes] = await Promise.all([
          moviePromise,
          seriesPromise,
          showPromise,
        ]);

        const mapDetails = async (list) =>
          Promise.all(
            (list.Search || []).slice(0, 10).map(async (i) => {
              const d = await getMovieDetails(i.imdbID);
              return { ...i, ...d };
            })
          );

        const [movieList, seriesList, showList] = await Promise.all([
          mapDetails(movieRes),
          mapDetails(seriesRes),
          mapDetails(showRes),
        ]);

        cacheRef.current.set(cacheKey, {
          movies: movieList,
          series: seriesList,
          shows: showList,
        });

        setMovies(movieList);
        setSeries(seriesList);
        setShows(showList);
      } catch (err) {
        console.error("Home fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadFeatured();
  }, [type, year]);

  // ✅ Debounced search
  useEffect(() => {
    const timer = setTimeout(async () => {
      const term = query.trim();
      if (term.length > 2) {
        const key = `${term}_${year}_${type}`;
        if (cacheRef.current.has(key)) {
          setSuggestions(cacheRef.current.get(key));
          return;
        }

        try {
          const data = await searchMovies(term, 1, type, year);
          const results = data?.Search ? data.Search.slice(0, 8) : [];
          setSuggestions(results);
          cacheRef.current.set(key, results);
        } catch {
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [query, year, type]);

  const handleSuggestionClick = (item) => {
    setQuery("");
    setSuggestions([]);
    navigate(`/movie/${item.imdbID}`, { state: item });
  };

  const handleViewAll = (section) => navigate(`/${section}`);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] text-white px-4 py-8 font-stencil">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* 🔍 Search Bar */}
        <div className="relative w-full mb-6 space-y-3">
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="🔍 Search movies, series, or shows..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-white/10 border border-white/20 px-5 py-3 rounded-xl outline-none text-white placeholder-gray-300 focus:ring-2 focus:ring-pink-400"
            />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="bg-white/10 border border-white/20 px-4 py-3 rounded-xl text-blue-400"
            >
              <option value="all">All Types</option>
              <option value="movie">Movies</option>
              <option value="series">Series</option>
              <option value="show">Shows</option>
            </select>
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

          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <ul className="absolute z-50 w-full bg-white/95 text-black rounded-xl mt-2 shadow-xl max-h-72 overflow-y-auto">
              {suggestions.map((s) => (
                <li
                  key={s.imdbID}
                  onClick={() => handleSuggestionClick(s)}
                  className="px-3 py-2 hover:bg-pink-100/80 cursor-pointer flex items-center gap-3"
                >
                  <img
                    src={
                      s.Poster !== "N/A"
                        ? s.Poster
                        : "https://via.placeholder.com/50x70?text=No+Image"
                    }
                    alt={s.Title}
                    className="w-10 h-14 object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-semibold">{s.Title}</p>
                    <p className="text-sm text-gray-600">
                      ({s.Year}) • {s.Type?.toUpperCase()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 🎬 Featured Sections */}
        {loading ? (
          <p className="text-center animate-pulse text-gray-300 text-lg">Loading...</p>
        ) : (
          <>
            {(type === "all" || type === "movie") && movies.length > 0 && (
              <MovieRow
                title="🎥 Popular Movies"
                items={movies}
                section="movies"
                onViewAll={() => handleViewAll("movies")}
              />
            )}
            {(type === "all" || type === "series") && series.length > 0 && (
              <MovieRow
                title="📺 Trending Series"
                items={series}
                section="series"
                onViewAll={() => handleViewAll("series")}
              />
            )}
            {(type === "all" || type === "show") && shows.length > 0 && (
              <MovieRow
                title="🍿 Top TV Shows"
                items={shows}
                section="shows"
                onViewAll={() => handleViewAll("shows")}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
