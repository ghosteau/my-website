"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { useLang, LangToggle } from "../components/lang";
import { FlagIcon, PixelSparkle } from "../components/sprites";

const copy = {
  en: {
    back: "← back",
    kicker: "photos",
    title: "Moments",
    more: "More moments on the way.",
    photoAlt: "Québec Parliament trip photo",
    hint: "tap or swipe the cards",
  },
  fr: {
    back: "← retour",
    kicker: "photos",
    title: "Moments",
    more: "D'autres moments arrivent bientôt.",
    photoAlt: "Photo du voyage au parlement du Québec",
    hint: "touchez ou balayez les cartes",
  },
};

/* one "moment" = a set of photos sharing a caption, date, and tags */
const quebecMoment = {
  images: [
    "/photos/quebec/parliament-1.jpg",
    "/photos/quebec/parliament-2.jpg",
    "/photos/quebec/parliament-3.jpg",
    "/photos/quebec/parliament-4.jpg",
  ],
  en: { caption: "My visit to the Québec Parliament!", date: "May 27, 2026" },
  fr: { caption: "Ma visite au parlement du Québec !", date: "Le 27 mai 2026" },
  /* country-flag emojis render as letter codes on Windows, so Canada/France
     use the pixel FlagIcons; ⚜️ and 🏛️ render everywhere */
  tags: [
    { key: "quebec", icon: "⚜️", flag: null, en: "Québec", fr: "Québec" },
    { key: "canada", icon: null, flag: "canada" as const, en: "Canada", fr: "Canada" },
    { key: "french", icon: null, flag: "france" as const, en: "French", fr: "Français" },
    { key: "gov", icon: "🏛️", flag: null, en: "Government", fr: "Gouvernement" },
  ],
};

/* how each card sits in the stack, by distance from the front */
const deckStyles = [
  { transform: "translate(0px, 0px) rotate(0deg) scale(1)", zIndex: 40, opacity: 1 },
  { transform: "translate(12px, 9px) rotate(2.4deg) scale(0.97)", zIndex: 30, opacity: 1 },
  { transform: "translate(-10px, 16px) rotate(-2.8deg) scale(0.94)", zIndex: 20, opacity: 1 },
  { transform: "translate(4px, 22px) rotate(1.2deg) scale(0.91)", zIndex: 10, opacity: 0.85 },
];

function MomentCarousel({ lang, photoAlt, hint }: { lang: "en" | "fr"; photoAlt: string; hint: string }) {
  const m = quebecMoment;
  const [idx, setIdx] = useState(0);
  const touchX = useRef<number | null>(null);
  const n = m.images.length;

  const go = useCallback((d: number) => setIdx((i) => (i + d + n) % n), [n]);

  return (
    <div className="grid md:grid-cols-[minmax(0,400px)_1fr] gap-10 md:gap-14 items-start">
      {/* stacked card deck */}
      <div className="pb-2">
        <div
          className="relative aspect-[3/4] select-none"
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
          role="group"
          aria-label={m[lang].caption}
        >
          {m.images.map((src, i) => {
            const pos = (i - idx + n) % n;
            const s = deckStyles[pos] ?? { transform: "translate(0px, 24px) scale(0.88)", zIndex: 0, opacity: 0 };
            const front = pos === 0;
            return (
              <div
                key={src}
                onClick={front ? () => go(1) : undefined}
                className={`absolute inset-0 rounded-sm overflow-hidden border bg-[#0a1f1c] shadow-2xl shadow-black/50 transition-all duration-500 ease-out ${front ? "border-white/25 cursor-pointer" : "border-white/10"}`}
                style={s}
                aria-hidden={!front}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={front ? `${photoAlt} ${i + 1}/${n}` : ""}
                  loading={i === 0 ? "eager" : "lazy"}
                  draggable={false}
                  className="w-full h-full object-cover"
                />
                {front && (
                  <span className="absolute top-3 right-3 font-mono text-[11px] text-white/85 bg-[#04100f]/65 border border-white/10 rounded-sm px-2 py-0.5 backdrop-blur-sm">
                    {idx + 1} / {n}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* controls under the deck — subtle arrows + dots */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button onClick={() => go(-1)} aria-label="Previous photo"
            className="w-8 h-8 flex items-center justify-center rounded-sm border border-white/15 text-white/60 hover:text-turq-300 hover:border-turq-500/50 transition-all duration-200">
            ‹
          </button>
          <div className="flex gap-2">
            {m.images.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} aria-label={`Photo ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${i === idx ? "bg-turq-300 scale-110" : "bg-white/25 hover:bg-white/50"}`} />
            ))}
          </div>
          <button onClick={() => go(1)} aria-label="Next photo"
            className="w-8 h-8 flex items-center justify-center rounded-sm border border-white/15 text-white/60 hover:text-turq-300 hover:border-turq-500/50 transition-all duration-200">
            ›
          </button>
        </div>
        <p className="text-center font-mono text-white/35 text-[11px] tracking-wide mt-3">{hint}</p>
      </div>

      {/* caption panel */}
      <div className="md:pt-4">
        <h2 className="text-2xl font-extralight text-white/90 leading-snug">{m[lang].caption}</h2>
        <p className="font-mono text-turq-400/85 text-xs tracking-wide mt-3">{m[lang].date}</p>
        <div className="flex flex-wrap gap-2 mt-6">
          {m.tags.map((tag) => (
            <span key={tag.key}
              className="flex items-center gap-2 px-2.5 py-1.5 border border-white/[0.1] bg-white/[0.02] rounded-sm text-xs font-mono text-white/65">
              {tag.flag ? (
                <FlagIcon kind={tag.flag} title={tag[lang]} className="w-5 h-auto" />
              ) : (
                <span aria-hidden>{tag.icon}</span>
              )}
              {tag[lang]}
            </span>
          ))}
        </div>
        <p className="text-white/50 text-sm font-light leading-relaxed mt-8 max-w-sm">
          {lang === "en"
            ? "Stained glass, the National Assembly chamber, and the building that keeps Québec's story alive."
            : "Des vitraux, la salle de l'Assemblée nationale, et l'édifice qui fait vivre l'histoire du Québec."}
        </p>
      </div>
    </div>
  );
}

export default function Photos() {
  const [lang, , toggle] = useLang();
  const c = copy[lang];

  return (
    <main className="min-h-screen bg-[#04100f] text-white">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="blob blob-2 absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-cyan-500/12 blur-[140px] will-change-transform" />
        <div className="blob blob-1 absolute bottom-[5%] left-[-8%] w-[400px] h-[400px] rounded-full bg-turq-600/15 blur-[120px] will-change-transform" />
      </div>

      <nav className="fixed top-0 w-full z-50 px-8 py-5 flex justify-between items-center border-b border-white/[0.06] backdrop-blur-md bg-[#04100f]/75">
        <Link href="/" className="font-mono text-sm text-white/55 hover:text-turq-300 transition-colors tracking-widest uppercase">{c.back}</Link>
        <LangToggle lang={lang} toggle={toggle} />
      </nav>

      <section className="page-enter relative z-10 max-w-5xl mx-auto px-8 pt-32 pb-24">
        <p className="font-mono text-cyan-400/80 text-xs tracking-[0.3em] uppercase mb-5">{c.kicker}</p>
        <h1 className="text-5xl font-extralight tracking-tight mb-16">
          <span className="bg-gradient-to-r from-turq-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">{c.title}</span>
        </h1>

        <MomentCarousel lang={lang} photoAlt={c.photoAlt} hint={c.hint} />

        {/* more coming */}
        <div className="flex items-center gap-3 mt-16 pl-1">
          <PixelSparkle className="w-4 h-4 animate-twinkle opacity-70" />
          <p className="text-white/50 text-sm font-light">{c.more}</p>
        </div>
      </section>
    </main>
  );
}
