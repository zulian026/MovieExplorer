import { useRef } from "react";
import type { Genre } from "../types/movie";

interface Props {
  genre: string;
  setGenre: (v: string) => void;
  sort: string;
  setSort: (v: string) => void;
  genres: Genre[];
}

export default function FilterBar({
  genre,
  setGenre,
  sort,
  setSort,
  genres,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // drag state pakai ref biar stabil
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDown.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
  };

  const handleMouseUp = () => {
    isDown.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !scrollRef.current) return;

    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const sortOptions = [
    { label: "Popular", value: "popularity.desc" },
    { label: "Top Rated", value: "vote_average.desc" },
    { label: "Newest", value: "release_date.desc" },
  ];

  return (
    <div className="mb-8 space-y-6">
      {/* GENRE */}
      <div>
        <h3 className="text-sm text-zinc-400 mb-3">Genre</h3>

        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 cursor-grab active:cursor-grabbing select-none"
        >
          {/* All */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setGenre("");
            }}
            className={`px-4 py-2 rounded-full text-sm border transition whitespace-nowrap ${
              genre === ""
                ? "bg-red-500 border-red-500 text-white"
                : "bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            }`}
          >
            All
          </button>

          {/* Dynamic genres */}
          {genres.map((g) => (
            <button
              key={g.id}
              onClick={(e) => {
                e.stopPropagation();
                setGenre(String(g.id));
              }}
              className={`px-4 py-2 rounded-full text-sm border transition whitespace-nowrap ${
                genre === String(g.id)
                  ? "bg-red-500 border-red-500 text-white"
                  : "bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              }`}
            >
              {g.name}
            </button>
          ))}
        </div>
      </div>

      {/* SORT */}
      <div>
        <h3 className="text-sm text-zinc-400 mb-3">Sort By</h3>

        <div className="flex gap-2 flex-wrap">
          {sortOptions.map((s) => (
            <button
              key={s.value}
              onClick={() => setSort(s.value)}
              className={`px-4 py-2 rounded-full text-sm border transition ${
                sort === s.value
                  ? "bg-white text-black border-white"
                  : "bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* RESET */}
      {(genre || sort) && (
        <button
          onClick={() => {
            setGenre("");
            setSort("");
          }}
          className="text-sm text-red-400 hover:text-red-300 transition"
        >
          Reset Filters
        </button>
      )}
    </div>
  );
}
