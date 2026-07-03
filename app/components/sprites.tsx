"use client";

import { useEffect, useState } from "react";

/* ────────────────────────────────────────────────────────────
   Hand-built pixel-art sprites, drawn in the spirit of Gen-5
   (Pokémon Black & White) creature sprites — chunky shading,
   readable silhouettes, idle animation. Everything is generated
   from a small character grid mapped to a color palette so the
   SVGs stay crisp at any size.
   ──────────────────────────────────────────────────────────── */

const PX = 4;

type Palette = Record<string, string>;

function GridSvg({
  grid,
  palette,
  className = "",
  title,
}: {
  grid: string[];
  palette: Palette;
  className?: string;
  title?: string;
}) {
  const cols = Math.max(...grid.map((r) => r.length));
  const rows = grid.length;
  return (
    <svg
      viewBox={`0 0 ${cols * PX} ${rows * PX}`}
      className={`pixelated ${className}`}
      role="img"
      aria-label={title}
      shapeRendering="crispEdges"
    >
      {title ? <title>{title}</title> : null}
      {grid.flatMap((row, y) =>
        row.split("").map((ch, x) => {
          const fill = palette[ch];
          if (!fill) return null;
          return (
            <rect key={`${x}-${y}`} x={x * PX} y={y * PX} width={PX} height={PX} fill={fill} />
          );
        }),
      )}
    </svg>
  );
}

/* ═══════════════ FLAGS ═══════════════ */

const FR_PALETTE: Palette = { B: "#0055A4", W: "#F4F4F4", R: "#EF4135" };
const FR_GRID = Array.from({ length: 8 }, () => "BBBBWWWWRRRR");

function buildUSA(): string[] {
  const cols = 15, rows = 10;
  const grid: string[] = [];
  for (let y = 0; y < rows; y++) {
    let row = "";
    for (let x = 0; x < cols; x++) {
      if (x < 6 && y < 5) row += x % 2 === 0 && y % 2 === 0 ? "S" : "N";
      else row += y % 2 === 0 ? "R" : "W";
    }
    grid.push(row);
  }
  return grid;
}
const USA_PALETTE: Palette = { N: "#3C3B6E", S: "#FFFFFF", R: "#B22234", W: "#F4F4F4" };
const USA_GRID = buildUSA();

function buildQuebec(): string[] {
  const cols = 13, rows = 9;
  const fleur = new Set(["3,2", "9,2", "3,6", "9,6"]);
  const grid: string[] = [];
  for (let y = 0; y < rows; y++) {
    let row = "";
    for (let x = 0; x < cols; x++) {
      if (y === 4 || x === 6) row += "W";
      else if (fleur.has(`${x},${y}`)) row += "W";
      else row += "B";
    }
    grid.push(row);
  }
  return grid;
}
const QC_PALETTE: Palette = { B: "#003DA5", W: "#F4F4F4" };
const QC_GRID = buildQuebec();

export function Flag({
  kind, label, delay = 0,
}: {
  kind: "usa" | "quebec" | "france";
  label: string;
  delay?: number;
}) {
  const map = {
    usa: { grid: USA_GRID, palette: USA_PALETTE },
    quebec: { grid: QC_GRID, palette: QC_PALETTE },
    france: { grid: FR_GRID, palette: FR_PALETTE },
  } as const;
  const f = map[kind];
  return (
    <div className="group relative flex flex-col items-center select-none">
      <div className="relative flex items-end">
        <div className="w-[3px] h-16 bg-gradient-to-b from-white/40 to-white/10 rounded-full mr-[-1px] mb-[-2px]" />
        <div className="origin-left transition-transform duration-300 group-hover:scale-110"
          style={{ animation: `flag-wave 3s ease-in-out ${delay}ms infinite` }}>
          <GridSvg grid={f.grid} palette={f.palette} title={label}
            className="w-20 h-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)]" />
        </div>
      </div>
      <span className="absolute -bottom-5 whitespace-nowrap font-mono text-[10px] tracking-widest uppercase text-white/0 group-hover:text-turq-300/80 transition-colors duration-200">
        {label}
      </span>
    </div>
  );
}

/* canada — red bands + simplified maple leaf, used only as a small tag icon */
const CA_PALETTE: Palette = { R: "#D52B1E", W: "#F4F4F4" };
const CA_GRID = [
  "RRRRWWWWWWWWRRRR",
  "RRRRWWWRWWWWRRRR",
  "RRRRWWRRRWWWRRRR",
  "RRRRWRRRRRWWRRRR",
  "RRRRWWRRRWWWRRRR",
  "RRRRWWWRWWWWRRRR",
  "RRRRWWWWWWWWRRRR",
  "RRRRWWWWWWWWRRRR",
];

/* small flat flag — no pole, no wave; for inline tag chips */
export function FlagIcon({
  kind, className = "", title,
}: {
  kind: "usa" | "quebec" | "france" | "canada";
  className?: string;
  title?: string;
}) {
  const map = {
    usa: { grid: USA_GRID, palette: USA_PALETTE },
    quebec: { grid: QC_GRID, palette: QC_PALETTE },
    france: { grid: FR_GRID, palette: FR_PALETTE },
    canada: { grid: CA_GRID, palette: CA_PALETTE },
  } as const;
  const f = map[kind];
  return <GridSvg grid={f.grid} palette={f.palette} title={title} className={className} />;
}

/* ═══════════════ CREATURES ═══════════════ */

/* ghosteau — a shaded little ghost with a wavy tail */
const GHOST_GRID = [
  "    oooo    ",
  "  ooggggoo  ",
  " oggggggggo ",
  "ogggggggggso",
  "oggwwggwwgso",
  "oggweggwegso",
  "ogggggggggso",
  "oggggmmgggso",
  "ogggggggggso",
  "ogggggggggso",
  "ogggggggggso",
  "ggg  ggg  gg",
  " g    g   g ",
];
const GHOST_PALETTE: Palette = {
  o: "#04241f", g: "#5eead4", s: "#14b8a6",
  w: "#ecfeff", e: "#04241f", m: "#04241f",
};
export function PixelGhost({ className = "" }: { className?: string }) {
  return <GridSvg grid={GHOST_GRID} palette={GHOST_PALETTE} className={className} title="ghosteau" />;
}

/* slime — the iconic RPG starter blob */
const SLIME_GRID = [
  "     oooooo     ",
  "    ollbbbbo    ",
  "   ollbbbbbbo   ",
  "  ollbbbbbbbbo  ",
  "  olbbbbbbbbdo  ",
  " obbwpbbbwpbbdo ",
  " obbbbbbbbbbbdo ",
  "obbbbbmmmmbbbbdo",
  "obbbbbbbbbbbbbdo",
  "oooooooooooooooo",
];
const SLIME_PALETTE: Palette = {
  o: "#04241f", b: "#14b8a6", l: "#5eead4", d: "#0d9488",
  w: "#ecfeff", p: "#04241f", m: "#0a3d36",
};
export function PixelSlime({ className = "" }: { className?: string }) {
  return <GridSvg grid={SLIME_GRID} palette={SLIME_PALETTE} className={className} title="slime" />;
}

/* ═══════════════ ITEMS ═══════════════ */

const COIN_GRID = [
  "   oooo   ",
  "  oyyyyo  ",
  " oyylyyyo ",
  "oyylyyyyyo",
  "oyylyyyyyo",
  "oyyyyyyyyo",
  "oyyyyyyyyo",
  " oyyyyyyo ",
  "  oyyyyo  ",
  "   oooo   ",
];
const COIN_PALETTE: Palette = { o: "#6b4e16", y: "#f2c14e", l: "#fce8a8" };
export function PixelCoin({ className = "" }: { className?: string }) {
  return <GridSvg grid={COIN_GRID} palette={COIN_PALETTE} className={className} title="coin" />;
}

const HEART_GRID = [
  "  rr   rr  ",
  " rrrr rrrr ",
  "rrhhrrrrrrr",
  "rrhrrrrrrrr",
  "rrrrrrrrrrr",
  " rrrrrrrrr ",
  "  rrrrrrr  ",
  "   rrrrr   ",
  "    rrr    ",
  "     r     ",
];
const HEART_PALETTE: Palette = { r: "#fb7185", h: "#fecdd3" };
export function PixelHeart({ className = "" }: { className?: string }) {
  return <GridSvg grid={HEART_GRID} palette={HEART_PALETTE} className={className} title="heart" />;
}

const POTION_GRID = [
  "   oo   ",
  "   oo   ",
  "  oooo  ",
  "  o  o  ",
  "  o  o  ",
  " oooooo ",
  " obbbbo ",
  "obbbbbbo",
  "obhbbbbo",
  "obbbbbbo",
  "obbbbbbo",
  " oooooo ",
];
const POTION_PALETTE: Palette = { o: "#0a3d36", b: "#14b8a6", h: "#5eead4" };
export function PixelPotion({ className = "" }: { className?: string }) {
  return <GridSvg grid={POTION_GRID} palette={POTION_PALETTE} className={className} title="potion" />;
}

const SPARKLE_GRID = [
  "    o    ",
  "    o    ",
  "   ooo   ",
  " o ooo o ",
  "ooooooooo",
  " o ooo o ",
  "   ooo   ",
  "    o    ",
  "    o    ",
];
const SPARKLE_PALETTE: Palette = { o: "#a5f3ec" };
export function PixelSparkle({ className = "" }: { className?: string }) {
  return <GridSvg grid={SPARKLE_GRID} palette={SPARKLE_PALETTE} className={className} title="sparkle" />;
}

/* ═══════════════ GAME HOMAGES (original pixel art) ═══════════════ */

/* Minecraft — grass block */
const MC_GRID = [
  "oooooooooooo",
  "ogggGgggggGo",
  "oGgggggggggo",
  "ogggggGggggo",
  "odddDdddddDo",
  "odDddddddddo",
  "oddddddDdddo",
  "odDddddddddo",
  "oddddddddDdo",
  "odddDddddddo",
  "oddddddddddo",
  "oooooooooooo",
];
const MC_PALETTE: Palette = { o: "#2c1a10", g: "#6cb33f", G: "#4e8b2c", d: "#8a5a3b", D: "#6b4329" };

/* Elder Scrolls (Skyrim / Oblivion) — a sword */
const SWORD_GRID = [
  "   s   ",
  "  sSs  ",
  "  sSs  ",
  "  sSs  ",
  "  sSs  ",
  "  sSs  ",
  "  sSs  ",
  "  sSs  ",
  "  sSs  ",
  " ggggg ",
  "ggggggg",
  "   h   ",
  "   h   ",
  "   h   ",
  "  ggg  ",
];
const SWORD_PALETTE: Palette = { s: "#9ca3af", S: "#e5e7eb", g: "#d4a843", h: "#6b4226" };

/* Pokémon — poké ball */
const POKE_GRID = [
  "    oooo    ",
  "  oorrrroo  ",
  " orrrrrrrro ",
  " orrrrrrrro ",
  "orrrrrrrrrro",
  "okkkkWWkkkko",
  "okkkkWWkkkko",
  "ollllllllllo",
  " ollllllllo ",
  " ollllllllo ",
  "  oolllloo  ",
  "    oooo    ",
];
const POKE_PALETTE: Palette = { o: "#1a1a1a", r: "#e3350d", k: "#1a1a1a", W: "#f4f4f4", l: "#f4f4f4" };

/* Zelda — Triforce */
const TRI_GRID = [
  "       y       ",
  "      yyy      ",
  "     yyyyy     ",
  "    yyyyyyy    ",
  "   y       y   ",
  "  yyy     yyy  ",
  " yyyyy   yyyyy ",
  "yyyyyyy yyyyyyy",
];
const TRI_PALETTE: Palette = { y: "#f2c14e" };

/* Mario — ? block */
const QBLOCK_GRID = [
  "oooooooooooo",
  "orqqqqqqqqro",
  "oqqqwwwwqqqo",
  "oqqwqqqqwqqo",
  "oqqqqqqqwqqo",
  "oqqqqqqwqqqo",
  "oqqqqqwqqqqo",
  "oqqqqqwqqqqo",
  "oqqqqqqqqqqo",
  "oqqqqqwqqqqo",
  "orqqqqqqqqro",
  "oooooooooooo",
];
const QBLOCK_PALETTE: Palette = { o: "#5a3a08", q: "#f5a623", r: "#5a3a08", w: "#f4f4f4" };

/* Sonic — ring */
const RING_GRID = [
  "    oooo    ",
  "  ooyyyyoo  ",
  " oyyo  oyyo ",
  " oyo    oyo ",
  "oyyo    oyyo",
  "oyo      oyo",
  "oyo      oyo",
  "oyyo    oyyo",
  " oyo    oyo ",
  " oyyo  oyyo ",
  "  ooyyyyoo  ",
  "    oooo    ",
];
const RING_PALETTE: Palette = { o: "#9a7416", y: "#ffd23f" };

const GAME_MAP: Record<string, { grid: string[]; palette: Palette }> = {
  minecraft: { grid: MC_GRID, palette: MC_PALETTE },
  elderscrolls: { grid: SWORD_GRID, palette: SWORD_PALETTE },
  pokemon: { grid: POKE_GRID, palette: POKE_PALETTE },
  zelda: { grid: TRI_GRID, palette: TRI_PALETTE },
  mario: { grid: QBLOCK_GRID, palette: QBLOCK_PALETTE },
  sonic: { grid: RING_GRID, palette: RING_PALETTE },
};

export function GameSprite({
  kind, label, className = "",
}: {
  kind: string;
  label: string;
  className?: string;
}) {
  const g = GAME_MAP[kind];
  if (!g) return null;
  return (
    <div className="group relative flex flex-col items-center gap-2 select-none">
      <GridSvg grid={g.grid} palette={g.palette} title={label}
        className={`h-auto transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110 ${className}`} />
      <span className="absolute -bottom-5 whitespace-nowrap font-mono text-[10px] tracking-wide text-white/0 group-hover:text-turq-300/80 transition-colors duration-200">
        {label}
      </span>
    </div>
  );
}

/* ═══════════════ ANIMATED CHARACTERS (original, multi-frame) ═══════════════ */

function AnimatedCharacter({
  frames, palette, fps = 4, className = "", title,
}: {
  frames: string[][];
  palette: Palette;
  fps?: number;
  className?: string;
  title?: string;
}) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % frames.length), 1000 / fps);
    return () => clearInterval(id);
  }, [frames.length, fps]);
  return <GridSvg grid={frames[i]} palette={palette} className={className} title={title} />;
}

/* Manny — a detailed GBA/DS-style trainer of the man himself: brown
   side-swept hair (no hat), teal polo, khaki dress shorts. Drawn by
   placing colored pixels, shaded with light/dark tones, then framed by
   an automatic dark outline pass for that crafted-sprite look. "helm"
   swaps the hair for a generic horned Nordic helmet (Dragonborn energy,
   original art — no copyrighted likeness). */
function blankGrid(w: number, h: number): string[][] {
  return Array.from({ length: h }, () => Array(w).fill(" "));
}
const TW = 16, THh = 23;
function buildManny() {
  const place = (g: string[][]) => {
    const set = (x: number, y: number, c: string) => { if (x >= 0 && x < TW && y >= 0 && y < THh) g[y][x] = c; };
    const row = (y: number, a: number, b: number, c: string) => { for (let x = a; x <= b; x++) set(x, y, c); };
    return { set, row };
  };
  const face = (g: string[][]) => {
    const { set, row } = place(g);
    row(4, 5, 10, "s");
    row(5, 5, 10, "s"); set(6, 5, "e"); set(9, 5, "e");                 // eyes
    row(6, 5, 10, "s"); set(6, 6, "e"); set(9, 6, "e"); set(10, 6, "d");
    row(7, 5, 10, "s"); set(8, 7, "d");                                 // nose
    row(8, 6, 9, "s"); set(6, 8, "d");                                  // chin
    row(9, 7, 8, "s");                                                  // neck
  };
  const hair = (g: string[][]) => {
    const { set, row } = place(g);
    // flat-ish styled cut — soft peak, NOT a round dome / afro
    set(7, 0, "H"); set(8, 0, "H");                                     // soft peak
    row(1, 5, 10, "H");                                                 // crown
    row(2, 4, 11, "H"); set(6, 2, "L"); set(7, 2, "L");                 // temples + small sheen
    // swept fringe with a side part (gap at col 8)
    set(4, 3, "H"); set(5, 3, "H"); set(6, 3, "H"); set(7, 3, "H");
    set(9, 3, "H"); set(10, 3, "H"); set(11, 3, "H");
    // jagged bang tips over the eyes + sideburns
    set(4, 4, "H"); set(6, 4, "H"); set(9, 4, "H"); set(11, 4, "H");
    set(4, 5, "H"); set(11, 5, "H");
  };
  const helm = (g: string[][]) => {
    const { set, row } = place(g);
    row(0, 6, 9, "m"); row(1, 4, 11, "m"); row(2, 4, 11, "m"); row(3, 4, 11, "m");
    set(5, 1, "w"); set(6, 1, "w");                                     // shine
    set(2, 0, "n"); set(2, 1, "n"); set(3, 1, "n");                     // left horn
    set(13, 0, "n"); set(13, 1, "n"); set(12, 1, "n");                  // right horn
    set(4, 4, "m"); set(11, 4, "m"); set(7, 4, "m"); set(8, 4, "m");    // brow + noseguard
    set(7, 5, "m"); set(8, 5, "m"); set(7, 6, "m"); set(8, 6, "m");     // noseguard
  };
  const body = (g: string[][], step: "A" | "B" | "stand") => {
    const { set, row } = place(g);
    // polo
    row(10, 4, 11, "p"); set(5, 10, "q"); set(10, 10, "r");
    row(11, 4, 11, "p"); set(7, 11, "r"); set(8, 11, "r"); set(5, 11, "q"); set(10, 11, "r"); // collar V
    row(12, 4, 11, "p"); set(5, 12, "q"); set(10, 12, "r");
    row(13, 3, 12, "p"); set(4, 13, "q"); set(11, 13, "r");             // sleeves
    row(14, 4, 11, "p"); set(5, 14, "q"); set(10, 14, "r");
    row(15, 4, 11, "p"); set(4, 15, "r"); set(11, 15, "r");
    set(3, 14, "s"); set(12, 14, "s"); set(3, 15, "s"); set(12, 15, "s"); // forearms / hands
    // belt + shorts
    row(16, 4, 11, "b");
    row(17, 4, 11, "k"); set(7, 17, "j"); set(8, 17, "j"); set(10, 17, "j"); set(11, 17, "j");
    row(18, 4, 11, "k"); set(7, 18, "j"); set(8, 18, "j"); set(10, 18, "j"); set(11, 18, "j");
    // bare legs
    row(19, 5, 6, "s"); row(19, 10, 11, "s");
    row(20, 5, 6, "s"); row(20, 10, 11, "s");
    // shoes + soles (stance shifts per walk frame)
    if (step === "A") { row(21, 3, 6, "b"); row(21, 10, 12, "b"); row(22, 3, 6, "w"); row(22, 10, 12, "w"); }
    else if (step === "B") { row(21, 5, 7, "b"); row(21, 9, 11, "b"); row(22, 5, 7, "w"); row(22, 9, 11, "w"); }
    else { row(21, 4, 6, "b"); row(21, 10, 12, "b"); row(22, 4, 6, "w"); row(22, 10, 12, "w"); }
  };
  const outline = (g: string[][]) => {
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const todo: [number, number][] = [];
    for (let y = 0; y < THh; y++) for (let x = 0; x < TW; x++) {
      if (g[y][x] !== " ") continue;
      for (const [dx, dy] of dirs) {
        const nx = x + dx, ny = y + dy;
        if (nx >= 0 && nx < TW && ny >= 0 && ny < THh && g[ny][nx] !== " ") { todo.push([x, y]); break; }
      }
    }
    todo.forEach(([x, y]) => { g[y][x] = "o"; });
  };
  const make = (step: "A" | "B" | "stand", isHelm: boolean) => {
    const g = blankGrid(TW, THh);
    face(g);
    if (isHelm) helm(g); else hair(g);
    body(g, step);
    outline(g);
    return g.map((r) => r.join(""));
  };
  return { A: make("A", false), B: make("B", false), helm: make("stand", true) };
}
const MANNY = buildManny();
const MANNY_PALETTE: Palette = {
  o: "#15110d", H: "#5a3a22", L: "#86592f", D: "#3a2614", s: "#f1c69b", d: "#d49b6e", e: "#241a14",
  p: "#16b8a6", q: "#3fd9c7", r: "#0c8074", k: "#cab488", j: "#a4895d", b: "#5b3a26", w: "#e9e9e9",
  m: "#9aa6ab", n: "#e8e2d0",
};
/* ── custom-sprite swap seam ──────────────────────────────────────────
   To use a real sprite later (e.g. a hyo-oppa template): drop the PNG in
   /public/sprites/ and set the path below. When set, the image is used
   instead of the hand-drawn pixel art. See public/sprites/README.md.
   Remember to credit the artist if the pack requires it. */
const MANNY_SPRITE_SRC = "/sprites/manny_sprite.png";
const MANNY_HELM_SPRITE_SRC = ""; // e.g. "/sprites/manny-helm.png"

export function PixelManny({ className = "" }: { className?: string }) {
  if (MANNY_SPRITE_SRC)
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={MANNY_SPRITE_SRC} alt="Manny" className={`pixelated h-auto animate-walk-step ${className}`} />;
  return <AnimatedCharacter frames={[MANNY.A, MANNY.B]} palette={MANNY_PALETTE} fps={4} className={className} title="Manny" />;
}
export function PixelMannyHelm({ className = "" }: { className?: string }) {
  if (MANNY_HELM_SPRITE_SRC)
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={MANNY_HELM_SPRITE_SRC} alt="Manny — Dragonborn mode" className={`pixelated h-auto ${className}`} />;
  return <GridSvg grid={MANNY.helm} palette={MANNY_PALETTE} className={className} title="Manny — Dragonborn mode" />;
}
