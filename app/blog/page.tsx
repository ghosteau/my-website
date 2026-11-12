"use client";

import Link from "next/link";
import { useLang } from "../components/lang";
import { SiteNav } from "../components/nav";
import { Newsletter } from "../components/newsletter";
import { posts } from "./posts";

export default function Blog() {
  const [lang] = useLang();
  const fr = lang === "fr";
  return <main className="site-canvas journal-home notebook-index">
    <SiteNav />
    <section className="content-rail notebook-page">
      <header className="journal-section-heading"><div><p className="journal-meta">{fr ? "Le carnet" : "The notebook"}</p><h1>{fr ? "Notes & essais" : "Notes & essays"}</h1></div><p>{fr ? "L’IA, l’ingénierie et les idées auxquelles je reviens. En français et en anglais." : "AI, engineering, and ideas I keep returning to. In English and French."}</p></header>
      <div className="writing-index">{posts.map(post => <Link key={post.href} href={post.href} className="writing-entry"><span className="journal-meta">{post.date[lang]}<span>{post.postLang.toUpperCase()}</span></span><div><h2>{post[lang].title}</h2><p className="writing-subtitle">{post[lang].sub}</p><p className="writing-blurb">{post[lang].blurb}</p><span className="journal-more">{fr ? "Lire l’essai" : "Read essay"} <span aria-hidden>→</span></span></div><span aria-hidden>↗</span></Link>)}</div>
      <p className="notebook-end">{fr ? "D’autres textes à venir : mathématiques, histoire et poésie." : "More to come: mathematics, history, and poetry."}</p>
      <Newsletter lang={lang} />
    </section>
  </main>;
}
