"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLang, LangToggle } from "./lang";

export function SiteNav() {
  const [lang, , toggle] = useLang();
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const links = [
    {href:"/#work", label:lang === "en" ? "Work" : "Projets"},
    {href:"/blog", label:lang === "en" ? "Writing" : "Écrits"},
    {href:"/watch", label:lang === "en" ? "Watch" : "Vidéos"},
    {href:"/photos", label:lang === "en" ? "Photos" : "Photos"},
    {href:"/#about", label:lang === "en" ? "About" : "À propos"},
    {href:"/resume", label:lang === "en" ? "Résumé" : "CV"},
  ];
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  const navLinks = links.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} aria-current={pathname === link.href || pathname.startsWith(link.href+"/") ? "page" : undefined}>{link.label}</Link>);
  return <><header className="site-header">
    <a className="skip-link" href="#main-content">{lang === "en" ? "Skip to content" : "Aller au contenu"}</a>
    <div className="nav-inner"><Link href="/" className="site-wordmark" onClick={() => setOpen(false)}>Emmanuel McGrail<span> / {lang === "en" ? "Personal site" : "Site personnel"}</span></Link>
    <nav className="desktop-nav" aria-label={lang === "en" ? "Main navigation" : "Navigation principale"}>{navLinks}</nav>
    <div className="nav-controls"><LangToggle lang={lang} toggle={toggle} /><button ref={menuButton} className="menu-toggle" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? (lang === "en" ? "Close" : "Fermer") : "Menu"}</button></div></div>
    {open && <nav id="mobile-navigation" className="mobile-nav-enter" aria-label={lang === "en" ? "Mobile navigation" : "Navigation mobile"}>{navLinks}</nav>}
  </header><div id="main-content" tabIndex={-1} /></>;
}
