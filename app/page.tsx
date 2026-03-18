"use client";

import { useEffect, useRef, useState } from "react";

const experience = [
  {
    role: "Data Engineering Intern",
    org: "University of Pittsburgh Athletics",
    period: "Sept 2024 – Dec 2025",
    bullets: [
      "Built a serverless data pipeline for the diving team using AWS Lambda, turning raw web data into real-time performance analytics.",
      "Engineered and deployed an LLM-powered TEXT2SQL tool, democratizing SQL access for non-technical staff.",
      "Built PowerBI dashboards for donors and leadership; integrated position-specific metrics into football recruitment pipelines under the assistant AD.",
    ],
    accent: "purple",
  },
  {
    role: "Engineering Intern (Co-Op)",
    org: "BNY",
    period: "May – Aug 2025",
    bullets: [
      "Built a data reprocessing algorithm via Spring and Kafka to automatically resolve failed enrichment pipeline messages.",
      "Optimized reconciliation workflows — $1.7M in cost savings and 8x reduction in processing time.",
      "Migrated legacy data zones into a new strategic architecture, improving access for risk analysis teams.",
    ],
    accent: "sky",
  },
  {
    role: "Undergraduate Researcher — NLP & AI",
    org: "Pitt School of Computing",
    period: "Sept 2024 – May 2025",
    bullets: [
      "Collaborated with PhD students and faculty on LLM-enhanced conversational AI for smart home devices.",
      "Integrated ChatGPT with the Alexa API via Python and NodeJS to expand functionality and usability.",
      "Studied how diverse communities interact with AI-driven home technology; presented findings to faculty.",
    ],
    accent: "violet",
  },
  {
    role: "Undergraduate Researcher — Virtual Reality",
    org: "Pitt School of Computing",
    period: "May – Aug 2024",
    bullets: [
      "Researched virtual locomotion methods in VR and helped build immersive experiences in Unity.",
      "Wrote C# scripts to support functional VR research environments.",
    ],
    accent: "violet",
  },
];

const projects = [
  {
    name: "fastdist",
    tech: "C++ · CUDA · PyBind11 · Python",
    desc: "High-performance ABI for probabilistic computation in C++ and Python. ~2.5x GPU speedup over standard libraries via optimized kernel execution.",
    href: "https://github.com/ghosteau/fastdist",
    accent: "purple",
  },
  {
    name: "generative-terrain",
    tech: "Java · Python · CNN · SpigotAPI",
    desc: "Minecraft plugin that lets ML models generate terrain in-game via CNNs. Pipelines extract chunk data and produce real-time topographical outputs.",
    href: "https://github.com/ghosteau/generative-terrain",
    accent: "sky",
  },
  {
    name: "embeddings-visualizer",
    tech: "Python · LLMs · Web",
    desc: "Web application for visualizing LLM embeddings and token representations interactively.",
    href: "https://github.com/ghosteau/embeddings-visualizer",
    accent: "violet",
  },
  {
    name: "overlord-discord-bot",
    tech: "Python · ML · Discord API",
    desc: "Machine learning-powered moderation and analytics bot for Discord servers.",
    href: "https://github.com/ghosteau/overlord-discord-bot",
    accent: "purple",
  },
  {
    name: "math-meets-code",
    tech: "Python · Jupyter",
    desc: "A running exploration of mathematics through code — linear algebra, probability, analysis, and more.",
    href: "https://github.com/ghosteau/math-meets-code",
    accent: "sky",
  },
  {
    name: "PittAPI",
    tech: "Python · BeautifulSoup · Requests",
    desc: "Open-source library for Pitt student data. Contributed full study room reservation support.",
    href: "https://github.com/ghosteau/PittAPI",
    accent: "violet",
  },
];

const courses = [
  "Deep Learning", "Computer Vision", "Algorithms & Data Structures",
  "Systems Software", "Computer Organization & Assembly", "Operating Systems",
  "Signals & Systems", "AI & Big Data", "Microprocessors",
  "Physics", "Statistics",
];

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
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
        className="cursor-default text-purple-300/70 hover:text-purple-300 transition-colors duration-150"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        —
      </span>
      {show && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#1a1a2e] border border-purple-500/30 rounded-sm text-xs font-mono text-purple-300/80 whitespace-nowrap z-50 pointer-events-none shadow-lg shadow-purple-950/50">
          yes, I really use em dashes
          <span className="block text-white/30 text-[10px] mt-0.5">AI did not write all of this</span>
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-purple-500/30" />
        </span>
      )}
    </span>
  );
}

export default function Home() {
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

  return (
    <main className="min-h-screen bg-[#080810] text-white overflow-x-hidden">

      {/* Mouse spotlight */}
      <div
        className="fixed inset-0 pointer-events-none z-0 transition-none"
        style={{ background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(139,92,246,0.09), transparent 70%)` }}
      />

      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="blob blob-1 absolute top-[-10%] left-[-5%] w-[650px] h-[650px] rounded-full bg-purple-700/20 blur-[140px]" />
        <div className="blob blob-2 absolute bottom-[5%] right-[-8%] w-[500px] h-[500px] rounded-full bg-sky-500/15 blur-[120px]" />
        <div className="blob blob-3 absolute top-[45%] left-[35%] w-[380px] h-[380px] rounded-full bg-violet-500/12 blur-[100px]" />
        <div className="blob blob-4 absolute top-[20%] right-[20%] w-[260px] h-[260px] rounded-full bg-indigo-600/10 blur-[80px]" />
      </div>

      {/* Grid */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
        backgroundSize: "80px 80px"
      }} />

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 px-8 py-5 flex justify-between items-center border-b border-white/[0.06] backdrop-blur-md bg-[#080810]/75">
        <span className="font-mono text-sm text-white/30 tracking-widest uppercase">manny mcgrail</span>
        <div className="flex gap-8 text-sm text-white/40 font-light tracking-wide">
          {["about", "experience", "projects", "research"].map((s) => (
            <a key={s} href={`#${s}`} className="hover:text-purple-300 transition-all duration-200 hover:tracking-wider">{s}</a>
          ))}
          <a href="/resume" className="hover:text-purple-300 transition-all duration-200 hover:tracking-wider">résumé</a>
          <a href="/blog" className="hover:text-purple-300 transition-all duration-200 hover:tracking-wider">blog</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center px-8 md:px-20 pt-24 pb-32">
        <div className="max-w-4xl">

          <p className="font-mono text-sky-400/60 text-sm tracking-[0.3em] uppercase mb-6"
            style={{ opacity: 0, animation: "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s forwards" }}>
            Pittsburgh, PA · Pitt &apos;27 · EN / FR
          </p>

          <h1 className="text-6xl md:text-8xl font-extralight leading-[1.05] tracking-tight mb-6"
            style={{ opacity: 0, animation: "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s forwards" }}>
            Emmanuel
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-purple-400 via-violet-300 to-sky-400 bg-clip-text text-transparent font-light">
                McGrail
              </span>
              <span className="absolute -bottom-1 left-0 h-px bg-gradient-to-r from-purple-500/60 to-sky-500/60 w-0 animate-underline" />
            </span>
          </h1>

          <p className="text-white/40 text-lg md:text-xl font-light leading-relaxed max-w-2xl mt-8"
            style={{ opacity: 0, animation: "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.4s forwards" }}>
            Aspiring polymath. I work at the intersection of machine learning, systems, and data<EmDash />
            but I&apos;m equally drawn to math, physics, philosophy, and more.
            I care about ideas as much as what you build with them.
          </p>

          {/* Quote — stacked to avoid wrapping */}
          <div className="mt-12 border-l-2 border-purple-500/25 pl-6"
            style={{ opacity: 0, animation: "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.55s forwards" }}>
            <p className="text-white/40 text-base font-light italic leading-relaxed">
              &ldquo;L&apos;imagination gouverne le monde.&rdquo;
            </p>
            <p className="text-white/20 text-xs font-mono tracking-wider uppercase mt-2 whitespace-nowrap">
              — Napoléon Bonaparte &nbsp;·&nbsp; imagination governs the world
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-12"
            style={{ opacity: 0, animation: "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.7s forwards" }}>
            {[
              { label: "GitHub ↗", href: "https://github.com/ghosteau", cls: "border-purple-500/35 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400/70 hover:shadow-lg hover:shadow-purple-950/40" },
              { label: "LinkedIn ↗", href: "https://www.linkedin.com/in/manny-mcgrail/", cls: "border-sky-500/35 text-sky-300 hover:bg-sky-500/10 hover:border-sky-400/70 hover:shadow-lg hover:shadow-sky-950/40" },
              { label: "mcgrailmanny@gmail.com", href: "mailto:mcgrailmanny@gmail.com", cls: "border-white/10 text-white/35 hover:bg-white/5 hover:text-white/55" },
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
          <p className="font-mono text-purple-400/50 text-xs tracking-[0.3em] uppercase mb-12">01 — about</p>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-16">
          <FadeIn delay={80}>
            <h2 className="text-3xl font-extralight text-white/90 leading-snug mb-6">
              Researcher by instinct,<br />
              <span className="bg-gradient-to-r from-purple-300 to-violet-300 bg-clip-text text-transparent">
                generalist by design.
              </span>
            </h2>
            <p className="text-white/40 font-light leading-relaxed text-base">
              I&apos;m Manny<EmDash />a Data Science & CS student at the University of Pittsburgh,
              currently at ENSEA in Cergy, France for the semester. My work sits at the intersection
              of machine learning, systems programming, and data engineering. I&apos;m drawn to problems
              that are both mathematically interesting and practically hard.
            </p>
            <p className="text-white/40 font-light leading-relaxed text-base mt-4">
              Outside of engineering I read research papers, philosophy and literature, think seriously about physics
              and mathematics for their own sake, and make music. I find the connections between
              fields as interesting as the fields themselves.
            </p>
          </FadeIn>
          <FadeIn delay={160}>
            <div className="flex flex-col gap-4">
              {[
                { label: "Currently", value: "ENSEA, Cergy-Pontoise, France (Spring 2026)" },
                { label: "Studying", value: "Data Science + Computer Science @ Pitt" },
                { label: "Research", value: "NLP, Computer Vision, Deep Learning" },
                { label: "Programming", value: "Python, SQL, C++, Java, R, C" },
                { label: "Languages", value: "English and French" },
                { label: "Goal", value: "Undergraduate → PhD / Masters → AI Research" },
                { label: "Also", value: "Writer · Musician · Dean's List · Former Athlete" },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-6 items-start border-b border-white/[0.05] pb-4 group">
                  <span className="font-mono text-xs text-white/20 uppercase tracking-widest w-24 shrink-0 pt-0.5 group-hover:text-purple-400/40 transition-colors duration-200">{label}</span>
                  <span className="text-white/50 text-sm font-light group-hover:text-white/65 transition-colors duration-200">{value}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={80} className="mt-20">
          <p className="font-mono text-white/15 text-xs tracking-[0.3em] uppercase mb-5">coursework</p>
          <div className="flex flex-wrap gap-2">
            {courses.map((c) => (
              <span key={c} className="px-3 py-1.5 border border-white/[0.07] bg-white/[0.02] rounded-sm text-xs font-mono text-white/30 hover:border-purple-500/40 hover:text-purple-300/70 hover:bg-purple-500/5 transition-all duration-200 cursor-default">
                {c}
              </span>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Experience */}
      <section id="experience" className="relative z-10 px-8 md:px-20 py-32 max-w-6xl mx-auto">
        <FadeIn>
          <p className="font-mono text-sky-400/50 text-xs tracking-[0.3em] uppercase mb-12">02 — experience</p>
        </FadeIn>
        <div className="flex flex-col">
          {experience.map((e, i) => (
            <FadeIn key={e.role} delay={i * 70}>
              <div className="grid md:grid-cols-[220px_1fr] gap-6 md:gap-12 border-b border-white/[0.05] py-10 group hover:bg-white/[0.015] transition-colors duration-300 rounded-sm px-2 -mx-2">
                <div className="pt-1">
                  <p className={`font-mono text-xs tracking-wide mb-1.5 ${e.accent === "purple" ? "text-purple-400/60" : e.accent === "sky" ? "text-sky-400/60" : "text-violet-400/60"}`}>
                    {e.period}
                  </p>
                  <p className="text-white/20 text-xs font-light leading-relaxed">{e.org}</p>
                </div>
                <div>
                  <h3 className={`font-light text-lg mb-4 transition-colors duration-200 group-hover:text-white/95 ${e.accent === "purple" ? "text-white/75 group-hover:text-white" : "text-white/75"}`}>
                    {e.role}
                  </h3>
                  <ul className="flex flex-col gap-2.5">
                    {e.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3 text-white/30 text-sm font-light leading-relaxed group-hover:text-white/40 transition-colors duration-200">
                        <span className={`mt-2 w-1 h-1 rounded-full shrink-0 ${e.accent === "purple" ? "bg-purple-400/50" : e.accent === "sky" ? "bg-sky-400/50" : "bg-violet-400/50"}`} />
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
          <p className="font-mono text-violet-400/50 text-xs tracking-[0.3em] uppercase mb-12">03 — projects</p>
        </FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p, i) => (
            <FadeIn key={p.name} delay={i * 55}>
              <a href={p.href} target="_blank" rel="noopener noreferrer"
                className={`group block h-full p-6 border rounded-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl
                  ${p.accent === "purple"
                    ? "border-purple-500/15 hover:border-purple-500/40 hover:bg-purple-500/[0.04] hover:shadow-purple-950/50"
                    : p.accent === "sky"
                    ? "border-sky-500/15 hover:border-sky-500/40 hover:bg-sky-500/[0.04] hover:shadow-sky-950/50"
                    : "border-violet-500/15 hover:border-violet-500/40 hover:bg-violet-500/[0.04] hover:shadow-violet-950/50"
                  } bg-white/[0.015]`}>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-mono text-white/80 text-base group-hover:text-white transition-colors duration-200">{p.name}</h3>
                  <span className="text-white/15 group-hover:text-white/60 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 inline-block text-lg">↗</span>
                </div>
                <p className="text-white/28 text-sm leading-relaxed mb-5">{p.desc}</p>
                <p className={`font-mono text-xs tracking-wide ${p.accent === "purple" ? "text-purple-400/50" : p.accent === "sky" ? "text-sky-400/50" : "text-violet-400/50"}`}>
                  {p.tech}
                </p>
              </a>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={80} className="mt-8">
          <a href="https://github.com/ghosteau" target="_blank" rel="noopener noreferrer"
            className="font-mono text-sm text-white/20 hover:text-purple-300 transition-colors duration-200 tracking-wide">
            view all on github →
          </a>
        </FadeIn>
      </section>

      {/* Research */}
      <section id="research" className="relative z-10 px-8 md:px-20 py-32 max-w-6xl mx-auto">
        <FadeIn>
          <p className="font-mono text-purple-400/50 text-xs tracking-[0.3em] uppercase mb-12">04 — research</p>
        </FadeIn>
        <div className="flex flex-col gap-4 max-w-3xl">
          {[
            {
              title: "Conversational AI for Smart Home Devices",
              sub: "NLP & AI · Pitt School of Computing · 2024–2025",
              accent: "violet",
              body: "Collaborated with PhD students and faculty to develop LLM-enhanced conversational AI for smart home environments. Integrated ChatGPT with the Alexa API via Python and NodeJS. Studied how diverse communities interact with AI-driven home technology and presented findings to faculty.",
            },
            {
              title: "Virtual Locomotion in VR",
              sub: "VR Research · Pitt School of Computing · Summer 2024",
              accent: "sky",
              body: "Researched the effects of different locomotion methods on user experience in virtual reality. Built and optimized immersive Unity environments and wrote C# scripts supporting the research study.",
            },
          ].map((r, i) => (
            <FadeIn key={r.title} delay={i * 100}>
              <div className={`border bg-white/[0.018] p-8 rounded-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
                ${r.accent === "violet"
                  ? "border-violet-500/15 hover:border-violet-500/40 hover:bg-violet-500/[0.03] hover:shadow-violet-950/40"
                  : "border-sky-500/15 hover:border-sky-500/40 hover:bg-sky-500/[0.03] hover:shadow-sky-950/40"}`}>
                <div className="flex items-start gap-4">
                  <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${r.accent === "violet" ? "bg-violet-400/70" : "bg-sky-400/70"}`} />
                  <div>
                    <h3 className="text-white/75 font-light text-lg mb-1">{r.title}</h3>
                    <p className={`font-mono text-xs tracking-wide mb-3 ${r.accent === "violet" ? "text-violet-400/50" : "text-sky-400/50"}`}>{r.sub}</p>
                    <p className="text-white/33 text-sm font-light leading-relaxed">{r.body}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={180} className="mt-8">
          <p className="text-white/18 text-sm font-light font-mono">
            Current interests: deep learning, NLP, computer vision, GPU computing.
          </p>
        </FadeIn>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.05] px-8 md:px-20 py-12 mt-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <p className="font-mono text-white/15 text-xs tracking-widest uppercase">Emmanuel McGrail</p>
            <p className="text-white/10 text-xs mt-1 font-light">Pittsburgh · Building things</p>
          </div>
          <div className="flex gap-6 text-xs font-mono text-white/18">
            <a href="https://github.com/ghosteau" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition-colors duration-200">GitHub</a>
            <a href="https://www.linkedin.com/in/manny-mcgrail/" target="_blank" rel="noopener noreferrer" className="hover:text-sky-300 transition-colors duration-200">LinkedIn</a>
            <a href="mailto:mcgrailmanny@gmail.com" className="hover:text-white/50 transition-colors duration-200">Email</a>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes underline-grow {
          from { width: 0; }
          to   { width: 100%; }
        }
        @keyframes blob-drift-1 {
          0%, 100% { transform: translate(0,0) scale(1); }
          25%  { transform: translate(50px,-40px) scale(1.07); }
          50%  { transform: translate(20px,35px) scale(0.95); }
          75%  { transform: translate(-30px,-10px) scale(1.04); }
        }
        @keyframes blob-drift-2 {
          0%, 100% { transform: translate(0,0) scale(1); }
          33%  { transform: translate(-60px,35px) scale(1.1); }
          66%  { transform: translate(40px,-50px) scale(0.93); }
        }
        @keyframes blob-drift-3 {
          0%, 100% { transform: translate(0,0) scale(1); }
          50%  { transform: translate(40px,40px) scale(1.15); }
        }
        @keyframes blob-drift-4 {
          0%, 100% { transform: translate(0,0) scale(1); }
          40%  { transform: translate(-30px,25px) scale(1.1); }
          80%  { transform: translate(20px,-20px) scale(0.9); }
        }
        @keyframes pulse-line {
          0%, 100% { opacity: 0.15; }
          50%       { opacity: 0.5; }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-underline {
          animation: underline-grow 1s cubic-bezier(0.16,1,0.3,1) 1s forwards;
        }
        .animate-pulse-line { animation: pulse-line 2.2s ease-in-out infinite; }
        .blob-1 { animation: blob-drift-1 20s ease-in-out infinite; }
        .blob-2 { animation: blob-drift-2 26s ease-in-out infinite; }
        .blob-3 { animation: blob-drift-3 17s ease-in-out infinite; }
        .blob-4 { animation: blob-drift-4 22s ease-in-out infinite 3s; }
      `}</style>
    </main>
  );
}