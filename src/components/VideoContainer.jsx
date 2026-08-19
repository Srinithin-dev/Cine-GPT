import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Volume2, VolumeX, RotateCcw } from "lucide-react";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { BACKDROP_CDN_URL } from "../utils/constants";
import { getLanguage } from "../utils/languageConstants";
import VideoTitle from "./VideoTitle";

const VideoContainer = () => {
  useMovieTrailer();

  const language = useSelector((state) => state.lang.default);
  const t = getLanguage(language);

  const movies = useSelector((state) => state.movie?.nowPlayingMovies);
  const trailerKey = useSelector((state) => state.movie?.trailerVideo?.key);

  const featured = Array.isArray(movies) ? movies[0] : null;

  const iframeRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [ready, setReady] = useState(false);

  // Talk to the YouTube player without remounting the iframe.
  const postToPlayer = (func, args = []) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args }),
      "*",
    );
  };

  const toggleMute = () => {
    postToPlayer(muted ? "unMute" : "mute");
    setMuted((prev) => !prev);
  };

  const replay = () => {
    postToPlayer("seekTo", [0, true]);
    postToPlayer("playVideo");
  };

  // Reset the fade-in whenever the trailer changes.
  useEffect(() => setReady(false), [trailerKey]);

  const embedSrc = trailerKey
    ? `https://www.youtube.com/embed/${trailerKey}` +
      `?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}` +
      `&modestbranding=1&rel=0&iv_load_policy=3&playsinline=1&enablejsapi=1`
    : null;

  return (
    <section className="relative h-[78vh] min-h-[480px] w-full overflow-hidden bg-[#0A0A0F]">
      {/* Backdrop still — shows immediately, and stays as the fallback if the
          movie has no trailer on TMDB. */}
      {featured?.backdrop_path && (
        <img
          src={BACKDROP_CDN_URL + featured.backdrop_path}
          alt=""
          aria-hidden
          className={[
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000",
            ready ? "opacity-0" : "opacity-100",
          ].join(" ")}
        />
      )}

      {/* Trailer */}
      {embedSrc && (
        <iframe
          ref={iframeRef}
          onLoad={() => setReady(true)}
          src={embedSrc}
          title={`${featured?.title ?? "Featured"} trailer`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className={[
            "pointer-events-none absolute left-1/2 top-1/2",
            "h-[56.25vw] min-h-full w-[177.78vh] min-w-full",
            "-translate-x-1/2 -translate-y-1/2 scale-[1.35] border-0",
            "transition-opacity duration-1000",
            ready ? "opacity-100" : "opacity-0",
          ].join(" ")}
        />
      )}

      {/* Scrims — bottom fade into the page, left fade behind the copy */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/25 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0A0A0F] via-[#0A0A0F]/55 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0A0A0F]/80 to-transparent" />

      {/* Copy + CTAs */}
      <div className="relative flex h-full items-end">
        <div className="mx-auto w-full max-w-7xl px-6 pb-24 sm:pb-28">
          {featured ? (
            <VideoTitle movie={featured} />
          ) : (
            /* Skeleton while TMDB responds */
            <div className="max-w-xl animate-pulse space-y-4">
              <div className="h-5 w-32 rounded-full bg-white/10" />
              <div className="h-12 w-3/4 rounded-lg bg-white/10" />
              <div className="h-4 w-full rounded bg-white/[0.07]" />
              <div className="h-4 w-5/6 rounded bg-white/[0.07]" />
              <div className="flex gap-3 pt-2">
                <div className="h-11 w-28 rounded-lg bg-white/10" />
                <div className="h-11 w-32 rounded-lg bg-white/[0.07]" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Player controls */}
      {trailerKey && (
        <div className="absolute bottom-24 right-6 flex items-center gap-2 sm:bottom-28">
          <button
            type="button"
            onClick={replay}
            aria-label={t.hero.replay}
            className="grid h-10 w-10 place-items-center rounded-full bg-black/40 text-white ring-1 ring-white/25 backdrop-blur transition hover:bg-black/60"
          >
            <RotateCcw size={16} />
          </button>
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? t.hero.unmute : t.hero.mute}
            className="grid h-10 w-10 place-items-center rounded-full bg-black/40 text-white ring-1 ring-white/25 backdrop-blur transition hover:bg-black/60"
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      )}
    </section>
  );
};

export default VideoContainer;
