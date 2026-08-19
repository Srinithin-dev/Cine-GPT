import { useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { Search, Sparkles } from "lucide-react";

import { auth } from "../utils/firebase";
import usePlayingNowMovies from "../hooks/usePlayingNowMovies";
import { getLanguage } from "../utils/languageConstants";

import Header from "./Header";
import VideoContainer from "./VideoContainer";
import MovieList from "./MovieList";
import GptView from "./GptView";

const Browse = () => {
  usePlayingNowMovies();

  const language = useSelector((state) => state.lang.default);
  const t = getLanguage(language);

  const user = useSelector((state) => state.user);
  const nowPlaying = useSelector((state) => state.movie?.nowPlayingMovies);
  const nonGptResults = useSelector((state) => state.movie?.searchResults);
  const movies = Array.isArray(
    nonGptResults.length ? nonGptResults : nowPlaying,
  )
    ? nonGptResults.length
      ? nonGptResults
      : nowPlaying
    : [];

  const ref = useRef(null);

  const [isGptMode, setIsGptMode] = useState(false);

  const rows = useMemo(() => {
    const byRating = [...movies].sort(
      (a, b) => (b.vote_average ?? 0) - (a.vote_average ?? 0),
    );
    const byPopularity = [...movies].sort(
      (a, b) => (b.popularity ?? 0) - (a.popularity ?? 0),
    );
    return [
      { title: t.rows.nowPlaying, subtitle: t.rows.nowPlayingSub, movies },
      {
        title: t.rows.topRated,
        subtitle: t.rows.topRatedSub,
        movies: byRating,
      },
      {
        title: t.rows.trending,
        subtitle: t.rows.trendingSub,
        movies: byPopularity,
      },
    ];
  }, [movies, t]);

  const handleSignOut = () => {
    signOut(auth);
  };

  const handleClickSuggestion = (value) => {
    ref.current.value = value;
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-zinc-100">
      <Header
        user={user}
        onSignOut={handleSignOut}
        isGptMode={isGptMode}
        onToggleGptMode={() => setIsGptMode((prev) => !prev)}
      />

      {isGptMode ? (
        /* ================= GPT search view ================= */
        <GptView t={t} handleClickSuggestion={handleClickSuggestion} />
      ) : (
        /* ================= Normal browse view ================= */
        <>
          <VideoContainer />

          <main className="mx-auto max-w-7xl pb-20 pt-4">
            {rows.map((row) => (
              <MovieList
                key={row.title}
                title={row.title}
                subtitle={row.subtitle}
                movies={row.movies}
              />
            ))}
          </main>
        </>
      )}

      <footer className="border-t border-white/[0.06] py-8 text-center text-[12.5px] text-zinc-600">
        CineGPT — {t.footer.note} {t.footer.dataBy}
      </footer>
    </div>
  );
};

export default Browse;
