import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import MoviesPage from "./pages/MoviesPage";
import SeriesPage from "./pages/SeriesPage";
import ShowsPage from "./pages/ShowsPage";
import MovieDetailPage from "./pages/MovieDetailPage";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/series" element={<SeriesPage />} />
        <Route path="/shows" element={<ShowsPage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
      </Routes>
    </>
  );
}
