import { Star, Sparkles, ImageOff, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { IMG_CDN_URL } from "../utils/constants";
import { getLanguage } from "../utils/languageConstants";
import { db } from "../utils/firebase";
import { arrayUnion, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { addMovieToList } from "../store/userSlice";
const MovieCard = ({ movie, variant = "row", badge, caption, from }) => {
  const language = useSelector((state) => state.lang.default);
  const t = getLanguage(language);
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const getAddedMovieList = useSelector((state) => state.user?.movies);
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

  const handleAddToList = async (movie) => {
    setLoading(true);
    try {
      await setDoc(
        doc(db, "movieList", loggedInUser.id),
        {
          movies: arrayUnion(movie),
        },
        { merge: true },
      );
      dispatch(addMovieToList(movie));
    } catch (e) {
      console.log(e, "error on adding to the list");
    } finally {
      setLoading(false);
    }
  };
  const filters = getAddedMovieList?.filter((movie) => movie.id == id);
  return (
    <div className={`group relative ${width}`}>
      <Link
        to={`/movie/${id}`}
        state={{ movie, from }}
        aria-label={displayTitle}
        className="flex flex-col gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0F]"
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

          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/70 to-black/20 p-3 opacity-0 transition duration-300 group-hover:opacity-100">
            <p className="text-[12.5px] font-semibold leading-snug text-white">
              {displayTitle}
            </p>
            <p className="mt-1.5 line-clamp-5 text-[10.5px] leading-relaxed text-zinc-300">
              {overview || t.card.noOverview}
            </p>
          </div>

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
        <button
          type="button"
          disabled={filters && filters[0]?.id}
          className={
            "flex h-9 w-full justify-center shrink-0 items-center gap-2 rounded-lg px-3 text-[13px] font-medium transition bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/20 hover:brightness-110"
          }
          onClick={(e) => {
            e.preventDefault();
            setLoading(true);
            handleAddToList(movie);
          }}
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : filters && filters[0]?.id ? (
            "Added"
          ) : (
            "Add To List"
          )}
        </button>
      </Link>
      {caption && (
        <p className="mt-1.5 truncate px-0.5 text-[11px] text-zinc-500">
          {caption}
        </p>
      )}
    </div>
  );
};

export default MovieCard;
