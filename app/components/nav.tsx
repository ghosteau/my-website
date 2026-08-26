"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLang, LangToggle } from "./lang";

const labels = {
  en: {
    work: "work",
    about: "about",
    writing: "writing",
    photos: "moments",
    resume: "résumé",
    openMenu: "Open navigation",
    closeMenu: "Close navigation",
  },
  fr: {
    work: "projets",
    about: "à propos",
    writing: "écrits",
    photos: "moments",
    resume: "CV",
    openMenu: "Ouvrir la navigation",
    closeMenu: "Fermer la navigation",
  },
};

export function SiteNav() {
  const [lang, , toggle] = useLang();
  const pathname = usePathname() ?? "/";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const c = labels[lang];
  const links = [
    { href: "/#work", label: c.work, route: "/", homeOnly: true },
    { href: "/#about", label: c.about, route: "/", homeOnly: true },
    { href: "/blog", label: c.writing, route: "/blog" },
    { href: "/photos", label: c.photos, route: "/photos" },
    { href: "/resume", label: c.resume, route: "/resume" },
  ];

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [mobileMenuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
      <nav className="nav-glass mx-auto flex h-14 max-w-[1240px] items-center justify-between rounded-full px-3 pl-4 md:px-5 md:pl-6">
        <Link href="/" onClick={() => setMobileMenuOpen(false)} className="group flex items-center gap-3" aria-label="Emmanuel McGrail — home">
          <span className="grid h-7 w-7 place-items-center rounded-full border border-turq-400/30 bg-turq-400/[0.07] font-mono text-[10px] text-turq-200 transition-colors group-hover:bg-turq-400/[0.14]">
            EM
          </span>
          <span className="hidden text-sm font-medium tracking-[-0.01em] text-white/82 transition-colors group-hover:text-white sm:block">
            Emmanuel McGrail
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <div className="hidden items-center md:flex">
            {links.map((link) => {
              const active = !link.homeOnly && (pathname === link.route || pathname.startsWith(`${link.route}/`));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-3 py-2 text-xs tracking-wide transition-colors ${active ? "bg-white/[0.07] text-turq-200" : "text-white/52 hover:bg-white/[0.035] hover:text-white/85"}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <span className="mx-1 hidden h-5 w-px bg-white/10 md:block" />
          <LangToggle lang={lang} toggle={toggle} />

          <button
            type="button"
            className="ml-1 grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-turq-300/35 hover:text-turq-200 md:hidden"
            aria-label={mobileMenuOpen ? c.closeMenu : c.openMenu}
            aria-controls="mobile-navigation"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <span className="relative block h-3.5 w-4" aria-hidden>
              <span className={`absolute left-0 top-0 h-px w-4 bg-current transition-transform ${mobileMenuOpen ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`absolute left-0 top-[6px] h-px w-4 bg-current transition-opacity ${mobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`absolute bottom-0 left-0 h-px w-4 bg-current transition-transform ${mobileMenuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label={lang === "fr" ? "Navigation mobile" : "Mobile navigation"}
          className="nav-glass mobile-nav-enter mx-auto mt-2 grid max-w-[1240px] grid-cols-2 gap-1 rounded-[1.35rem] p-2 md:hidden"
        >
          {links.map((link) => {
            const active = !link.homeOnly && (pathname === link.route || pathname.startsWith(`${link.route}/`));
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex min-h-11 items-center justify-between rounded-xl px-4 py-3 text-xs tracking-wide transition-colors ${active ? "bg-turq-300/[0.09] text-turq-100" : "text-white/62 hover:bg-white/[0.04] hover:text-white"}`}
              >
                <span>{link.label}</span>
                <span aria-hidden className="font-mono text-[10px] text-white/25">↗</span>
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
