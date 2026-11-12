/* The essay index. Each entry pairs with content/essays/<slug>.mdx, which
   holds the essay body. To publish a new essay:
     1. write content/essays/<slug>.mdx
     2. add an entry here (newest first)
   The page at /blog/<slug>, the /blog listing, the homepage, and the RSS
   feed at /feed.xml all read from this list. */

type Lang = "en" | "fr";
type PostCopy = { title: string; sub: string; blurb: string };

export type Post = {
  slug: string;
  href: string;
  /** ISO date, used for RSS pubDate and article metadata. */
  published: string;
  date: Record<Lang, string>;
  /** The language the essay itself is written in. */
  postLang: Lang;
  tags: string[];
  en: PostCopy;
  fr: PostCopy;
};

const entries: Omit<Post, "href">[] = [
  {
    slug: "ia-un-an-plus-tard",
    published: "2026-08-01",
    date: { en: "August 1, 2026", fr: "Le 1er août 2026" },
    postLang: "fr",
    tags: ["essai", "IA", "industrie"],
    en: {
      title: "L’intelligence artificielle, un an plus tard",
      sub: "Efficiency, tokens, and the global race",
      blurb:
        "A year on from my first essay on AI: why efficiency and token cost now drive the industry, where Claude and OpenAI stand, and how China reshaped the race.",
    },
    fr: {
      title: "L’intelligence artificielle, un an plus tard",
      sub: "Efficacité, jetons et la course mondiale",
      blurb:
        "Un an après mon premier essai sur l’IA : pourquoi l’efficacité et le coût des jetons dominent désormais l’industrie, où en sont Claude et OpenAI et comment la Chine a redessiné la course.",
    },
  },
  {
    slug: "generative-ai",
    published: "2025-04-09",
    date: { en: "April 9, 2025", fr: "Le 9 avril 2025" },
    postLang: "en",
    tags: ["essay", "AI", "deep learning"],
    en: {
      title: "The Vast World of Generative Artificial Intelligence",
      sub: "The ascent of deep learning and its effects",
      blurb:
        "How modern generative models work—from 1965’s earliest deep networks to transformers—and the social and ethical questions that come with them.",
    },
    fr: {
      title: "The Vast World of Generative Artificial Intelligence",
      sub: "L’essor de l’apprentissage profond et ses effets",
      blurb:
        "Comment fonctionnent les modèles génératifs modernes—des premiers réseaux profonds de 1965 aux transformers—et les questions sociales et éthiques qu’ils soulèvent.",
    },
  },
];

export const posts: Post[] = entries.map((entry) => ({ ...entry, href: `/blog/${entry.slug}` }));

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}
