import type { ReactNode } from "react";
import GenerativeAI from "./generative-ai.mdx";
import IAUnAnPlusTard from "./ia-un-an-plus-tard.mdx";

/* Slug → rendered essay body. Add one line here when you add an .mdx file
   (and its entry in app/blog/posts.ts). Holding elements rather than
   components keeps every essay a static, module-level import, and lets the
   [slug] page render one without creating a component during render. */
export const essays: Record<string, ReactNode> = {
  "generative-ai": <GenerativeAI />,
  "ia-un-an-plus-tard": <IAUnAnPlusTard />,
};
