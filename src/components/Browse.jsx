import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";

import { auth } from "../utils/firebase";
import usePlayingNowMovies from "../hooks/usePlayingNowMovies";
import { getLanguage } from "../utils/languageConstants";

import Header from "./Header";
import VideoContainer from "./VideoContainer";
import MovieList from "./MovieList";
import GptView from "./GptView";
import SearchResults from "./SearchResults";

const ROW_SIZE = 8;

const Browse = () => {
  usePlayingNowMovies();

  const language = useSelector((state) => state.lang.default);
  const t = getLanguage(language);

  const user = useSelector((state) => state.user);

  const nowPlayingRaw = useSelector((state) => state.movie?.nowPlayingMovies);
  const searchRaw = useSelector((state) => state.movie?.searchResults);

  const nowPlaying = Array.isArray(nowPlayingRaw) ? nowPlayingRaw : [];
  const hasSearch = Array.isArray(searchRaw) && searchRaw.length > 0;

  const [isGptMode, setIsGptMode] = useState(false);

  const rows = useMemo(() => {
    const remaining = [...nowPlaying];

    const take = (comparator, count) => {
      console.log(comparator, remaining, "comparator");
      remaining.sort(comparator);
      console.log(remaining, "remainingcomparator");

      return remaining.splice(0, count);
    };

    const topRated = take(
      (a, b) => (b.vote_average ?? 0) - (a.vote_average ?? 0),
      ROW_SIZE,
    );
    const trending = take(
      (a, b) => (b.popularity ?? 0) - (a.popularity ?? 0),
      ROW_SIZE,
    );

    return [
      {
        title: t.rows.topRated,
        subtitle: t.rows.topRatedSub,
        movies: topRated,
      },
      {
        title: t.rows.trending,
        subtitle: t.rows.trendingSub,
        movies: trending,
      },
      {
        title: t.rows.nowPlaying,
        subtitle: t.rows.nowPlayingSub,
        movies: remaining,
      },
    ].filter((row) => row.movies.length > 0);
  }, [nowPlaying, t]);

  const handleSignOut = () => {
    signOut(auth);
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
        /* ============ GPT search ============ */
        <GptView t={t} />
      ) : hasSearch ? (
        /* ============ Keyword search results ============ */
        <SearchResults />
      ) : (
        /* ============ Default browse ============ */
        <>
          <VideoContainer />
          <main className="mx-auto max-w-7xl pb-20 pt-4">
            {rows.length > 0 ? (
              rows.map((row) => (
                <MovieList
                  key={row.title}
                  title={row.title}
                  subtitle={row.subtitle}
                  movies={row.movies}
                />
              ))
            ) : (
              /* Shimmer */
              <MovieList
                title={t.rows.topRated}
                subtitle={t.rows.topRatedSub}
                movies={[]}
              />
            )}
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
