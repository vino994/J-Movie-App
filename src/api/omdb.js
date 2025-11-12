// src/api/omdb.js
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

const cache = new Map(); // simple in-memory cache

export async function searchMovies(query, page = 1, type = "", year = "") {
  if (!query) return { Search: [] }; // consistent return

  const key = `${query}-${page}-${type}-${year}`;
  if (cache.has(key)) return cache.get(key);

  try {
    const url = new URL(BASE_URL);
    url.searchParams.set("apikey", API_KEY);
    url.searchParams.set("s", query);
    url.searchParams.set("page", page);
    if (type && type !== "all") url.searchParams.set("type", type);
    if (year) url.searchParams.set("y", year);

    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

    const data = await response.json();
    if (data.Response === "False") return { Search: [] };

    cache.set(key, data);
    return data;
  } catch (error) {
    console.error("OMDb fetch error:", error);
    return { Search: [] };
  }
}

export async function getMovieDetails(id) {
  if (!id) return null;

  const key = `details-${id}`;
  if (cache.has(key)) return cache.get(key);

  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

    const data = await response.json();
    cache.set(key, data);
    return data;
  } catch (error) {
    console.error("OMDb details error:", error);
    return null;
  }
}
