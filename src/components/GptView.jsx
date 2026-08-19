import React, { useRef } from "react";
import GptSuggestion from "./GptSuggestion";
import useGptMovieSuggestion from "../hooks/useGptMovieSuggestion";
import { Search, Sparkles } from "lucide-react";
const GptView = ({ t, handleClickSuggestion }) => {
  const ref = useRef(null);
  const gptSearchMovie = useGptMovieSuggestion();

  return (
    <div className="cg-aurora relative overflow-hidden">
      <div className="cg-grid absolute inset-0 opacity-60" />

      <div className="relative px-6 pt-14 sm:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3 py-1 text-[11.5px] font-medium text-indigo-300 ring-1 ring-indigo-400/20">
            <Sparkles size={11} />
            {t.gpt.badge}
          </div>

          <h1 className="text-[30px] font-semibold leading-tight tracking-tight text-zinc-50 sm:text-[40px]">
            {t.gpt.heading}
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-zinc-400">
            {t.gpt.subheading}
          </p>

          <div className="mt-8 flex items-center gap-2 rounded-xl bg-[#14141C] p-2 pl-4 text-left ring-1 ring-white/[0.09] transition focus-within:ring-2 focus-within:ring-indigo-500">
            <Search size={17} className="shrink-0 text-zinc-500" />
            <input
              ref={ref}
              type="text"
              placeholder={t.gpt.placeholder}
              className="min-w-0 flex-1 bg-transparent py-2 text-[15px] text-zinc-100 outline-none placeholder:text-zinc-600"
            />
            <button
              type="button"
              onClick={() => gptSearchMovie(ref.current.value)}
              className="shrink-0 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 text-[14px] font-medium text-white shadow-lg shadow-indigo-500/20 transition hover:brightness-110"
            >
              {t.gpt.search}
            </button>
          </div>

          <div className="mt-4">
            <p className="mb-2.5 text-[11.5px] uppercase tracking-widest text-zinc-600">
              {t.gpt.tryLabel}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {t.gpt.suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleClickSuggestion(suggestion)}
                  className="rounded-full bg-white/[0.04] px-3 py-1.5 text-[12.5px] text-zinc-400 ring-1 ring-white/[0.07] transition hover:bg-white/[0.08] hover:text-zinc-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>

        <GptSuggestion />
      </div>
    </div>
  );
};

export default GptView;
