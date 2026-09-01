import { useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router";
import {
  ArrowLeft,
  Star,
  Clock,
  Calendar,
  Globe,
  ImageOff,
} from "lucide-react";

import Header from "./Header";
import MovieList from "./MovieList";
import { IMG_CDN_URL, BACKDROP_CDN_URL } from "../utils/constants";
import { getLanguage, fill } from "../utils/languageConstants";
import useMovieDetail from "../hooks/useMovieDetail";

const formatRuntime = (minutes, unit) =>
  Number.isFinite(minutes) && minutes > 0
    ? `${Math.floor(minutes / 60)}h ${minutes % 60}${unit ? ` ${unit}` : "m"}`
    : null;

const formatMoney = (amount, locale) =>
  Number.isFinite(amount) && amount > 0
    ? new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
      }).format(amount)
    : null;

const Chip = ({ children }) => (
  <span className="rounded-full bg-white/[0.05] px-2.5 py-1 text-[12px] text-zinc-300 ring-1 ring-white/[0.08]">
    {children}
  </span>
);

const Fact = ({ label, value, fallback }) => (
  <div className="border-b border-white/[0.05] py-3 last:border-0">
    <dt className="text-[11.5px] uppercase tracking-widest text-zinc-600">
      {label}
    </dt>
    <dd className="mt-1 text-[13.5px] text-zinc-200">{value || fallback}</dd>
  </div>
);

const SectionTitle = ({ children }) => (
  <h2 className="mb-4 border-b border-white/[0.06] pb-2.5 text-[15px] font-semibold tracking-tight text-zinc-100">
    {children}
  </h2>
);

const PersonCard = ({ person }) => (
  <div className="w-[104px] shrink-0">
    <div className="aspect-[2/3] overflow-hidden rounded-lg bg-[#1C1C26] ring-1 ring-white/[0.07]">
      {person?.profile_path ? (
        <img
          src={IMG_CDN_URL + person.profile_path}
          alt={person.name}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="grid h-full w-full place-items-center">
          <ImageOff size={16} className="text-zinc-600" />
        </div>
      )}
    </div>
    <p className="mt-2 truncate text-[12px] font-medium text-zinc-200">
      {person?.name}
    </p>
    <p className="truncate text-[11px] text-zinc-500">
      {person?.character || person?.job}
    </p>
  </div>
);

const DetailSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-[42vh] min-h-[280px] w-full bg-white/[0.04]" />
    <div className="mx-auto max-w-7xl px-6">
      <div className="-mt-24 flex gap-6">
        <div className="hidden aspect-[2/3] w-[200px] shrink-0 rounded-xl bg-white/[0.06] sm:block" />
        <div className="flex-1 space-y-3 pt-24">
          <div className="h-9 w-2/3 rounded-lg bg-white/[0.06]" />
          <div className="h-4 w-1/3 rounded bg-white/[0.04]" />
          <div className="h-4 w-full rounded bg-white/[0.04]" />
          <div className="h-4 w-5/6 rounded bg-white/[0.04]" />
        </div>
      </div>
    </div>
  </div>
);

const MovieDetail = () => {
  const { id } = useParams();
  const location = useLocation();

  const language = useSelector((state) => state.lang.default);
  const t = getLanguage(language);
  const locale = t.meta.locale;

  const passed = location.state?.movie ?? null;

  const { movie } = useMovieDetail(id);
  // const movie = {
  //   adult: false,
  //   backdrop_path: "/r57L2UBLPKcHdZQYg8tagv9XqK2.jpg",
  //   genre_ids: [12, 28, 14],
  //   id: 1368337,
  //   title: "The Odyssey",
  //   original_language: "en",
  //   original_title: "The Odyssey",
  //   overview:
  //     "Odysseus, the legendary King of Ithaca, embarks on a long and perilous journey home following the Trojan War. Throughout his voyage, he is forced to confront the whims of gods, mythological monsters, and trials that stretch both his cunning and his humanity to the breaking point.",
  //   popularity: 778.47,
  //   poster_path: "/5rhTDKUhPYvpdQIijFIs5VoWsON.jpg",
  //   release_date: "2026-07-15",
  //   softcore: false,
  //   video: false,
  //   vote_average: 7.991,
  //   vote_count: 2926,
  // };
  const loading = !movie;

  const fromLabel = "";
  // const fromLabel =
  //   location.state?.from === "gpt"
  //     ? t.detail.fromGpt
  //     : location.state?.from === "search"
  //       ? t.detail.fromSearch
  //       : t.detail.fromBrowse;

  const cast = movie?.credits?.cast?.slice(0, 12) ?? [];
  const crew =
    movie?.credits?.crew?.filter((person) =>
      ["Director", "Writer", "Screenplay", "Original Music Composer"].includes(
        person.job,
      ),
    ) ?? [];
  const trailer =
    movie?.videos?.results?.find((video) => video.type === "Trailer") ?? null;
  const similar = movie?.similar?.results ?? [];
  const providers = movie?.["watch/providers"]?.results?.IN?.flatrate ?? [];

  const displayTitle = movie?.title || movie?.name || "";
  const year = movie?.release_date ? movie.release_date.slice(0, 4) : null;
  const rating =
    typeof movie?.vote_average === "number" && movie.vote_average > 0
      ? movie.vote_average.toFixed(1)
      : null;
  const runtime = formatRuntime(movie?.runtime, t.detail.minutes);

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-zinc-100">
      {/* <Header /> */}
      {loading ? (
        <DetailSkeleton />
      ) : (
        <>
          <div className="relative h-[42vh] min-h-[280px] w-full overflow-hidden">
            {movie.backdrop_path ? (
              <img
                src={BACKDROP_CDN_URL + movie.backdrop_path}
                alt=""
                aria-hidden
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-[#1C1C26] to-[#0A0A0F]" />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/50 to-[#0A0A0F]/30" />

            <div className="absolute inset-x-0 top-0 mx-auto flex max-w-7xl items-center gap-2 px-6 pt-6 text-[13px]">
              <Link
                to="/browse"
                className="flex items-center gap-1.5 rounded-lg bg-black/40 px-3 py-1.5 text-zinc-200 ring-1 ring-white/15 backdrop-blur transition hover:bg-black/60"
              >
                <ArrowLeft size={14} />
                {t.detail.back}
              </Link>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-400">{fromLabel}</span>
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-6">
            <div className="-mt-28 flex flex-col gap-6 sm:flex-row sm:items-end">
              <div className="w-[140px] shrink-0 overflow-hidden rounded-xl bg-[#14141C] shadow-2xl shadow-black/60 ring-1 ring-white/10 sm:w-[200px]">
                {movie.poster_path ? (
                  <img
                    src={IMG_CDN_URL + movie.poster_path}
                    alt={displayTitle}
                    className="aspect-[2/3] w-full object-cover"
                  />
                ) : (
                  <div className="grid aspect-[2/3] w-full place-items-center">
                    <ImageOff size={20} className="text-zinc-600" />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1 pb-1">
                <h1 className="text-[28px] font-semibold leading-tight tracking-tight text-zinc-50 sm:text-[38px]">
                  {displayTitle}
                </h1>

                {movie.tagline && (
                  <p className="mt-1.5 text-[14px] italic text-zinc-400">
                    {movie.tagline}
                  </p>
                )}

                <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-zinc-400">
                  {rating && (
                    <span className="flex items-center gap-1.5">
                      <Star
                        size={13}
                        className="fill-amber-400 text-amber-400"
                      />
                      <span className="font-medium text-zinc-200">
                        {rating}
                      </span>
                      {Number.isFinite(movie.vote_count) && (
                        <span className="text-zinc-500">
                          {fill(t.detail.voteCount, { n: movie.vote_count })}
                        </span>
                      )}
                    </span>
                  )}
                  {year && (
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} />
                      {year}
                    </span>
                  )}
                  {runtime && (
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} />
                      {runtime}
                    </span>
                  )}
                  {movie.original_language && (
                    <span className="flex items-center gap-1.5">
                      <Globe size={13} />
                      {movie.original_language.toUpperCase()}
                    </span>
                  )}
                </div>

                {movie.genres?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <Chip key={genre.id}>{genre.name}</Chip>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_300px]">
              <div className="min-w-0">
                <section>
                  <SectionTitle>{t.detail.overview}</SectionTitle>
                  <p className="max-w-2xl text-[14.5px] leading-relaxed text-zinc-300">
                    {movie.overview || t.detail.noOverview}
                  </p>
                </section>

                <section className="mt-12">
                  <SectionTitle>{t.detail.trailer}</SectionTitle>
                  {trailer ? (
                    <div className="overflow-hidden rounded-xl ring-1 ring-white/[0.08]">
                      <iframe
                        src={`https://www.youtube.com/embed/${trailer.key}`}
                        title={`${displayTitle} — ${t.detail.trailer}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="aspect-video w-full border-0"
                      />
                    </div>
                  ) : (
                    <div className="grid aspect-video w-full place-items-center rounded-xl bg-white/[0.02] text-[13px] text-zinc-600 ring-1 ring-white/[0.06]">
                      {t.detail.noTrailer}
                    </div>
                  )}
                </section>

                <section className="mt-12">
                  <SectionTitle>{t.detail.cast}</SectionTitle>
                  {cast.length > 0 ? (
                    <div className="cg-scroll-x flex gap-3.5 overflow-x-auto pb-2">
                      {cast.map((person) => (
                        <PersonCard key={person.id} person={person} />
                      ))}
                    </div>
                  ) : (
                    <div className="cg-scroll-x flex gap-3.5 overflow-x-auto pb-2">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-[104px] shrink-0 animate-pulse"
                        >
                          <div className="aspect-[2/3] rounded-lg bg-white/[0.04]" />
                          <div className="mt-2 h-3 w-3/4 rounded bg-white/[0.04]" />
                          <div className="mt-1.5 h-2.5 w-1/2 rounded bg-white/[0.03]" />
                        </div>
                      ))}
                    </div>
                  )}
                </section>

                {crew.length > 0 && (
                  <section className="mt-12">
                    <SectionTitle>{t.detail.crew}</SectionTitle>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                      {crew.map((person) => (
                        <div key={`${person.id}-${person.job}`}>
                          <p className="text-[13.5px] font-medium text-zinc-200">
                            {person.name}
                          </p>
                          <p className="text-[12px] text-zinc-500">
                            {person.job}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              <aside className="lg:sticky lg:top-24 lg:self-start">
                <section>
                  <SectionTitle>{t.detail.watchOn}</SectionTitle>
                  {providers.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {providers.map((provider) => (
                        <div
                          key={provider.provider_id}
                          title={provider.provider_name}
                          className="h-10 w-10 overflow-hidden rounded-lg bg-white/[0.06] ring-1 ring-white/10 transition hover:ring-white/30"
                        >
                          <img
                            src={IMG_CDN_URL + provider.logo_path}
                            alt={provider.provider_name}
                            loading="lazy"
                            className="h-full w-full object-contain"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[13px] leading-relaxed text-zinc-500">
                      {t.detail.noProviders}
                    </p>
                  )}
                </section>

                <section className="mt-10">
                  <SectionTitle>{t.detail.details}</SectionTitle>
                  <dl>
                    <Fact
                      label={t.detail.status}
                      value={movie.status}
                      fallback={t.detail.notAvailable}
                    />
                    <Fact
                      label={t.detail.releaseDate}
                      value={
                        movie.release_date
                          ? new Date(movie.release_date).toLocaleDateString(
                              locale,
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              },
                            )
                          : null
                      }
                      fallback={t.detail.notAvailable}
                    />
                    <Fact
                      label={t.detail.runtime}
                      value={runtime}
                      fallback={t.detail.notAvailable}
                    />
                    <Fact
                      label={t.detail.originalTitle}
                      value={movie.original_title}
                      fallback={t.detail.notAvailable}
                    />
                    <Fact
                      label={t.detail.originalLanguage}
                      value={movie.original_language?.toUpperCase()}
                      fallback={t.detail.notAvailable}
                    />
                    <Fact
                      label={t.detail.budget}
                      value={formatMoney(movie.budget, locale)}
                      fallback={t.detail.notAvailable}
                    />
                    <Fact
                      label={t.detail.revenue}
                      value={formatMoney(movie.revenue, locale)}
                      fallback={t.detail.notAvailable}
                    />
                    <Fact
                      label={t.detail.countries}
                      value={movie.production_countries
                        ?.map((c) => c.name)
                        .join(", ")}
                      fallback={t.detail.notAvailable}
                    />
                    <Fact
                      label={t.detail.productionCompanies}
                      value={movie.production_companies
                        ?.map((c) => c.name)
                        .join(", ")}
                      fallback={t.detail.notAvailable}
                    />
                  </dl>
                </section>
              </aside>
            </div>
          </div>
        </>
      )}

      <footer className="border-t border-white/[0.06] py-8 text-center text-[12.5px] text-zinc-600">
        CineGPT — {t.footer.note} {t.footer.dataBy}
        <span className="ml-2 text-zinc-700">#{id}</span>
      </footer>
    </div>
  );
};

export default MovieDetail;
