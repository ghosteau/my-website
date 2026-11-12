"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Lang } from "./lang";

/* A schematic of STEVE's output volume, not a sample of generated terrain.

   When it scrolls into view the chunk builds itself upward in eight voxel
   layers, each easing into place, while the height label counts to 384 —
   a nod to the model emitting the whole column in one pass. It plays once
   (no hover replay: pointerenter also fires when scrolling moves the figure
   under a resting cursor), and renders fully built for reduced motion. */

const H = 187;            // drawn height of the prism, in viewBox units
const LAYERS = 8;         // matches the 8 grid bands on the side faces
const STEP = H / LAYERS;
const DURATION = 1500;
const VOXELS_TALL = 384;

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export function ChunkDiagram({ lang }: { lang: Lang }) {
  const ref = useRef<SVGSVGElement>(null);
  const frame = useRef(0);
  const [h, setH] = useState(0);

  const build = useCallback(() => {
    cancelAnimationFrame(frame.current);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setH(H);
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      const layer = Math.floor(p * LAYERS);
      const within = p * LAYERS - layer;
      setH(p >= 1 ? H : (layer + easeOut(within)) * STEP);
      if (p < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          build();
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame.current);
    };
  }, [build]);

  // Geometry: the base is fixed; everything above it is offset by the
  // current height h (top face) or drawn h tall (vertical edges).
  const d = H - h;
  const bands = [1, 2, 3, 4, 5, 6, 7].filter((k) => k * STEP < h - 0.5);
  const ticks = [1, 2, 3, 4, 5, 6, 7];
  const height = Math.round((h / H) * VOXELS_TALL);

  return (
    <figure className="chunk-figure">
      <svg
        ref={ref}
        viewBox="0 0 420 390"
        role="img"
        aria-labelledby="chunk-title chunk-desc"
      >
        <title id="chunk-title">{lang === "en" ? "STEVE output chunk dimensions" : "Dimensions du chunk produit par STEVE"}</title>
        <desc id="chunk-desc">{lang === "en" ? "An isometric schematic of a 16 by 384 by 16 voxel chunk. Not to scale." : "Un schéma isométrique d’un chunk de 16 par 384 par 16 voxels. Non à l’échelle."}</desc>

        {/* footprint — visible before the build starts, hidden behind the faces after */}
        <path d="M118 289 210 336 303 289 210 242Z" fill="none" stroke="#075764" strokeWidth="1" strokeDasharray="3 4" opacity=".45" />

        <g stroke="#075764" strokeWidth="1.2" strokeLinejoin="round">
          <path d={`M118 ${289 - h} 210 ${336 - h} 210 336 118 289Z`} fill="#8ed9d6" />
          <path d={`M210 ${336 - h} 303 ${289 - h} 303 289 210 336Z`} fill="#b4eae7" />
          <path d={`M118 ${289 - h} 210 ${242 - h} 303 ${289 - h} 210 ${336 - h}Z`} fill="#d2f6f4" />

          <g opacity=".44" fill="none">
            {/* layer bands on both side faces, appearing as each layer lands */}
            {bands.map((k) => (
              <path key={`band-${k}`} d={`M118 ${289 - k * STEP} 210 ${336 - k * STEP} 303 ${289 - k * STEP}`} />
            ))}
            {/* vertical columns on the side faces, h tall */}
            {ticks.map((i) => (
              <path key={`col-${i}`} d={`M${118 + i * 11.5} ${289 + i * 5.875} v${-h} M${210 + i * 11.625} ${336 - i * 5.875} v${-h}`} />
            ))}
            {/* 16 × 16 grid on the top face, riding up with it */}
            {ticks.map((i) => (
              <path key={`top-${i}`} d={`M${118 + i * 11.5} ${102 - i * 5.875 + d} l93 47 M${210 + i * 11.625} ${55 + i * 5.875 + d} l-92 47`} />
            ))}
          </g>

          {/* dimension lines: the two 16s are fixed; the height line grows with the build */}
          <path fill="none" d="M111 308l92 47m-97-43 10-8m82 55 10-8 M224 355l92-47m-97 43 10 8m82-55 10 8" />
          {h > 1 && <path fill="none" d={`M335 ${289 - h}V289 M330 ${289 - h}h10 M330 289h10`} />}
        </g>

        <g fill="#154c53" fontSize="12" fontFamily="monospace">
          {h > 1 && <text x="347" y={289 - h / 2 + 4} style={{ fontVariantNumeric: "tabular-nums" }}>{height}</text>}
          <text x="144" y="348">16</text>
          <text x="272" y="348">16</text>
        </g>
      </svg>
      <figcaption>{lang === "en" ? "OUTPUT VOLUME / SCHEMATIC, NOT TO SCALE" : "VOLUME DE SORTIE / SCHÉMA NON À L’ÉCHELLE"}</figcaption>
    </figure>
  );
}
