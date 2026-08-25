"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang, LangToggle } from "./lang";

const labels = {
  en: { work: "work", about: "about", writing: "writing", photos: "moments", resume: "résumé" },
  fr: { work: "projets", about: "à propos", writing: "écrits", photos: "moments", resume: "CV" },
};

export function SiteNav() {
  const [lang, , toggle] = useLang();
  const pathname = usePathname() ?? "/";
  const c = labels[lang];
  const links = [
    { href: "/#work", label: c.work, route: "/", homeOnly: true },
    { href: "/#about", label: c.about, route: "/", homeOnly: true },
    { href: "/blog", label: c.writing, route: "/blog" },
    { href: "/photos", label: c.photos, route: "/photos" },
    { href: "/resume", label: c.resume, route: "/resume" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
      <nav className="nav-glass mx-auto flex h-14 max-w-[1240px] items-center justify-between rounded-full px-3 pl-4 md:px-5 md:pl-6">
        <Link href="/" className="group flex items-center gap-3" aria-label="Emmanuel McGrail — home">
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

          <div className="flex items-center md:hidden">
            {links.filter((link) => !link.homeOnly).map((link) => {
              const active = pathname === link.route || pathname.startsWith(`${link.route}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-2 py-2 text-[11px] transition-colors ${active ? "text-turq-200" : "text-white/50 hover:text-white"} ${link.route === "/resume" ? "hidden sm:block" : ""}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <span className="mx-1 hidden h-5 w-px bg-white/10 sm:block" />
          <LangToggle lang={lang} toggle={toggle} />
        </div>
      </nav>
    </header>
  );
}
