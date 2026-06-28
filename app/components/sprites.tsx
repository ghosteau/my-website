"use client";

/* ────────────────────────────────────────────────────────────
   Hand-built pixel-art sprites. Everything is generated from a
   small color grid so the SVGs stay crisp at any size.
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
  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;
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
            <rect
              key={`${x}-${y}`}
              x={x * PX}
              y={y * PX}
              width={PX}
              height={PX}
              fill={fill}
            />
          );
        }),
      )}
    </svg>
  );
}

/* ── France: vertical tricolore ── */
const FR_PALETTE: Palette = { B: "#0055A4", W: "#F4F4F4", R: "#EF4135" };
const FR_GRID = Array.from({ length: 8 }, () => "BBBBWWWWRRRR");

/* ── USA: canton + stripes ── */
function buildUSA(): string[] {
  const cols = 15;
  const rows = 10;
  const grid: string[] = [];
  for (let y = 0; y < rows; y++) {
    let row = "";
    for (let x = 0; x < cols; x++) {
      if (x < 6 && y < 5) {
        // canton — navy with starry dots
        row += x % 2 === 0 && y % 2 === 0 ? "S" : "N";
      } else {
        // stripes — alternate red / white
        row += y % 2 === 0 ? "R" : "W";
      }
    }
    grid.push(row);
  }
  return grid;
}
const USA_PALETTE: Palette = {
  N: "#3C3B6E",
  S: "#FFFFFF",
  R: "#B22234",
  W: "#F4F4F4",
};
const USA_GRID = buildUSA();

/* ── Québec: Fleurdelisé (blue field, white cross + fleur-de-lis hints) ── */
function buildQuebec(): string[] {
  const cols = 13;
  const rows = 9;
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

/* ── ghosteau: a little pixel ghost ── */
const GHOST_GRID = [
  "  GGGG  ",
  " GGGGGG ",
  "GGGGGGGG",
  "GEEGGEEG",
  "GEEGGEEG",
  "GGGGGGGG",
  "GGGGGGGG",
  "G G GG G",
];
const GHOST_PALETTE: Palette = { G: "#5eead4", E: "#04100f" };

export function PixelGhost({ className = "" }: { className?: string }) {
  return <GridSvg grid={GHOST_GRID} palette={GHOST_PALETTE} className={className} title="ghosteau" />;
}

/* a waving flag with a little pole + label */
export function Flag({
  kind,
  label,
  caption,
  delay = 0,
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
        {/* pole */}
        <div className="w-[3px] h-16 bg-gradient-to-b from-white/40 to-white/10 rounded-full mr-[-1px] mb-[-2px]" />
        <div
          className="origin-left transition-transform duration-300 group-hover:scale-110"
          style={{ animation: `flag-wave 3.2s ease-in-out ${delay}ms infinite` }}
        >
          <GridSvg
            grid={f.grid}
            palette={f.palette}
            title={f.title}
            className="w-20 h-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)]"
          />
        </div>
      </div>
      <div className="text-center">
        <p className="font-mono text-[11px] tracking-widest uppercase text-white/50 group-hover:text-turq-300 transition-colors duration-200">
          {label}
        </p>
        <p className="text-[10px] text-white/25 font-light mt-0.5">{caption}</p>
      </div>
    </div>
  );
}
