# Manny McGrail — Personal Website

Bilingual (EN / FR) personal site for Emmanuel "Manny" McGrail.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4  
**Live branch:** `develop` → merges into `main` for production  
**Repo:** [github.com/ghosteau/my-website](https://github.com/ghosteau/my-website)

---

## Quick start

```bash
# 1. Install dependencies (first time only, or after pulling)
npm install

# 2. Start the dev server with hot reload
npm run dev
```

Open **http://localhost:3000**.

> **Node version:** Built and tested on Node 20+. Check yours with `node --version`.

---

## All commands

| Command         | What it does                                            |
| --------------- | ------------------------------------------------------- |
| `npm install`   | Install all dependencies                                |
| `npm run dev`   | Dev server at `localhost:3000` with hot reload          |
| `npm run build` | Production build (also runs type-check + lint)          |
| `npm run start` | Serve the production build (requires `npm run build` first) |
| `npm run lint`  | Run ESLint across the project                           |

---

## Project structure

```
app/
  layout.tsx              # Root layout: fonts, HTML metadata, Open Graph tags
  globals.css             # Tailwind v4 import, turquoise @theme tokens, all keyframes
  page.tsx                # Home page: hero, about, experience, projects, research, music
  content.ts              # Single source of truth for all bilingual copy + data arrays
  resume/
    page.tsx              # /resume — full CV, bilingual, browser-printable
  blog/
    page.tsx              # /blog — post index
    generative-ai/
      page.tsx            # /blog/generative-ai — essay: generative AI & deep learning
  photos/
    page.tsx              # /photos — photo journal (swipeable moment carousel)
  components/
    sprites.tsx           # All pixel-art: flags, ghost, game sprites, Manny avatar
    lang.tsx              # useLang() hook + EN/FR toggle pill component

public/
  photos/
    quebec/               # Québec Parliament trip photos (May 2026)
  sprites/
    manny_sprite.png      # Real pixel-art avatar (transparent background)
    manny_sprite.jpg      # Original source JPEG (kept for reference)
    README.md             # Sprite swap guide (how to drop in a new sprite)

next.config.ts
postcss.config.mjs
tsconfig.json
package.json
```

---

## Where to edit things

### Text and translations
All bilingual copy lives in **`app/content.ts`**. Every user-facing string has an `en` and `fr` version inside the `ui` export. Edit there and it updates across every page automatically.

The resume and blog pages have a small amount of page-specific copy at the top of their own files (`app/resume/page.tsx`, `app/blog/page.tsx`).

### Experience, projects, research, coursework
All four are arrays in `app/content.ts`:

```ts
export const experience = [ ... ];   // work history
export const projects   = [ ... ];   // featured GitHub projects
export const research   = [ ... ];   // research entries
export const courses    = [ ... ];   // coursework chips
```

Add or remove an entry in any array and it updates on both the home page and the résumé page instantly.

### Colors
The turquoise palette lives in **`app/globals.css`** under the `@theme` block:

```css
@theme {
  --color-turq-50: #ecfeff;
  --color-turq-300: #5eead4;
  --color-turq-500: #14b8a6;
  /* ... */
}
```

Three accent families are used throughout: `turq` (custom deep teal), `cyan`, and `emerald`. Change any `--color-turq-*` value to retheme the whole site.

### Fonts
Loaded via `next/font/google` in **`app/layout.tsx`**:
- **Space Grotesk** — body / display text (`--font-sans`)
- **JetBrains Mono** — labels, kickers, code snippets (`--font-mono`)

Swap the import to use any other Google Font.

### Animations / keyframes
All `@keyframes` are defined at the top of **`app/globals.css`**, and corresponding utility classes (`.animate-bob`, `.animate-walk-step`, etc.) are defined just below them. Add a new keyframe there and create a class to use it anywhere.

Key animations:

| Class | What it does |
|---|---|
| `.animate-bob` | Slow float up-down (ghost, game sprites) |
| `.animate-walk-step` | 2-step vertical bounce (Manny walking) |
| `.animate-squash` | RPG-style squash-stretch (slime) |
| `.animate-coin` | Horizontal flip (coin sprite) |
| `.animate-twinkle` | Fade in-out sparkle |
| `.animate-sway` | Pendulum swing (flag wave) |
| `walk-across` | Slides element across the full viewport width |
| `pixel-float` | Drifts sprite upward + fades (background ghosts) |

---

## Key systems

### Bilingual toggle (EN / FR)

The language toggle is handled by **`app/components/lang.tsx`**:

```ts
const [lang, setLang, toggle] = useLang();
```

- Persists to `localStorage` under the key `"lang"`
- Broadcasts a `"langchange"` custom window event so all open tabs/pages stay in sync without a page reload
- Falls back to `"en"` if nothing is stored

To add a string, add it to both `ui.en` and `ui.fr` in `app/content.ts`.

### Pixel-art sprite system

All sprites live in **`app/components/sprites.tsx`**. The core renderer is `GridSvg`:

```ts
// A color grid is a 2D array of palette keys, e.g.:
const grid = [
  ["r", "r", "w"],
  ["w", "s", "w"],
];
// Each key maps to a hex color in a palette object.
// GridSvg renders this as an SVG of colored <rect>s with shapeRendering="crispEdges".
```

Sprites available:

| Export | Description |
|---|---|
| `<Flag kind="usa" />` | Waving USA flag (15×10 pixel grid) |
| `<Flag kind="quebec" />` | Fleurdelisé flag (13×9) |
| `<Flag kind="france" />` | Tricolor (12×8) |
| `<PixelGhost />` | Teal shaded ghost — the `ghosteau` mascot |
| `<PixelManny />` | Pixel avatar of Manny (see Sprite swap below) |
| `<PixelMannyHelm />` | Manny in Dragonborn mode (games section) |
| `<GameSprite kind="minecraft" />` | Minecraft grass block |
| `<GameSprite kind="elderscrolls" />` | Elder Scrolls sword |
| `<GameSprite kind="pokemon" />` | Pokéball |
| `<GameSprite kind="zelda" />` | Triforce |
| `<GameSprite kind="mario" />` | ? block |
| `<GameSprite kind="sonic" />` | Gold ring |

### Sprite swap seam (Manny avatar)

Near the bottom of `sprites.tsx`, two constants control which sprite is rendered:

```ts
const MANNY_SPRITE_SRC      = "/sprites/manny_sprite.png"; // walking sprite
const MANNY_HELM_SPRITE_SRC = "";                          // Dragonborn variant
```

- When `MANNY_SPRITE_SRC` is a non-empty path, `<PixelManny />` renders that image (with `image-rendering: pixelated` so pixel art stays crisp at any size).
- When it's `""`, it falls back to the programmatically-drawn SVG avatar.
- Set `MANNY_HELM_SPRITE_SRC` to swap the Dragonborn variant in the games section.

To drop in a new sprite: export it as a transparent PNG, place it in `public/sprites/`, and update the constant. See **`public/sprites/README.md`** for details.

### Performance: spotlight + scroll (ref-driven, no re-renders)

The mouse spotlight and scroll-hint fade are driven entirely through `useRef` + `requestAnimationFrame` — not React state — so moving the mouse or scrolling never triggers a component re-render:

```ts
const onMouse = (e: MouseEvent) => {
  lx = e.clientX; ly = e.clientY;
  if (!raf) raf = requestAnimationFrame(paint); // coalesces rapid events
};
```

The scroll-to-top button visibility is controlled the same way (`scrollTopRef.current.style.opacity`), keeping the main tree render-free during scroll.

### FadeIn animation

A lightweight `<FadeIn delay={ms}>` wrapper uses its own `IntersectionObserver` to play a `translateY(32px) → 0 + opacity 0 → 1` entrance when an element scrolls into view. Used on every content section.

---

## Pages

### `/` — Home
Sections (in order):
1. **Hero** — name, tagline, Montaigne quote, CTA buttons
2. **About** — bio paragraphs, quick-facts grid (incl. the "roots" flag row), coursework chips, game sprites
3. **Experience** — BNY, Pitt Athletics, Pitt NLP research
4. **Projects** — 6 featured GitHub repos
5. **Research** — 2 research entries
6. **Music** — Vigilance album blurb + Spotify embed
7. **Walking strip** — Manny sprite walks across the screen with the ghost companion
8. **Footer** — links + year

### `/resume`
Full bilingual CV. Reads experience, projects, and courses from `content.ts` (same data as home page). Links to the real PDF at `public/resume.pdf` (Download PDF button in the nav and header).

### `/blog`
Post index. Each post lives at its own route (e.g. `app/blog/generative-ai/page.tsx`)
and gets a card on the index with tags, date, and a blurb. Post content is in English
with an `EN` tag; the surrounding UI stays bilingual.

### `/photos`
Photo journal built around "moments" — a moment is a set of photos sharing one
caption, date, and tag chips (pixel-flag icons via `<FlagIcon />`). Photos render in
a swipeable card carousel (arrows, dots, touch swipe). To add a moment: drop compressed
JPEGs in `public/photos/<name>/` and add an entry alongside `quebecMoment` in
`app/photos/page.tsx`.

---

## Deploying

### Vercel (recommended)
1. Push to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects Next.js — no configuration needed.
4. Every push to `main` triggers a redeploy. `develop` gets a preview URL automatically.

No environment variables are required. The Spotify embed uses a public album ID (`SPOTIFY_ALBUM_ID` in `content.ts`).

### Self-hosted

```bash
npm run build      # outputs to .next/
npm run start      # serves on port 3000
```

Point a reverse proxy (nginx, Caddy) at `localhost:3000` and serve via HTTPS.

---

## Branch strategy

| Branch | Purpose |
|---|---|
| `main` | Stable / production — merge from `develop` when ready to ship |
| `develop` | Active development — all commits land here first |

Open a PR from `develop → main` on GitHub when a batch of changes is ready.

---

## TODO

- [ ] Add an OG image (`public/og.png`) for richer social previews — currently only text metadata is set
- [ ] Add photo of myself so people can see what I look like without going to LinkedIn
- [ ] Make a way to subscribe to an emailing list for blogs and moments, potentially even create way to subscribe to different tags
