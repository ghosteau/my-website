"use client";

import Link from "next/link";
import { useLang } from "../components/lang";
import { SiteNav } from "../components/nav";
import { PixelGhost } from "../components/sprites";

const copy = {
  en: {
    kicker: "writing",
    title: "Notes & Essays",
    more: "More on the way — thoughts on math, algorithms, AI, and history.",
    read: "read →",
    /* how the post's own language is announced, in the reader's language */
    writtenIn: { en: "written in English", fr: "written in French" },
  },
  fr: {
    kicker: "écriture",
    title: "Notes & essais",
    more: "D'autres billets arrivent — réflexions sur les maths, les algorithmes, l'IA et l'histoire.",
    read: "lire →",
    writtenIn: { en: "écrit en anglais", fr: "écrit en français" },
  },
};

const posts: {
  href: string;
  date: { en: string; fr: string };
  postLang: "en" | "fr";
  tags: string[];
  en: { title: string; sub: string; blurb: string };
  fr: { title: string; sub: string; blurb: string };
}[] = [
  {
    href: "/blog/ia-un-an-plus-tard",
    date: { en: "August 1, 2026", fr: "Le 1er août 2026" },
    postLang: "fr",
    tags: ["essai", "IA"],
    en: {
      title: "L'intelligence artificielle, un an plus tard",
      sub: "Efficacité, jetons, et la course mondiale",
      blurb:
        "A year on from my first essay on AI: why efficiency and token cost now drive the industry, where Claude and OpenAI stand, and how China reshaped the race.",
    },
    fr: {
      title: "L'intelligence artificielle, un an plus tard",
      sub: "Efficacité, jetons, et la course mondiale",
      blurb:
        "Un an après mon premier essai sur l'IA : pourquoi l'efficacité et le coût des jetons dominent désormais l'industrie, où en sont Claude et OpenAI, et comment la Chine a redessiné la course.",
    },
  },
  {
    href: "/blog/generative-ai",
    date: { en: "April 9, 2025", fr: "Le 9 avril 2025" },
    postLang: "en",
    tags: ["essay", "AI"],
    en: {
      title: "The Vast World of Generative Artificial Intelligence",
      sub: "The Ascent of Deep Learning and Its Effects",
      blurb:
        "How modern generative models actually work — from 1965's earliest deep networks to transformers — and the social and ethical questions that come with them.",
    },
    fr: {
      title: "The Vast World of Generative Artificial Intelligence",
      sub: "The Ascent of Deep Learning and Its Effects",
      blurb:
        "Comment fonctionnent réellement les modèles génératifs modernes — des premiers réseaux profonds de 1965 aux transformers — et les questions sociales et éthiques qu'ils soulèvent.",
    },
  },
];

export default function Blog() {
  const [lang] = useLang();
  const c = copy[lang];

  return (
    <main className="min-h-screen bg-[#04100f] text-white">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="blob blob-1 absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-turq-600/15 blur-[140px] will-change-transform" />
        <div className="blob blob-3 absolute bottom-[5%] right-[-8%] w-[400px] h-[400px] rounded-full bg-emerald-500/10 blur-[120px] will-change-transform" />
      </div>

      <SiteNav />

      <section className="page-enter relative z-10 max-w-3xl mx-auto px-8 pt-32 pb-24">
        <p className="font-mono text-cyan-400/80 text-xs tracking-[0.3em] uppercase mb-5">{c.kicker}</p>
        <h1 className="text-5xl font-extralight tracking-tight mb-16">
          <span className="bg-gradient-to-r from-turq-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">{c.title}</span>
        </h1>

        <div className="flex flex-col gap-4">
          {posts.map((p) => (
            <Link key={p.href} href={p.href}
              className="group block border border-turq-500/15 hover:border-turq-500/40 bg-white/[0.015] hover:bg-turq-500/[0.04] rounded-sm p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-turq-950/40">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {p.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 border border-turq-500/25 bg-turq-500/[0.05] rounded-sm text-[10px] font-mono text-turq-300/80 tracking-wide uppercase">
                    {tag}
                  </span>
                ))}
                <span className="font-mono text-xs text-white/40 ml-auto">{p.date[lang]}</span>
              </div>
              <h2 className="text-white/90 text-xl font-light leading-snug group-hover:text-white transition-colors duration-200">
                {p[lang].title}
              </h2>
              <p className="text-white/50 text-sm font-light italic mt-1">{p[lang].sub}</p>
              <p className="text-white/60 text-sm font-light leading-relaxed mt-4">{p[lang].blurb}</p>
              <div className="flex items-baseline justify-between gap-4 mt-5">
                <p className="font-mono text-turq-300/70 group-hover:text-turq-300 text-xs transition-colors duration-200">{c.read}</p>
                {/* what language the piece itself is in */}
                <p className="flex items-center gap-1.5 text-white/40 text-xs italic shrink-0">
                  <span aria-hidden className="not-italic opacity-70">✎</span>
                  {c.writtenIn[p.postLang]}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* more coming */}
        <div className="flex items-center gap-4 mt-12 pl-1">
          <PixelGhost className="w-7 h-7 animate-bob opacity-60" />
          <p className="text-white/50 text-sm font-light">{c.more}</p>
        </div>
      </section>
    </main>
  );
}
