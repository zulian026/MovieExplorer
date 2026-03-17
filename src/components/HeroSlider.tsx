import { useEffect, useState } from "react";
import type { Movie } from "../types/movie";

interface Props {
  movies: Movie[];
}

export default function HeroSlider({ movies }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!movies.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [movies]);

  const movie = movies[index];

  if (!movie) return null;

  const backdrop = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "";

  return (
    <section className="relative h-[75vh] w-full overflow-hidden">
      {/* Background */}
      <img
        src={backdrop}
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover transition duration-700"
      />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 h-full flex flex-col justify-end pb-16">
        <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>

        <p className="max-w-xl text-zinc-300 mb-4 line-clamp-3">
          {movie.overview}
        </p>

        <div className="flex gap-4 text-sm text-zinc-300">
          <span>⭐ {movie.vote_average}</span>
          <span>{movie.release_date?.slice(0, 4)}</span>
        </div>
      </div>

      {/* Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {movies.slice(0, 5).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
