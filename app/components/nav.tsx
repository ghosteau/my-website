"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang, LangToggle } from "./lang";
import { ui } from "../content";

/** The one nav used on every page, so it never disappears when you navigate.
 *  The section you're in stays lit — including inside nested routes like
 *  /blog/<post>. */
export function SiteNav() {
  const [lang, , toggle] = useLang();
  const t = ui[lang];
  const pathname = usePathname() ?? "/";

  const links: [string, string][] = [
    ["/resume", t.nav.resume],
    ["/blog", t.nav.blog],
    ["/photos", t.nav.photos],
  ];

  return (
    <nav className="fixed top-0 w-full z-50 px-6 md:px-8 py-5 flex justify-between items-center border-b border-white/[0.06] backdrop-blur-md bg-[#04100f]/75">
      <Link
        href="/"
        className="font-mono text-sm text-white/50 hover:text-turq-300 tracking-widest uppercase transition-colors duration-200"
      >
        <span className="hidden sm:inline">manny mcgrail</span>
        <span className="sm:hidden">mm</span>
      </Link>
      <div className="flex gap-5 md:gap-8 items-center text-sm text-white/60 font-light tracking-wide">
        {links.map(([href, label]) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`transition-colors duration-200 ${active ? "text-turq-300" : "hover:text-turq-300"}`}
            >
              {label}
            </Link>
          );
        })}
        <LangToggle lang={lang} toggle={toggle} />
      </div>
    </nav>
  );
}
