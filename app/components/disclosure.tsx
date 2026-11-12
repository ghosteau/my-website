"use client";

import { useId, useState, type ReactNode } from "react";

/**
 * Expandable section with an animated height in both directions.
 *
 * Native <details> snaps open and closed (and can't animate closing without
 * ::details-content, which Safari and Firefox don't fully support yet), so
 * this uses the grid-template-rows 0fr → 1fr technique instead. The panel
 * stays in the DOM for layout, but is `inert` while closed so its links
 * can't be tabbed to or read out.
 *
 * `lazy` defers mounting the children until the first open — used for the
 * Spotify iframe and the connections graph, which shouldn't load (or play
 * their entrance animation) while hidden.
 */
export function Disclosure({
  summary,
  children,
  className = "",
  triggerClassName = "",
  lazy = false,
  defaultOpen = false,
}: {
  summary: ReactNode;
  children: ReactNode;
  className?: string;
  triggerClassName?: string;
  lazy?: boolean;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [mounted, setMounted] = useState(defaultOpen || !lazy);
  const panelId = useId();

  const toggle = () => {
    setMounted(true);
    setOpen((value) => !value);
  };

  return (
    <div className={`disclosure ${className}`} data-open={open}>
      <button
        type="button"
        className={`disclosure-trigger ${triggerClassName}`}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggle}
      >
        {summary}
        <span className="disclosure-icon" aria-hidden />
      </button>
      <div id={panelId} className="disclosure-panel" inert={!open}>
        <div className="disclosure-inner">{mounted && children}</div>
      </div>
    </div>
  );
}
