"use client";

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
  kind, label, caption, delay = 0,
}: {
  kind: "usa" | "quebec" | "france";
  label: string;
  caption: string;
  delay?: number;
}) {
  const map = {
    usa: { grid: USA_GRID, palette: USA_PALETTE, title: "United States" },
    quebec: { grid: QC_GRID, palette: QC_PALETTE, title: "Québec" },
    france: { grid: FR_GRID, palette: FR_PALETTE, title: "France" },
  } as const;
  const f = map[kind];
  return (
    <div className="group flex flex-col items-center gap-3 select-none">
      <div className="relative flex items-end">
        <div className="w-[3px] h-16 bg-gradient-to-b from-white/40 to-white/10 rounded-full mr-[-1px] mb-[-2px]" />
        <div className="origin-left transition-transform duration-300 group-hover:scale-110"
          style={{ animation: `flag-wave 3.2s ease-in-out ${delay}ms infinite` }}>
          <GridSvg grid={f.grid} palette={f.palette} title={f.title}
            className="w-20 h-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)]" />
        </div>
      </div>
      <div className="text-center">
        <p className="font-mono text-[11px] tracking-widest uppercase text-white/50 group-hover:text-turq-300 transition-colors duration-200">{label}</p>
        <p className="text-[10px] text-white/25 font-light mt-0.5">{caption}</p>
      </div>
    </div>
  );
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
