"use client";

import { useEffect, useRef, useState } from "react";
import { useLang, LangToggle } from "./components/lang";
import { Flag, PixelGhost } from "./components/sprites";
import {
  experience,
  projects,
  courses,
  research,
  ui,
  type Accent,
} from "./content";

/* accent → tailwind class maps */
const expPeriod: Record<Accent, string> = {
  teal: "text-turq-400/60",
  cyan: "text-cyan-400/60",
  emerald: "text-emerald-400/60",
};
const expDot: Record<Accent, string> = {
  teal: "bg-turq-400/50",
  cyan: "bg-cyan-400/50",
  emerald: "bg-emerald-400/50",
};
const projCard: Record<Accent, string> = {
  teal: "border-turq-500/15 hover:border-turq-500/40 hover:bg-turq-500/[0.05] hover:shadow-turq-950/50",
  cyan: "border-cyan-500/15 hover:border-cyan-500/40 hover:bg-cyan-500/[0.05] hover:shadow-cyan-950/50",
  emerald: "border-emerald-500/15 hover:border-emerald-500/40 hover:bg-emerald-500/[0.05] hover:shadow-emerald-950/50",
};
const projTech: Record<Accent, string> = {
  teal: "text-turq-400/55",
  cyan: "text-cyan-400/55",
  emerald: "text-emerald-400/55",
};
const resCard: Record<Accent, string> = {
  teal: "border-turq-500/15 hover:border-turq-500/40 hover:bg-turq-500/[0.03] hover:shadow-turq-950/40",
  cyan: "border-cyan-500/15 hover:border-cyan-500/40 hover:bg-cyan-500/[0.03] hover:shadow-cyan-950/40",
  emerald: "border-emerald-500/15 hover:border-emerald-500/40 hover:bg-emerald-500/[0.03] hover:shadow-emerald-950/40",
};
const resDot: Record<Accent, string> = {
  teal: "bg-turq-400/70",
  cyan: "bg-cyan-400/70",
  emerald: "bg-emerald-400/70",
};
const resSub: Record<Accent, string> = {
  teal: "text-turq-400/55",
  cyan: "text-cyan-400/55",
  emerald: "text-emerald-400/55",
};

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

function EmDash() {
  const [show, setShow] = useState(false);
  return (
    <span className="relative inline-block">
      <span
        className="cursor-default text-turq-300/70 hover:text-turq-300 transition-colors duration-150"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        —
      </span>
      {show && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#06201d] border border-turq-500/30 rounded-sm text-xs font-mono text-turq-300/80 whitespace-nowrap z-50 pointer-events-none shadow-lg shadow-turq-950/50">
          yes, I really use em dashes
          <span className="block text-white/30 text-[10px] mt-0.5">AI did not write all of this</span>
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-turq-500/30" />
        </span>
      )}
    </span>
  );
}

export default function Home() {
  const [lang, , toggle] = useLang();
  const t = ui[lang];
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const navItems: [string, string][] = [
    ["about", t.nav.about],
    ["experience", t.nav.experience],
    ["projects", t.nav.projects],
    ["research", t.nav.research],
  ];

  return (
    <main className="min-h-screen bg-[#04100f] text-white overflow-x-hidden">

      {/* Mouse spotlight */}
      <div
        className="fixed inset-0 pointer-events-none z-0 transition-none"
        style={{ background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(45,212,191,0.10), transparent 70%)` }}
      />

      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="blob blob-1 absolute top-[-10%] left-[-5%] w-[650px] h-[650px] rounded-full bg-turq-600/20 blur-[140px]" />
        <div className="blob blob-2 absolute bottom-[5%] right-[-8%] w-[500px] h-[500px] rounded-full bg-cyan-500/15 blur-[120px]" />
        <div className="blob blob-3 absolute top-[45%] left-[35%] w-[380px] h-[380px] rounded-full bg-emerald-500/12 blur-[100px]" />
        <div className="blob blob-4 absolute top-[20%] right-[20%] w-[260px] h-[260px] rounded-full bg-teal-600/10 blur-[80px]" />
      </div>

      {/* Grid */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
        backgroundSize: "80px 80px"
      }} />

      {/* Floating ghost sprites (easter egg — ghosteau) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[
          { left: "12%", size: 26, dur: "18s", delay: "0s" },
          { left: "78%", size: 20, dur: "24s", delay: "6s" },
          { left: "45%", size: 16, dur: "21s", delay: "11s" },
        ].map((g, i) => (
          <div key={i} className="absolute bottom-[-60px]" style={{
            left: g.left,
            width: g.size,
            animation: `pixel-float ${g.dur} linear ${g.delay} infinite`,
          }}>
            <PixelGhost className="w-full opacity-40" />
          </div>
        ))}
      </div>

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 px-8 py-5 flex justify-between items-center border-b border-white/[0.06] backdrop-blur-md bg-[#04100f]/75">
        <span className="font-mono text-sm text-white/30 tracking-widest uppercase">manny mcgrail</span>
        <div className="flex gap-6 md:gap-8 items-center text-sm text-white/40 font-light tracking-wide">
          <div className="hidden md:flex gap-8">
            {navItems.map(([id, label]) => (
              <a key={id} href={`#${id}`} className="hover:text-turq-300 transition-all duration-200 hover:tracking-wider">{label}</a>
            ))}
            <a href="/resume" className="hover:text-turq-300 transition-all duration-200 hover:tracking-wider">{t.nav.resume}</a>
            <a href="/blog" className="hover:text-turq-300 transition-all duration-200 hover:tracking-wider">{t.nav.blog}</a>
          </div>
          <LangToggle lang={lang} toggle={toggle} />
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center px-8 md:px-20 pt-24 pb-32">
        <div className="max-w-4xl">

          <p className="font-mono text-cyan-400/60 text-sm tracking-[0.3em] uppercase mb-6"
            style={{ opacity: 0, animation: "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s forwards" }}>
            {t.heroKicker}
          </p>

          <h1 className="text-6xl md:text-8xl font-extralight leading-[1.05] tracking-tight mb-6"
            style={{ opacity: 0, animation: "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s forwards" }}>
            Emmanuel
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-turq-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent font-light">
                McGrail
              </span>
              <span className="absolute -bottom-1 left-0 h-px bg-gradient-to-r from-turq-500/60 to-cyan-500/60 w-0 animate-underline" />
            </span>
          </h1>

          <p className="text-white/45 text-lg md:text-xl font-light leading-relaxed max-w-2xl mt-8"
            style={{ opacity: 0, animation: "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.4s forwards" }}>
            {t.heroTagline}
          </p>

          {/* Flag sprites — the tri-national story */}
          <div className="flex flex-wrap gap-8 sm:gap-12 mt-12"
            style={{ opacity: 0, animation: "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.5s forwards" }}>
            <Flag kind="usa" label={t.flags.usa.label} caption={t.flags.usa.caption} delay={0} />
            <Flag kind="quebec" label={t.flags.quebec.label} caption={t.flags.quebec.caption} delay={250} />
            <Flag kind="france" label={t.flags.france.label} caption={t.flags.france.caption} delay={500} />
          </div>

          {/* Quote */}
          <div className="mt-12 border-l-2 border-turq-500/25 pl-6"
            style={{ opacity: 0, animation: "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.6s forwards" }}>
            <p className="text-white/45 text-base font-light italic leading-relaxed">
              &ldquo;{t.quote}&rdquo;
            </p>
            <p className="text-white/25 text-xs font-mono tracking-wider uppercase mt-2">
              {t.quoteAttr}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-12"
            style={{ opacity: 0, animation: "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.7s forwards" }}>
            {[
              { label: "GitHub ↗", href: "https://github.com/ghosteau", cls: "border-turq-500/35 text-turq-300 hover:bg-turq-500/10 hover:border-turq-400/70 hover:shadow-lg hover:shadow-turq-950/40" },
              { label: "LinkedIn ↗", href: "https://www.linkedin.com/in/manny-mcgrail/", cls: "border-cyan-500/35 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400/70 hover:shadow-lg hover:shadow-cyan-950/40" },
              { label: t.ctaEmail, href: "mailto:mcgrailmanny@gmail.com", cls: "border-white/10 text-white/35 hover:bg-white/5 hover:text-white/55" },
            ].map(({ label, href, cls }) => (
              <a key={label} href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className={`px-6 py-3 border text-sm font-mono tracking-wide transition-all duration-200 rounded-sm ${cls}`}>
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="fixed bottom-10 left-8 md:left-20 flex items-center gap-3 text-white/20 text-xs font-mono tracking-widest uppercase z-20 pointer-events-none"
          style={{ opacity: Math.max(0, 1 - scrollY / 180), transition: "opacity 0.15s" }}
        >
          <div className="w-px h-8 bg-gradient-to-b from-transparent via-white/30 to-transparent animate-pulse-line" />
          scroll
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative z-10 px-8 md:px-20 py-32 max-w-6xl mx-auto">
        <FadeIn>
          <p className="font-mono text-turq-400/50 text-xs tracking-[0.3em] uppercase mb-12">{t.sectionAbout}</p>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-16">
          <FadeIn delay={80}>
            <h2 className="text-3xl font-extralight text-white/90 leading-snug mb-6">
              {t.aboutHeadingTop}<br />
              <span className="bg-gradient-to-r from-turq-300 to-cyan-300 bg-clip-text text-transparent">
                {t.aboutHeadingBottom}
              </span>
            </h2>
            <p className="text-white/45 font-light leading-relaxed text-base">
              {t.aboutP1}
            </p>
            <p className="text-white/45 font-light leading-relaxed text-base mt-4">
              {t.aboutP2}
            </p>
          </FadeIn>
          <FadeIn delay={160}>
            <div className="flex flex-col gap-4">
              {t.facts.map(({ label, value }) => (
                <div key={label} className="flex gap-6 items-start border-b border-white/[0.05] pb-4 group">
                  <span className="font-mono text-xs text-white/20 uppercase tracking-widest w-28 shrink-0 pt-0.5 group-hover:text-turq-400/50 transition-colors duration-200">{label}</span>
                  <span className="text-white/50 text-sm font-light group-hover:text-white/70 transition-colors duration-200">{value}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={80} className="mt-20">
          <p className="font-mono text-white/15 text-xs tracking-[0.3em] uppercase mb-5">{t.coursework}</p>
          <div className="flex flex-wrap gap-2">
            {courses.map((c) => (
              <span key={c.en} className="px-3 py-1.5 border border-white/[0.07] bg-white/[0.02] rounded-sm text-xs font-mono text-white/30 hover:border-turq-500/40 hover:text-turq-300/70 hover:bg-turq-500/5 transition-all duration-200 cursor-default">
                {c[lang]}
              </span>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Experience */}
      <section id="experience" className="relative z-10 px-8 md:px-20 py-32 max-w-6xl mx-auto">
        <FadeIn>
          <p className="font-mono text-cyan-400/50 text-xs tracking-[0.3em] uppercase mb-12">{t.sectionExp}</p>
        </FadeIn>
        <div className="flex flex-col">
          {experience.map((e, i) => (
            <FadeIn key={e.en.role} delay={i * 70}>
              <div className="grid md:grid-cols-[220px_1fr] gap-6 md:gap-12 border-b border-white/[0.05] py-10 group hover:bg-white/[0.015] transition-colors duration-300 rounded-sm px-2 -mx-2">
                <div className="pt-1">
                  <p className={`font-mono text-xs tracking-wide mb-1.5 ${expPeriod[e.accent]}`}>
                    {e.period}
                  </p>
                  <p className="text-white/20 text-xs font-light leading-relaxed">{e.org}</p>
                </div>
                <div>
                  <h3 className="font-light text-lg mb-4 text-white/75 transition-colors duration-200 group-hover:text-white">
                    {e[lang].role}
                  </h3>
                  <ul className="flex flex-col gap-2.5">
                    {e[lang].bullets.map((b, j) => (
                      <li key={j} className="flex gap-3 text-white/35 text-sm font-light leading-relaxed group-hover:text-white/45 transition-colors duration-200">
                        <span className={`mt-2 w-1 h-1 rounded-full shrink-0 ${expDot[e.accent]}`} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="relative z-10 px-8 md:px-20 py-32 max-w-6xl mx-auto">
        <FadeIn>
          <p className="font-mono text-emerald-400/50 text-xs tracking-[0.3em] uppercase mb-12">{t.sectionProj}</p>
        </FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p, i) => (
            <FadeIn key={p.name} delay={i * 55}>
              <a href={p.href} target="_blank" rel="noopener noreferrer"
                className={`group block h-full p-6 border rounded-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl bg-white/[0.015] ${projCard[p.accent]}`}>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-mono text-white/80 text-base group-hover:text-white transition-colors duration-200">{p.name}</h3>
                  <span className="text-white/15 group-hover:text-white/60 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 inline-block text-lg">↗</span>
                </div>
                <p className="text-white/35 text-sm leading-relaxed mb-5">{p[lang]}</p>
                <p className={`font-mono text-xs tracking-wide ${projTech[p.accent]}`}>
                  {p.tech}
                </p>
              </a>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={80} className="mt-8">
          <a href="https://github.com/ghosteau" target="_blank" rel="noopener noreferrer"
            className="font-mono text-sm text-white/20 hover:text-turq-300 transition-colors duration-200 tracking-wide">
            {t.viewAll}
          </a>
        </FadeIn>
      </section>

      {/* Research */}
      <section id="research" className="relative z-10 px-8 md:px-20 py-32 max-w-6xl mx-auto">
        <FadeIn>
          <p className="font-mono text-turq-400/50 text-xs tracking-[0.3em] uppercase mb-12">{t.sectionResearch}</p>
        </FadeIn>
        <div className="flex flex-col gap-4 max-w-3xl">
          {research.map((r, i) => (
            <FadeIn key={r.en.title} delay={i * 100}>
              <div className={`border bg-white/[0.018] p-8 rounded-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${resCard[r.accent]}`}>
                <div className="flex items-start gap-4">
                  <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${resDot[r.accent]}`} />
                  <div>
                    <h3 className="text-white/75 font-light text-lg mb-1">{r[lang].title}</h3>
                    <p className={`font-mono text-xs tracking-wide mb-3 ${resSub[r.accent]}`}>{r[lang].sub}</p>
                    <p className="text-white/40 text-sm font-light leading-relaxed">{r[lang].body}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={180} className="mt-8">
          <p className="text-white/18 text-sm font-light font-mono">
            {t.researchInterests}
          </p>
        </FadeIn>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.05] px-8 md:px-20 py-12 mt-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <PixelGhost className="w-8 h-8 animate-bob opacity-70" />
            <div>
              <p className="font-mono text-white/15 text-xs tracking-widest uppercase">Emmanuel McGrail</p>
              <p className="text-white/10 text-xs mt-1 font-light">{t.footerTag}</p>
            </div>
          </div>
          <div className="flex gap-6 text-xs font-mono text-white/18">
            <a href="https://github.com/ghosteau" target="_blank" rel="noopener noreferrer" className="hover:text-turq-300 transition-colors duration-200">GitHub</a>
            <a href="https://www.linkedin.com/in/manny-mcgrail/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition-colors duration-200">LinkedIn</a>
            <a href="mailto:mcgrailmanny@gmail.com" className="hover:text-white/50 transition-colors duration-200">Email</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
