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

/* one "moment" = a set of photos sharing a caption, date, blurb, and tags.
   emoji = shown on devices that render the glyph; flag = pixel fallback
   (Windows renders country-flag emoji as letter codes, so those get a pixel flag). */
type FlagKind = "usa" | "france" | "quebec";
type Moment = {
  images: string[];
  photoAlt: string;
  en: { caption: string; date: string; blurb: string };
  fr: { caption: string; date: string; blurb: string };
  tags: { key: string; emoji: string; flag: FlagKind | null; en: string; fr: string }[];
};

const moments: Moment[] = [
  {
    images: [
      "/photos/quebec/parliament-1.jpg",
      "/photos/quebec/parliament-2.jpg",
      "/photos/quebec/parliament-3.jpg",
      "/photos/quebec/parliament-4.jpg",
    ],
    photoAlt: "Québec Parliament trip photo",
    en: {
      caption: "My visit to the Québec Parliament!",
      date: "May 27, 2026",
      blurb: "Stained glass, the National Assembly chamber, and the building that keeps Québec's story alive.",
    },
    fr: {
      caption: "Ma visite au parlement du Québec !",
      date: "Le 27 mai 2026",
      blurb: "Des vitraux, la salle de l'Assemblée nationale, et l'édifice qui fait vivre l'histoire du Québec.",
    },
    tags: [
      { key: "quebec", emoji: "⚜️", flag: null, en: "Québec", fr: "Québec" },
      { key: "canada", emoji: "🍁", flag: null, en: "Canada", fr: "Canada" },
      { key: "french", emoji: "🇫🇷", flag: "france", en: "French", fr: "Français" },
      { key: "gov", emoji: "🏛️", flag: null, en: "Government", fr: "Gouvernement" },
    ],
  },
  {
    images: ["/photos/dc/rochambeau-1.jpg", "/photos/dc/capitol.jpg"],
    photoAlt: "Washington, D.C. trip photo",
    en: {
      caption: "Washington, D.C.",
      date: "November 17, 2025",
      blurb: "At the Rochambeau Memorial — the French general who helped America win its independence — and the U.S. Capitol. A fitting stop for someone with ties on both sides of the Atlantic (and yes, repping Pitt).",
    },
    fr: {
      caption: "Washington, D.C.",
      date: "Le 17 novembre 2025",
      blurb: "Au mémorial de Rochambeau — le général français qui a aidé l'Amérique à gagner son indépendance — et au Capitole. Un bel arrêt pour quelqu'un avec des attaches des deux côtés de l'Atlantique (et oui, aux couleurs de Pitt).",
    },
    tags: [
      { key: "usa", emoji: "🇺🇸", flag: "usa", en: "United States", fr: "États-Unis" },
      { key: "french", emoji: "🇫🇷", flag: "france", en: "French", fr: "Français" },
      { key: "history", emoji: "📜", flag: null, en: "History", fr: "Histoire" },
      { key: "pitt", emoji: "🎓", flag: null, en: "Pitt", fr: "Pitt" },
    ],
  },
];

/* how each card sits in the stack, by distance from the front */
const deckStyles = [
  { x: 0, y: 0, rot: 0, scale: 1, zIndex: 40, opacity: 1 },
  { x: 12, y: 9, rot: 2.4, scale: 0.97, zIndex: 30, opacity: 1 },
  { x: -10, y: 16, rot: -2.8, scale: 0.94, zIndex: 20, opacity: 1 },
  { x: 4, y: 22, rot: 1.2, scale: 0.91, zIndex: 10, opacity: 0.85 },
];

const CARD_TRANSITION =
  "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease, z-index 0s linear 0.25s";

function MomentCarousel({
  moment, lang, hint,
}: {
  moment: Moment;
  lang: "en" | "fr";
  hint: string;
}) {
  const m = moment;
  const photoAlt = m.photoAlt;
  const n = m.images.length;
  const [idx, setIdx] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const maxMove = useRef(0);

  const go = useCallback((d: number) => {
    setIdx((i) => (i + d + n) % n);
    setDragX(0);
  }, [n]);

  const onDown = (e: React.PointerEvent) => {
    setDragging(true);
    startX.current = e.clientX;
    maxMove.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const dx = e.clientX - startX.current;
    maxMove.current = Math.max(maxMove.current, Math.abs(dx));
    setDragX(dx);
  };
  const onUp = () => {
    if (!dragging) return;
    setDragging(false);
    const threshold = 80;
    if (dragX > threshold) go(-1);
    else if (dragX < -threshold) go(1);
    else if (maxMove.current < 6) go(1); // treat as a tap
    else setDragX(0); // small drag → snap back
  };

  return (
    <div className="grid md:grid-cols-[minmax(0,400px)_1fr] gap-10 md:gap-14 items-start">
      {/* stacked card deck */}
      <div className="pb-2">
        <div className="relative aspect-[3/4] select-none" role="group" aria-label={m[lang].caption}>
          {m.images.map((src, i) => {
            const pos = (i - idx + n) % n;
            const base = deckStyles[pos] ?? { x: 0, y: 24, rot: 0, scale: 0.88, zIndex: 0, opacity: 0 };
            const front = pos === 0;

            const x = front ? base.x + dragX : base.x;
            const rot = front ? base.rot + dragX * 0.045 : base.rot;
            const opacity = front
              ? Math.max(0.4, base.opacity - Math.abs(dragX) / 500)
              : base.opacity;

            return (
              <div
                key={src}
                onPointerDown={front && n > 1 ? onDown : undefined}
                onPointerMove={front && n > 1 ? onMove : undefined}
                onPointerUp={front && n > 1 ? onUp : undefined}
                onPointerCancel={front && n > 1 ? onUp : undefined}
                className={`absolute inset-0 rounded-sm overflow-hidden border bg-[#0a1f1c] shadow-2xl shadow-black/50 ${front ? (n > 1 ? "border-white/25 cursor-grab active:cursor-grabbing" : "border-white/25") : "border-white/10"}`}
                style={{
                  transform: `translate(${x}px, ${base.y}px) rotate(${rot}deg) scale(${base.scale})`,
                  zIndex: base.zIndex,
                  opacity,
                  transition: dragging && front ? "none" : CARD_TRANSITION,
                  willChange: "transform, opacity",
                  touchAction: "pan-y",
                }}
                aria-hidden={!front}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={front ? `${photoAlt} ${i + 1}/${n}` : ""}
                  loading={i === 0 ? "eager" : "lazy"}
                  draggable={false}
                  className="w-full h-full object-cover pointer-events-none"
                />
                {front && n > 1 && (
                  <span className="absolute top-3 right-3 font-mono text-[11px] text-white/85 bg-[#04100f]/65 border border-white/10 rounded-sm px-2 py-0.5 backdrop-blur-sm">
                    {idx + 1} / {n}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* controls under the deck — only when there's more than one photo */}
        {n > 1 && (
          <>
            <div className="flex items-center justify-center gap-4 mt-8">
              <button onClick={() => go(-1)} aria-label="Previous photo"
                className="w-8 h-8 flex items-center justify-center rounded-sm border border-white/15 text-white/60 hover:text-turq-300 hover:border-turq-500/50 transition-all duration-200">
                ‹
              </button>
              <div className="flex gap-2">
                {m.images.map((_, i) => (
                  <button key={i} onClick={() => { setIdx(i); setDragX(0); }} aria-label={`Photo ${i + 1}`}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${i === idx ? "bg-turq-300 scale-110" : "bg-white/25 hover:bg-white/50"}`} />
                ))}
              </div>
              <button onClick={() => go(1)} aria-label="Next photo"
                className="w-8 h-8 flex items-center justify-center rounded-sm border border-white/15 text-white/60 hover:text-turq-300 hover:border-turq-500/50 transition-all duration-200">
                ›
              </button>
            </div>
            <p className="text-center font-mono text-white/35 text-[11px] tracking-wide mt-3">{hint}</p>
          </>
        )}
      </div>

      {/* caption panel */}
      <div className="md:pt-4">
        <h2 className="text-2xl font-extralight text-white/90 leading-snug">{m[lang].caption}</h2>
        {m[lang].date && <p className="font-mono text-turq-400/85 text-xs tracking-wide mt-3">{m[lang].date}</p>}
        <div className="flex flex-wrap gap-2 mt-6">
          {m.tags.map((tag) => (
            <span key={tag.key}
              className="flex items-center gap-2 px-2.5 py-1.5 border border-white/[0.1] bg-white/[0.02] rounded-sm text-xs font-mono text-white/65">
              {tag.flag ? (
                <FlagIcon kind={tag.flag} title={tag[lang]} className="h-3.5 w-auto rounded-[1px]" />
              ) : (
                <span aria-hidden className="text-sm leading-none">{tag.emoji}</span>
              )}
              {tag[lang]}
            </span>
          ))}
        </div>
        <p className="text-white/50 text-sm font-light leading-relaxed mt-8 max-w-sm">
          {m[lang].blurb}
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

        <div>
          {moments.map((moment, i) => (
            <div key={moment.images[0]} className={i > 0 ? "mt-20 pt-20 border-t border-white/[0.06]" : ""}>
              <MomentCarousel moment={moment} lang={lang} hint={c.hint} />
            </div>
          ))}
        </div>

        {/* more coming */}
        <div className="flex items-center gap-3 mt-16 pl-1">
          <PixelSparkle className="w-4 h-4 animate-twinkle opacity-70" />
          <p className="text-white/50 text-sm font-light">{c.more}</p>
        </div>
      </section>
    </main>
  );
}
