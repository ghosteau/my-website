/* Interface arrows, drawn as inline SVG rather than text characters.

   ↗ (U+2197) and ↘ (U+2198) are emoji-capable code points: desktop fonts
   draw them as thin text glyphs, but iOS and many Android builds substitute
   a color emoji. An SVG renders identically everywhere, inherits the text
   color through `currentColor`, and scales with the surrounding font size. */

const ROTATION = {
  right: 0,
  "down-right": 45,
  down: 90,
  left: 180,
  up: -90,
  "up-right": -45,
} as const;

export type ArrowDirection = keyof typeof ROTATION;

export function Arrow({ dir = "up-right", className = "" }: { dir?: ArrowDirection; className?: string }) {
  return (
    <svg
      className={`arrow-icon ${className}`}
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g transform={`rotate(${ROTATION[dir]} 8 8)`}>
        <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
      </g>
    </svg>
  );
}
