import { useScrollSpy } from "../hooks/useScrollSpy";

export default function Header() {
  const active = useScrollSpy(["trending", "popular", "topRated"]);

  const linkClass = (id: string) =>
    `relative pb-1 transition ${
      active === id ? "text-white" : "text-zinc-400"
    }`;

  return (
    <header className="fixed top-0 w-full z-50 bg-black/70 backdrop-blur border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-red-500 cursor-pointer">
          MovieExplorer
        </h1>

        <nav className="flex gap-6 text-sm">
          <a href="#trending" className={linkClass("trending")}>
            Trending
            {active === "trending" && (
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-red-500" />
            )}
          </a>

          <a href="#popular" className={linkClass("popular")}>
            Popular
            {active === "popular" && (
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-red-500" />
            )}
          </a>

          <a href="#topRated" className={linkClass("topRated")}>
            Top Rated
            {active === "topRated" && (
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-red-500" />
            )}
          </a>
        </nav>
      </div>
    </header>
  );
}
