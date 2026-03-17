import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Header from "../components/Header";
import HeroSlider from "../components/HeroSlider";
import FilterBar from "../components/FilterBar";
import { fetchGenres } from "../services/tmdb";
import type { Genre } from "../types/movie";

import {
  fetchTrending,
  fetchPopular,
  fetchTopRated,
  fetchSearchMovies,
  fetchDiscoverMovies,
} from "../services/tmdb";

import MovieCard from "../components/MovieCard";
import MovieSkeleton from "../components/MovieSkeleton";
import type { Movie } from "../types/movie";

export default function Home() {
  const [query, setQuery] = useState("");

  // ✅ FILTER STATE
  const [genre, setGenre] = useState("");
  const [sort, setSort] = useState("");

  // 🔥 MAIN DATA
  const { data: trending = [], isLoading: trendingLoading } = useQuery({
    queryKey: ["trending"],
    queryFn: fetchTrending,
  });

  const { data: popular = [], isLoading: popularLoading } = useQuery({
    queryKey: ["popular"],
    queryFn: fetchPopular,
  });

  const { data: topRated = [], isLoading: topRatedLoading } = useQuery({
    queryKey: ["topRated"],
    queryFn: fetchTopRated,
  });

  // 🔍 SEARCH
  const { data: searchResults = [], isLoading: searchLoading } = useQuery({
    queryKey: ["search", query],
    queryFn: () => fetchSearchMovies(query),
    enabled: query.length > 0,
  });

  // 🎯 FILTER QUERY
  const { data: discover = [], isLoading: discoverLoading } = useQuery({
    queryKey: ["discover", genre, sort],
    queryFn: () => fetchDiscoverMovies({ genre, sort }),
    enabled: !!genre || !!sort,
  });

  const { data: genres = [] } = useQuery<Genre[]>({
    queryKey: ["genres"],
    queryFn: fetchGenres,
  });

  const heroMovies = trending.slice(0, 5);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <HeroSlider movies={heroMovies} />

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* SEARCH */}
        <div className="max-w-xl mb-6">
          <input
            className="w-full px-4 py-3 rounded bg-zinc-900 border border-zinc-700 outline-none focus:border-red-500"
            placeholder="Search movie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* FILTER */}
        <FilterBar
          genre={genre}
          setGenre={setGenre}
          sort={sort}
          setSort={setSort}
          genres={genres}
        />

        {/* 🔥 PRIORITY RENDER */}
        {query ? (
          <Section
            id="search"
            title="Search Results"
            movies={searchResults}
            isLoading={searchLoading}
          />
        ) : genre || sort ? (
          <Section
            id="discover"
            title="Filtered Movies"
            movies={discover}
            isLoading={discoverLoading}
          />
        ) : (
          <>
            <Section
              id="trending"
              title="Trending Movies"
              movies={trending}
              isLoading={trendingLoading}
            />

            <Section
              id="popular"
              title="Popular Movies"
              movies={popular}
              isLoading={popularLoading}
            />

            <Section
              id="topRated"
              title="Top Rated Movies"
              movies={topRated}
              isLoading={topRatedLoading}
            />
          </>
        )}
      </div>
    </div>
  );
}

function Section({
  title,
  movies,
  isLoading,
  id,
}: {
  title: string;
  movies: Movie[];
  isLoading?: boolean;
  id: string;
}) {
  return (
    <div id={id} className="mb-12 scroll-mt-24">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {isLoading
          ? Array.from({ length: 12 }).map((_, i) => <MovieSkeleton key={i} />)
          : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
}
