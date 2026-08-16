import { useSelector } from "react-redux";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import { Search, Sparkles, Play, Plus, Star, ArrowRight } from "lucide-react";
import Header from "./Header";
import { useDebugValue, useEffect } from "react";
import { addMoviesList } from "../store/movieSlice";
import usePlayingNowMovies from "../hooks/usePlayingNowMovies";
import VideoContainer from "./VideoContainer";

const SUGGESTIONS = [
  "Indian horror-comedy",
  "The one with the rotating hallway",
  "Slow-burn Korean thrillers",
  "Heist films with no violence",
  "Sci-fi that made me cry",
];

const ROWS = [
  {
    title: "Because you searched “Indian horror-comedy”",
    subtitle: "Semantic matches, ranked by vibe",
    items: [
      {
        title: "Stree",
        year: 2018,
        rating: 7.5,
        from: "#7C3AED",
        to: "#DB2777",
      },
      {
        title: "Bhool Bhulaiyaa",
        year: 2007,
        rating: 7.4,
        from: "#4F46E5",
        to: "#0EA5E9",
      },
      {
        title: "Go Goa Gone",
        year: 2013,
        rating: 6.7,
        from: "#059669",
        to: "#84CC16",
      },
      {
        title: "Roohi",
        year: 2021,
        rating: 4.8,
        from: "#B91C1C",
        to: "#F59E0B",
      },
      {
        title: "Munjya",
        year: 2024,
        rating: 7.0,
        from: "#6D28D9",
        to: "#2563EB",
      },
      {
        title: "Bhediya",
        year: 2022,
        rating: 7.0,
        from: "#0F766E",
        to: "#65A30D",
      },
    ],
  },
  {
    title: "Scene-level matches",
    subtitle: "Found by description, not by title",
    items: [
      {
        title: "Inception",
        year: 2010,
        rating: 8.8,
        from: "#1E3A8A",
        to: "#0891B2",
      },
      {
        title: "Oldboy",
        year: 2003,
        rating: 8.3,
        from: "#7F1D1D",
        to: "#9A3412",
      },
      {
        title: "Parasite",
        year: 2019,
        rating: 8.5,
        from: "#166534",
        to: "#0F766E",
      },
      {
        title: "Arrival",
        year: 2016,
        rating: 7.9,
        from: "#334155",
        to: "#0369A1",
      },
      {
        title: "Whiplash",
        year: 2014,
        rating: 8.5,
        from: "#78350F",
        to: "#CA8A04",
      },
      {
        title: "Drive",
        year: 2011,
        rating: 7.8,
        from: "#831843",
        to: "#4C1D95",
      },
    ],
  },
  {
    title: "Continue watching",
    subtitle: null,
    items: [
      {
        title: "Dark",
        year: 2017,
        rating: 8.7,
        from: "#0C0A09",
        to: "#3730A3",
        progress: 62,
      },
      {
        title: "Sacred Games",
        year: 2018,
        rating: 8.5,
        from: "#3F1D38",
        to: "#9D174D",
        progress: 24,
      },
      {
        title: "Squid Game",
        year: 2021,
        rating: 8.0,
        from: "#BE123C",
        to: "#0D9488",
        progress: 88,
      },
      {
        title: "Mindhunter",
        year: 2017,
        rating: 8.6,
        from: "#1C1917",
        to: "#334155",
        progress: 41,
      },
      {
        title: "Paatal Lok",
        year: 2020,
        rating: 7.9,
        from: "#422006",
        to: "#78350F",
        progress: 15,
      },
      {
        title: "Severance",
        year: 2022,
        rating: 8.7,
        from: "#075985",
        to: "#164E63",
        progress: 55,
      },
    ],
  },
];

const Poster = ({ item }) => (
  <div className="group relative w-[150px] shrink-0 sm:w-[170px]">
    <div
      className="relative aspect-[2/3] overflow-hidden rounded-xl ring-1 ring-white/[0.08] transition duration-300 group-hover:ring-white/25"
      style={{
        backgroundImage: `linear-gradient(145deg, ${item.from}, ${item.to})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

      {/* Hover actions */}
      <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition duration-300 group-hover:opacity-100">
        <button className="grid h-10 w-10 place-items-center rounded-full bg-white text-black shadow-lg">
          <Play size={16} fill="currentColor" />
        </button>
        <button className="grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white ring-1 ring-white/25 backdrop-blur">
          <Plus size={16} />
        </button>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-3">
        <p className="truncate text-[13px] font-medium text-white">
          {item.title}
        </p>
        <div className="mt-0.5 flex items-center gap-2 text-[11px] text-zinc-400">
          <span>{item.year}</span>
          <span className="flex items-center gap-0.5">
            <Star size={9} className="fill-amber-400 text-amber-400" />
            {item.rating}
          </span>
        </div>
      </div>

      {typeof item.progress === "number" && (
        <div className="absolute inset-x-3 bottom-[52px] h-[3px] rounded-full bg-white/20">
          <div
            className="h-full rounded-full bg-indigo-400"
            style={{ width: `${item.progress}%` }}
          />
        </div>
      )}
    </div>
  </div>
);

const Row = ({ row }) => (
  <section className="mt-10">
    <div className="mb-3.5 flex items-end justify-between gap-4 px-6">
      <div>
        <h3 className="text-[15px] font-semibold tracking-tight text-zinc-100">
          {row.title}
        </h3>
        {row.subtitle && (
          <p className="mt-0.5 text-[12.5px] text-zinc-500">{row.subtitle}</p>
        )}
      </div>
      <button className="flex shrink-0 items-center gap-1 text-[12.5px] text-zinc-500 transition hover:text-zinc-200">
        See all <ArrowRight size={13} />
      </button>
    </div>

    <div className="cg-scroll-x flex gap-3.5 overflow-x-auto px-6 pb-2">
      {row.items.map((item) => (
        <Poster key={item.title} item={item} />
      ))}
    </div>
  </section>
);

const Browse = () => {
  usePlayingNowMovies();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-zinc-100">
      <Header user={user} onSignOut={handleSignOut} />
      <VideoContainer />
      <div className="cg-aurora relative overflow-hidden">
        <div className="cg-grid absolute inset-0 opacity-60" />

        <div className="relative mx-auto max-w-3xl px-6 pb-12 pt-16 text-center sm:pt-20">
          <div className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-white/[0.05] px-3 py-1 text-[11.5px] text-zinc-400 ring-1 ring-white/[0.08]">
            <Sparkles size={11} className="text-indigo-400" />
            Semantic search over 900k+ titles
          </div>

          <h1 className="text-[34px] font-semibold leading-tight tracking-tight text-zinc-50 sm:text-[42px]">
            What are you in the mood for
            {user?.displayName ? `, ${user.displayName.split(" ")[0]}` : ""}?
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-zinc-400">
            Describe a genre mashup, a mood, or a scene you half-remember.
          </p>

          {/* Search bar */}
          <div className="mt-8">
            <div className="flex items-center gap-2 rounded-xl bg-[#14141C] p-2 pl-4 ring-1 ring-white/[0.09] transition focus-within:ring-2 focus-within:ring-indigo-500">
              <Search size={17} className="shrink-0 text-zinc-500" />
              <input
                type="text"
                placeholder="e.g. an Indian horror-comedy that isn't scary"
                className="min-w-0 flex-1 bg-transparent py-2 text-[15px] text-zinc-100 outline-none placeholder:text-zinc-600"
              />
              <button className="shrink-0 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 text-[14px] font-medium text-white shadow-lg shadow-indigo-500/20 transition hover:brightness-110">
                Search
              </button>
            </div>

            <div className="mt-3.5 flex flex-wrap justify-center gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  className="rounded-full bg-white/[0.04] px-3 py-1.5 text-[12.5px] text-zinc-400 ring-1 ring-white/[0.07] transition hover:bg-white/[0.08] hover:text-zinc-200"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl pb-20">
        {ROWS.map((row) => (
          <Row key={row.title} row={row} />
        ))}
      </main>

      <footer className="border-t border-white/[0.06] py-8 text-center text-[12.5px] text-zinc-600">
        CineGPT — a learning project. Movie data is placeholder content.
      </footer>
    </div>
  );
};

export default Browse;
