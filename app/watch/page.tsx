"use client";

import { useLang } from "../components/lang";
import { SiteNav } from "../components/nav";
import { Newsletter } from "../components/newsletter";
import { youtubeChannel } from "../content";

const copy = {
  en: {
    meta: "Video",
    title: "Watch",
    intro: "Video essays and technical tutorials. The essays take on the same questions as the notebook, with room to show rather than describe. The tutorials walk through things I’ve built, code included.",
    formats: [
      { name: "Video essays", body: "Longer pieces on AI, technology, history, and whatever else won’t leave me alone." },
      { name: "Tutorials", body: "Step-by-step builds: models, GPU code, data tools, and the reasoning behind each choice." },
    ],
    status: "Coming soon",
    statusBody: "Nothing is published yet. The first video will be announced here and in the notebook.",
    channel: "YouTube channel",
  },
  fr: {
    meta: "Vidéo",
    title: "Vidéos",
    intro: "Des essais vidéo et des tutoriels techniques. Les essais abordent les mêmes questions que le carnet, avec la place de montrer plutôt que de décrire. Les tutoriels reprennent pas à pas ce que j’ai construit, code compris.",
    formats: [
      { name: "Essais vidéo", body: "Des formats plus longs sur l’IA, la technologie, l’histoire et tout ce qui me trotte dans la tête." },
      { name: "Tutoriels", body: "Des projets construits pas à pas : modèles, code GPU, outils de données, et le raisonnement derrière chaque choix." },
    ],
    status: "Bientôt",
    statusBody: "Rien n’est encore publié. La première vidéo sera annoncée ici et dans le carnet.",
    channel: "Chaîne YouTube",
  },
};

export default function Watch() {
  const [lang] = useLang();
  const c = copy[lang];

  return (
    <main className="site-canvas journal-home">
      <SiteNav />
      <section className="content-rail watch-page page-enter" aria-labelledby="watch-title">
        <header className="journal-section-heading">
          <div>
            <p className="journal-meta">{c.meta}</p>
            <h1 id="watch-title">{c.title}</h1>
          </div>
          <p>{c.intro}</p>
        </header>

        <div className="watch-status" role="status">
          <span>{c.status}</span>
          <p>{c.statusBody}</p>
          {youtubeChannel && (
            <a href={youtubeChannel} target="_blank" rel="noopener noreferrer">{c.channel} <span aria-hidden>↗</span></a>
          )}
        </div>

        <ul className="watch-formats">
          {c.formats.map((format, i) => (
            <li key={format.name}>
              <span className="project-number">0{i + 1}</span>
              <h2>{format.name}</h2>
              <p>{format.body}</p>
            </li>
          ))}
        </ul>

        <Newsletter lang={lang} />
      </section>
    </main>
  );
}
