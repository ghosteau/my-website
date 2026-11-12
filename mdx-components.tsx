import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

/* Components every essay can use without importing anything.
   Markdown elements are styled by `.essay-prose` in globals.css; this file
   only adds behavior (external links open in a new tab) and the two custom
   blocks: <EssayNote> for the closing source/context line, and <YouTube>
   for embedding a video once the channel exists. */

function Anchor({ href = "", children, ...props }: ComponentPropsWithoutRef<"a">) {
  const external = /^https?:\/\//.test(href);
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...props}>
      {children}
    </a>
  );
}

function EssayNote({ children }: { children: ReactNode }) {
  return <aside className="essay-note">{children}</aside>;
}

/** `<YouTube id="dQw4w9WgXcQ" title="…" />` — privacy-enhanced embed. */
function YouTube({ id, title }: { id: string; title: string }) {
  return (
    <figure className="essay-video">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={title}
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </figure>
  );
}

const components: MDXComponents = { a: Anchor, EssayNote, YouTube };

export function useMDXComponents(): MDXComponents {
  return components;
}
