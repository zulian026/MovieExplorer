const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchTrending = async () => {
  const res = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
};

export const fetchPopular = async () => {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
};

export const fetchTopRated = async () => {
  const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
};

export const fetchSearchMovies = async (query: string) => {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`,
  );
  const data = await res.json();
  return data.results;
};

export const fetchMovieDetail = async (id: string) => {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  const data = await res.json();
  return data;
};

export const fetchMovieCredits = async (id: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
  );
  const data = await res.json();
  return data.cast;
};

export const fetchDiscoverMovies = async ({
  genre,
  sort,
}: {
  genre?: string;
  sort?: string;
}) => {
  const params = new URLSearchParams({
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    ...(genre && { with_genres: genre }),
    ...(sort && { sort_by: sort }),
  });

  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?${params}`,
  );

  const data = await res.json();
  return data.results;
};

export const fetchGenres = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
  );
  const data = await res.json();
  return data.genres;
};
