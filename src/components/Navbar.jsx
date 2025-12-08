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

  // ⬇️ AUTH STATE
  const [user, setUser] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  // ⬇️ Search suggestions debounce
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

  // Close dropdown on outside click
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
      setSearchTerm("");
      setShowDropdown(false);
      setShowSearch(false);
    }
  };

  const handleSelect = (movie) => {
    navigate(`/movie/${movie.imdbID}`);
    setShowDropdown(false);
    setSearchTerm("");
    setShowSearch(false);
  };

  return (
    <nav className="relative flex items-center justify-between px-6 py-4 bg-[#313647] text-white shadow-md z-50">
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-bold tracking-wide hover:text-[#6BA4FF] transition"
      >
        🎬 J MOVIE
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex flex-1 justify-center gap-8">
        <Link to="/" className="hover:text-[#6BA4FF] font-medium">Home</Link>
        <Link to="/movies" className="hover:text-[#6BA4FF] font-medium">Movies</Link>
        <Link to="/series" className="hover:text-[#6BA4FF] font-medium">Series</Link>
        <Link to="/shows" className="hover:text-[#6BA4FF] font-medium">Shows</Link>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Username or login */}
        {user ? (
          <div className="flex items-center gap-3">
            <span className="font-medium text-[#6BA4FF]">
              Hi, {user.name}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-[#6BA4FF] px-4 py-2 rounded-md font-medium hover:opacity-90"
          >
            Login
          </Link>
        )}

        {/* Search toggle mobile */}
        <button
          className="md:hidden text-white"
          onClick={() => setShowSearch(!showSearch)}
        >
          <Search size={24} />
        </button>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Desktop Search */}
      <div className="hidden md:block relative ml-4" ref={dropdownRef}>
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-white/10 border border-white/20 rounded-lg px-2 py-1"
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowDropdown(true);
            }}
            className="bg-transparent outline-none text-white placeholder-gray-300 px-2 w-56"
          />
          <button
            className="bg-[#6BA4FF] px-3 py-1 rounded-md"
            type="submit"
          >
            Search
          </button>
        </form>

        {/* Search suggestions */}
        {showDropdown && suggestions.length > 0 && (
          <ul className="absolute top-full left-0 w-full bg-[#1e2233] mt-1 border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
            {suggestions.map((movie) => (
              <li
                key={movie.imdbID}
                onClick={() => handleSelect(movie)}
                className="flex gap-3 px-3 py-2 hover:bg-[#6BA4FF]/30 cursor-pointer"
              >
                <img
                  src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/40x60"}
                  className="w-10 h-14 object-cover rounded-md"
                />
                <div>
                  <p className="font-medium">{movie.Title}</p>
                  <p className="text-xs text-gray-400">{movie.Year}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#1e2233] py-4 flex flex-col md:hidden">
          {["Home", "Movies", "Series", "Shows"].map((item) => {
            const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
            return (
              <Link
                key={item}
                to={path}
                onClick={() => setMenuOpen(false)}
                className="text-center py-2 hover:text-[#6BA4FF]"
              >
                {item}
              </Link>
            );
          })}
        </div>
      )}

      {/* Mobile search */}
      {showSearch && (
        <div className="absolute top-full left-0 w-full bg-[#1e2233] p-3 md:hidden" ref={dropdownRef}>
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-white/10 px-3 py-2 border rounded-lg"
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowDropdown(true);
              }}
              className="bg-transparent text-white w-full outline-none"
            />
            <button className="ml-2 bg-[#6BA4FF] px-3 py-1 rounded-md">Go</button>
          </form>

          {/* Mobile search suggestion */}
          {showDropdown && suggestions.length > 0 && (
            <ul className="bg-[#2a2f45] border mt-2 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {suggestions.map((movie) => (
                <li
                  key={movie.imdbID}
                  onClick={() => handleSelect(movie)}
                  className="flex gap-3 px-3 py-2 hover:bg-[#6BA4FF]/30 cursor-pointer"
                >
                  <img
                    src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/40x60"}
                    className="w-10 h-14 rounded"
                  />
                  <div>
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
