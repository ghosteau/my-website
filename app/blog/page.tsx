"use client";

import { useLang, LangToggle } from "../components/lang";
import { PixelGhost } from "../components/sprites";

const copy = {
  en: {
    back: "← back",
    kicker: "writing",
    title: "Notes & Essays",
    intro:
      "A place for half-finished thoughts on math, algorithms, AI, history, and whatever else I'm reading. Nothing published yet — but here's what's brewing.",
    soon: "drafting",
    posts: [
      { tag: "AI", title: "Why I'm still undecided on research vs. industry", blurb: "Thinking out loud about the PhD question — and why curiosity might matter more than the title." },
      { tag: "Algorithms", title: "What grinding LeetCode actually taught me", blurb: "Beyond the interview prep: pattern recognition, and learning to love a clean solution." },
      { tag: "Math", title: "Linear algebra is the language of everything", blurb: "Notes from math-meets-code on why eigenvectors keep showing up everywhere." },
      { tag: "History", title: "Napoléon, imagination, and engineering", blurb: "On why 'l'imagination gouverne le monde' is good advice for builders too." },
    ],
    footer: "Check back soon — or nudge me on LinkedIn.",
  },
  fr: {
    back: "← retour",
    kicker: "écriture",
    title: "Notes & essais",
    intro:
      "Un endroit pour mes réflexions inachevées sur les maths, les algorithmes, l'IA, l'histoire et tout ce que je lis. Rien de publié pour l'instant — mais voici ce qui mijote.",
    soon: "en cours",
    posts: [
      { tag: "IA", title: "Pourquoi j'hésite encore entre recherche et industrie", blurb: "Réflexion à voix haute sur la question du doctorat — et pourquoi la curiosité compte peut-être plus que le titre." },
      { tag: "Algorithmes", title: "Ce que LeetCode m'a vraiment appris", blurb: "Au-delà de la préparation aux entretiens : la reconnaissance de motifs et l'amour d'une solution élégante." },
      { tag: "Maths", title: "L'algèbre linéaire est le langage de tout", blurb: "Notes de math-meets-code sur l'omniprésence des vecteurs propres." },
      { tag: "Histoire", title: "Napoléon, l'imagination et l'ingénierie", blurb: "Pourquoi « l'imagination gouverne le monde » est aussi un bon conseil pour les bâtisseurs." },
    ],
    footer: "Revenez bientôt — ou faites-moi signe sur LinkedIn.",
  },
};

const tagColor: Record<string, string> = {
  AI: "text-turq-300/80 border-turq-500/30",
  IA: "text-turq-300/80 border-turq-500/30",
  Algorithms: "text-cyan-300/80 border-cyan-500/30",
  Algorithmes: "text-cyan-300/80 border-cyan-500/30",
  Math: "text-emerald-300/80 border-emerald-500/30",
  Maths: "text-emerald-300/80 border-emerald-500/30",
  History: "text-turq-300/80 border-turq-500/30",
  Histoire: "text-turq-300/80 border-turq-500/30",
};

export default function Blog() {
  const [lang, , toggle] = useLang();
  const c = copy[lang];

  return (
    <main className="min-h-screen bg-[#04100f] text-white">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="blob blob-1 absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-turq-600/15 blur-[140px]" />
        <div className="blob blob-3 absolute bottom-[5%] right-[-8%] w-[400px] h-[400px] rounded-full bg-emerald-500/10 blur-[120px]" />
      </div>

      <nav className="fixed top-0 w-full z-50 px-8 py-5 flex justify-between items-center border-b border-white/[0.06] backdrop-blur-md bg-[#04100f]/75">
        <a href="/" className="font-mono text-sm text-white/40 hover:text-turq-300 transition-colors tracking-widest uppercase">{c.back}</a>
        <LangToggle lang={lang} toggle={toggle} />
      </nav>

      <section className="relative z-10 max-w-3xl mx-auto px-8 pt-32 pb-24">
        <p className="font-mono text-cyan-400/60 text-xs tracking-[0.3em] uppercase mb-5">{c.kicker}</p>
        <h1 className="text-5xl font-extralight tracking-tight mb-6">
          <span className="bg-gradient-to-r from-turq-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">{c.title}</span>
        </h1>
        <p className="text-white/45 font-light leading-relaxed max-w-2xl mb-14">{c.intro}</p>

        <div className="flex flex-col gap-3">
          {c.posts.map((p) => (
            <div key={p.title} className="group border border-white/[0.07] bg-white/[0.015] rounded-sm p-6 hover:border-turq-500/30 hover:bg-turq-500/[0.03] transition-all duration-300 cursor-default">
              <div className="flex items-center gap-3 mb-2">
                <span className={`font-mono text-[10px] uppercase tracking-widest border rounded-sm px-2 py-0.5 ${tagColor[p.tag] ?? "text-white/40 border-white/15"}`}>{p.tag}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/20">{c.soon}</span>
              </div>
              <h2 className="text-white/80 font-light text-lg group-hover:text-white transition-colors">{p.title}</h2>
              <p className="text-white/35 text-sm font-light leading-relaxed mt-1.5">{p.blurb}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 mt-14 text-white/25 text-sm font-light">
          <PixelGhost className="w-6 h-6 animate-bob opacity-70" />
          {c.footer}
        </div>
      </section>
    </main>
  );
}
