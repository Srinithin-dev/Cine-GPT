import { Star, Sparkles, ImageOff, Loader2, Plus, Check } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { useState } from "react";
import { arrayUnion, doc, setDoc } from "firebase/firestore";

import { IMG_CDN_URL } from "../utils/constants";
import { getLanguage, fill } from "../utils/languageConstants";
import { db } from "../utils/firebase";
import { addMovieToList } from "../store/userSlice";

const MovieCard = ({ movie, variant = "row", badge, caption, from }) => {
  const language = useSelector((state) => state.lang.default);
  const t = getLanguage(language);
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user);
  const savedMovies = useSelector((state) => state.user?.movies);
  const [loading, setLoading] = useState(false);

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

  // Coerce to a real boolean. `disabled={filters[0]?.id}` passed a number or
  // undefined, which React warns about and which makes id 0 behave oddly.
  const isSaved = Boolean(
    savedMovies?.some((saved) => Number(saved.id) === Number(id)),
  );

  const handleAddToList = async (item) => {
    setLoading(true);
    try {
      await setDoc(
        doc(db, "movieList", loggedInUser.id),
        { movies: arrayUnion(item) },
        { merge: true },
      );
      dispatch(addMovieToList(item));
    } catch (e) {
      console.log(e, "error on adding to the list");
    } finally {
      setLoading(false);
    }
  };

  return (
    /* `relative` + the button as a SIBLING of the Link, not a child. A <button>
       nested inside an <a> is invalid HTML — that's what forced the
       e.preventDefault() workaround, and it breaks middle-click and screen
       readers. Absolute positioning gets it visually "on" the poster without
       nesting it. */
    <div className={`group relative ${width}`}>
      <Link
        to={`/movie/${id}`}
        state={{ movie, from }}
        aria-label={displayTitle}
        className="block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0F]"
      >
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

          {/* Hover overlay. pr-12 keeps the copy clear of the save button. */}
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/70 to-black/20 p-3 pt-12 opacity-0 transition duration-300 group-hover:opacity-100">
            <p className="text-[12.5px] font-semibold leading-snug text-white">
              {displayTitle}
            </p>
            <p className="mt-1.5 line-clamp-4 text-[10.5px] leading-relaxed text-zinc-300">
              {overview || t.card.noOverview}
            </p>
          </div>

          {/* Resting meta */}
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
      </Link>

      {/* Save control — icon-only pill on the poster. Always visible when
          saved (it's state, not an action), subtle until hover otherwise.
          No preventDefault needed: it isn't inside the link anymore. */}
      <button
        type="button"
        disabled={isSaved || loading}
        onClick={() => handleAddToList(movie)}
        title={isSaved ? t.card.saved : t.card.save}
        aria-label={fill(isSaved ? t.card.savedAria : t.card.saveAria, {
          title: displayTitle,
        })}
        className={[
          "absolute right-2 top-2 z-20 flex h-8 items-center gap-1.5 rounded-full px-2.5",
          "text-[11px] font-semibold backdrop-blur transition duration-200",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400",
          isSaved
            ? "bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-400/30 opacity-100"
            : [
                "bg-black/55 text-zinc-100 ring-1 ring-white/20",
                "opacity-0 group-hover:opacity-100 focus-visible:opacity-100",
                "hover:bg-white hover:text-black hover:ring-white",
                // Touch devices never hover — keep it reachable there.
                "max-md:opacity-100",
              ].join(" "),
          loading ? "cursor-wait" : "",
        ].join(" ")}
      >
        {loading ? (
          <Loader2 size={13} className="animate-spin" />
        ) : isSaved ? (
          <Check size={13} />
        ) : (
          <Plus size={13} />
        )}
        <span className={variant === "grid" ? "hidden sm:inline" : "hidden"}>
          {loading ? t.card.saving : isSaved ? t.card.saved : t.card.save}
        </span>
      </button>

      {caption && (
        <p className="mt-1.5 truncate px-0.5 text-[11px] text-zinc-500">
          {caption}
        </p>
      )}
    </div>
  );
};

export default MovieCard;
