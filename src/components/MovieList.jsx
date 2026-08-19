import { useRef } from "react";
import { useSelector } from "react-redux";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import MovieCard from "./MovieCard";
import { getLanguage } from "../utils/languageConstants";

const Skeleton = () => (
  <div className="w-[142px] shrink-0 animate-pulse sm:w-[168px]">
    <div className="aspect-[2/3] rounded-xl bg-white/[0.05]" />
  </div>
);

/**
 * A titled, horizontally scrolling row of MovieCards.
 *
 * @param {string} title
 * @param {string} [subtitle]
 * @param {Array}  [movies]   TMDB results. Omit/empty to render skeletons.
 */
const MovieList = ({ title, subtitle, movies }) => {
  const language = useSelector((state) => state.lang.default);
  const t = getLanguage(language);

  const trackRef = useRef(null);
  const isLoading = !Array.isArray(movies) || movies.length === 0;

  const scrollBy = (direction) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="group/row mt-9">
      <div className="mb-3.5 flex items-end justify-between gap-4 px-6">
        <div className="min-w-0">
          <h3 className="truncate text-[15px] font-semibold tracking-tight text-zinc-100">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-0.5 truncate text-[12.5px] text-zinc-500">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            className="hidden items-center gap-1 text-[12.5px] text-zinc-500 transition hover:text-zinc-200 sm:flex"
          >
            {t.rows.seeAll} <ArrowRight size={13} />
          </button>
          <div className="hidden gap-1 opacity-0 transition group-hover/row:opacity-100 md:flex">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label={t.rows.scrollLeft}
              className="grid h-7 w-7 place-items-center rounded-md bg-white/[0.06] text-zinc-300 ring-1 ring-white/10 transition hover:bg-white/[0.12]"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label={t.rows.scrollRight}
              className="grid h-7 w-7 place-items-center rounded-md bg-white/[0.06] text-zinc-300 ring-1 ring-white/10 transition hover:bg-white/[0.12]"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        className="cg-scroll-x flex gap-3.5 overflow-x-auto scroll-smooth px-6 pb-3 pt-1"
      >
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} />)
          : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </section>
  );
};

export default MovieList;
