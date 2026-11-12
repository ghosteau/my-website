"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLang, type Lang } from "../components/lang";
import { SiteNav } from "../components/nav";

const copy = {
  en: {
    kicker: "photos",
    title: "Moments",
    intro: "A visual journal of places I have lived, places I keep returning to, and trips that stayed with me long after I came home.",
    more: "More moments on the way.",
    hint: "Swipe, use the arrows, or choose a frame",
    choose: "Choose a place",
  },
  fr: {
    kicker: "photos",
    title: "Moments",
    intro: "Un journal visuel des lieux où j’ai vécu, de ceux où je reviens et des voyages qui me sont restés longtemps après le retour.",
    more: "D’autres moments arrivent bientôt.",
    hint: "Balayez, utilisez les flèches ou choisissez une image",
    choose: "Choisir un lieu",
  },
};

type Moment = {
  images: string[];
  photoAlt: string;
  aspect?: string;
  fit?: "cover" | "contain";
  en: { caption: string; date: string; blurb: string };
  fr: { caption: string; date: string; blurb: string };
  tags: { key: string; en: string; fr: string }[];
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
    photoAlt: "Paris and Île-de-France",
    aspect: "1 / 1",
    fit: "contain",
    en: {
      caption: "Paris & Île-de-France",
      date: "January — May 2026",
      blurb:
        "For five months, Île-de-France became ordinary life. Cergy was home base; Paris was the wider orbit—the RER to ENSEA, long walks after class, bad directions, better conversations, and a growing list of places I wanted to understand rather than merely photograph.",
    },
    fr: {
      caption: "Paris & Île-de-France",
      date: "De janvier à mai 2026",
      blurb:
        "Pendant cinq mois, l’Île-de-France est devenue mon quotidien. Cergy était mon point d’ancrage ; Paris, mon horizon plus large—le RER vers l’ENSEA, les longues marches après les cours, de mauvaises directions, de meilleures conversations et une liste toujours plus longue de lieux à comprendre plutôt qu’à simplement photographier.",
    },
    tags: [
      { key: "france", en: "France", fr: "France" },
      { key: "architecture", en: "Architecture", fr: "Architecture" },
      { key: "history", en: "History", fr: "Histoire" },
      { key: "montaigne", en: "Montaigne", fr: "Montaigne" },
    ],
  },
  {
    images: [
      "/photos/south-france/1-saint-raphael-bonaparte.jpg",
      "/photos/south-france/2-saint-raphael-waterfront.jpg",
      "/photos/south-france/3-calanques-vista.jpg",
      "/photos/south-france/4-calanques-cove.jpg",
      "/photos/south-france/5-avignon-palais.jpg",
      "/photos/south-france/6-villefranche-sur-mer.jpg",
      "/photos/south-france/7-nice-overlook.jpg",
    ],
    photoAlt: "Grand Tour du Sud in France",
    aspect: "1 / 1",
    fit: "contain",
    en: {
      caption: "Grand Tour du Sud",
      date: "Spring 2026",
      blurb:
        "From Bonaparte’s landing marker in Saint-Raphaël to the heights of the Calanques, the Palais des Papes in Avignon, and the coast around Villefranche-sur-Mer and Nice. History was everywhere, but so was the light—which is probably why I came home with far too many photographs.",
    },
    fr: {
      caption: "Grand Tour du Sud",
      date: "Printemps 2026",
      blurb:
        "Du monument rappelant le débarquement de Bonaparte à Saint-Raphaël jusqu’aux hauteurs des Calanques, au Palais des Papes d’Avignon et à la côte de Villefranche-sur-Mer et de Nice. L’histoire était partout, mais la lumière aussi—ce qui explique sans doute le nombre déraisonnable de photos rapportées.",
    },
    tags: [
      { key: "france", en: "France", fr: "France" },
      { key: "mediterranean", en: "Mediterranean", fr: "Méditerranée" },
      { key: "history", en: "History", fr: "Histoire" },
      { key: "grand-tour", en: "Grand Tour", fr: "Grand Tour" },
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
    photoAlt: "Stockholm, Sweden",
    aspect: "1 / 1",
    fit: "contain",
    en: {
      caption: "Stockholm, Sweden",
      date: "March 2026",
      blurb:
        "A brief March trip, not a place I lived—and perhaps that is why it remains so sharply framed: the Nordiska museet, the Royal Palace, the Riksdag, Karl XII above Kungsträdgården, and Riddarholmen glowing across broken ice at night.",
    },
    fr: {
      caption: "Stockholm, Suède",
      date: "Mars 2026",
      blurb:
        "Un bref voyage en mars, et non un lieu où j’ai vécu—ce qui explique peut-être la netteté du souvenir : le Nordiska museet, le Palais royal, le Riksdag, Karl XII au-dessus de Kungsträdgården et Riddarholmen illuminé sur la glace brisée.",
    },
    tags: [
      { key: "sweden", en: "Sweden", fr: "Suède" },
      { key: "architecture", en: "Architecture", fr: "Architecture" },
      { key: "history", en: "History", fr: "Histoire" },
      { key: "winter", en: "Winter", fr: "Hiver" },
    ],
  },
  {
    images: [
      "/photos/quebec/parliament-1.jpg",
      "/photos/quebec/parliament-2.jpg",
      "/photos/quebec/parliament-3.jpg",
      "/photos/quebec/parliament-4.jpg",
      "/photos/quebec/quebec-city-overlook.jpg",
    ],
    photoAlt: "Québec City",
    en: {
      caption: "Québec City",
      date: "May 27, 2026",
      blurb: "I arrived curious about the Parliament and left thinking about language, memory, and the particular way Québec tells its own story. The city makes those questions tangible: political history, French in public life, and a culture that feels entirely its own.",
    },
    fr: {
      caption: "Ville de Québec",
      date: "Le 27 mai 2026",
      blurb: "Je suis entré au Parlement curieux de l’institution et j’en suis ressorti en réfléchissant à la langue, à la mémoire et à la manière singulière dont le Québec raconte sa propre histoire. La ville rend ces questions concrètes : l’histoire politique, le français dans la vie publique et une culture pleinement distincte.",
    },
    tags: [
      { key: "quebec", en: "Québec", fr: "Québec" },
      { key: "canada", en: "Canada", fr: "Canada" },
      { key: "french", en: "French", fr: "Français" },
      { key: "government", en: "Government", fr: "Gouvernement" },
    ],
  },
  {
    images: [
      "/photos/stowe/1-summit-flag.jpg",
      "/photos/stowe/2-ski-selfie.jpg",
      "/photos/stowe/3-fresh-tracks.jpg",
    ],
    photoAlt: "Skiing in Stowe, Vermont",
    aspect: "3 / 4",
    fit: "contain",
    en: {
      caption: "Stowe, Vermont",
      date: "January 2025",
      blurb: "Bluebird cold on Mount Mansfield: ice on the rails, fresh tracks, and the American flag holding its ground above the clouds. Skiing is one of the rare things that empties my head completely—there is only the mountain and the next turn.",
    },
    fr: {
      caption: "Stowe, Vermont",
      date: "Janvier 2025",
      blurb: "Un froid limpide sur le mont Mansfield : du givre sur les rampes, des traces fraîches et le drapeau américain au-dessus des nuages. Le ski est l’une des rares activités qui vide complètement l’esprit—il ne reste que la montagne et le prochain virage.",
    },
    tags: [
      { key: "usa", en: "United States", fr: "États-Unis" },
      { key: "skiing", en: "Skiing", fr: "Ski" },
      { key: "vermont", en: "Vermont", fr: "Vermont" },
      { key: "winter", en: "Winter", fr: "Hiver" },
    ],
  },
  {
    images: ["/photos/dc/rochambeau-1.jpg", "/photos/dc/capitol.jpg"],
    photoAlt: "Washington, D.C.",
    en: {
      caption: "Washington, D.C.",
      date: "November 17, 2025",
      blurb:
        "At the Rochambeau Memorial—the French general who helped America win its independence—and the U.S. Capitol. A fitting stop for someone with ties on both sides of the Atlantic (and yes, repping Pitt).",
    },
    fr: {
      caption: "Washington, D.C.",
      date: "Le 17 novembre 2025",
      blurb:
        "Au mémorial de Rochambeau—le général français qui a aidé l’Amérique à gagner son indépendance—et au Capitole. Un bel arrêt pour quelqu’un avec des attaches des deux côtés de l’Atlantique (et oui, aux couleurs de Pitt).",
    },
    tags: [
      { key: "usa", en: "United States", fr: "États-Unis" },
      { key: "franco-american", en: "Franco-American history", fr: "Histoire franco-américaine" },
      { key: "history", en: "History", fr: "Histoire" },
      { key: "pitt", en: "Pitt", fr: "Pitt" },
    ],
  },
];

// Keep the current photo visible until its replacement has fully decoded.
function PhotoFrame({ src, alt, fitClass }: { src: string; alt: string; fitClass: string }) {
  const [frame, setFrame] = useState({ src, alt, previous: "" });
  useEffect(() => {
    let cancelled = false;
    const next = new window.Image();
    next.src = src;
    next.decode().then(() => {
      if (!cancelled) setFrame(current => current.src === src ? current : { src, alt, previous: current.src });
    }).catch(() => { /* Retain the last usable image if the next request fails. */ });
    return () => { cancelled = true; };
  }, [src, alt]);

  return <>
    {frame.previous && <img src={frame.previous} alt="" aria-hidden draggable={false} className={"absolute inset-0 h-full w-full pointer-events-none " + fitClass} /> /* eslint-disable-line @next/next/no-img-element */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img key={frame.src} src={frame.src} alt={frame.alt} draggable={false} decoding="async" className={"photo-enter relative block h-full w-full pointer-events-none " + fitClass} />
  </>;
}

function MomentViewer({
  moment,
  lang,
  hint,
}: {
  moment: Moment;
  lang: Lang;
  hint: string;
}) {
  const count = moment.images.length;
  const [index, setIndex] = useState(0);
  const startX = useRef(0);
  const currentX = useRef(0);
  const isDragging = useRef(false);
  const fitClass = moment.fit === "cover" ? "object-cover" : "object-contain";
  const clamp = useCallback((value: number) => Math.max(0, Math.min(count - 1, value)), [count]);
  const go = useCallback((direction: number) => setIndex((value) => clamp(value + direction)), [clamp]);

  useEffect(() => {
    const neighbors = [index - 1, index + 1].filter((candidate) => candidate >= 0 && candidate < count);
    neighbors.forEach((candidate) => {
      const preload = new window.Image();
      preload.src = moment.images[candidate];
    });
  }, [count, index, moment.images]);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (count < 2) return;
    if ((event.target as HTMLElement).closest("button")) return;
    isDragging.current = true;
    startX.current = event.clientX;
    currentX.current = event.clientX;
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const onPointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const delta = currentX.current - startX.current;
    if (delta < -48) go(1);
    if (delta > 48) go(-1);
  };

  return (
    <div className="grid min-w-0 items-start gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,.55fr)] lg:gap-10">
      <div className="min-w-0">
        <div
          onPointerDown={onPointerDown}
          onPointerMove={(event) => { currentX.current = event.clientX; }}
          onPointerUp={onPointerUp}
          onPointerCancel={() => { isDragging.current = false; }}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") go(-1);
            if (event.key === "ArrowRight") go(1);
          }}
          tabIndex={0}
          className="photo-stage inverse-surface surface group relative w-full min-w-0 max-w-full select-none rounded-[1.15rem] focus:outline-none sm:rounded-[1.5rem]"
          style={{ touchAction: "pan-y", aspectRatio: moment.aspect ?? "4 / 3" }}
          role="group"
          aria-label={moment[lang].caption}
        >
          <PhotoFrame
            src={moment.images[index]}
            alt={moment.photoAlt + " " + String(index + 1) + "/" + String(count)}
            fitClass={fitClass}
          />
          <div className="pointer-events-none absolute inset-x-3 bottom-3 z-10 flex items-end justify-between gap-3 sm:inset-x-5 sm:bottom-5 sm:gap-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/72">
              {moment[lang].caption}
            </p>
            <span
              aria-atomic="true"
              aria-live="polite"
              className="rounded-full border border-ink/15 bg-[#040b14]/60 px-2.5 py-1 font-mono text-[10px] text-ink/70 backdrop-blur-md"
            >
              {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
          </div>

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => { event.stopPropagation(); go(-1); }}
                onPointerDown={(event) => event.stopPropagation()}
                onPointerUp={(event) => event.stopPropagation()}
                disabled={index === 0}
                aria-label="Previous photo"
                className="absolute left-2 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-ink/15 bg-[#040b14]/72 text-lg text-ink/85 opacity-100 backdrop-blur-md transition-all enabled:hover:border-turq-300/50 enabled:hover:text-teal-800 disabled:hidden sm:left-4 sm:h-11 sm:w-11 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100"
              >
                ←
              </button>
              <button
                type="button"
                onClick={(event) => { event.stopPropagation(); go(1); }}
                onPointerDown={(event) => event.stopPropagation()}
                onPointerUp={(event) => event.stopPropagation()}
                disabled={index === count - 1}
                aria-label="Next photo"
                className="absolute right-2 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-ink/15 bg-[#040b14]/72 text-lg text-ink/85 opacity-100 backdrop-blur-md transition-all enabled:hover:border-turq-300/50 enabled:hover:text-teal-800 disabled:hidden sm:right-4 sm:h-11 sm:w-11 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100"
              >
                →
              </button>
            </>
          )}
        </div>

        {count > 1 && (
          <div className="mt-4">
            <div className="gallery-strip flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2">
              {moment.images.map((src, imageIndex) => (
                <button
                  type="button"
                  key={src}
                  onClick={() => setIndex(imageIndex)}
                  aria-label={"Photo " + String(imageIndex + 1)}
                  aria-current={imageIndex === index ? "true" : undefined}
                  className={"relative h-14 w-20 shrink-0 snap-start overflow-hidden border transition-[opacity,border-color,box-shadow] duration-200 " + (imageIndex === index ? "border-[var(--signal)] opacity-100 ring-1 ring-[var(--signal)]" : "border-ink/15 opacity-55 hover:opacity-90")}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="80px"
                    quality={90}
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
            <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-ink/75">{hint}</p>
          </div>
        )}
      </div>

      <aside className="surface min-w-0 rounded-[1.15rem] p-5 sm:rounded-[1.4rem] sm:p-7 lg:sticky lg:top-24 lg:p-8">
        <p className="eyebrow">{moment[lang].date}</p>
        <h2 className="editorial-title mt-5 text-4xl leading-[1.02] text-ink">{moment[lang].caption}</h2>
        <p className="mt-6 text-sm font-normal leading-7 text-ink/75">{moment[lang].blurb}</p>
        <div className="mt-8 flex flex-wrap gap-2 border-t border-ink/[0.08] pt-6">
          {moment.tags.map((tag) => (
            <span key={tag.key} className="chip gap-2">
              {tag[lang]}
            </span>
          ))}
        </div>
      </aside>
    </div>
  );
}

export default function Photos() {
  const [lang] = useLang();
  const c = copy[lang];
  const [activeMoment, setActiveMoment] = useState(0);
  const active = moments[activeMoment];

  return (
    <main className="site-canvas text-ink">
      <div className="site-noise" aria-hidden />
      <SiteNav />

      <section className="content-rail page-enter relative z-10 pb-24 pt-14 md:pt-16">
        <div className="grid items-end gap-8 border-b border-ink/[0.08] pb-10 md:grid-cols-[1fr_.7fr]">
          <div>
            <p className="eyebrow">{c.kicker} / visual archive</p>
            <h1 className="editorial-title mt-5 text-5xl sm:text-6xl md:text-8xl">{c.title}</h1>
          </div>
          <p className="max-w-xl text-sm leading-7 text-ink/75 md:justify-self-end">{c.intro}</p>
        </div>

        <div className="mt-8">
          <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.16em] text-ink/75">{c.choose}</p>
          <div className="gallery-strip flex snap-x snap-mandatory gap-2 overflow-x-auto pb-3">
            {moments.map((moment, index) => (
              <button
                type="button"
                key={moment.images[0]}
                onClick={() => setActiveMoment(index)}
                aria-pressed={index === activeMoment}
                className="photo-place shrink-0 snap-start transition-colors"
              >
                {moment[lang].caption}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-9">
          <MomentViewer key={active.images[0]} moment={active} lang={lang} hint={c.hint} />
        </div>

        <div className="mt-16 flex items-center gap-3 border-t border-ink/[0.07] pt-8">
          <p className="text-sm text-ink/75">{c.more}</p>
        </div>
      </section>
    </main>
  );
}
