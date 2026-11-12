"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang, type Lang } from "./components/lang";
import { SiteNav } from "./components/nav";
import { ConnectionsGraph } from "./components/graph";
import { courses, experience, projects, research, SPOTIFY_ALBUM_ID, ui } from "./content";
import { posts } from "./blog/posts";
import { ChunkDiagram } from "./components/chunk-diagram";
import { Disclosure } from "./components/disclosure";

const copy = {
  en: {
    intro: "I study computer science and data science at the University of Pittsburgh. I build machine-learning tools, work on data systems, and study what models actually understand.",
    personal: "Also a drummer, a French speaker, and an incurable reader of history. This is where I keep my work and a few things from the rest of my life.",
    work: "Selected work", workNote: "Models, tools, and the systems behind them.",
    featured: "Generative modeling", steveTitle: "Teaching a model to build terrain.",
    steve: "STEVE learns the structure of Minecraft worlds and generates a full chunk in a single forward pass. I built the pipeline from voxel data to an ONNX model, with lightweight fine-tuning for new terrain styles. The trained model and the chunk dataset are both open on Hugging Face.",
    source: "Source", model: "Model", dataset: "Dataset", detail: "Technical details", all: "All repositories",
    now: "At Pitt", nowText: "Computer vision research: can models like OpenAI’s CLIP recognize a record label from its album covers?",
    portrait: "A semester in France. Fontainebleau, spring 2026.",
    experience: "Experience", experienceNote: "Research and engineering, in practice.", resume: "Full résumé",
    writing: "From the notebook", writingNote: "Essays in English and French.", allWriting: "All writing",
    about: "A little further afield", aboutNote: "Pittsburgh, France, and the connections in between.",
    aboutBody: "I spent a semester at ENSEA in Cergy, with time for Paris and the Mediterranean along the way. Back in Pittsburgh, I’m just as happy at a game at PNC Park as I am working through a difficult problem.",
    music: "Vigilance", musicBody: "I composed much of this album and played drums on it.", listen: "Listen on Spotify", player: "Open album player",
    photos: "Photo journal", research: "Earlier research", connections: "How my interests connect", coursework: "Selected coursework",
    contact: "Get in touch.", contactBody: "For research, engineering, or a conversation about something interesting.",
    footer: "Emmanuel McGrail · Pittsburgh", back: "Back to top", training: "Training data", parameters: "Parameters", output: "Output", inference: "Inference", pass: "One forward pass",
  },
  fr: {
    intro: "J’étudie l’informatique et la science des données à l’Université de Pittsburgh. Je conçois des outils d’apprentissage automatique, développe des systèmes de données et étudie ce que les modèles comprennent réellement.",
    personal: "Également batteur, francophone et lecteur passionné d’histoire. Je rassemble ici mes projets et quelques morceaux de ma vie en dehors du travail.",
    work: "Projets choisis", workNote: "Des modèles, des outils et les systèmes qui les font fonctionner.",
    featured: "Modélisation générative", steveTitle: "Apprendre à un modèle à créer du terrain.",
    steve: "STEVE apprend la structure des mondes Minecraft et génère un chunk complet en un seul passage. J’ai construit le pipeline, des données voxel au modèle ONNX, avec un ajustement léger pour de nouveaux styles de terrain. Le modèle entraîné et le jeu de chunks sont tous deux en libre accès sur Hugging Face.",
    source: "Code source", model: "Modèle", dataset: "Données", detail: "Détails techniques", all: "Tous les dépôts",
    now: "À Pitt", nowText: "Recherche en vision par ordinateur : des modèles comme CLIP d’OpenAI peuvent-ils reconnaître un label à partir de ses pochettes ?",
    portrait: "Un semestre en France. Fontainebleau, printemps 2026.",
    experience: "Expérience", experienceNote: "La recherche et l’ingénierie, sur le terrain.", resume: "CV complet",
    writing: "Dans le carnet", writingNote: "Des essais en français et en anglais.", allWriting: "Tous les textes",
    about: "Un peu plus loin", aboutNote: "Pittsburgh, la France et les liens entre les deux.",
    aboutBody: "J’ai passé un semestre à l’ENSEA de Cergy, avec des escapades à Paris et en Méditerranée. De retour à Pittsburgh, je suis aussi heureux devant un match au PNC Park que face à un problème difficile.",
    music: "Vigilance", musicBody: "J’ai composé une grande partie de cet album et j’y ai joué de la batterie.", listen: "Écouter sur Spotify", player: "Ouvrir le lecteur de l’album",
    photos: "Journal photo", research: "Recherches précédentes", connections: "Les liens entre mes centres d’intérêt", coursework: "Cours choisis",
    contact: "Échangeons.", contactBody: "Pour parler de recherche, d’ingénierie ou d’un sujet qui mérite une conversation.",
    footer: "Emmanuel McGrail · Pittsburgh", back: "En haut", training: "Données d’apprentissage", parameters: "Paramètres", output: "Sortie", inference: "Inférence", pass: "Un seul passage",
  },
};

const summaries = {
  en: ["Explore transformer token embeddings in 3D, compare neighbors, and inspect the structure behind a model’s vocabulary.", "CUDA-accelerated probabilistic computation behind a Python API. About 2.5× faster than standard libraries.", "University data through a Python library. I added end-to-end study-room reservations."],
  fr: ["Explorer en 3D les représentations de tokens, comparer leurs voisins et examiner la structure du vocabulaire d’un modèle.", "Du calcul probabiliste accéléré par CUDA, accessible en Python. Environ 2,5 fois plus rapide que les bibliothèques standard.", "Les données universitaires via une bibliothèque Python. J’y ai ajouté la réservation complète de salles d’étude."],
};

function SectionTitle({ id, title, note }: { id: string; title: string; note: string }) {
  return <header className="journal-section-heading"><h2 id={id}>{title}</h2><p>{note}</p></header>;
}

function ProjectLinks({ project, lang }: { project: (typeof projects)[number]; lang: Lang }) {
  const c = copy[lang];
  return <div className="journal-links"><a href={project.href} target="_blank" rel="noopener noreferrer">{c.source} <span aria-hidden>↗</span></a>{project.links?.map((link, i) => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{i === 0 ? c.model : c.dataset} <span aria-hidden>↗</span></a>)}</div>;
}

export default function Home() {
  const [lang] = useLang();
  const c = copy[lang];
  const selected = [projects[2], projects[0], projects[5]];
  return (
    <main id="top" className="site-canvas journal-home">
      <SiteNav />
      <div className="content-rail">
        <section className="open-hero" aria-labelledby="intro-title">
          <div className="hero-topline"><p>{lang === "en" ? "Engineering / Machine learning / Research" : "Ingénierie / Apprentissage automatique / Recherche"}</p><span>Pittsburgh, PA · Pitt ’27</span></div>
          <h1 id="intro-title">Emmanuel <span>McGrail</span></h1>
          <div className="hero-spread">
            <figure className="hero-portrait"><div><Image src="/photos/me/fontainebleau-window.jpg" alt={lang === "en" ? "Manny at a window in Château de Fontainebleau" : "Manny à une fenêtre du château de Fontainebleau"} fill priority quality={90} sizes="(max-width: 700px) 45vw, 240px" /></div><figcaption>Fontainebleau, France · 2026</figcaption></figure>
            <div className="hero-statement"><p className="hero-hello">{lang === "en" ? "Manny, for short." : "Manny, tout simplement."}</p><p className="journal-lead">{c.intro}</p><p className="journal-personal">{c.personal}</p></div>
            <div className="hero-directory"><a href="#work"><span>{c.work}</span><span aria-hidden>↘</span></a><Link href="/resume"><span>{c.resume}</span><span aria-hidden>↗</span></Link><a href="mailto:mcgrailmanny@gmail.com"><span>{lang === "en" ? "Say hello" : "M’écrire"}</span><span aria-hidden>↗</span></a></div>
          </div>
        </section>
        <aside className="journal-current"><span>{c.now}</span><p>{c.nowText}</p><a href="#experience">{c.experience} <span aria-hidden>↓</span></a></aside>

        <section id="work" className="journal-section" aria-labelledby="work-title">
          <SectionTitle id="work-title" title={c.work} note={c.workNote} />
          <article className="featured-study">
            <div className="feature-copy"><p className="journal-meta">01 / STEVE <span>{c.featured}</span>{projects[1].dates && <span>{projects[1].dates[lang]}</span>}</p><h3>{lang === "en" ? <>From voxels.<br />To worlds.</> : <>Des voxels.<br />Des mondes.</>}</h3><p className="study-body">{c.steve}</p><p className="journal-tech">{projects[1].tech}</p><ProjectLinks project={projects[1]} lang={lang} /><Disclosure className="study-detail" triggerClassName="disclosure-inline" summary={c.detail}><p>{projects[1][lang]}</p></Disclosure></div>
            <div className="feature-visual"><ChunkDiagram lang={lang} /><dl className="study-spec"><div><dt>{c.training}</dt><dd>~200M voxels</dd></div><div><dt>{c.parameters}</dt><dd>4.6M</dd></div><div><dt>{c.output}</dt><dd>16 × 384 × 16</dd></div><div><dt>{c.inference}</dt><dd>{c.pass}</dd></div></dl></div>
          </article>
          <div className="project-index-list">{selected.map((project, i) => <article key={project.name} className="project-entry"><div><span className="project-number">0{i + 2}{project.dates && <span>{project.dates[lang]}</span>}</span><h3>{project.name}</h3><p className="journal-tech">{project.tech}</p></div><div><p>{summaries[lang][i]}</p><Disclosure triggerClassName="disclosure-inline" summary={c.detail}><p>{project[lang]}</p></Disclosure></div><ProjectLinks project={project} lang={lang} /></article>)}</div>
          <a className="journal-more" href="https://github.com/ghosteau" target="_blank" rel="noopener noreferrer">{c.all} <span aria-hidden>↗</span></a>
        </section>

        <section id="experience" className="journal-section" aria-labelledby="experience-title">
          <SectionTitle id="experience-title" title={c.experience} note={c.experienceNote} />
          <div className="experience-list">{experience.map((item, i) => <Disclosure key={item.org+item.period} className="experience-entry" triggerClassName="experience-summary" defaultOpen={i === 0} summary={<><span className="experience-org">{item.org}<span className="sr-only">, </span><span>{item[lang].role}</span></span><span className="experience-period"><span className="sr-only">, </span>{item.period.split(" · ").map((range, r) => <span key={range}>{r > 0 && <span className="sr-only">{lang === "en" ? " and " : " et "}</span>}{range}</span>)}</span></>}><ul>{item[lang].bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul></Disclosure>)}</div>
          <div className="journal-links"><Link href="/resume">{c.resume} <span aria-hidden>→</span></Link></div>
          <Disclosure className="research-notes" triggerClassName="disclosure-inline" summary={c.research}>{research.map(item => <article key={item.en.title}><h3>{item[lang].title}</h3><p className="journal-meta">{item[lang].sub}</p><p>{item[lang].body}</p></article>)}</Disclosure>
        </section>

        <section className="journal-section writing-section" aria-labelledby="writing-title">
          <SectionTitle id="writing-title" title={c.writing} note={c.writingNote} />
          <div className="writing-index">{posts.map(post => <Link key={post.href} href={post.href} className="writing-entry"><span className="journal-meta">{post.date[lang]}<span>{post.postLang.toUpperCase()}</span></span><div><h3>{post[lang].title}</h3><p>{post[lang].sub}</p></div><span aria-hidden>↗</span></Link>)}</div>
          <Link className="journal-more" href="/blog">{c.allWriting} <span aria-hidden>→</span></Link>
        </section>

        <section id="about" className="journal-section" aria-labelledby="about-title">
          <SectionTitle id="about-title" title={c.about} note={c.aboutNote} />
          <div className="personal-story"><p>{c.aboutBody}</p><p>{ui[lang].aboutP2}</p></div>
          <div className="journal-photos">
            <Link href="/photos"><figure><div><Image src="/photos/paris/7-eiffel.jpg" alt={lang === "en" ? "The Eiffel Tower from the Seine" : "La tour Eiffel depuis la Seine"} fill quality={90} sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1336px) 56vw, 680px" /></div><figcaption><span>Paris, France</span><span>2026</span></figcaption></figure></Link>
            <Link href="/photos"><figure><div><Image src="/photos/pittsburgh/pnc-park.jpg" alt={lang === "en" ? "PNC Park and Pittsburgh’s skyline" : "Le PNC Park et Pittsburgh"} fill quality={90} sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1336px) 56vw, 680px" /></div><figcaption><span>Pittsburgh, Pennsylvania</span><span>{lang === "en" ? "Home" : "Chez moi"}</span></figcaption></figure></Link>
          </div>
          <Link className="journal-more" href="/photos">{c.photos} <span aria-hidden>→</span></Link>
          <div className="music-note"><div><span className="journal-meta">{lang === "en" ? "Music" : "Musique"}</span><h3>{c.music}</h3><p>{c.musicBody}</p></div><a href={"https://open.spotify.com/album/"+SPOTIFY_ALBUM_ID} target="_blank" rel="noopener noreferrer">{c.listen} <span aria-hidden>↗</span></a></div>
          <Disclosure className="album-player" triggerClassName="disclosure-inline" summary={c.player} lazy><iframe title="Vigilance — Spotify" src={"https://open.spotify.com/embed/album/"+SPOTIFY_ALBUM_ID+"?theme=0"} width="100%" height="352" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" /></Disclosure>
          <Disclosure className="connections-note" triggerClassName="disclosure-inline" summary={c.connections} lazy><p>{ui[lang].connectionsBlurb}</p><ConnectionsGraph lang={lang}/><p className="journal-meta">{c.coursework}</p><ul className="course-list">{courses.map(course => <li key={course.en}>{course[lang]}</li>)}</ul></Disclosure>
        </section>
        <section className="journal-contact"><h2>{c.contact}</h2><div><p>{c.contactBody}</p><a href="mailto:mcgrailmanny@gmail.com">mcgrailmanny@gmail.com <span aria-hidden>↗</span></a></div></section>
        <footer className="journal-footer"><p>{c.footer}</p><div><a href="https://github.com/ghosteau">GitHub</a><a href="https://www.linkedin.com/in/manny-mcgrail/">LinkedIn</a><a href="https://huggingface.co/ghosteau">Hugging Face</a><a href="https://fantomee.substack.com">Substack</a><a href="/feed.xml">RSS</a><a href="#top">{c.back} ↑</a></div></footer>
      </div>
    </main>
  );
}
