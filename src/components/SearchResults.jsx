import { useMemo } from "react";
import { useSelector } from "react-redux";
import { SearchX, Search } from "lucide-react";
import MovieCard from "./MovieCard";
import { getLanguage, fill } from "../utils/languageConstants";

const TOP_MATCH_COUNT = 6;

const Grid = ({ children }) => (
  <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
    {children}
  </div>
);

const Section = ({ title, subtitle, children }) => (
  <section className="mt-10 first:mt-0">
    <div className="mb-4 border-b border-white/[0.06] pb-3">
      <h3 className="text-[15px] font-semibold tracking-tight text-zinc-100">
        {title}
      </h3>
      {subtitle && (
        <p className="mt-0.5 text-[12.5px] text-zinc-500">{subtitle}</p>
      )}
    </div>
    <Grid>{children}</Grid>
  </section>
);

const SearchResults = () => {
  const language = useSelector((state) => state.lang.default);
  const t = getLanguage(language);

  const raw = useSelector((state) => state.movie?.searchResults);
  const results = Array.isArray(raw) ? raw : [];

  const { topMatches, decades, undated } = useMemo(() => {
    const top = results.slice(0, TOP_MATCH_COUNT);
    const rest = results.slice(TOP_MATCH_COUNT);

    const buckets = new Map();
    const noDate = [];

    rest.forEach((movie) => {
      const year = Number.parseInt(movie.release_date?.slice(0, 4) ?? "", 10);
      if (!Number.isFinite(year)) {
        noDate.push(movie);
        return;
      }
      const decade = Math.floor(year / 10) * 10;
      if (!buckets.has(decade)) buckets.set(decade, []);
      buckets.get(decade).push(movie);
    });

    return {
      topMatches: top,
      decades: [...buckets.entries()].sort((a, b) => b[0] - a[0]),
      undated: noDate,
    };
  }, [results]);

  if (results.length === 0) {
    return (
      <section className="mx-auto max-w-xl px-6 py-24 text-center">
        <SearchX size={24} className="mx-auto mb-4 text-zinc-600" />
        <h2 className="text-[19px] font-semibold tracking-tight text-zinc-100">
          {t.search.noResultsHeading}
        </h2>
        <p className="mx-auto mt-2 text-[14px] leading-relaxed text-zinc-500">
          {t.search.noResultsBody}
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 pb-20 pt-8">
      {/* Result meta — deliberately plain, no AI framing. This is the keyword
          search; the indigo/Sparkles treatment belongs to GPT results only. */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3 border-b border-white/[0.08] pb-4">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-widest text-zinc-500">
            <Search size={11} />
            {t.search.label}
          </div>
          <h2 className="mt-1.5 text-[19px] font-semibold tracking-tight text-zinc-100">
            {fill(t.search.resultsCount, { n: results.length })}
          </h2>
        </div>
      </div>

      <Section title={t.search.topMatches} subtitle={t.search.topMatchesSub}>
        {topMatches.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            variant="grid"
            from="search"
          />
        ))}
      </Section>

      {decades.map(([decade, movies]) => (
        <Section
          key={decade}
          title={fill(t.search.decade, { decade })}
          subtitle={fill(t.search.decadeSub, {
            decade,
            decadeEnd: decade + 9,
          })}
        >
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              variant="grid"
              from="search"
            />
          ))}
        </Section>
      ))}

      {undated.length > 0 && (
        <Section title={t.search.undated} subtitle={t.search.undatedSub}>
          {undated.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              variant="grid"
              from="search"
            />
          ))}
        </Section>
      )}
    </section>
  );
};

export default SearchResults;
