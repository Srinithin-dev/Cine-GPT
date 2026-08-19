import { Star, Sparkles, ImageOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { IMG_CDN_URL, OPTIONS } from "../utils/constants";
import { getLanguage } from "../utils/languageConstants";
import { useEffect, useState } from "react";

/**
 * A single TMDB poster tile.
 *
 * @param {object}  movie
 * @param {"row"|"grid"} [variant="row"]  row = fixed width for a scroller,
 *                                        grid = fills its grid cell
 * @param {string}  [badge]   small pill in the top-left (e.g. "AI pick")
 * @param {string}  [caption] muted line under the poster (e.g. the Gemini title)
 */
const MovieCard = ({ movie, variant = "row", badge, caption }) => {
  const language = useSelector((state) => state.lang.default);
  const [ott, setOtt] = useState({});

  const t = getLanguage(language);
  if (!movie) return null;
  const {
    id,
    title,
    name,
    overview,
    poster_path: posterPath,
    vote_average: voteAverage,
    release_date: releaseDate,
  } = movie;

  const displayTitle = title || name || "";
  const year = releaseDate ? releaseDate.slice(0, 4) : null;
  const rating =
    typeof voteAverage === "number" && voteAverage > 0
      ? voteAverage.toFixed(1)
      : null;

  const width =
    variant === "grid" ? "w-full" : "w-[142px] shrink-0 sm:w-[168px]";

  // useEffect(() => {
  //   const getMovieProviderUrl = `https://api.themoviedb.org/3/movie/${id}/watch/providers`;
  //   async function getProviders() {
  //     const response = await fetch(getMovieProviderUrl, OPTIONS);
  //     const json = await response.json();

  //     const providers = [...(json.results?.IN?.flatrate || [])];
  //     const uniqueProviders = providers.filter((list, index, self) => {
  //       return (
  //         index ===
  //         self.findIndex((item) => item.provider_id === list.provider_id)
  //       );
  //     });
  //     setOtt({ [id]: uniqueProviders });
  //   }
  //   getProviders();
  // }, []);
  return (
    <div className={`group relative ${width}`}>
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-[#14141C] ring-1 ring-white/[0.08] transition duration-300 group-hover:-translate-y-1 group-hover:ring-white/25">
        {posterPath ? (
          <img
            src={IMG_CDN_URL + posterPath}
            alt={displayTitle}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[#1C1C26] px-3 text-center">
            <ImageOff size={18} className="text-zinc-600" />
            <span className="text-[11px] leading-snug text-zinc-500">
              {displayTitle}
            </span>
          </div>
        )}

        {badge && (
          <span className="absolute left-2 top-2 z-10 inline-flex items-center gap-1 rounded-md bg-indigo-500/90 px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-wide text-white shadow-lg backdrop-blur">
            <Sparkles size={9} />
            {badge}
          </span>
        )}

        {/* Hover: show what the film actually is, rather than a dead play button */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/70 to-black/20 p-3 opacity-0 transition duration-300 group-hover:opacity-100">
          <p className="text-[12.5px] font-semibold leading-snug text-white">
            {displayTitle}
          </p>
          <p className="mt-1.5 line-clamp-5 text-[10.5px] leading-relaxed text-zinc-300">
            {overview || t.card.noOverview}
          </p>
        </div>

        {/* Resting state meta */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-2.5 pt-8 transition duration-300 group-hover:opacity-0">
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

      {caption && (
        <p className="mt-1.5 truncate px-0.5 text-[11px] text-zinc-500">
          {caption}
        </p>
      )}
      <div className="mt-2 flex items-center gap-1.5">
        {ott[id] &&
          Array.isArray(ott[id]) &&
          ott[id].map((provider) => (
            <div
              key={provider.provider_name}
              title={provider.provider_name}
              className="group relative"
            >
              <div className="h-7 w-7 overflow-hidden rounded-md bg-white/10 p-1 ring-1 ring-white/10 transition-all duration-200 group-hover:scale-110 group-hover:ring-white/25">
                <img
                  src={IMG_CDN_URL + provider.logo_path}
                  alt={provider.provider_name}
                  loading="lazy"
                  className="h-full w-full rounded object-contain"
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MovieCard;
