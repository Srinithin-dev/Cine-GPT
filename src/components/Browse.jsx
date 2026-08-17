import { useMemo } from "react";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { Search, Sparkles } from "lucide-react";

import { auth } from "../utils/firebase";
import usePlayingNowMovies from "../hooks/usePlayingNowMovies";
import Header from "./Header";
import VideoContainer from "./VideoContainer";
import MovieList from "./MovieList";

const SUGGESTIONS = [
  "Indian horror-comedy",
  "The one with the rotating hallway",
  "Slow-burn Korean thrillers",
  "Heist films with no violence",
  "Sci-fi that made me cry",
];

const Browse = () => {
  usePlayingNowMovies();

  const user = useSelector((state) => state.user);
  const nowPlaying = useSelector((state) => state.movie?.nowPlayingMovies);

  const movies = Array.isArray(nowPlaying) ? nowPlaying : [];

  const rows = useMemo(() => {
    const byRating = [...movies].sort(
      (a, b) => (b.vote_average ?? 0) - (a.vote_average ?? 0),
    );
    const byPopularity = [...movies].sort(
      (a, b) => (b.popularity ?? 0) - (a.popularity ?? 0),
    );

    return [
      {
        title: "Now playing",
        subtitle: "In theatres this week",
        movies: movies,
      },
      {
        title: "Top rated right now",
        subtitle: "Ranked by TMDB user score",
        movies: byRating,
      },
      {
        title: "Trending with viewers",
        subtitle: "Highest momentum today",
        movies: byPopularity,
      },
    ];
  }, [movies]);

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-zinc-100">
      <Header user={user} onSignOut={handleSignOut} />

      <VideoContainer />

      <div className="relative z-20 -mt-16 px-6">
        <div className="mx-auto max-w-3xl rounded-2xl bg-[#14141C]/85 p-5 shadow-2xl shadow-black/60 ring-1 ring-white/[0.08] backdrop-blur-xl sm:p-6">
          <div className="mb-4 flex items-center justify-center gap-1.5 text-[11.5px] text-zinc-400">
            <Sparkles size={11} className="text-indigo-400" />
            Describe a mood, a mashup, or a scene you half-remember
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-[#1C1C26] p-2 pl-4 ring-1 ring-white/[0.09] transition focus-within:ring-2 focus-within:ring-indigo-500">
            <Search size={17} className="shrink-0 text-zinc-500" />
            <input
              type="text"
              placeholder="e.g. an Indian horror-comedy that isn't actually scary"
              className="min-w-0 flex-1 bg-transparent py-2 text-[15px] text-zinc-100 outline-none placeholder:text-zinc-600"
            />
            <button
              type="button"
              className="shrink-0 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 text-[14px] font-medium text-white shadow-lg shadow-indigo-500/20 transition hover:brightness-110"
            >
              Search
            </button>
          </div>

          <div className="mt-3.5 flex flex-wrap justify-center gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                className="rounded-full bg-white/[0.04] px-3 py-1.5 text-[12.5px] text-zinc-400 ring-1 ring-white/[0.07] transition hover:bg-white/[0.08] hover:text-zinc-200"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl pb-20 pt-6">
        {rows.map((row) => (
          <MovieList
            key={row.title}
            title={row.title}
            subtitle={row.subtitle}
            movies={row.movies}
          />
        ))}
      </main>

      <footer className="border-t border-white/[0.06] py-8 text-center text-[12.5px] text-zinc-600">
        CineGPT — a learning project. Movie data by{" "}
        <span className="text-zinc-500">TMDB</span>.
      </footer>
    </div>
  );
};

export default Browse;
