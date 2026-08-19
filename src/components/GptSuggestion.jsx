import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Sparkles, SearchX } from "lucide-react";
import MovieCard from "./MovieCard";
import { getLanguage, fill } from "../utils/languageConstants";

const GptSuggestion = () => {
  const language = useSelector((state) => state.lang.default);
  const t = getLanguage(language);

  const { movieResults, movieName } = useSelector(
    (state) => state.gpt.addGptMovieResult,
  );

  const { found, missing } = useMemo(() => {
    if (!Array.isArray(movieResults)) return { found: [], missing: [] };

    const titles = Array.isArray(movieName) ? movieName : [];
    const seen = new Set();
    const foundList = [];
    const missingList = [];

    movieResults.forEach((matches, index) => {
      const suggestedTitle = titles[index] ?? "";
      const best = Array.isArray(matches) ? matches[0] : null;

      if (!best) {
        if (suggestedTitle) missingList.push(suggestedTitle);
        return;
      }
      if (seen.has(best.id)) return;
      seen.add(best.id);

      foundList.push({ movie: best, suggestedTitle });
    });

    return { found: foundList, missing: missingList };
  }, [movieResults, movieName]);

  if (!movieResults) {
    return (
      <section className="mx-auto max-w-2xl px-6 py-20 text-center">
        <div className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 ring-1 ring-white/[0.08]">
          <Sparkles size={20} className="text-indigo-400" />
        </div>
        <h2 className="text-[19px] font-semibold tracking-tight text-zinc-100">
          {t.gpt.emptyHeading}
        </h2>
        <p className="mx-auto mt-2 max-w-md text-[14px] leading-relaxed text-zinc-500">
          {t.gpt.emptyBody}
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 pb-16 pt-10">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-white/[0.06] pb-4">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-widest text-indigo-300">
            <Sparkles size={11} />
            {t.gpt.suggestedBy}
          </div>
          <h2 className="mt-1.5 text-[19px] font-semibold tracking-tight text-zinc-100">
            {fill(t.gpt.resultsCount, { n: found.length })}
          </h2>
        </div>
      </div>

      {found.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {found.map(({ movie, suggestedTitle }) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              variant="grid"
              badge={t.gpt.aiPick}
              caption={
                suggestedTitle &&
                suggestedTitle.toLowerCase() !==
                  (movie.title ?? "").toLowerCase()
                  ? suggestedTitle
                  : undefined
              }
            />
          ))}
        </div>
      ) : (
        <div className="py-14 text-center">
          <SearchX size={22} className="mx-auto mb-3 text-zinc-600" />
          <p className="text-[14px] text-zinc-500">{t.gpt.noMatchHelp}</p>
        </div>
      )}

      {missing.length > 0 && (
        <div className="mt-12 rounded-xl bg-white/[0.02] p-5 ring-1 ring-white/[0.06]">
          <h3 className="text-[13px] font-medium text-zinc-300">
            {t.gpt.noMatchHeading}
          </h3>
          <p className="mt-1 text-[12.5px] leading-relaxed text-zinc-500">
            {t.gpt.noMatchHelp}
          </p>
          <div className="mt-3.5 flex flex-wrap gap-2">
            {missing.map((title) => (
              <span
                key={title}
                className="rounded-full bg-white/[0.04] px-2.5 py-1 text-[12px] text-zinc-400 ring-1 ring-white/[0.07]"
              >
                {title}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default GptSuggestion;
