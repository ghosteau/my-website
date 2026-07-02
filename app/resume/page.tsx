"use client";

import Link from "next/link";
import { useLang, LangToggle } from "../components/lang";
import { experience, projects, courses, ui, type Accent } from "../content";

const dot: Record<Accent, string> = {
  teal: "bg-turq-400/60",
  cyan: "bg-cyan-400/60",
  emerald: "bg-emerald-400/60",
};
const period: Record<Accent, string> = {
  teal: "text-turq-400/85",
  cyan: "text-cyan-400/85",
  emerald: "text-emerald-400/85",
};

const copy = {
  en: {
    back: "← back",
    title: "Résumé",
    summaryHead: "Summary",
    summary:
      "Data Science & Computer Science student at the University of Pittsburgh (French minor, GPA 3.76, graduating Spring 2027). Spent Spring 2026 on exchange at ENSEA in France; currently interning at BNY. Focused on machine learning, systems, and data engineering — aiming toward graduate study and AI research.",
    expHead: "Experience",
    projHead: "Selected Projects",
    eduHead: "Education",
    edu: [
      {
        main: "University of Pittsburgh — B.S. Data Science, B.S. Computer Science, Minor in French",
        sub: "Pittsburgh, PA · GPA 3.76 · Graduating Spring 2027",
      },
      {
        main: "ENSEA (École Nationale Supérieure de l'Électronique)",
        sub: "Cergy, France · Engineering Study Abroad · Spring 2026",
      },
    ],
    courseHead: "Selected Coursework",
    skillsHead: "Skills",
    skills:
      "Python · C++ · Java · R · C# · C · SQL · PyTorch · CUDA · Transformers · scikit-learn · Pandas · NumPy · Spring · Kafka · Spark · Snowflake · AWS (Lambda, Step Functions, Athena, S3) · Git",
    awardsHead: "Awards & Honors",
    awards: "Dean's List · French Dedication Award · EU Economic Project Award · All-Academic Athlete",
    download: "Download PDF ↓",
  },
  fr: {
    back: "← retour",
    title: "CV",
    summaryHead: "Résumé",
    summary:
      "Étudiant en science des données et informatique à l'Université de Pittsburgh (mineure en français, moyenne 3,76, diplôme prévu au printemps 2027). Semestre d'échange à l'ENSEA en France au printemps 2026 ; actuellement en stage chez BNY. Spécialisé en apprentissage automatique, systèmes et ingénierie de données — en route vers des études supérieures et la recherche en IA.",
    expHead: "Expérience",
    projHead: "Projets sélectionnés",
    eduHead: "Formation",
    edu: [
      {
        main: "Université de Pittsburgh — Licence science des données, Licence informatique, mineure en français",
        sub: "Pittsburgh, PA · Moyenne 3,76 · Diplôme prévu au printemps 2027",
      },
      {
        main: "ENSEA (École Nationale Supérieure de l'Électronique)",
        sub: "Cergy, France · Échange en ingénierie · Printemps 2026",
      },
    ],
    courseHead: "Cours suivis",
    skillsHead: "Compétences",
    skills:
      "Python · C++ · Java · R · C# · C · SQL · PyTorch · CUDA · Transformers · scikit-learn · Pandas · NumPy · Spring · Kafka · Spark · Snowflake · AWS (Lambda, Step Functions, Athena, S3) · Git",
    awardsHead: "Distinctions",
    awards: "Dean's List · Prix de dévouement au français · Prix du projet économique de l'UE · Athlète académique",
    download: "Télécharger le PDF ↓",
  },
};

export default function Resume() {
  const [lang, , toggle] = useLang();
  const t = ui[lang];
  const c = copy[lang];

  return (
    <main className="min-h-screen bg-[#04100f] text-white">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="blob blob-1 absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-turq-600/15 blur-[140px]" />
        <div className="blob blob-2 absolute bottom-[5%] right-[-8%] w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <nav className="fixed top-0 w-full z-50 px-8 py-5 flex justify-between items-center border-b border-white/[0.06] backdrop-blur-md bg-[#04100f]/75">
        <Link href="/" className="font-mono text-sm text-white/55 hover:text-turq-300 transition-colors tracking-widest uppercase">{c.back}</Link>
        <div className="flex items-center gap-6">
          <a href="/resume.pdf" download className="hidden sm:block font-mono text-xs text-turq-300/60 hover:text-turq-300 transition-colors tracking-wide">{c.download}</a>
          <LangToggle lang={lang} toggle={toggle} />
        </div>
      </nav>

      <article className="relative z-10 max-w-3xl mx-auto px-8 pt-32 pb-24">
        <header className="mb-12">
          <h1 className="text-5xl font-extralight tracking-tight">
            Emmanuel{" "}
            <span className="bg-gradient-to-r from-turq-400 to-cyan-300 bg-clip-text text-transparent font-light">McGrail</span>
          </h1>
          <p className="font-mono text-white/55 text-sm mt-3 tracking-wide">
            {c.title} · Pittsburgh, PA · mcgrailmanny@gmail.com
          </p>
          <div className="flex gap-4 mt-5 text-xs font-mono flex-wrap">
            <a href="/resume.pdf" download className="text-turq-300/80 hover:text-turq-300 border border-turq-500/30 hover:border-turq-400/60 rounded-sm px-3 py-1.5 transition-all">{c.download}</a>
            <a href="https://www.linkedin.com/in/manny-mcgrail/" target="_blank" rel="noopener noreferrer" className="text-cyan-300/80 hover:text-cyan-300 border border-cyan-500/30 hover:border-cyan-400/60 rounded-sm px-3 py-1.5 transition-all">LinkedIn ↗</a>
            <a href="https://github.com/ghosteau" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/60 border border-white/10 hover:border-white/25 rounded-sm px-3 py-1.5 transition-all">GitHub ↗</a>
          </div>
        </header>

        <Section title={c.summaryHead}>
          <p className="text-white/70 font-light leading-relaxed">{c.summary}</p>
        </Section>

        <Section title={c.expHead}>
          <div className="flex flex-col gap-8">
            {experience.map((e) => (
              <div key={e.en.role}>
                <div className="flex flex-wrap justify-between items-baseline gap-2">
                  <h3 className="text-white/90 font-light">{e[lang].role}</h3>
                  <span className={`font-mono text-xs ${period[e.accent]}`}>{e.period}</span>
                </div>
                <p className="text-white/50 text-sm font-light mb-2">{e.org}</p>
                <ul className="flex flex-col gap-1.5">
                  {e[lang].bullets.map((b, j) => (
                    <li key={j} className="flex gap-3 text-white/65 text-sm font-light leading-relaxed">
                      <span className={`mt-1.5 w-1 h-1 rounded-full shrink-0 ${dot[e.accent]}`} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section title={c.projHead}>
          <div className="flex flex-col gap-4">
            {projects.map((p) => (
              <div key={p.name}>
                <div className="flex flex-wrap justify-between items-baseline gap-2">
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className="font-mono text-turq-300/90 hover:text-turq-300 transition-colors text-sm">{p.name} ↗</a>
                  <span className="font-mono text-white/50 text-xs">{p.tech}</span>
                </div>
                <p className="text-white/65 text-sm font-light leading-relaxed mt-1">{p[lang]}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title={c.eduHead}>
          <div className="flex flex-col gap-4">
            {c.edu.map((ed) => (
              <div key={ed.main}>
                <h3 className="text-white/90 font-light">{ed.main}</h3>
                <p className="text-white/55 text-sm font-light mt-1">{ed.sub}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title={c.courseHead}>
          <div className="flex flex-wrap gap-2">
            {courses.map((co) => (
              <span key={co.en} className="px-2.5 py-1 border border-white/[0.08] bg-white/[0.02] rounded-sm text-xs font-mono text-white/60">{co[lang]}</span>
            ))}
          </div>
        </Section>

        <Section title={c.skillsHead}>
          <p className="font-mono text-white/65 text-sm leading-relaxed">{c.skills}</p>
        </Section>

        <Section title={c.awardsHead}>
          <p className="text-white/65 text-sm font-light leading-relaxed">{c.awards}</p>
        </Section>
      </article>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="font-mono text-turq-400/80 text-xs tracking-[0.3em] uppercase mb-4 border-b border-white/[0.06] pb-2">{title}</h2>
      {children}
    </section>
  );
}
