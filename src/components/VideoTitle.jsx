import { Play, Info, Star } from "lucide-react";

/**
 * Text + CTA overlay that sits on top of the hero trailer.
 * Purely presentational — feed it a TMDB movie object.
 */
const VideoTitle = ({ movie }) => {
  if (!movie) return null;

  const {
    title,
    name,
    overview,
    vote_average: voteAverage,
    release_date: releaseDate,
  } = movie;

  const displayTitle = title || name || "Untitled";
  const year = releaseDate ? releaseDate.slice(0, 4) : null;
  const rating =
    typeof voteAverage === "number" ? voteAverage.toFixed(1) : null;

  return (
    <div className="max-w-xl">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/15 px-2.5 py-1 text-[11px] font-medium uppercase tracking-widest text-indigo-300 ring-1 ring-indigo-400/25">
        Featured today
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

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg bg-white px-6 py-2.5 text-[15px] font-semibold text-black shadow-lg transition hover:bg-zinc-200"
        >
          <Play size={17} fill="currentColor" />
          Play
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg bg-white/10 px-5 py-2.5 text-[15px] font-medium text-white ring-1 ring-white/20 backdrop-blur-md transition hover:bg-white/20"
        >
          <Info size={17} />
          More info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
