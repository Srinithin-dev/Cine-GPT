import { Star } from "lucide-react";
import { useSelector } from "react-redux";
import { getLanguage } from "../utils/languageConstants";

/**
 * Text overlay for the hero trailer.
 * No Play / More info CTAs — there's no player or detail page behind them yet,
 * and a button that does nothing is worse than no button.
 */
const VideoTitle = ({ movie }) => {
  const language = useSelector((state) => state.lang.default);
  const t = getLanguage(language);

  if (!movie) return null;

  const {
    title,
    name,
    overview,
    vote_average: voteAverage,
    release_date: releaseDate,
  } = movie;

  const displayTitle = title || name || "";
  const year = releaseDate ? releaseDate.slice(0, 4) : null;
  const rating =
    typeof voteAverage === "number" && voteAverage > 0
      ? voteAverage.toFixed(1)
      : null;

  return (
    <div className="max-w-xl">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/15 px-2.5 py-1 text-[11px] font-medium uppercase tracking-widest text-indigo-300 ring-1 ring-indigo-400/25">
        {t.hero.featured}
      </span>

      <h1 className="mt-4 text-3xl font-semibold leading-[1.08] tracking-tight text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)] sm:text-5xl">
        {displayTitle}
      </h1>

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-zinc-300">
        {rating && (
          <span className="flex items-center gap-1">
            <Star size={12} className="fill-amber-400 text-amber-400" />
            {rating}
          </span>
        )}
        {year && (
          <>
            <span className="h-1 w-1 rounded-full bg-zinc-600" />
            <span>{year}</span>
          </>
        )}
        <span className="h-1 w-1 rounded-full bg-zinc-600" />
        <span className="rounded border border-white/25 px-1.5 py-px text-[10px] tracking-wide">
          HD
        </span>
      </div>

      {overview && (
        <p className="mt-4 line-clamp-3 max-w-lg text-[14px] leading-relaxed text-zinc-300/90 drop-shadow-[0_1px_10px_rgba(0,0,0,0.8)] sm:text-[15px]">
          {overview}
        </p>
      )}
    </div>
  );
};

export default VideoTitle;
