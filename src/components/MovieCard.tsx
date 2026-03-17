import type { Movie } from "../types/movie";
import { Link } from "react-router-dom";

interface Props {
  movie: Movie;
}

export default function MovieCard({ movie }: Props) {
  const image = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/no-image.png";

  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="group relative overflow-hidden rounded-xl bg-zinc-900 shadow-lg hover:shadow-2xl transition cursor-pointer">

        <img
          src={image}
          alt={movie.title}
          className="w-full h-[320px] object-cover group-hover:scale-110 transition duration-500"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition" />

        {/* Info */}
        <div className="absolute bottom-0 p-4 opacity-0 group-hover:opacity-100 transition">
          <h2 className="font-semibold text-sm line-clamp-2">
            {movie.title}
          </h2>

          <div className="flex justify-between text-xs text-zinc-300 mt-1">
            <span>{movie.release_date?.slice(0, 4)}</span>
            <span>⭐ {movie.vote_average}</span>
          </div>
        </div>

      </div>
    </Link>
  );
}