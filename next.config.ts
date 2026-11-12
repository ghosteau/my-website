import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // md/mdx must be registered here even though no route is written in MDX:
  // Next only applies its server-component React aliases to page extensions,
  // and without them an imported .mdx file binds to the wrong React copy
  // ("Cannot read properties of undefined (reading 'recentlyCreatedOwnerStacks')").
  // Essays live in content/essays/, outside app/, so this creates no routes.
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  images: {
    qualities: [72, 75, 90],
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
