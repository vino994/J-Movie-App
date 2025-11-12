import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#1e293b] to-[#0f172a] text-white py-10 mt-16">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* 🔹 Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-pink-400 mb-3">🎬 J FIX</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Discover movies, TV shows, and trending series — your ultimate
            entertainment companion.
          </p>
        </div>

        {/* 🔹 Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <a href="/movies" className="hover:text-pink-400 transition">
                Movies
              </a>
            </li>
            <li>
              <a href="/series" className="hover:text-pink-400 transition">
                Series
              </a>
            </li>
            <li>
              <a href="/shows" className="hover:text-pink-400 transition">
                TV Shows
              </a>
            </li>
          </ul>
        </div>

        {/* 🔹 Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Categories</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <a href="#" className="hover:text-pink-400 transition">
                Action
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-400 transition">
                Comedy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-400 transition">
                Drama
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-400 transition">
                Sci-Fi
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-400 transition">
                Horror
              </a>
            </li>
          </ul>
        </div>

        {/* 🔹 Subscribe */}
  <div>
  <h3 className="text-lg font-semibold mb-3">Stay Updated</h3>
  <p className="text-gray-300 text-sm mb-3">
    Subscribe to our newsletter for latest movie updates.
  </p>

<form
  onSubmit={(e) => {
    e.preventDefault();
    alert("✅ Subscribed successfully!");
  }}
  className="flex flex-col gap-3 w-full max-w-md"
>
  <input
    type="email"
    placeholder="Enter your email"
    required
    className="w-full bg-white/10 border border-white/20 px-3 py-2 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-400 outline-none"
  />
  <button
    type="submit"
    className="w-full bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-xl font-medium transition"
  >
    Subscribe
  </button>
</form>


</div>

      </div>

      {/* 🔹 Footer Bottom */}
      <div className="border-t border-white/20 mt-10 pt-5 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} MovieVerse. All rights reserved. |
        Built with ❤️ by Vinoth.
      </div>
    </footer>
  );
}
