"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useLang } from "../components/lang";
import { SiteNav } from "../components/nav";
import { Newsletter } from "../components/newsletter";
import type { Post } from "./posts";

const chrome = {
  en: { back: "← Notebook", kicker: "Essay", writtenIn: { en: "Written in English", fr: "Written in French" } },
  fr: { back: "← Carnet", kicker: "Essai", writtenIn: { en: "Écrit en anglais", fr: "Écrit en français" } },
};

/** Page chrome around an MDX essay body. The interface follows the reader's
 *  chosen language; the essay text keeps the language it was written in. */
export function EssayLayout({ post, children }: { post: Post; children: ReactNode }) {
  const [lang] = useLang();
  const c = chrome[lang];
  const own = post[post.postLang];

  return (
    <main className="site-canvas text-ink">
      <SiteNav />

      <article lang={post.postLang} className="essay page-enter">
        <Link href="/blog" className="essay-back" lang={lang}>{c.back}</Link>
        <header className="essay-header">
          <p className="journal-meta" lang={lang}>
            {c.kicker}
            <span>{post.date[lang]}</span>
            <span>{c.writtenIn[post.postLang]}</span>
          </p>
          <h1>{own.title}</h1>
          <p className="essay-sub">{own.sub}</p>
          <ul className="essay-tags" aria-label={lang === "en" ? "Tags" : "Mots-clés"}>
            {post.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
        </header>

        <div className="essay-prose">{children}</div>
      </article>

      <div className="essay-footer" lang={lang}>
        <Newsletter lang={lang} />
      </div>
    </main>
  );
}
