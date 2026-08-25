"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLang, type Lang } from "./components/lang";
import { SiteNav } from "./components/nav";
import { ConnectionsGraph } from "./components/graph";
import {
  GameSprite,
  GitHubMark,
  LinkedInMark,
  PixelGhost,
  PixelManny,
  PixelSparkle,
} from "./components/sprites";
import {
  courses,
  experience,
  games,
  projects,
  research,
  SPOTIFY_ALBUM_ID,
  ui,
} from "./content";

const homeCopy = {
  en: {
    heroEyebrow: "Emmanuel McGrail / engineer & researcher in the making",
    heroTop: "I turn hard problems into",
    heroAccent: "systems you can use.",
    heroBody:
      "I build at the intersection of machine learning, high-performance computing, and data engineering. Pittsburgh is home; five months in Île-de-France and a lasting fascination with Québec shape how I think about language, place, and clarity.",
    primaryCta: "Explore selected work",
    secondaryCta: "Read my résumé",
    available: "Pitt ’27 · open to research and engineering conversations",
    terminalTitle: "manny@pitt: ~/current",
    terminalCommand: "./manny --now",
    terminalLines: [
      ["focus", "AI systems + efficient inference"],
      ["building", "voxel models + GPU mathematics"],
      ["learning", "deep learning, vision, algorithms"],
      ["shell", "zsh / macOS / Unix at heart"],
      ["off_clock", "drums, poetry, history, Pittsburgh sports"],
    ],
    photoPlace: "Fontainebleau · Île-de-France · Spring 2026",
    routeLabel: "places that shaped the work",
    places: [
      ["Pittsburgh", "home"],
      ["Île-de-France", "Cergy · Paris · 2026"],
      ["Québec", "language + culture"],
    ],
    sections: {
      work: ["01 / selected work", "Ideas made concrete.", "A few projects where the mathematics, systems work, and end-user experience all matter."],
      experience: ["02 / experience", "Engineering in production.", "Real systems, real constraints, and a habit of leaving things faster, clearer, and more reliable."],
      about: ["03 / point of view", "More than one track.", "The best work usually begins where disciplines overlap."],
      research: ["04 / research", "Questions worth staying with.", "I am still deciding exactly where research fits into my future. I know I want difficult questions, careful experiments, and useful outcomes."],
      personal: ["05 / beyond the terminal", "A life with texture.", "Writing, travel, music, games, and the things that make the technical work feel human."],
    },
    caseStudy: "case study",
    source: "source",
    model: "model",
    dataset: "dataset",
    allProjects: "All repositories on GitHub",
    fullResume: "Full experience in my résumé",
    aboutTitle: "Researcher by instinct. Generalist by design.",
    ties: "Pittsburgh ↔ Québec ↔ France",
    researchLink: "Research & education details",
    personalCards: {
      writing: {
        eyebrow: "writing / FR + EN",
        title: "Thinking in public.",
        body: "Essays for now; poetry, literature, and book reviews as the notebook grows. A place for ideas that need more room than a project card can give them.",
        link: "Read the notebook",
      },
      moments: {
        eyebrow: "visual journal / 2025—2026",
        title: "Places that changed the frame.",
        body: "Five months living in Île-de-France, Québec through language and culture, Vermont powder, and the trips in between—an evolving visual archive of the life behind the résumé.",
        link: "Open the photo atlas",
      },
      music: {
        eyebrow: "music / Vigilance",
        title: "Before the code, there was rhythm.",
        body: "I composed much of this album and played drums on it. Music remains one of the ways I work through an idea before I have words for it.",
        link: "Listen on Spotify",
      },
      home: {
        eyebrow: "home / Pittsburgh",
        title: "The city is part of the operating system.",
        body: "Pittsburgh is not a palette I borrowed for the site. It is Steelers snow, Pirates evenings, Pitt Saturdays, bridges in every direction, and the place I keep returning to.",
        stadium: "North Shore · December 24, 2022",
        ballpark: "PNC Park · Pittsburgh",
      },
      offClock: {
        eyebrow: "off the clock",
        title: "Games, powder days, and long campaigns.",
        body: "When I am away from the terminal: skiing, Pokémon, Elder Scrolls, Zelda, Minecraft, Mario, Sonic, and whichever Pittsburgh season is testing my patience.",
      },
    },
    contactEyebrow: "Have a hard problem?",
    contactTitle: "Let’s compare notes.",
    contactBody: "Engineering, research, open-source work, a stubborn algorithm, or an unexpectedly good history book—I’m always glad to hear from thoughtful people.",
    email: "Email me",
    footer: "Designed and built in Pittsburgh.",
  },
  fr: {
    heroEyebrow: "Emmanuel McGrail / ingénierie, données & IA",
    heroTop: "Je transforme la complexité en",
    heroAccent: "systèmes utiles.",
    heroBody:
      "Je conçois des systèmes d’IA et de données, de l’idée au déploiement. Pittsburgh est chez moi ; cinq mois en Île-de-France et une fascination durable pour le Québec nourrissent aussi mon rapport aux langues, aux lieux et à la clarté.",
    primaryCta: "Découvrir mes projets",
    secondaryCta: "Lire mon CV",
    available: "Pitt 2027 · ouvert aux échanges en recherche et ingénierie",
    terminalTitle: "manny@pitt: ~/actuellement",
    terminalCommand: "./manny --maintenant",
    terminalLines: [
      ["axe", "systèmes d’IA + inférence efficace"],
      ["projets", "modèles voxel + mathématiques GPU"],
      ["études", "apprentissage profond, vision, algorithmes"],
      ["shell", "zsh / macOS / Unix dans l’âme"],
      ["ailleurs", "batterie, poésie, histoire, sports de Pittsburgh"],
    ],
    photoPlace: "Fontainebleau · Île-de-France · Printemps 2026",
    routeLabel: "les lieux qui ont façonné mon travail",
    places: [
      ["Pittsburgh", "chez moi"],
      ["Île-de-France", "Cergy · Paris · 2026"],
      ["Québec", "langue + culture"],
    ],
    sections: {
      work: ["01 / projets choisis", "Des idées rendues concrètes.", "Quelques projets où les mathématiques, les systèmes et l’expérience utilisateur comptent autant."],
      experience: ["02 / expérience", "L’ingénierie en production.", "De vrais systèmes, de vraies contraintes, et l’habitude de rendre les choses plus rapides, plus claires et plus fiables."],
      about: ["03 / point de vue", "Plus d’une seule voie.", "Les meilleurs projets commencent souvent à la rencontre de plusieurs disciplines."],
      research: ["04 / recherche", "Des questions qui méritent du temps.", "Je réfléchis encore à la place exacte de la recherche dans mon avenir. Je sais toutefois que je veux des questions difficiles, des expériences rigoureuses et des résultats utiles."],
      personal: ["05 / au-delà du terminal", "Une vie avec du relief.", "L’écriture, les voyages, la musique, les jeux et tout ce qui rend le travail technique profondément humain."],
    },
    caseStudy: "projet phare",
    source: "code source",
    model: "modèle",
    dataset: "jeu de données",
    allProjects: "Tous mes dépôts sur GitHub",
    fullResume: "Toute mon expérience dans mon CV",
    aboutTitle: "Chercheur par instinct. Généraliste par choix.",
    ties: "Pittsburgh ↔ Québec ↔ France",
    researchLink: "Détails sur la recherche et la formation",
    personalCards: {
      writing: {
        eyebrow: "écriture / FR + EN",
        title: "Réfléchir en public.",
        body: "Des essais pour l’instant ; bientôt de la poésie, de la littérature et des critiques de livres. Un espace pour les idées qui exigent plus de place qu’une fiche de projet.",
        link: "Lire le carnet",
      },
      moments: {
        eyebrow: "journal visuel / 2025—2026",
        title: "Les lieux qui changent le regard.",
        body: "Cinq mois en Île-de-France, le Québec par sa langue et sa culture, la neige du Vermont et les voyages entre les trois—une archive visuelle de la vie derrière le CV.",
        link: "Ouvrir l’atlas photo",
      },
      music: {
        eyebrow: "musique / Vigilance",
        title: "Avant le code, il y avait le rythme.",
        body: "J’ai composé une grande partie de cet album et j’y ai joué de la batterie. La musique reste une façon de travailler une idée avant même d’avoir les mots.",
        link: "Écouter sur Spotify",
      },
      home: {
        eyebrow: "chez moi / Pittsburgh",
        title: "La ville fait partie du système.",
        body: "Pittsburgh n’est pas une palette empruntée pour ce site. Ce sont les matchs des Steelers sous la neige, les soirs au PNC Park, les samedis à Pitt, des ponts dans toutes les directions et la ville où je reviens toujours.",
        stadium: "North Shore · Le 24 décembre 2022",
        ballpark: "PNC Park · Pittsburgh",
      },
      offClock: {
        eyebrow: "hors ligne",
        title: "Jeux, poudreuse et longues campagnes.",
        body: "Loin du terminal : ski, Pokémon, Elder Scrolls, Zelda, Minecraft, Mario, Sonic—et la saison de Pittsburgh qui met ma patience à l’épreuve.",
      },
    },
    contactEyebrow: "Un problème difficile ?",
    contactTitle: "Comparons nos notes.",
    contactBody: "Ingénierie, recherche, open source, algorithme récalcitrant ou livre d’histoire étonnamment bon—je réponds toujours avec plaisir aux gens curieux.",
    email: "M’écrire",
    footer: "Conçu et développé à Pittsburgh.",
  },
};

const projectMeta: Record<string, { value: string; label: { en: string; fr: string } }[]> = {
  STEVE: [
    { value: "4.6M", label: { en: "model parameters", fr: "paramètres" } },
    { value: "98,304", label: { en: "voxels per chunk", fr: "voxels par chunk" } },
    { value: "22", label: { en: "training biomes", fr: "biomes d’entraînement" } },
    { value: "1.8%", label: { en: "weights tuned per style", fr: "des poids ajustés par style" } },
  ],
  fastdist: [{ value: "~2.5×", label: { en: "GPU speedup", fr: "accélération GPU" } }],
  PittAPI: [{ value: "100+", label: { en: "GitHub stars", fr: "étoiles GitHub" } }],
};

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={[className, visible ? "reveal-visible" : "reveal-ready"].join(" ")}
      style={{ transitionDelay: String(delay) + "ms" }}
    >
      {children}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <Reveal>
      <div className="section-rule mb-8 md:mb-12">
        <span className="eyebrow">{eyebrow}</span>
        <span />
        <span className="hidden max-w-sm text-right text-sm leading-relaxed text-white/44 md:block">
          {body}
        </span>
      </div>
      <div className="mb-10 max-w-3xl md:mb-14">
        <h2 className="editorial-title text-4xl leading-[1.02] text-white md:text-6xl">{title}</h2>
        <p className="mt-5 text-sm leading-relaxed text-white/55 md:hidden">{body}</p>
      </div>
    </Reveal>
  );
}

function SocialLink({
  href,
  label,
  icon,
  tone = "neutral",
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  tone?: "neutral" | "blue" | "yellow";
}) {
  const tones = {
    neutral: "border-white/12 text-white/62 hover:border-white/25 hover:text-white",
    blue: "border-sky-400/20 text-sky-300/75 hover:border-sky-300/45 hover:text-sky-200",
    yellow: "border-yellow-400/20 text-yellow-300/80 hover:border-yellow-300/45 hover:text-yellow-200",
  };
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={"inline-flex items-center gap-2 rounded-full border px-3 py-2 font-mono text-[10px] tracking-wide transition-colors " + tones[tone]}
    >
      {icon}
      {label}
      <span aria-hidden>↗</span>
    </a>
  );
}

function ProjectCard({
  project,
  index,
  lang,
  featured = false,
}: {
  project: (typeof projects)[number];
  index: number;
  lang: Lang;
  featured?: boolean;
}) {
  const metrics = projectMeta[project.name];
  const c = homeCopy[lang];
  return (
    <article
      className={
        "surface surface-interactive group relative flex h-full flex-col overflow-hidden rounded-[1.4rem] p-6 md:p-8 " +
        (featured ? "lg:col-span-2 lg:grid lg:grid-cols-[1fr_0.55fr] lg:gap-12" : "")
      }
    >
      <div>
        <div className="mb-8 flex items-center justify-between">
          <span className="project-index">CASE / {String(index + 1).padStart(2, "0")}</span>
          <span className="h-2 w-2 rounded-full border border-turq-300/50 bg-turq-300/10 transition-shadow group-hover:shadow-[0_0_18px_rgba(114,223,244,.6)]" />
        </div>
        <h3 className="editorial-title text-3xl text-white md:text-4xl">{project.name}</h3>
        <p className="mt-4 max-w-xl text-sm leading-7 text-white/59">{project[lang]}</p>
        <p className="mt-6 font-mono text-[10px] leading-relaxed tracking-[0.06em] text-turq-200/58">
          {project.tech}
        </p>
      </div>

      <div className={"mt-9 flex flex-col justify-between gap-7 " + (featured ? "lg:mt-0 lg:border-l lg:border-white/[0.08] lg:pl-10" : "")}>
        {metrics && (
          <div className={featured ? "grid grid-cols-2 gap-x-7 gap-y-8" : ""}>
            {metrics.map((metric) => (
              <div key={metric.label.en} className={featured ? "border-t border-white/[0.08] pt-4" : ""}>
                <p className={featured ? "editorial-title text-3xl text-white md:text-4xl" : "metric"}>{metric.value}</p>
                <p className="mt-2 font-mono text-[9px] uppercase leading-relaxed tracking-[0.13em] text-white/38">
                  {metric.label[lang]}
                </p>
              </div>
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-4">
          <a className="link-arrow" href={project.href} target="_blank" rel="noopener noreferrer">
            {c.source} <span aria-hidden>↗</span>
          </a>
          {project.links?.map((link, linkIndex) => (
            <a className="link-arrow" key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
              {linkIndex === 0 ? c.model : c.dataset} <span aria-hidden>↗</span>
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const [lang] = useLang();
  const t = ui[lang];
  const c = homeCopy[lang];
  const selectedProjects = [projects[1], projects[0], projects[5]];

  return (
    <main className="site-canvas text-white">
      <div className="site-noise" aria-hidden />
      <SiteNav />

      <section className="content-rail relative z-10 grid min-h-[94vh] items-center gap-12 pb-16 pt-28 lg:grid-cols-[1.05fr_0.78fr] lg:gap-16 lg:pt-32">
        <div className="relative z-10">
          <p className="eyebrow opacity-0 [animation:fade-up_.8s_.08s_forwards]">{c.heroEyebrow}</p>
          <h1 className="editorial-title mt-6 max-w-4xl text-[clamp(3.5rem,7vw,7.4rem)] leading-[0.91] opacity-0 [animation:fade-up_.9s_.18s_forwards]">
            {c.heroTop}{" "}
            <span className="text-turq-200">{c.heroAccent}</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/62 opacity-0 [animation:fade-up_.9s_.3s_forwards] md:text-lg">
            {c.heroBody}
          </p>

          <div className="mt-8 flex flex-wrap gap-3 opacity-0 [animation:fade-up_.9s_.4s_forwards]">
            <a href="#work" className="button-primary">{c.primaryCta} <span aria-hidden>↓</span></a>
            <Link href="/resume" className="button-secondary">{c.secondaryCta} <span aria-hidden>↗</span></Link>
          </div>
          <p className="mt-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-white/36 opacity-0 [animation:fade-up_.9s_.48s_forwards]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,.7)]" />
            {c.available}
          </p>

          <div className="terminal-window mt-9 max-w-xl opacity-0 [animation:fade-up_.9s_.56s_forwards]">
            <div className="terminal-bar">
              <span className="terminal-dot bg-[#f4c95d]/55" />
              <span className="terminal-dot bg-turq-400/45" />
              <span className="terminal-dot bg-white/15" />
              <span className="ml-2 font-mono text-[9px] tracking-wide text-white/28">{c.terminalTitle}</span>
            </div>
            <div className="space-y-2.5 p-4 font-mono text-[11px] leading-relaxed md:p-5">
              <p><span className="text-turq-300">λ</span> <span className="text-white/72">{c.terminalCommand}</span></p>
              {c.terminalLines.map(([key, value]) => (
                <p key={key} className="grid grid-cols-[5.5rem_1fr] gap-3">
                  <span className="text-white/28">{key}</span>
                  <span className="text-white/58">{value}</span>
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[490px] opacity-0 [animation:fade-up_1s_.38s_forwards] lg:ml-auto">
          <div className="absolute -inset-5 -z-10 rounded-[2.2rem] border border-turq-400/[0.07]" />
          <figure className="photo-stage surface relative aspect-[780/598] rounded-[1.7rem]">
            <Image
              src="/photos/me/fontainebleau-window.jpg"
              alt={lang === "en" ? "Manny looking through a window at Château de Fontainebleau" : "Manny regardant par une fenêtre au château de Fontainebleau"}
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 38vw"
              quality={90}
              className="object-contain object-center"
            />
            <figcaption className="absolute inset-x-5 bottom-5 z-10 flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-turq-200/70">France / 48.403° N</p>
                <p className="mt-1 text-sm text-white/80">{c.photoPlace}</p>
              </div>
              <PixelGhost className="w-8 shrink-0 opacity-80" />
            </figcaption>
          </figure>
        </div>
      </section>

      <div className="content-rail relative z-10 pb-12">
        <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.18em] text-white/24">{c.routeLabel}</p>
        <div className="route-line flex items-center justify-between">
          {c.places.map(([place, context]) => (
            <span className="route-node" key={place}>
              <span className="flex flex-col">
                <span>{place}</span>
                <span className="mt-1 hidden text-[8px] normal-case tracking-[0.08em] text-white/24 sm:block">{context}</span>
              </span>
            </span>
          ))}
        </div>
      </div>

      <section id="work" className="content-rail relative z-10 scroll-mt-24 py-24 md:py-32">
        <SectionHeading eyebrow={c.sections.work[0]} title={c.sections.work[1]} body={c.sections.work[2]} />
        <div className="grid gap-4 lg:grid-cols-2">
          {selectedProjects.map((project, index) => (
            <Reveal key={project.name} delay={index * 80} className={index === 0 ? "lg:col-span-2" : ""}>
              <ProjectCard project={project} index={index} lang={lang} featured={index === 0} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8">
          <a className="link-arrow" href="https://github.com/ghosteau" target="_blank" rel="noopener noreferrer">
            <GitHubMark className="h-4 w-4" /> {c.allProjects} <span aria-hidden>↗</span>
          </a>
        </Reveal>
      </section>

      <section id="experience" className="content-rail relative z-10 scroll-mt-24 py-24 md:py-32">
        <SectionHeading eyebrow={c.sections.experience[0]} title={c.sections.experience[1]} body={c.sections.experience[2]} />
        <div className="timeline-rail space-y-2">
          {experience.map((item, index) => (
            <Reveal key={item.org + item.period} delay={index * 80}>
              <article className="grid grid-cols-[0.6rem_1fr] gap-5 pb-12 md:grid-cols-[0.6rem_13rem_1fr] md:gap-8">
                <span className="timeline-dot" />
                <div className="md:pt-0.5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-turq-200/68">{item.period}</p>
                  <p className="mt-2 text-sm text-white/45">{item.org}</p>
                </div>
                <div className="col-start-2 md:col-start-3">
                  <h3 className="editorial-title text-2xl text-white/92">{item[lang].role}</h3>
                  <ul className="mt-4 space-y-3">
                    {item[lang].bullets.slice(0, 2).map((bullet) => (
                      <li key={bullet} className="flex max-w-2xl gap-3 text-sm leading-7 text-white/55">
                        <span className="mt-3 h-px w-4 shrink-0 bg-turq-300/40" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <Link href="/resume" className="link-arrow">{c.fullResume} <span aria-hidden>→</span></Link>
        </Reveal>
      </section>

      <section id="about" className="content-rail relative z-10 scroll-mt-24 py-24 md:py-32">
        <SectionHeading eyebrow={c.sections.about[0]} title={c.sections.about[1]} body={c.sections.about[2]} />
        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <article className="surface h-full rounded-[1.4rem] p-7 md:p-9">
              <p className="eyebrow">{c.ties}</p>
              <h3 className="editorial-title mt-6 text-4xl leading-[1.05]">{c.aboutTitle}</h3>
              <p className="mt-7 text-sm leading-7 text-white/60">{t.aboutP1}</p>
              <p className="mt-5 text-sm leading-7 text-white/60">{t.aboutP2}</p>
              <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-white/[0.08] pt-6">
                {t.facts.slice(0, 6).map((fact) => (
                  <div key={fact.label}>
                    <p className="font-mono text-[9px] uppercase tracking-[0.13em] text-white/30">{fact.label}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-white/62">{fact.value}</p>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>

          <Reveal delay={100}>
            <article className="surface h-full rounded-[1.4rem] p-7 md:p-9">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="eyebrow">{t.connectionsHeading}</p>
                  <p className="mt-3 max-w-lg text-sm leading-7 text-white/52">{t.connectionsBlurb}</p>
                </div>
              </div>
              <div className="mt-7 overflow-hidden rounded-xl border border-white/[0.06] bg-[#030a12]/55 p-3 md:p-6">
                <ConnectionsGraph lang={lang} />
              </div>
              <div className="mt-7 flex flex-wrap gap-2">
                {courses.slice(0, 8).map((course) => (
                  <span className="chip" key={course.en}>{course[lang]}</span>
                ))}
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <section id="research" className="content-rail relative z-10 scroll-mt-24 py-24 md:py-32">
        <SectionHeading eyebrow={c.sections.research[0]} title={c.sections.research[1]} body={c.sections.research[2]} />
        <div className="grid gap-5 md:grid-cols-2">
          {research.map((item, index) => (
            <Reveal key={item.en.title} delay={index * 90}>
              <article className="surface surface-interactive h-full rounded-[1.4rem] p-7 md:p-9">
                <span className="project-index">RESEARCH / {String(index + 1).padStart(2, "0")}</span>
                <h3 className="editorial-title mt-7 text-3xl leading-tight">{item[lang].title}</h3>
                <p className="mt-3 font-mono text-[10px] leading-relaxed tracking-[0.05em] text-turq-200/62">{item[lang].sub}</p>
                <p className="mt-6 text-sm leading-7 text-white/56">{item[lang].body}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-7">
          <Link href="/resume" className="link-arrow">{c.researchLink} <span aria-hidden>→</span></Link>
        </Reveal>
      </section>

      <section className="content-rail relative z-10 py-24 md:py-32">
        <SectionHeading eyebrow={c.sections.personal[0]} title={c.sections.personal[1]} body={c.sections.personal[2]} />
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <Link href="/blog" className="surface surface-interactive group block h-full rounded-[1.4rem] p-7 md:p-9">
              <p className="eyebrow">{c.personalCards.writing.eyebrow}</p>
              <h3 className="editorial-title mt-8 text-4xl">{c.personalCards.writing.title}</h3>
              <p className="mt-5 max-w-lg text-sm leading-7 text-white/56">{c.personalCards.writing.body}</p>
              <p className="link-arrow mt-10">{c.personalCards.writing.link} <span aria-hidden>→</span></p>
            </Link>
          </Reveal>

          <Reveal delay={80}>
            <Link href="/photos" className="surface surface-interactive group grid h-full overflow-hidden rounded-[1.4rem] sm:grid-cols-[0.82fr_1fr]">
              <div className="relative min-h-64 overflow-hidden">
                <Image
                  src="/photos/paris/7-eiffel.jpg"
                  alt="The Eiffel Tower above the Seine at dusk"
                  fill
                  sizes="(max-width: 1024px) 90vw, 22vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-7 md:p-8">
                <p className="eyebrow">{c.personalCards.moments.eyebrow}</p>
                <h3 className="editorial-title mt-7 text-3xl">{c.personalCards.moments.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/56">{c.personalCards.moments.body}</p>
                <p className="link-arrow mt-8">{c.personalCards.moments.link} <span aria-hidden>→</span></p>
              </div>
            </Link>
          </Reveal>

          <Reveal className="lg:col-span-2">
            <article className="surface grid overflow-hidden rounded-[1.4rem] lg:grid-cols-[0.72fr_1fr]">
              <div className="p-7 md:p-10">
                <p className="eyebrow">{c.personalCards.music.eyebrow}</p>
                <h3 className="editorial-title mt-8 text-4xl leading-tight">{c.personalCards.music.title}</h3>
                <p className="mt-5 max-w-lg text-sm leading-7 text-white/56">{c.personalCards.music.body}</p>
                <a
                  href={"https://open.spotify.com/album/" + SPOTIFY_ALBUM_ID}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-arrow mt-9"
                >
                  {c.personalCards.music.link} <span aria-hidden>↗</span>
                </a>
              </div>
              <div className="border-t border-white/[0.07] bg-black/16 p-4 lg:border-l lg:border-t-0 lg:p-6">
                <iframe
                  title="Vigilance — Spotify album"
                  src={"https://open.spotify.com/embed/album/" + SPOTIFY_ALBUM_ID + "?utm_source=generator&theme=0"}
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-xl"
                />
              </div>
            </article>
          </Reveal>

          <Reveal className="lg:col-span-2">
            <article className="surface grid overflow-hidden rounded-[1.4rem] md:grid-cols-[0.9fr_1fr]">
              <div className="grid grid-cols-2 items-center gap-2 bg-[#030a12] p-2 md:gap-3 md:p-3">
                <figure className="relative aspect-[3/4] overflow-hidden rounded-xl border border-white/[0.08]">
                  <Image
                    src="/photos/pittsburgh/steelers-snow.jpg"
                    alt={lang === "en" ? "Manny at a snowy football game in Pittsburgh" : "Manny lors d’un match de football enneigé à Pittsburgh"}
                    fill
                    sizes="(max-width: 768px) 48vw, 28vw"
                    quality={90}
                    className="object-contain object-center"
                  />
                  <figcaption className="absolute inset-x-3 bottom-3 rounded-lg border border-white/12 bg-[#040b14]/70 px-3 py-2 font-mono text-[8px] uppercase tracking-[0.12em] text-white/72 backdrop-blur-md">
                    {c.personalCards.home.stadium}
                  </figcaption>
                </figure>
                <figure className="relative aspect-[3/4] overflow-hidden rounded-xl border border-white/[0.08]">
                  <Image
                    src="/photos/pittsburgh/pnc-park.jpg"
                    alt={lang === "en" ? "PNC Park and the Pittsburgh skyline" : "Le PNC Park et la silhouette de Pittsburgh"}
                    fill
                    sizes="(max-width: 768px) 42vw, 24vw"
                    quality={90}
                    className="object-contain object-center"
                  />
                  <figcaption className="absolute inset-x-3 bottom-3 rounded-lg border border-white/12 bg-[#040b14]/70 px-3 py-2 font-mono text-[8px] uppercase tracking-[0.12em] text-white/72 backdrop-blur-md">
                    {c.personalCards.home.ballpark}
                  </figcaption>
                </figure>
              </div>
              <div className="p-7 md:p-10">
                <p className="eyebrow">{c.personalCards.home.eyebrow}</p>
                <h3 className="editorial-title mt-6 text-4xl leading-tight">{c.personalCards.home.title}</h3>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-white/56">{c.personalCards.home.body}</p>

                <div className="mt-9 border-t border-white/[0.08] pt-7">
                  <p className="eyebrow">{c.personalCards.offClock.eyebrow}</p>
                  <h4 className="editorial-title mt-4 text-2xl">{c.personalCards.offClock.title}</h4>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-white/50">{c.personalCards.offClock.body}</p>
                  <div className="mt-6 flex w-fit items-end gap-4 rounded-2xl border border-white/[0.06] bg-[#030a12]/55 px-5 py-4">
                    {games.map((game) => (
                      <GameSprite key={game.key} kind={game.key} label={game.label} className="w-7 sm:w-9" />
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="content-rail relative z-10 py-24 md:py-36">
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.7rem] border border-turq-300/20 bg-turq-300/[0.055] px-7 py-12 md:px-14 md:py-16">
            <div className="absolute -right-10 -top-16 h-52 w-52 rounded-full bg-turq-300/10 blur-3xl" aria-hidden />
            <p className="eyebrow">{c.contactEyebrow}</p>
            <div className="mt-6 grid items-end gap-8 md:grid-cols-[1fr_auto]">
              <div>
                <h2 className="editorial-title text-5xl md:text-7xl">{c.contactTitle}</h2>
                <p className="mt-5 max-w-xl text-sm leading-7 text-white/58">{c.contactBody}</p>
              </div>
              <a href="mailto:mcgrailmanny@gmail.com" className="button-primary">
                {c.email} <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="content-rail relative z-10 border-t border-white/[0.08] py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-end gap-3">
            <PixelManny className="w-10" />
            <PixelGhost className="mb-1 w-6 animate-bob opacity-75" />
            <div className="ml-1">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">Emmanuel McGrail</p>
              <p className="mt-1 text-xs text-white/28">{c.footer} · 2026</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <SocialLink href="https://github.com/ghosteau" label="GitHub" icon={<GitHubMark className="h-3.5 w-3.5" />} />
            <SocialLink href="https://www.linkedin.com/in/manny-mcgrail/" label="LinkedIn" tone="blue" icon={<LinkedInMark className="h-3.5 w-3.5" />} />
            <SocialLink href="https://huggingface.co/ghosteau" label="Hugging Face" tone="yellow" icon={<span aria-hidden>🤗</span>} />
          </div>
        </div>
      </footer>
    </main>
  );
}
