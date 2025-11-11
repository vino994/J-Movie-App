import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchMovies } from "../api/omdb";
import { Menu, X, Search } from "lucide-react";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  // ✅ Fetch live suggestions (debounced)
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.trim().length < 3) {
        setSuggestions([]);
        return;
      }
      try {
        const data = await searchMovies(searchTerm, 1);
        setSuggestions(data.Search ? data.Search.slice(0, 10) : []);
      } catch {
        setSuggestions([]);
      }
    };
    const timeout = setTimeout(fetchSuggestions, 400);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  // ✅ Hide dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
      setShowDropdown(false);
      setSearchTerm("");
      setShowSearch(false);
    }
  };

  const handleSelect = (movie) => {
    navigate(`/movie/${movie.imdbID}`);
    setSearchTerm("");
    setShowDropdown(false);
    setShowSearch(false);
  };

  return (
    <nav className="relative flex items-center justify-between px-6 py-4 bg-[#313647] text-white z-50 shadow-md">
      {/* ✅ Logo */}
      <Link
        to="/"
        className="text-2xl font-bold tracking-wide hover:text-[#6BA4FF] transition"
      >
        🎬 J Movies
      </Link>

      {/* ✅ Desktop Menu */}
      <div className="hidden md:flex flex-1 justify-center gap-8">
        <Link to="/" className="hover:text-[#6BA4FF] font-medium">
          Home
        </Link>
        <Link to="/movies" className="hover:text-[#6BA4FF] font-medium">
          Movies
        </Link>
        <Link to="/series" className="hover:text-[#6BA4FF] font-medium">
          Series
        </Link>
        <Link to="/shows" className="hover:text-[#6BA4FF] font-medium">
          Shows
        </Link>
      </div>

      {/* ✅ Right Side (Search + Menu) */}
      <div className="flex items-center gap-4">
        {/* Mobile Search Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setShowSearch((prev) => !prev)}
        >
          <Search size={24} />
        </button>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* ✅ Desktop Search */}
      <div className="hidden md:block relative ml-4" ref={dropdownRef}>
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-white/10 border border-white/20 rounded-lg px-2 py-1 backdrop-blur-md"
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowDropdown(true);
            }}
            className="bg-transparent outline-none text-white placeholder-gray-300 px-2 w-40 md:w-56"
          />
          <button
            type="submit"
            className="bg-[#6BA4FF] hover:opacity-90 text-white px-3 py-1 rounded-md transition"
          >
            Search
          </button>
        </form>

        {/* ✅ Suggestion List */}
        {showDropdown && suggestions.length > 0 && (
          <ul className="absolute top-full left-0 w-full bg-[#1e2233] border border-white/20 mt-1 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
            {suggestions.map((movie) => (
              <li
                key={movie.imdbID}
                onClick={() => handleSelect(movie)}
                className="flex items-center gap-3 px-3 py-2 hover:bg-[#6BA4FF]/30 cursor-pointer transition"
              >
                <img
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://via.placeholder.com/40x60?text=No+Img"
                  }
                  alt={movie.Title}
                  className="w-10 h-14 object-cover rounded-md"
                />
                <div className="text-left">
                  <p className="font-medium text-sm">{movie.Title}</p>
                  <p className="text-xs text-gray-400">{movie.Year}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ✅ Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#1e2233] border-t border-white/20 flex flex-col items-center gap-4 py-4 md:hidden animate-fadeIn">
          {["Home", "Movies", "Series", "Shows"].map((item) => {
            const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
            return (
              <Link
                key={item}
                to={path}
                className="hover:text-[#6BA4FF] font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </Link>
            );
          })}
        </div>
      )}

      {/* ✅ Mobile Search */}
      {showSearch && (
        <div
          className="absolute top-full left-0 w-full bg-[#1e2233] border-t border-white/20 px-4 py-3 md:hidden animate-fadeIn"
          ref={dropdownRef}
        >
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-white/10 border border-white/20 rounded-lg px-3 py-2 backdrop-blur-md"
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowDropdown(true);
              }}
              className="bg-transparent outline-none text-white placeholder-gray-300 px-2 w-full"
            />
            <button
              type="submit"
              className="ml-2 bg-[#6BA4FF] hover:opacity-90 text-white px-4 py-2 rounded-md transition"
            >
              Go
            </button>
          </form>

          {/* ✅ Mobile Suggestion List */}
          {showDropdown && suggestions.length > 0 && (
            <ul className="bg-[#2a2f45] border border-white/20 mt-2 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {suggestions.map((movie) => (
                <li
                  key={movie.imdbID}
                  onClick={() => handleSelect(movie)}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-[#6BA4FF]/30 cursor-pointer transition"
                >
                  <img
                    src={
                      movie.Poster !== "N/A"
                        ? movie.Poster
                        : "https://via.placeholder.com/40x60?text=No+Img"
                    }
                    alt={movie.Title}
                    className="w-10 h-14 object-cover rounded-md"
                  />
                  <div className="text-left">
                    <p className="font-medium text-sm">{movie.Title}</p>
                    <p className="text-xs text-gray-400">{movie.Year}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </nav>
  );
}
