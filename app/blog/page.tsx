"use client";

import Link from "next/link";
import { useLang, LangToggle } from "../components/lang";
import { PixelGhost } from "../components/sprites";

const copy = {
  en: {
    back: "← back",
    kicker: "writing",
    title: "Notes & Essays",
    empty: "Nothing here... yet.",
    sub: "A place for thoughts on math, algorithms, AI, and history is coming. Check back soon — or nudge me on LinkedIn.",
  },
  fr: {
    back: "← retour",
    kicker: "écriture",
    title: "Notes & essais",
    empty: "Il n'existe rien ici... pour l'instant.",
    sub: "Un espace pour mes réflexions sur les maths, les algorithmes, l'IA et l'histoire arrive bientôt. Revenez plus tard — ou faites-moi signe sur LinkedIn.",
  },
};

export default function Blog() {
  const [lang, , toggle] = useLang();
  const c = copy[lang];

  return (
    <main className="min-h-screen bg-[#04100f] text-white">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="blob blob-1 absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-turq-600/15 blur-[140px] will-change-transform" />
        <div className="blob blob-3 absolute bottom-[5%] right-[-8%] w-[400px] h-[400px] rounded-full bg-emerald-500/10 blur-[120px] will-change-transform" />
      </div>

      <nav className="fixed top-0 w-full z-50 px-8 py-5 flex justify-between items-center border-b border-white/[0.06] backdrop-blur-md bg-[#04100f]/75">
        <Link href="/" className="font-mono text-sm text-white/40 hover:text-turq-300 transition-colors tracking-widest uppercase">{c.back}</Link>
        <LangToggle lang={lang} toggle={toggle} />
      </nav>

      <section className="relative z-10 max-w-3xl mx-auto px-8 pt-32 pb-24">
        <p className="font-mono text-cyan-400/60 text-xs tracking-[0.3em] uppercase mb-5">{c.kicker}</p>
        <h1 className="text-5xl font-extralight tracking-tight mb-16">
          <span className="bg-gradient-to-r from-turq-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">{c.title}</span>
        </h1>

        {/* empty state */}
        <div className="flex flex-col items-center text-center gap-6 border border-white/[0.07] bg-white/[0.015] rounded-sm py-20 px-8">
          <PixelGhost className="w-12 h-12 animate-bob opacity-70" />
          <p className="font-mono text-white/55 text-lg">{c.empty}</p>
          <p className="text-white/35 text-sm font-light leading-relaxed max-w-md">{c.sub}</p>
        </div>
      </section>
    </main>
  );
}
