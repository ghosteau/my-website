"use client";

import Link from "next/link";
import { useLang, LangToggle } from "../components/lang";
import { PixelSparkle } from "../components/sprites";

const copy = {
  en: {
    back: "← back",
    kicker: "photos",
    title: "Moments",
    empty: "No photos here... yet.",
    sub: "Travel, Pittsburgh, France, music, and everything in between — a small photo journal is on its way.",
  },
  fr: {
    back: "← retour",
    kicker: "photos",
    title: "Moments",
    empty: "Pas encore de photos... pour l'instant.",
    sub: "Voyages, Pittsburgh, la France, la musique et tout le reste — un petit journal photo arrive bientôt.",
  },
};

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
        <Link href="/" className="font-mono text-sm text-white/50 hover:text-turq-300 transition-colors tracking-widest uppercase">{c.back}</Link>
        <LangToggle lang={lang} toggle={toggle} />
      </nav>

      <section className="relative z-10 max-w-4xl mx-auto px-8 pt-32 pb-24">
        <p className="font-mono text-cyan-400/80 text-xs tracking-[0.3em] uppercase mb-5">{c.kicker}</p>
        <h1 className="text-5xl font-extralight tracking-tight mb-16">
          <span className="bg-gradient-to-r from-turq-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">{c.title}</span>
        </h1>

        {/* future gallery grid — placeholder frames until real photos land */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12" aria-hidden>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="aspect-square border border-dashed border-white/[0.1] rounded-sm bg-white/[0.015] flex items-center justify-center"
            >
              {i === 1 && <PixelSparkle className="w-5 h-5 animate-twinkle opacity-60" />}
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="font-mono text-white/70 text-lg">{c.empty}</p>
          <p className="text-white/50 text-sm font-light leading-relaxed max-w-md mx-auto mt-3">{c.sub}</p>
        </div>
      </section>
    </main>
  );
}
