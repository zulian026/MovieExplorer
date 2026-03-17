import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetail, fetchMovieCredits } from "../services/tmdb";
import type { MovieDetail, Cast } from "../types/movie";

export default function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: movie, isLoading } = useQuery<MovieDetail>({
    queryKey: ["movie", id],
    queryFn: () => fetchMovieDetail(id!),
  });

  const { data: cast = [] } = useQuery<Cast[]>({
    queryKey: ["credits", id],
    queryFn: () => fetchMovieCredits(id!),
    enabled: !!id, // optional best practice
  });

  if (isLoading) {
    return <div className="text-white p-10">Loading...</div>;
  }

  if (!movie) return null;

  const backdrop = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "";

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 z-50 px-4 py-2 bg-black/60 rounded hover:bg-black"
      >
        ← Back
      </button>

      {/* HERO */}
      <div className="relative h-[80vh]">
        <img src={backdrop} className="w-full h-full object-cover" />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        <div className="absolute bottom-16 px-6 max-w-3xl">
          <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>

          <div className="flex gap-4 text-sm text-zinc-300 mb-4">
            <span>⭐ {movie.vote_average}</span>
            <span>{movie.release_date?.slice(0, 4)}</span>
            <span>{movie.runtime} min</span>
          </div>

          <div className="flex gap-2 mb-4 flex-wrap">
            {movie.genres.map((g) => (
              <span
                key={g.id}
                className="px-3 py-1 bg-zinc-800 rounded-full text-xs"
              >
                {g.name}
              </span>
            ))}
          </div>

          <p className="text-zinc-300">{movie.overview}</p>
        </div>
      </div>

      {/* ✅ CAST DIPISAH (lebih rapi) */}
      <div className="px-6 py-10">
        <h2 className="text-2xl font-semibold mb-6">Cast</h2>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {cast.slice(0, 10).map((actor) => {
            const img = actor.profile_path
              ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
              : "/no-image.png";

            return (
              <div
                key={actor.id}
                className="min-w-[140px] bg-zinc-900 rounded-lg overflow-hidden"
              >
                <img src={img} className="w-full h-[180px] object-cover" />

                <div className="p-2 text-sm">
                  <p className="font-semibold line-clamp-1">{actor.name}</p>
                  <p className="text-zinc-400 text-xs line-clamp-1">
                    {actor.character}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
