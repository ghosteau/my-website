"use client";

import { useCallback, useEffect, useState } from "react";

export type Lang = "en" | "fr";

const KEY = "manny-lang";
const EVT = "manny-lang-change";

/** Language state shared across pages via localStorage + a window event. */
export function useLang(): [Lang, (l: Lang) => void, () => void] {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    return (localStorage.getItem(KEY) as Lang) === "fr" ? "fr" : "en";
  });

  useEffect(() => {
    const onChange = () => {
      const next = (localStorage.getItem(KEY) as Lang) || "en";
      setLangState(next === "fr" ? "fr" : "en");
    };
    window.addEventListener(EVT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(EVT, onChange);
      window.removeEventListener("storage", onChange);
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
