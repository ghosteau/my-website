# Manny McGrail — Personal Website

Bilingual (EN / FR) personal site for Emmanuel "Manny" McGrail. Built with
**Next.js 15 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

Turquoise theme, Mistral-inspired animation, and hand-built pixel-art sprites
(waving USA / Québec / France flags + a `ghosteau` ghost easter egg).

---

## Quick start

```bash
# 1. install dependencies (first time only)
npm install

# 2. run the dev server (hot reload)
npm run dev
```

Then open **http://localhost:3000**.

## All commands

| Command         | What it does                                            |
| --------------- | ------------------------------------------------------- |
| `npm install`   | Install dependencies (run once, or after pulling)       |
| `npm run dev`   | Start the dev server at `localhost:3000` with hot reload |
| `npm run build` | Production build (also runs type-checking + lint)       |
| `npm run start` | Serve the production build (run `npm run build` first)  |
| `npm run lint`  | Run ESLint                                              |

> **Node:** built and tested on Node 20+ (works on Node 24). If `npm run dev`
> fails, check your Node version with `node --version`.

---

## Project structure

```
app/
  layout.tsx          # root layout, fonts (Space Grotesk + JetBrains Mono), metadata
  globals.css         # Tailwind import, turquoise theme tokens, keyframes
  page.tsx            # home page (hero, about, experience, projects, research)
  content.ts          # ALL bilingual copy + experience/projects/research data
  resume/page.tsx     # /resume  — full CV, bilingual, printable
  blog/page.tsx       # /blog    — notes & essays (placeholders for now)
  components/
    sprites.tsx       # pixel-art flags (USA/Québec/France) + ghost, generated from color grids
    lang.tsx          # useLang() hook (localStorage-backed) + EN/FR toggle pill
next.config.ts
postcss.config.mjs
tsconfig.json
```

### Where to edit things

- **Text / translations** → `app/content.ts`. Every string has an `en` and `fr`
  version. The home page, resume, and blog all read from here (resume and blog
  have a little extra page-specific copy at the top of their own files).
- **Experience, projects, research, coursework** → arrays in `app/content.ts`.
  Add/remove an entry there and it updates everywhere.
- **Colors** → `app/globals.css`, the `@theme` block (`--color-turq-*`). The
  three accent families are `turq` (custom), `cyan`, and `emerald`.
- **Sprites / flags** → `app/components/sprites.tsx`. Each flag is a small
  character grid mapped to a color palette, so they stay crisp at any size.
- **Fonts** → `app/layout.tsx` (`next/font/google`).

### Language toggle

The EN/FR toggle lives in the nav. The choice is saved to `localStorage` and
shared across all pages via the `useLang()` hook in `app/components/lang.tsx`.

---

## Deploying

Easiest path is **Vercel** (made by the Next.js team):

1. Push this repo to GitHub.
2. Import it at https://vercel.com/new — it auto-detects Next.js.
3. No env vars needed. Every push to the production branch redeploys.

Or build and self-host:

```bash
npm run build
npm run start   # serves on port 3000
```

---

## Branches

- `main` — stable / production
- `develop` — active development (you're here)

## TODO

- [ ] Add a real résumé PDF download
- [ ] Write the first real blog post (placeholders live in `app/blog/page.tsx`)
- [ ] Add a (good) photo
- [ ] Point a custom domain at the Vercel deployment
