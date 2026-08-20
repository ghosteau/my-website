"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLang } from "../components/lang";
import { SiteNav } from "../components/nav";
import { FlagIcon, PixelSparkle } from "../components/sprites";

const copy = {
  en: {
    kicker: "photos",
    title: "Moments",
    more: "More moments on the way.",
    photoAlt: "Québec Parliament trip photo",
    hint: "tap or swipe the cards",
  },
  fr: {
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
type FlagKind = "usa" | "france" | "quebec" | "sweden";
type Moment = {
  images: string[];
  photoAlt: string;
  /** frame shape — default 3/4. Mixed portrait+landscape sets read better square. */
  aspect?: string;
  /** "contain" letterboxes instead of cropping; use it when a set mixes orientations. */
  fit?: "cover" | "contain";
  en: { caption: string; date: string; blurb: string };
  fr: { caption: string; date: string; blurb: string };
  tags: { key: string; emoji: string; flag: FlagKind | null; en: string; fr: string }[];
};

const moments: Moment[] = [
  {
    images: [
      "/photos/paris/1-concorde.jpg",
      "/photos/paris/2-luxembourg.jpg",
      "/photos/paris/3-pantheon.jpg",
      "/photos/paris/4-invalides.jpg",
      "/photos/paris/5-sacre-coeur.jpg",
      "/photos/paris/6-montaigne.jpg",
      "/photos/paris/7-eiffel.jpg",
    ],
    photoAlt: "Paris, France trip photo",
    aspect: "1/1",
    fit: "contain",
    en: {
      caption: "Paris, France",
      date: "2026",
      blurb:
        "Concorde, the Jardin du Luxembourg, the generals of the Revolution inside the Panthéon, Les Invalides under a pink sky, Sacré-Cœur, and the Eiffel Tower over the Seine at dusk. Somewhere in there: Avenue Montaigne — named for the writer I quote up top.",
    },
    fr: {
      caption: "Paris, France",
      date: "2026",
      blurb:
        "La Concorde, le jardin du Luxembourg, les généraux de la Révolution au Panthéon, les Invalides sous un ciel rose, le Sacré-Cœur, et la tour Eiffel au-dessus de la Seine au crépuscule. Et quelque part là-dedans : l'avenue Montaigne — du nom de l'écrivain que je cite en haut de la page.",
    },
    tags: [
      { key: "france", emoji: "🇫🇷", flag: "france", en: "France", fr: "France" },
      { key: "arch", emoji: "🏛️", flag: null, en: "Architecture", fr: "Architecture" },
      { key: "history", emoji: "📜", flag: null, en: "History", fr: "Histoire" },
      { key: "montaigne", emoji: "✍️", flag: null, en: "Montaigne", fr: "Montaigne" },
    ],
  },
  {
    images: [
      "/photos/stockholm/1-nordiska.jpg",
      "/photos/stockholm/2-palace.jpg",
      "/photos/stockholm/3-riksdag.jpg",
      "/photos/stockholm/4-karl-xii.jpg",
      "/photos/stockholm/5-night-ice.jpg",
    ],
    photoAlt: "Stockholm, Sweden trip photo",
    aspect: "1/1",
    fit: "contain", // the set mixes portrait and landscape — don't crop either
    en: {
      caption: "Stockholm, Sweden",
      date: "March 2026",
      blurb:
        "The Nordiska museet, the Royal Palace, the Riksdag, Karl XII pointing over Kungsträdgården, and Riddarholmen glowing across the broken ice at night.",
    },
    fr: {
      caption: "Stockholm, Suède",
      date: "Mars 2026",
      blurb:
        "Le Nordiska museet, le Palais royal, le Riksdag, Karl XII pointant au-dessus de Kungsträdgården, et Riddarholmen illuminé sur la glace brisée, la nuit.",
    },
    tags: [
      { key: "sweden", emoji: "🇸🇪", flag: "sweden", en: "Sweden", fr: "Suède" },
      { key: "europe", emoji: "🏛️", flag: null, en: "Architecture", fr: "Architecture" },
      { key: "history", emoji: "📜", flag: null, en: "History", fr: "Histoire" },
      { key: "winter", emoji: "❄️", flag: null, en: "Winter", fr: "Hiver" },
    ],
  },
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

/* One track, one axis. The whole strip slides by exactly one frame per step —
   no stacking, rotation, or cross-fades, which is what made the old deck feel
   fussy. Drag adds a live pixel offset on top of the frame position. */
const SLIDE = "transform 0.5s cubic-bezier(0.22, 0.9, 0.24, 1)";

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
  const aspect = m.aspect ?? "3/4";
  const fitClass = m.fit === "contain" ? "object-contain" : "object-cover";
  const [idx, setIdx] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const startY = useRef(0);
  const axis = useRef<"none" | "x" | "y">("none");

  const clamp = useCallback((i: number) => Math.max(0, Math.min(n - 1, i)), [n]);
  const go = useCallback((d: number) => {
    setDragX(0);
    setIdx((i) => clamp(i + d));
  }, [clamp]);

  const onDown = (e: React.PointerEvent) => {
    if (n < 2) return;
    setDragging(true);
    startX.current = e.clientX;
    startY.current = e.clientY;
    axis.current = "none";
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const dx = e.clientX - startX.current;
    const dy = e.clientY - startY.current;
    // decide once whether this gesture is a horizontal swipe or a page scroll
    if (axis.current === "none" && Math.abs(dx) + Math.abs(dy) > 8) {
      axis.current = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    }
    if (axis.current !== "x") return;
    // resist at the ends so the strip feels bounded, not broken
    const atEnd = (idx === 0 && dx > 0) || (idx === n - 1 && dx < 0);
    setDragX(atEnd ? dx * 0.25 : dx);
  };
  const onUp = () => {
    if (!dragging) return;
    setDragging(false);
    const w = frameRef.current?.offsetWidth ?? 320;
    const threshold = Math.min(90, w * 0.22);
    if (dragX <= -threshold) go(1);
    else if (dragX >= threshold) go(-1);
    else setDragX(0);
    axis.current = "none";
  };

  const jumpTo = (i: number) => { setDragX(0); setIdx(clamp(i)); };

  return (
    <div className="grid md:grid-cols-[minmax(0,400px)_1fr] gap-10 md:gap-14 items-start">
      {/* filmstrip */}
      <div className="pb-2">
        <div
          ref={frameRef}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          className={`relative overflow-hidden rounded-sm border border-white/15 bg-[#08181a] shadow-2xl shadow-black/50 select-none ${n > 1 ? "cursor-grab active:cursor-grabbing" : ""}`}
          style={{ touchAction: "pan-y", aspectRatio: aspect }}
          role="group"
          aria-label={m[lang].caption}
        >
          <div
            className="flex h-full"
            style={{
              width: `${n * 100}%`,
              transform: `translate3d(calc(${(-idx * 100) / n}% + ${dragX}px), 0, 0)`,
              transition: dragging ? "none" : SLIDE,
              willChange: "transform",
            }}
          >
            {m.images.map((src, i) => (
              <div key={src} className="relative h-full" style={{ width: `${100 / n}%` }} aria-hidden={i !== idx}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={i === idx ? `${photoAlt} ${i + 1}/${n}` : ""}
                  loading={i === 0 ? "eager" : "lazy"}
                  draggable={false}
                  className={`w-full h-full ${fitClass} pointer-events-none`}
                />
              </div>
            ))}
          </div>
          {n > 1 && (
            <span className="absolute top-3 right-3 font-mono text-[11px] text-white/85 bg-[#04100f]/65 border border-white/10 rounded-sm px-2 py-0.5 backdrop-blur-sm pointer-events-none">
              {idx + 1} / {n}
            </span>
          )}
        </div>

        {/* controls under the deck — only when there's more than one photo */}
        {n > 1 && (
          <>
            <div className="flex items-center justify-center gap-4 mt-8">
              <button onClick={() => go(-1)} disabled={idx === 0} aria-label="Previous photo"
                className="w-8 h-8 flex items-center justify-center rounded-sm border border-white/15 text-white/60 enabled:hover:text-turq-300 enabled:hover:border-turq-500/50 disabled:opacity-25 disabled:cursor-default transition-all duration-200">
                ‹
              </button>
              <div className="flex gap-2">
                {m.images.map((_, i) => (
                  <button key={i} onClick={() => jumpTo(i)} aria-label={`Photo ${i + 1}`}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${i === idx ? "bg-turq-300 scale-110" : "bg-white/25 hover:bg-white/50"}`} />
                ))}
              </div>
              <button onClick={() => go(1)} disabled={idx === n - 1} aria-label="Next photo"
                className="w-8 h-8 flex items-center justify-center rounded-sm border border-white/15 text-white/60 enabled:hover:text-turq-300 enabled:hover:border-turq-500/50 disabled:opacity-25 disabled:cursor-default transition-all duration-200">
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
  const [lang] = useLang();
  const c = copy[lang];

  return (
    <main className="min-h-screen bg-[#04100f] text-white">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="blob blob-2 absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-cyan-500/12 blur-[140px] will-change-transform" />
        <div className="blob blob-1 absolute bottom-[5%] left-[-8%] w-[400px] h-[400px] rounded-full bg-turq-600/15 blur-[120px] will-change-transform" />
      </div>

      <SiteNav />

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
