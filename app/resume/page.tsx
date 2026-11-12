"use client";

import { useLang } from "../components/lang";
import { SiteNav } from "../components/nav";
import { GitHubMark, LinkedInMark } from "../components/sprites";
import { courses, experience, projects } from "../content";

const copy = {
  en: {
    kicker: "résumé / curriculum vitae",
    title: "Emmanuel McGrail",
    summary:
      "Data Science and Computer Science student at the University of Pittsburgh, pursuing a French minor and graduating in Spring 2027. Two summers engineering at BNY, production data work with Pitt Athletics, and undergraduate AI research—with a focus on machine learning, systems, and high-performance computing.",
    download: "Download PDF",
    experience: "Experience",
    projects: "Selected projects",
    education: "Education",
    coursework: "Coursework",
    toolkit: "Technical toolkit",
    recognition: "Recognition",
    schools: [
      {
        name: "University of Pittsburgh",
        degree: "B.S. Data Science · B.S. Computer Science · Minor in French",
        meta: "Pittsburgh, PA · GPA 3.76 · Spring 2027",
        note: "Planning an M.S. in Computer Science or Data Science, starting Fall 2027.",
      },
      {
        name: "ENSEA",
        degree: "Engineering study abroad",
        meta: "Cergy, France · Spring 2026",
      },
    ],
    skills:
      "Python · C++ · Java · R · C# · C · SQL · PyTorch · CUDA · ONNX Runtime · Transformers · scikit-learn · SciPy · Pandas · NumPy · Spring · Kafka · Spark · Snowflake · AWS",
    awards: "Dean’s List · French Dedication Award · EU Economic Project Award · All-Academic Athlete",
  },
  fr: {
    kicker: "CV / parcours",
    title: "Emmanuel McGrail",
    summary:
      "Étudiant en science des données et informatique à l’Université de Pittsburgh, avec une mineure en français et un diplôme prévu au printemps 2027. Deux étés en ingénierie chez BNY, des systèmes de données en production pour Pitt Athletics et une expérience de recherche de premier cycle en IA—avec un intérêt marqué pour l’apprentissage automatique, les systèmes et le calcul haute performance.",
    download: "Télécharger le PDF",
    experience: "Expérience",
    projects: "Projets choisis",
    education: "Formation",
    coursework: "Cours suivis",
    toolkit: "Outils techniques",
    recognition: "Distinctions",
    schools: [
      {
        name: "Université de Pittsburgh",
        degree: "Licence en science des données · Licence en informatique · Mineure en français",
        meta: "Pittsburgh, PA · Moyenne 3,76 · Printemps 2027",
        note: "Master envisagé en informatique ou en science des données, à partir de l’automne 2027.",
      },
      {
        name: "ENSEA",
        degree: "Échange en ingénierie",
        meta: "Cergy, France · Printemps 2026",
      },
    ],
    skills:
      "Python · C++ · Java · R · C# · C · SQL · PyTorch · CUDA · ONNX Runtime · Transformers · scikit-learn · SciPy · Pandas · NumPy · Spring · Kafka · Spark · Snowflake · AWS",
    awards: "Dean’s List · Prix de dévouement au français · Prix du projet économique de l’UE · Athlète académique",
  },
};

function ResumeSection({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-ink/[0.09] py-10 md:grid md:grid-cols-[11rem_1fr] md:gap-10 md:py-12">
      <div className="mb-7 md:mb-0">
        <p className="project-index">{index}</p>
        <h2 className="mt-3 text-sm font-medium text-ink/74">{title}</h2>
      </div>
      <div>{children}</div>
    </section>
  );
}

export default function Resume() {
  const [lang] = useLang();
  const c = copy[lang];
  const selectedProjects = [projects[1], projects[2], projects[0], projects[5]];

  return (
    <main className="site-canvas text-ink">
      <div className="site-noise" aria-hidden />
      <SiteNav />

      <article className="content-rail page-enter relative z-10 pb-24 pt-14 md:pt-16">
        <header className="pb-12 md:pb-16">
          <p className="eyebrow">{c.kicker}</p>
          <div className="mt-6 grid gap-8 md:grid-cols-[1fr_.65fr] md:items-end">
            <div>
              <h1 className="editorial-title max-w-4xl text-5xl leading-[0.98] md:text-7xl">{c.title}</h1>
              <p className="mt-7 max-w-3xl text-sm leading-7 text-ink/75 md:text-base">{c.summary}</p>
            </div>
            <div className="flex flex-wrap gap-2 md:justify-end">
              <a href="/resume.pdf" download className="button-primary">{c.download} <span aria-hidden>↓</span></a>
              <a href="mailto:mcgrailmanny@gmail.com" className="button-secondary">Email <span aria-hidden>↗</span></a>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-2 border-t border-ink/[0.08] pt-6">
            <a
              href="https://github.com/ghosteau"
              target="_blank"
              rel="noopener noreferrer"
              className="resume-social"
            >
              <GitHubMark className="h-3.5 w-3.5" /> GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/manny-mcgrail/"
              target="_blank"
              rel="noopener noreferrer"
              className="resume-social"
            >
              <LinkedInMark className="h-3.5 w-3.5" /> LinkedIn ↗
            </a>
            <a
              href="https://huggingface.co/ghosteau"
              target="_blank"
              rel="noopener noreferrer"
              className="resume-social"
            >
              Hugging Face ↗
            </a>
            <a
              href="https://fantomee.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="resume-social"
            >
              Substack ↗
            </a>
          </div>
        </header>

        <ResumeSection index="01" title={c.experience}>
          <div className="space-y-10">
            {experience.map((item) => (
              <div key={item.org + item.period}>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-5">
                  <h3 className="editorial-title text-2xl text-ink/92">{item[lang].role}</h3>
                  <span className="font-mono text-xs text-teal-800">{item.period}</span>
                </div>
                <p className="mt-1 text-sm text-ink/75">{item.org}</p>
                <ul className="mt-4 space-y-2.5">
                  {item[lang].bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm leading-6 text-ink/75">
                      <span className="mt-3 h-px w-3 shrink-0 bg-ink/30" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ResumeSection>

        <ResumeSection index="02" title={c.projects}>
          <div className="grid gap-4">
            {selectedProjects.map((project) => (
              <article key={project.name} className="border-t border-ink/15 py-6">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <a href={project.href} target="_blank" rel="noopener noreferrer" className="text-base font-medium text-ink underline decoration-ink/20 underline-offset-4 transition-colors hover:text-teal-800 hover:decoration-teal-800">
                    {project.name} ↗
                  </a>
                  {project.dates && <span className="font-mono text-xs text-teal-800">{project.dates[lang]}</span>}
                </div>
                <p className="mt-1 font-mono text-xs text-ink/60">{project.tech}</p>
                <p className="mt-3 text-sm leading-6 text-ink/75">{project[lang]}</p>
                {project.links && (
                  <div className="mt-4 flex flex-wrap gap-4">
                    {project.links.map((link) => (
                      <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="link-arrow">
                        {link.label} ↗
                      </a>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </ResumeSection>

        <ResumeSection index="03" title={c.education}>
          <div className="grid gap-4 sm:grid-cols-2">
            {c.schools.map((school) => (
              <article key={school.name} className="border-t border-ink/15 py-6">
                <h3 className="editorial-title text-2xl">{school.name}</h3>
                <p className="mt-3 text-sm leading-6 text-ink/75">{school.degree}</p>
                <p className="mt-3 font-mono text-xs leading-relaxed text-teal-800">{school.meta}</p>
                {"note" in school && <p className="mt-3 text-sm leading-6 text-ink/75">{school.note}</p>}
              </article>
            ))}
          </div>
        </ResumeSection>

        <ResumeSection index="04" title={c.coursework}>
          <div className="flex flex-wrap gap-2">
            {courses.map((course) => <span key={course.en} className="chip">{course[lang]}</span>)}
          </div>
        </ResumeSection>

        <ResumeSection index="05" title={c.toolkit}>
          <p className="font-mono text-xs leading-7 text-ink/75">{c.skills}</p>
        </ResumeSection>

        <ResumeSection index="06" title={c.recognition}>
          <p className="text-sm leading-7 text-ink/75">{c.awards}</p>
        </ResumeSection>
      </article>
    </main>
  );
}
