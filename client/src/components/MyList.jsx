import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { Link } from "react-router";
import { Bookmark, ArrowRight, Star } from "lucide-react";

import { auth } from "../utils/firebase";
import { getLanguage, fill } from "../utils/languageConstants";
import Header from "./Header";
import MovieCard from "./MovieCard";

/* Sort is purely presentational — it reorders an array that's already in the
   store, so no fetching and no new state shape. Add options here freely. */
const SORTS = {
  recent: { labelKey: "sortRecent", compare: null }, // insertion order
  title: {
    labelKey: "sortTitle",
    compare: (a, b) =>
      (a.title || a.name || "").localeCompare(b.title || b.name || ""),
  },
  rating: {
    labelKey: "sortRating",
    compare: (a, b) => (b.vote_average ?? 0) - (a.vote_average ?? 0),
  },
  year: {
    labelKey: "sortYear",
    compare: (a, b) =>
      (b.release_date ?? "").localeCompare(a.release_date ?? ""),
  },
};

const Stat = ({ label, value }) => (
  <div className="min-w-[92px]">
    <p className="text-[11px] uppercase tracking-widest text-zinc-600">
      {label}
    </p>
    <p className="mt-1 text-[20px] font-semibold tracking-tight text-zinc-100">
      {value}
    </p>
  </div>
);

const MyList = () => {
  const language = useSelector((state) => state.lang.default);
  const t = getLanguage(language);

  const user = useSelector((state) => state.user);
  const raw = useSelector((state) => state.user?.movies);
  const movies = Array.isArray(raw) ? raw : [];

  const [sortKey, setSortKey] = useState("recent");

  const sorted = useMemo(() => {
    const { compare } = SORTS[sortKey];
    // Newest-first for insertion order, since new saves are pushed to the end.
    if (!compare) return [...movies].reverse();
    return [...movies].sort(compare);
  }, [movies, sortKey]);

  const stats = useMemo(() => {
    if (movies.length === 0) return null;

    const rated = movies.filter(
      (m) => typeof m.vote_average === "number" && m.vote_average > 0,
    );
    const avg =
      rated.length > 0
        ? (
            rated.reduce((sum, m) => sum + m.vote_average, 0) / rated.length
          ).toFixed(1)
        : null;

    const decades = new Set(
      movies
        .map((m) => Number.parseInt(m.release_date?.slice(0, 4) ?? "", 10))
        .filter(Number.isFinite)
        .map((year) => Math.floor(year / 10) * 10),
    );

    return { total: movies.length, avg, decades: decades.size };
  }, [movies]);

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-zinc-100">
      <Header user={user} onSignOut={handleSignOut} />

      <div className="cg-aurora relative overflow-hidden">
        <div className="cg-grid absolute inset-0 opacity-50" />

        <div className="relative mx-auto max-w-7xl px-6 pb-10 pt-12">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/[0.05] px-3 py-1 text-[11.5px] text-zinc-400 ring-1 ring-white/[0.08]">
                <Bookmark size={11} className="text-indigo-400" />
                {movies.length === 1
                  ? t.myList.countOne
                  : fill(t.myList.count, { n: movies.length })}
              </div>

              <h1 className="text-[30px] font-semibold leading-tight tracking-tight text-zinc-50 sm:text-[38px]">
                {t.myList.title}
              </h1>
              <p className="mt-2 max-w-md text-[14.5px] leading-relaxed text-zinc-400">
                {t.myList.subtitle}
              </p>
            </div>

            {stats && (
              <div className="flex gap-8 rounded-xl bg-white/[0.03] px-5 py-4 ring-1 ring-white/[0.07]">
                <Stat label={t.myList.statTitles} value={stats.total} />
                <Stat
                  label={t.myList.statAvgRating}
                  value={
                    stats.avg ? (
                      <span className="flex items-center gap-1.5">
                        <Star
                          size={15}
                          className="fill-amber-400 text-amber-400"
                        />
                        {stats.avg}
                      </span>
                    ) : (
                      "—"
                    )
                  }
                />
                <Stat label={t.myList.statDecades} value={stats.decades} />
              </div>
            )}
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 pb-24">
        {movies.length === 0 ? (
          /* ---------------- Empty state ---------------- */
          <div className="flex flex-col items-center py-24 text-center">
            <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 ring-1 ring-white/[0.08]">
              <Bookmark size={22} className="text-indigo-400" />
            </div>
            <h2 className="text-[19px] font-semibold tracking-tight text-zinc-100">
              {t.myList.emptyHeading}
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-[14px] leading-relaxed text-zinc-500">
              {t.myList.emptyBody}
            </p>
            <Link
              to="/browse"
              className="mt-7 flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-2.5 text-[14px] font-medium text-white shadow-lg shadow-indigo-500/20 transition hover:brightness-110"
            >
              {t.myList.emptyCta}
              <ArrowRight size={15} />
            </Link>
          </div>
        ) : (
          <>
            {/* Sort */}
            <div className="mb-6 flex flex-wrap items-center gap-2 border-b border-white/[0.06] pb-4">
              <span className="mr-1 text-[11px] uppercase tracking-widest text-zinc-600">
                {t.myList.sortLabel}
              </span>
              {Object.entries(SORTS).map(([key, { labelKey }]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSortKey(key)}
                  aria-pressed={sortKey === key}
                  className={[
                    "rounded-full px-3 py-1.5 text-[12.5px] transition",
                    sortKey === key
                      ? "bg-white/[0.1] text-zinc-100 ring-1 ring-white/20"
                      : "bg-white/[0.03] text-zinc-400 ring-1 ring-white/[0.06] hover:bg-white/[0.07] hover:text-zinc-200",
                  ].join(" ")}
                >
                  {t.myList[labelKey]}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {sorted.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  variant="grid"
                  from="watchlist"
                />
              ))}
            </div>
          </>
        )}
      </main>

      <footer className="border-t border-white/[0.06] py-8 text-center text-[12.5px] text-zinc-600">
        CineGPT — {t.footer.note} {t.footer.dataBy}
      </footer>
    </div>
  );
};

export default MyList;
