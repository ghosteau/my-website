"use client";

import { useCallback, useEffect, useState } from "react";

export type Lang = "en" | "fr";

const KEY = "manny-lang";
const EVT = "manny-lang-change";

/** Language state shared across pages via localStorage + a window event. */
export function useLang(): [Lang, (l: Lang) => void, () => void] {
  // Always start at "en" — the same value the server renders. Reading
  // localStorage during render (or in a lazy initializer) would make the
  // first client paint disagree with the server HTML and break hydration.
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const read = () => {
      const next = (localStorage.getItem(KEY) as Lang) || "en";
      setLangState(next === "fr" ? "fr" : "en");
    };
    // Adopt the stored language after mount, once hydration has settled.
    read();
    window.addEventListener(EVT, read);
    window.addEventListener("storage", read);
    return () => {
      window.removeEventListener(EVT, read);
      window.removeEventListener("storage", read);
    };
  }, []);

  const setLang = useCallback((l: Lang) => {
    localStorage.setItem(KEY, l);
    document.documentElement.lang = l;
    setLangState(l);
    window.dispatchEvent(new Event(EVT));
  }, []);

  const toggle = useCallback(() => {
    const next: Lang = (localStorage.getItem(KEY) as Lang) === "fr" ? "en" : "fr";
    setLang(next);
  }, [setLang]);

  return [lang, setLang, toggle];
}

/** Small EN / FR pill toggle. */
export function LangToggle({
  lang,
  toggle,
  className = "",
}: {
  lang: Lang;
  toggle: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={toggle}
      aria-label="Toggle language"
      className={`group relative font-mono text-xs tracking-widest uppercase border border-turq-500/30 rounded-sm px-2 py-1 flex items-center gap-1 hover:border-turq-400/70 hover:bg-turq-500/10 transition-all duration-200 ${className}`}
    >
      <span className={lang === "en" ? "text-turq-300" : "text-white/30"}>EN</span>
      <span className="text-white/15">/</span>
      <span className={lang === "fr" ? "text-turq-300" : "text-white/30"}>FR</span>
    </button>
  );
}
