import { Play, Plus, Star } from "lucide-react";
import { IMG_CDN_URL } from "../utils/constants";

/**
 * A single TMDB poster tile.
 * Falls back to a deterministic gradient when `poster_path` is missing.
 */
const MovieCard = ({ movie }) => {
  if (!movie) return null;

  const {
    title,
    name,
    poster_path: posterPath,
    vote_average: voteAverage,
    release_date: releaseDate,
  } = movie;

  const displayTitle = title || name || "Untitled";
  const year = releaseDate ? releaseDate.slice(0, 4) : null;
  const rating =
    typeof voteAverage === "number" && voteAverage > 0
      ? voteAverage.toFixed(1)
      : null;

  // Stable per-title hue so the fallback isn't a flat grey block.
  const hue = displayTitle.charCodeAt(0) * 7 % 360;

  return (
    <div className="group relative w-[142px] shrink-0 sm:w-[168px]">
      <div
        className="relative aspect-[2/3] overflow-hidden rounded-xl bg-[#14141C] ring-1 ring-white/[0.08] transition duration-300 group-hover:-translate-y-1 group-hover:ring-white/25"
        style={
          posterPath
            ? undefined
            : {
                backgroundImage: `linear-gradient(145deg, hsl(${hue} 55% 28%), hsl(${(hue + 60) % 360} 55% 18%))`,
              }
        }
      >
        {posterPath && (
          <img
            src={IMG_CDN_URL + posterPath}
            alt={displayTitle}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        )}

        {/* Hover scrim + actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition duration-300 group-hover:opacity-100">
          <button
            type="button"
            aria-label={`Play ${displayTitle}`}
            className="grid h-10 w-10 place-items-center rounded-full bg-white text-black shadow-lg"
          >
            <Play size={15} fill="currentColor" />
          </button>
          <button
            type="button"
            aria-label={`Add ${displayTitle} to My List`}
            className="grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white ring-1 ring-white/25 backdrop-blur"
          >
            <Plus size={15} />
          </button>
        </div>

        {/* Meta — always visible on the poster foot */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-2.5 pt-8">
          <p className="truncate text-[12.5px] font-medium text-white">
            {displayTitle}
          </p>
          <div className="mt-0.5 flex items-center gap-2 text-[10.5px] text-zinc-400">
            {year && <span>{year}</span>}
            {rating && (
              <span className="flex items-center gap-0.5">
                <Star size={9} className="fill-amber-400 text-amber-400" />
                {rating}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
