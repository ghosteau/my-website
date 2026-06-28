# Custom trainer sprites (drop-in)

The site ships with a hand-drawn pixel avatar of Manny. When you have a real
sprite template (e.g. a [hyo-oppa](https://www.deviantart.com/) trainer sprite,
which is free **with credit**), you can swap it in with no code rewrite.

## How to swap in a sprite

1. Export each sprite as a **PNG with a transparent background**, trimmed tight
   to the character (no big margins).
2. Drop the files in this folder, e.g.:
   - `public/sprites/manny-walk.png`  — the small walking / overworld sprite
   - `public/sprites/manny-helm.png`  — (optional) the "Dragonborn mode" one
3. In `app/components/sprites.tsx`, set the paths near the bottom:
   ```ts
   const MANNY_SPRITE_SRC = "/sprites/manny-walk.png";
   const MANNY_HELM_SPRITE_SRC = "/sprites/manny-helm.png";
   ```
   That's it — the image replaces the hand-drawn sprite everywhere it's used
   (the walking strip above the footer, and the games section).

## Notes

- Images render with `image-rendering: pixelated`, so small pixel art stays
  crisp when scaled up. Native resolution of ~32–64px tall works great.
- A single static PNG won't animate (the hand-drawn one has a 2-frame walk).
  If you want a walk cycle from a template, give me a 2- or 4-frame **sprite
  sheet** (frames laid out horizontally, equal width) and I'll wire up the
  animation.
- **Credit:** if the pack requires attribution (hyo-oppa's does — "give credit
  if used"), tell me and I'll add a visible credit line in the site footer.
