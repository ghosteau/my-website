"use client";

import Link from "next/link";
import { useLang } from "../components/lang";
import { SiteNav } from "../components/nav";
import { PixelGhost } from "../components/sprites";

const copy = {
  en: {
    kicker: "notebook",
    title: "Notes & Essays",
    intro: "Long-form thinking on artificial intelligence, engineering, language, and the questions that survive the first answer.",
    read: "Read essay",
    more: "More on the way—math, algorithms, AI, history, and the occasional poem.",
    writtenIn: { en: "written in English", fr: "written in French" },
    index: "entry",
    shelfTitle: "manny@pitt: ~/writing",
    shelves: [
      ["essays/", "2 published"],
      ["poetry/", "opening soon"],
      ["books-and-literature/", "reviews forthcoming"],
    ],
  },
  fr: {
    kicker: "carnet",
    title: "Notes & essais",
    intro: "Des réflexions au long cours sur l’intelligence artificielle, l’ingénierie, les langues et les questions qui résistent à la première réponse.",
    read: "Lire l’essai",
    more: "D’autres textes arrivent—mathématiques, algorithmes, IA, histoire et parfois un poème.",
    writtenIn: { en: "écrit en anglais", fr: "écrit en français" },
    index: "entrée",
    shelfTitle: "manny@pitt: ~/écriture",
    shelves: [
      ["essais/", "2 publiés"],
      ["poésie/", "bientôt"],
      ["livres-et-littérature/", "critiques à venir"],
    ],
  },
};

const posts = [
  {
    href: "/blog/ia-un-an-plus-tard",
    date: { en: "August 1, 2026", fr: "Le 1er août 2026" },
    postLang: "fr" as const,
    tags: ["essai", "IA", "industrie"],
    en: {
      title: "L’intelligence artificielle, un an plus tard",
      sub: "Efficiency, tokens, and the global race",
      blurb:
        "A year on from my first essay on AI: why efficiency and token cost now drive the industry, where Claude and OpenAI stand, and how China reshaped the race.",
    },
    fr: {
      title: "L’intelligence artificielle, un an plus tard",
      sub: "Efficacité, jetons et la course mondiale",
      blurb:
        "Un an après mon premier essai sur l’IA : pourquoi l’efficacité et le coût des jetons dominent désormais l’industrie, où en sont Claude et OpenAI et comment la Chine a redessiné la course.",
    },
  },
  {
    href: "/blog/generative-ai",
    date: { en: "April 9, 2025", fr: "Le 9 avril 2025" },
    postLang: "en" as const,
    tags: ["essay", "AI", "deep learning"],
    en: {
      title: "The Vast World of Generative Artificial Intelligence",
      sub: "The ascent of deep learning and its effects",
      blurb:
        "How modern generative models work—from 1965’s earliest deep networks to transformers—and the social and ethical questions that come with them.",
    },
    fr: {
      title: "The Vast World of Generative Artificial Intelligence",
      sub: "L’essor de l’apprentissage profond et ses effets",
      blurb:
        "Comment fonctionnent les modèles génératifs modernes—des premiers réseaux profonds de 1965 aux transformers—et les questions sociales et éthiques qu’ils soulèvent.",
    },
  },
];

export default function Blog() {
  const [lang] = useLang();
  const c = copy[lang];

  return (
    <main className="site-canvas text-white">
      <div className="site-noise" aria-hidden />
      <SiteNav />

      <section className="content-rail page-enter relative z-10 pb-24 pt-32 md:pt-40">
        <header className="grid items-end gap-8 border-b border-white/[0.08] pb-10 md:grid-cols-[1fr_.72fr]">
          <div>
            <p className="eyebrow">{c.kicker} / selected writing</p>
            <h1 className="editorial-title mt-5 text-6xl leading-none md:text-8xl">{c.title}</h1>
          </div>
          <p className="max-w-xl text-sm leading-7 text-white/55 md:justify-self-end">{c.intro}</p>
        </header>

        <div className="terminal-window mt-8">
          <div className="terminal-bar">
            <span className="terminal-dot bg-[#f4c95d]/55" />
            <span className="terminal-dot bg-turq-400/45" />
            <span className="terminal-dot bg-white/15" />
            <span className="ml-2 font-mono text-[9px] tracking-wide text-white/28">{c.shelfTitle}</span>
          </div>
          <div className="grid gap-px bg-white/[0.06] sm:grid-cols-3">
            {c.shelves.map(([shelf, status], index) => (
              <div key={shelf} className="bg-[#050e18] px-5 py-4 font-mono text-[10px] leading-relaxed">
                <p className="text-turq-200/72"><span className="mr-2 text-white/22">{index === c.shelves.length - 1 ? "└──" : "├──"}</span>{shelf}</p>
                <p className="mt-1 pl-8 text-white/30">{status}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5">
          {posts.map((post, index) => (
            <Link
              key={post.href}
              href={post.href}
              className="surface surface-interactive group grid overflow-hidden rounded-[1.4rem] md:grid-cols-[9rem_1fr_auto]"
            >
              <div className="flex min-h-28 items-center border-b border-white/[0.07] px-7 md:min-h-full md:border-b-0 md:border-r">
                <div>
                  <p className="project-index">{c.index} / {String(index + 1).padStart(2, "0")}</p>
                  <p className="editorial-title mt-3 text-4xl text-white/88">0{index + 1}</p>
                </div>
              </div>

              <div className="p-7 md:p-9">
                <div className="flex flex-wrap items-center gap-2">
                  {post.tags.map((tag) => <span key={tag} className="chip">{tag}</span>)}
                  <span className="ml-auto font-mono text-[10px] tracking-wide text-white/34">{post.date[lang]}</span>
                </div>
                <h2 className="editorial-title mt-7 max-w-3xl text-3xl leading-tight text-white md:text-4xl">
                  {post[lang].title}
                </h2>
                <p className="mt-2 text-sm italic text-turq-100/58">{post[lang].sub}</p>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-white/55">{post[lang].blurb}</p>
                <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                  <span className="link-arrow">{c.read} <span aria-hidden>→</span></span>
                  <span className="text-xs italic text-white/35">{c.writtenIn[post.postLang]}</span>
                </div>
              </div>

              <div className="hidden w-20 place-items-center border-l border-white/[0.07] text-2xl text-white/16 transition-colors group-hover:text-turq-200 md:grid">
                ↗
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-14 flex items-center gap-4 border-t border-white/[0.07] pt-8">
          <PixelGhost className="w-7 animate-bob opacity-55" />
          <p className="text-sm text-white/45">{c.more}</p>
        </div>
      </section>
    </main>
  );
}
