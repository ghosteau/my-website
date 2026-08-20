"use client";

import { useEffect, useRef, useState } from "react";

/* A small undirected graph of the things Manny works on and how they touch.
   It exists because the About copy claims the connections between fields are
   as interesting as the fields themselves — this shows that claim rather than
   just asserting it. Edges draw themselves once, when scrolled into view. */

type Node = { id: string; x: number; y: number; en: string; fr: string; hub?: boolean };

const W = 640;
const H = 250;

/* Positions are deliberate: every edge has to reach its endpoints without
   grazing a node it doesn't connect, or the picture implies links that
   aren't there. (Music sat opposite maths with the line passing 1.5px from
   the ML node, which read as "music → machine learning".) */
const NODES: Node[] = [
  { id: "music", x: 60, y: 132, en: "music", fr: "musique" },
  { id: "math", x: 186, y: 58, en: "mathematics", fr: "mathématiques" },
  { id: "algo", x: 352, y: 36, en: "algorithms", fr: "algorithmes", hub: true },
  { id: "sys", x: 556, y: 58, en: "systems", fr: "systèmes" },
  { id: "ml", x: 352, y: 140, en: "machine learning", fr: "apprentissage automatique", hub: true },
  { id: "phil", x: 150, y: 214, en: "philosophy", fr: "philosophie" },
  { id: "hist", x: 356, y: 232, en: "history", fr: "histoire" },
];

const EDGES: [string, string][] = [
  ["math", "music"], // rhythm, harmony, counting
  ["math", "algo"],
  ["algo", "sys"],
  ["math", "ml"],
  ["algo", "ml"],
  ["sys", "ml"],
  ["math", "phil"], // logic
  ["phil", "ml"],   // the ethics essays
  ["phil", "hist"],
  ["hist", "music"],
];

const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));

export function ConnectionsGraph({ lang }: { lang: "en" | "fr" }) {
  const ref = useRef<SVGSVGElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setOn(true); },
      { threshold: 0.35 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto max-w-3xl"
      role="img"
      aria-label={
        lang === "en"
          ? "A graph of connected interests: mathematics, algorithms, systems, machine learning, philosophy, history, and music."
          : "Un graphe d'intérêts reliés : mathématiques, algorithmes, systèmes, apprentissage automatique, philosophie, histoire et musique."
      }
    >
      {/* edges draw first, one after another */}
      {EDGES.map(([a, b], i) => {
        const p = byId[a], q = byId[b];
        const len = Math.hypot(q.x - p.x, q.y - p.y);
        return (
          <line
            key={`${a}-${b}`}
            x1={p.x} y1={p.y} x2={q.x} y2={q.y}
            stroke="#28aec4"
            strokeWidth="1"
            strokeOpacity="0.32"
            strokeDasharray={len}
            strokeDashoffset={on ? 0 : len}
            style={{ transition: `stroke-dashoffset 0.7s cubic-bezier(0.4,0,0.2,1) ${260 + i * 85}ms` }}
          />
        );
      })}

      {/* nodes pop in as their edges land */}
      {NODES.map((n, i) => (
        <g
          key={n.id}
          style={{
            opacity: on ? 1 : 0,
            transform: on ? "scale(1)" : "scale(0.6)",
            transformOrigin: `${n.x}px ${n.y}px`,
            transition: `opacity 0.5s ease ${i * 90}ms, transform 0.5s cubic-bezier(0.34,1.4,0.5,1) ${i * 90}ms`,
          }}
        >
          <circle cx={n.x} cy={n.y} r={n.hub ? 6 : 4.5} fill="#04100f" stroke="#4cd7e8" strokeWidth="1.5" />
          {n.hub && <circle cx={n.x} cy={n.y} r="2" fill="#4cd7e8" />}
          <text
            x={n.x}
            y={n.y - 13}
            textAnchor="middle"
            className="font-mono"
            fontSize="11.5"
            fill="#ffffff"
            fillOpacity="0.62"
          >
            {n[lang]}
          </text>
        </g>
      ))}
    </svg>
  );
}
