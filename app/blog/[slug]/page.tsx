import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EssayLayout } from "../essay-layout";
import { getPost, posts } from "../posts";
import { essays } from "@/content/essays";

type Params = { params: Promise<{ slug: string }> };

// Every essay is prerendered; an unknown slug is a 404, not a runtime render.
export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  const own = post[post.postLang];
  return {
    title: `${own.title} — Manny McGrail`,
    description: own.blurb,
    // Page-level `alternates` replaces the root layout's, so the feed is repeated here.
    alternates: {
      canonical: post.href,
      types: { "application/rss+xml": [{ url: "/feed.xml", title: "Manny McGrail — Notebook" }] },
    },
    openGraph: {
      type: "article",
      title: own.title,
      description: own.blurb,
      url: post.href,
      publishedTime: post.published,
      authors: ["Emmanuel McGrail"],
      locale: post.postLang === "fr" ? "fr_FR" : "en_US",
    },
  };
}

export default async function EssayPage({ params }: Params) {
  const post = getPost((await params).slug);
  const body = post && essays[post.slug];
  if (!post || !body) notFound();
  return <EssayLayout post={post}>{body}</EssayLayout>;
}
