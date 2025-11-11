const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

export async function searchMovies(query = "Avengers", page = 1, type = "") {
  const url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}${
    type ? `&type=${type}` : ""
  }`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.Response === "False") throw new Error(data.Error || "No results found");
  return data;
}

export async function getMovieDetails(id) {
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
  const data = await res.json();

  if (data.Response === "False") throw new Error(data.Error || "Movie not found");
  return data;
}
