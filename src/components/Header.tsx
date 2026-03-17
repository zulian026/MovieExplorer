import { useState } from "react";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { Menu, X } from "lucide-react";

export default function Header() {
  const active = useScrollSpy(["trending", "popular", "topRated"]);
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-black/70 backdrop-blur border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* LOGO */}
        <h1
          className="text-xl font-bold text-red-500 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          MovieExplorer
        </h1>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-6 text-sm">
          <NavItem id="trending" label="Trending" active={active} />
          <NavItem id="popular" label="Popular" active={active} />
          <NavItem id="topRated" label="Top Rated" active={active} />
        </nav>

        {/* MOBILE BUTTON */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-white">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-black border-t border-zinc-800 px-6 py-4 space-y-4">
          <MobileItem
            id="trending"
            label="Trending"
            active={active}
            onClick={() => setOpen(false)}
          />
          <MobileItem
            id="popular"
            label="Popular"
            active={active}
            onClick={() => setOpen(false)}
          />
          <MobileItem
            id="topRated"
            label="Top Rated"
            active={active}
            onClick={() => setOpen(false)}
          />
        </div>
      )}
    </header>
  );
}

// 🔹 Desktop Nav Item
function NavItem({
  id,
  label,
  active,
}: {
  id: string;
  label: string;
  active: string;
}) {
  return (
    <a href={`#${id}`} className="relative pb-1">
      <span
        className={`transition ${
          active === id ? "text-white" : "text-zinc-400"
        }`}
      >
        {label}
      </span>

      {active === id && (
        <span className="absolute left-0 bottom-0 w-full h-[2px] bg-red-500" />
      )}
    </a>
  );
}

// 🔹 Mobile Nav Item
function MobileItem({
  id,
  label,
  active,
  onClick,
}: {
  id: string;
  label: string;
  active: string;
  onClick: () => void;
}) {
  return (
    <a
      href={`#${id}`}
      onClick={onClick}
      className={`block text-lg ${
        active === id ? "text-white" : "text-zinc-400"
      }`}
    >
      {label}
    </a>
  );
}
