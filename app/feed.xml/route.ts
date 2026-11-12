import { posts } from "../blog/posts";

/* RSS 2.0 feed of the notebook, generated at build time from posts.ts.
   Newsletter tools (Substack import, Buttondown/Kit "RSS to email") and feed
   readers can all consume this, so it is the one integration point that
   survives switching providers. */

export const dynamic = "force-static";

const SITE = "https://mannymcgrail.com";

const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

// Noon UTC keeps the calendar date stable in every reader's time zone.
const rfc822 = (iso: string) => new Date(`${iso}T12:00:00Z`).toUTCString();

export function GET() {
  const items = posts
    .map((post) => {
      const own = post[post.postLang];
      const url = SITE + post.href;
      return `    <item>
      <title>${escape(own.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rfc822(post.published)}</pubDate>
      <description>${escape(`${own.sub}. ${own.blurb}`)}</description>
      <dc:language>${post.postLang}</dc:language>
${post.tags.map((tag) => `      <category>${escape(tag)}</category>`).join("\n")}
    </item>`;
    })
    .join("\n");

  const latest = posts.map((post) => post.published).sort().at(-1) ?? "2025-01-01";

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Manny McGrail — Notebook</title>
    <link>${SITE}/blog</link>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Essays on AI, engineering, and ideas worth returning to, in English and French.</description>
    <language>en</language>
    <lastBuildDate>${rfc822(latest)}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
