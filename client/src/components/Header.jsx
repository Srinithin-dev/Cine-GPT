import {
  Clapperboard,
  Sparkles,
  ArrowLeft,
  Globe,
  Search,
  X,
  Bookmark,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import useAuthorization from "../hooks/useAuthorization";
import { changeLanguage } from "../store/multi-LanguageSlice";
import { getLanguage } from "../utils/languageConstants";
import { OPTIONS, SUPPORT_LANGUAGES } from "../utils/constants";
import { searchResults } from "../store/movieSlice";

/**
 * @param {object}   user
 * @param {Function} onSignOut
 * @param {boolean}  isGptMode        - which view Browse is currently showing
 * @param {Function} onToggleGptMode  - flips that view
 */
const Header = ({ user, onSignOut, isGptMode = false, onToggleGptMode }) => {
  useAuthorization();
  const dispatch = useDispatch();
  const ref = useRef(null);

  const language = useSelector((state) => state.lang.default);
  const t = getLanguage(language);

  const hasResults = useSelector(
    (state) => (state.movie?.searchResults?.length ?? 0) > 0,
  );

  const savedCount = useSelector((state) => state.user?.movies?.length ?? 0);
  const { pathname } = useLocation();

  const initial = (user?.displayName || user?.email || "U")
    .charAt(0)
    .toUpperCase();

  const handleSearch = async () => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${ref.current.value}&include_adult=false`;
    const response = await fetch(url, OPTIONS);
    const json = await response.json();
    dispatch(searchResults(json.results));
  };

  const handleClear = () => {
    if (ref.current) ref.current.value = "";
    dispatch(searchResults([]));
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0A0A0F]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-6 sm:gap-4">
        {/* Brand */}
        <Link to="/browse" className="flex shrink-0 items-center gap-2.5">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500">
            <Clapperboard size={16} className="text-white" />
          </div>
          <span className="hidden text-[15px] font-semibold tracking-tight text-zinc-100 sm:block">
            CineGPT
          </span>
        </Link>

        {!isGptMode && (
          <nav className="hidden items-center gap-1 lg:flex">
            {/* Active state now comes from the URL, not a hardcoded index. */}
            {t.header.nav.map((item) => {
              const active = pathname === item.path;
              return (
                <Link
                  key={item.key}
                  to={item.path}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[13.5px] transition",
                    active
                      ? "bg-white/[0.06] text-zinc-100"
                      : "text-zinc-400 hover:text-zinc-100",
                  ].join(" ")}
                >
                  {item.key === "watchlist" && <Bookmark size={13} />}
                  {item.label}
                  {item.key === "watchlist" && savedCount > 0 && (
                    <span className="ml-0.5 rounded-full bg-indigo-500/20 px-1.5 py-px text-[10.5px] font-semibold text-indigo-300">
                      {savedCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        )}

        {/* Only on /browse — that's the one route that renders SearchResults,
            so anywhere else the box would dispatch into a view nobody sees. */}
        {!isGptMode && pathname === "/browse" ? (
          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="mx-auto flex h-9 w-full max-w-md items-center gap-2 rounded-lg bg-white/[0.04] pl-3 pr-1 ring-1 ring-white/[0.07] transition focus-within:bg-[#14141C] focus-within:ring-2 focus-within:ring-indigo-500"
          >
            <Search size={15} className="shrink-0 text-zinc-500" />
            <input
              ref={ref}
              type="search"
              aria-label={t.search.label}
              placeholder={t.search.placeholder}
              className="min-w-0 flex-1 bg-transparent text-[13.5px] text-zinc-100 outline-none placeholder:text-zinc-600 [&::-webkit-search-cancel-button]:hidden"
            />
            {hasResults && (
              <button
                type="button"
                onClick={handleClear}
                aria-label={t.search.clear}
                className="grid h-6 w-6 shrink-0 place-items-center rounded text-zinc-500 transition hover:bg-white/10 hover:text-zinc-200"
              >
                <X size={13} />
              </button>
            )}
            <button
              type="submit"
              className="h-7 shrink-0 rounded-md bg-white/[0.08] px-3 text-[12.5px] font-medium text-zinc-200 transition hover:bg-white/[0.16]"
            >
              {t.search.submit}
            </button>
          </form>
        ) : (
          <div className="flex-1" />
        )}

        {onToggleGptMode && (
          <button
            type="button"
            onClick={onToggleGptMode}
            aria-pressed={isGptMode}
            className={[
              "flex h-9 shrink-0 items-center gap-2 rounded-lg px-3 text-[13px] font-medium transition",
              isGptMode
                ? "bg-white/[0.06] text-zinc-200 ring-1 ring-white/10 hover:bg-white/[0.1]"
                : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/20 hover:brightness-110",
            ].join(" ")}
          >
            {isGptMode ? <ArrowLeft size={14} /> : <Sparkles size={14} />}
            <span className="hidden md:inline">
              {isGptMode ? t.header.exitGptSearch : t.header.gptSearch}
            </span>
          </button>
        )}

        {/* Language picker */}
        <div className="relative hidden shrink-0 sm:block">
          <Globe
            size={14}
            className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500"
          />
          <select
            aria-label={t.header.language}
            value={language}
            onChange={(e) => dispatch(changeLanguage(e.target.value))}
            className="h-9 cursor-pointer appearance-none rounded-lg bg-white/[0.04] pl-8 pr-7 text-[13px] text-zinc-300 outline-none ring-1 ring-white/[0.07] transition hover:bg-white/[0.08] focus:ring-2 focus:ring-indigo-500"
          >
            {SUPPORT_LANGUAGES.map((option) => (
              <option
                key={option.identifier}
                value={option.identifier}
                className="bg-[#14141C] text-zinc-200"
              >
                {option.nativeName}
              </option>
            ))}
          </select>
          <svg
            width="9"
            height="6"
            viewBox="0 0 9 6"
            aria-hidden
            className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 fill-zinc-500"
          >
            <path d="M0 0h9L4.5 6z" />
          </svg>
        </div>

        {/* Account */}
        <div className="flex shrink-0 items-center gap-2.5">
          <div className="grid h-8 w-8 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-indigo-500/80 to-purple-500/80 text-[13px] font-semibold text-white">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user?.displayName || t.header.account}
                className="h-full w-full object-cover"
              />
            ) : (
              initial
            )}
          </div>

          <span className="hidden max-w-[120px] truncate text-[13px] text-zinc-300 xl:block">
            {user?.displayName}
          </span>

          {onSignOut && (
            <button
              type="button"
              onClick={onSignOut}
              className="h-9 rounded-lg px-3 text-[13px] text-zinc-400 ring-1 ring-white/[0.07] transition hover:bg-white/[0.05] hover:text-zinc-100"
            >
              {t.header.signOut}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
