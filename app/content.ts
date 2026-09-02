import type { Lang } from "./components/lang";

export type Accent = "teal" | "cyan" | "emerald";

export const accentText: Record<Accent, string> = {
  teal: "text-turq-300/70",
  cyan: "text-cyan-300/70",
  emerald: "text-emerald-300/70",
};
export const accentDot: Record<Accent, string> = {
  teal: "bg-turq-400/60",
  cyan: "bg-cyan-400/60",
  emerald: "bg-emerald-400/60",
};

/* ── experience ── */
export const experience: {
  period: string;
  org: string;
  accent: Accent;
  en: { role: string; bullets: string[] };
  fr: { role: string; bullets: string[] };
}[] = [
  {
    period: "May 2025 – Aug 2025 · May 2026 – Aug 2026",
    org: "Bank of New York (BNY)",
    accent: "teal",
    en: {
      role: "Engineering Intern",
      bullets: [
        "Led a team of interns to design and build an SLA monitoring dashboard covering thousands of daily extract/feed file deliveries, backed by a configurable SLA rules engine and API — chosen to head the effort based on system expertise and team tenure.",
        "Engineered a data reprocessing algorithm via Spring and Kafka to automatically resolve failed enrichment pipeline messages, increasing system reliability.",
        "Optimized reconciliation workflows — $1.7M in cost savings and an 8x reduction in processing time.",
        "Migrated legacy data zones into a strategic architecture, improving cross-functional access for risk analysis teams.",
      ],
    },
    fr: {
      role: "Stagiaire ingénieur",
      bullets: [
        "Direction d'une équipe de stagiaires pour concevoir et bâtir un tableau de bord de suivi des SLA couvrant des milliers de livraisons de fichiers quotidiennes, appuyé par un moteur de règles SLA configurable et une API — choisi pour piloter cet effort grâce à mon expertise du système et à mon ancienneté dans l'équipe.",
        "Développement d'un algorithme de retraitement de données avec Spring et Kafka pour résoudre automatiquement les messages d'enrichissement en échec, augmentant la fiabilité du système.",
        "Optimisation des flux de réconciliation — 1,7 M$ d'économies et temps de traitement divisé par 8.",
        "Migration de zones de données héritées vers une architecture stratégique, améliorant l'accès inter-équipes pour l'analyse de risque.",
      ],
    },
  },
  {
    period: "Sept 2024 – Dec 2026",
    org: "University of Pittsburgh Athletics",
    accent: "cyan",
    en: {
      role: "Data Engineering Intern",
      bullets: [
        "Developed a proprietary data pipeline for the diving team using AWS Lambda, processing and grading performance data for thousands of divers to track athletes' improvement over time.",
        "Enhanced recruitment workflows by integrating position-specific metrics into football pipelines and building PowerBI dashboards for donors alongside business teams.",
        "Engineered and deployed an LLM-powered TEXT2SQL tool, simplifying SQL query generation and democratizing data access for non-technical team members.",
      ],
    },
    fr: {
      role: "Stagiaire en ingénierie de données",
      bullets: [
        "Conception d'un pipeline de données propriétaire pour l'équipe de plongeon avec AWS Lambda, traitant et notant les données de performance de milliers de plongeurs pour suivre leur progression.",
        "Amélioration des processus de recrutement en intégrant des métriques par poste aux pipelines de football et en créant des tableaux de bord PowerBI pour les donateurs avec les équipes métier.",
        "Développement et déploiement d'un outil TEXT2SQL alimenté par un LLM, simplifiant la génération de requêtes SQL et démocratisant l'accès aux données pour le personnel non technique.",
      ],
    },
  },
  {
    period: "Sept 2024 – June 2025",
    org: "Pitt School of Computing",
    accent: "emerald",
    en: {
      role: "Undergraduate Researcher — NLP & AI",
      bullets: [
        "Collaborated with PhD students and faculty on LLM-enhanced conversational AI for smart home devices.",
        "Integrated ChatGPT with the Alexa API via Python and NodeJS to expand functionality and usability.",
        "Studied how diverse communities interact with AI-driven home technology; presented findings to faculty.",
      ],
    },
    fr: {
      role: "Chercheur de premier cycle — TAL & IA",
      bullets: [
        "Collaboration avec des doctorants et des enseignants sur une IA conversationnelle améliorée par LLM pour les objets connectés.",
        "Intégration de ChatGPT à l'API Alexa via Python et NodeJS pour étendre les fonctionnalités et l'usabilité.",
        "Étude de la manière dont diverses communautés interagissent avec la domotique pilotée par l'IA ; présentation des résultats au corps enseignant.",
      ],
    },
  },
];

/* ── projects ── */
export const projects: {
  name: string;
  tech: string;
  href: string;
  accent: Accent;
  en: string;
  fr: string;
  links?: { label: string; href: string }[];
}[] = [
  {
    name: "fastdist",
    tech: "C++ · CUDA · PyBind11 · Python",
    href: "https://github.com/ghosteau/fastdist",
    accent: "teal",
    en: "High-performance ABI for probabilistic computation in C++ and Python. ~2.5x GPU speedup over standard libraries via optimized kernel execution.",
    fr: "ABI haute performance pour le calcul probabiliste en C++ et Python. Accélération GPU d'environ 2,5x par rapport aux bibliothèques standard grâce à des noyaux optimisés.",
  },
  {
    name: "STEVE",
    tech: "Java · Python · PyTorch · ONNX · SpigotAPI",
    href: "https://github.com/ghosteau/generative-terrain",
    accent: "cyan",
    en: "Spatial Terrain Engineering & Voxel Embedding — a conditional VAE that generates complete 16 × 384 × 16 Minecraft chunks in one ONNX forward pass. Its 4.6M-parameter U-Net learns from roughly 200M voxels across 22 biomes, while a lightweight FiLM system lets people fine-tune new terrain styles without retraining the base model.",
    fr: "Spatial Terrain Engineering & Voxel Embedding — un VAE conditionnel qui génère des chunks Minecraft complets de 16 × 384 × 16 en un seul passage ONNX. Son U-Net de 4,6 millions de paramètres apprend sur environ 200 millions de voxels répartis entre 22 biomes, tandis qu’un système FiLM léger permet d’ajuster de nouveaux styles sans réentraîner le modèle de base.",
    links: [
      { label: "STEVE-1 model", href: "https://huggingface.co/ghosteau/STEVE-1" },
      { label: "chunk dataset", href: "https://huggingface.co/datasets/ghosteau/minecraft-chunks" },
    ],
  },
  {
    name: "Embeddings Visualizer",
    tech: "Python · FastAPI · React · TypeScript · Three.js · UMAP",
    href: "https://github.com/ghosteau/embeddings-visualizer",
    accent: "emerald",
    en: "Full-stack research interface for exploring token embeddings from transformer models as interactive 3D UMAP projections. It supports GPT-2, BERT, RoBERTa, and custom Hugging Face models, with token search, nearest-neighbor analysis, pairwise comparison, and JSON export. A FastAPI backend manages model-keyed LRU and projection caches while React and Three.js render up to 6,000 projected tokens.",
    fr: "Interface de recherche complète pour explorer les représentations vectorielles de tokens issues de modèles Transformer sous forme de projections UMAP 3D interactives. Elle prend en charge GPT-2, BERT, RoBERTa et des modèles Hugging Face personnalisés, avec recherche de tokens, analyse des plus proches voisins, comparaison par paire et export JSON. Un backend FastAPI gère les caches LRU par modèle et les projections, tandis que React et Three.js affichent jusqu’à 6 000 tokens projetés.",
  },
  {
    name: "overlord-discord-bot",
    tech: "Python · ML · Discord API",
    href: "https://github.com/ghosteau/overlord-discord-bot",
    accent: "teal",
    en: "Machine learning-powered moderation and analytics bot for Discord servers.",
    fr: "Bot de modération et d'analyse pour serveurs Discord, propulsé par l'apprentissage automatique.",
  },
  {
    name: "math-meets-code",
    tech: "Python · Jupyter",
    href: "https://github.com/ghosteau/math-meets-code",
    accent: "cyan",
    en: "A running exploration of mathematics through code — linear algebra, probability, analysis, and more.",
    fr: "Une exploration continue des mathématiques par le code — algèbre linéaire, probabilités, analyse, et plus encore.",
  },
  {
    name: "PittAPI",
    tech: "Python · BeautifulSoup · Requests",
    href: "https://github.com/pittcsc/PittAPI",
    accent: "emerald",
    en: "Open-source Python library (100+ stars, on PyPI) for programmatic access to Pitt course, dining, library, and shuttle data. Shipped full study room reservation support end-to-end.",
    fr: "Bibliothèque Python open-source (100+ étoiles, sur PyPI) pour un accès programmatique aux données de cours, restauration, bibliothèque et navettes de Pitt. Ajout complet de la réservation de salles d'étude, de bout en bout.",
  },
];

/* ── coursework ── */
export const courses: { en: string; fr: string }[] = [
  { en: "Deep Learning", fr: "Apprentissage profond" },
  { en: "Computer Vision", fr: "Vision par ordinateur" },
  { en: "Algorithms & Data Structures", fr: "Algorithmes & structures de données" },
  { en: "Systems Software", fr: "Logiciels système" },
  { en: "Computer Organization & Assembly", fr: "Architecture & assembleur" },
  { en: "Operating Systems", fr: "Systèmes d'exploitation" },
  { en: "Signals & Systems", fr: "Signaux & systèmes" },
  { en: "AI & Big Data", fr: "IA & big data" },
  { en: "Microprocessors", fr: "Microprocesseurs" },
  { en: "Physics", fr: "Physique" },
  { en: "Statistics", fr: "Statistiques" },
];

/* ── research ── */
export const research: {
  accent: Accent;
  en: { title: string; sub: string; body: string };
  fr: { title: string; sub: string; body: string };
}[] = [
  {
    accent: "emerald",
    en: {
      title: "Conversational AI for Smart Home Devices",
      sub: "NLP & AI · Pitt School of Computing · 2024–2025",
      body: "Collaborated with PhD students and faculty to develop LLM-enhanced conversational AI for smart home environments. Integrated ChatGPT with the Alexa API via Python and NodeJS. Studied how diverse communities interact with AI-driven home technology and presented findings to faculty.",
    },
    fr: {
      title: "IA conversationnelle pour la maison connectée",
      sub: "TAL & IA · Pitt School of Computing · 2024–2025",
      body: "Collaboration avec des doctorants et des enseignants pour développer une IA conversationnelle améliorée par LLM pour les environnements domotiques. Intégration de ChatGPT à l'API Alexa via Python et NodeJS. Étude des interactions de communautés diverses avec la domotique pilotée par l'IA, avec présentation au corps enseignant.",
    },
  },
  {
    accent: "cyan",
    en: {
      title: "Virtual Locomotion in VR",
      sub: "VR Research · Pitt School of Computing · Summer 2024",
      body: "Researched the effects of different locomotion methods on user experience in virtual reality. Built and optimized immersive Unity environments and wrote C# scripts supporting the research study.",
    },
    fr: {
      title: "Locomotion virtuelle en RV",
      sub: "Recherche RV · Pitt School of Computing · Été 2024",
      body: "Recherche sur les effets de différentes méthodes de locomotion sur l'expérience utilisateur en réalité virtuelle. Construction et optimisation d'environnements immersifs sous Unity et écriture de scripts C# pour l'étude.",
    },
  },
];

/* ── UI strings ── */
export const ui = {
  en: {
    nav: { about: "about", experience: "experience", projects: "projects", research: "research", music: "music", resume: "résumé", blog: "blog", photos: "photos" },
    heroKicker: "Pittsburgh, PA · Pitt '27",
    heroRoles: [
      "aspiring AI researcher",
      "data & systems engineer",
      "drummer & composer",
      "poet at heart",
      "LeetCode grinder",
      "history & philosophy nerd",
      "Pittsburgh faithful",
    ],
    heroTagline:
      "Aspiring polymath. I work at the intersection of machine learning, systems, and data — but I'm equally drawn to math, history, philosophy, and more. I care about ideas as much as what you build with them.",
    quote: "Fortis imaginatio generat casum.",
    quoteAttr: "— Montaigne, On the Power of Imagination · a strong imagination begets the event",
    flags: { usa: "United States", quebec: "Québec", france: "France" },
    ctaEmail: "Email ↗",
    sectionAbout: "01 — about",
    aboutHeadingTop: "Researcher by instinct,",
    aboutHeadingBottom: "generalist by design.",
    aboutP1:
      "I'm Manny — a Data Science & Computer Science student at the University of Pittsburgh, with a minor in French. I spent last semester on exchange at ENSEA in Cergy, France, and I'm back in Pittsburgh now, having just wrapped a second summer engineering at BNY. My work sits at the intersection of machine learning, systems programming, and data engineering — I'm drawn to problems that are both mathematically interesting and practically hard.",
    aboutP2:
      "Outside of engineering I read research papers, philosophy and history, think seriously about physics and mathematics for their own sake, grind LeetCode for the pure joy of a clean algorithm, write poetry, and make music. I find the connections between fields as interesting as the fields themselves.",
    facts: [
      { label: "Currently", value: "Back at Pitt, Pittsburgh PA · Pitt '27" },
      { label: "Studying", value: "Data Science + Computer Science @ Pitt · French minor" },
      { label: "GPA", value: "3.76 · Dean's List" },
      { label: "Research", value: "NLP, Computer Vision, Deep Learning" },
      { label: "Programming", value: "Python, C++, Java, R, C#, C, SQL" },
      { label: "Languages", value: "English & French" },
      { label: "Algorithms", value: "LeetCode grinder — DP, graphs, the classics" },
      { label: "Goal", value: "Undergraduate → PhD / Masters → AI Research" },
      { label: "Sports", value: "Pittsburgh faithful — black & gold, every season" },
      { label: "Also", value: "Drummer · Poet · All-Academic Athlete" },
    ],
    rootsLabel: "Ties",
    coursework: "coursework",
    connectionsHeading: "how it connects",
    connectionsBlurb:
      "The fields I care about aren't separate tracks — they keep borrowing from each other. Here's the shape of it.",
    sectionExp: "02 — experience",
    sectionProj: "03 — projects",
    viewAll: "view all on github →",
    sectionResearch: "04 — research",
    researchInterests: "Current interests: deep learning, NLP, computer vision, GPU computing.",
    gamesHeading: "also into",
    sectionMusic: "05 — music",
    musicHeading: "Drums, composition,",
    musicHeadingAccent: "and whatever comes next.",
    musicBlurb:
      "Before the code, there was rhythm. I composed much of this album and played the drums on it — music is one of the ways I think through ideas. More to come.",
    musicSoon: "more on the way",
    musicListen: "Listen on Spotify ↗",
    scroll: "scroll",
    footerTag: "Pittsburgh · Building things",
  },
  fr: {
    nav: { about: "à propos", experience: "expérience", projects: "projets", research: "recherche", music: "musique", resume: "CV", blog: "blog", photos: "photos" },
    heroKicker: "Pittsburgh, PA · Pitt '27",
    heroRoles: [
      "chercheur en IA en devenir",
      "ingénieur données & systèmes",
      "batteur & compositeur",
      "poète dans l'âme",
      "accro à LeetCode",
      "passionné d'histoire & de philo",
      "fidèle à Pittsburgh",
    ],
    heroTagline:
      "Polymathe en devenir. Je travaille à l'intersection de l'apprentissage automatique, des systèmes et des données — mais les maths, l'histoire et la philosophie m'attirent tout autant. Je tiens aux idées autant qu'à ce qu'on en construit.",
    quote: "Fortis imaginatio generat casum.",
    quoteAttr: "— Montaigne, De la force de l'imagination · une imagination forte engendre l'événement",
    flags: { usa: "États-Unis", quebec: "Québec", france: "France" },
    ctaEmail: "Email ↗",
    sectionAbout: "01 — à propos",
    aboutHeadingTop: "Chercheur par instinct,",
    aboutHeadingBottom: "généraliste par choix.",
    aboutP1:
      "Je m'appelle Manny — étudiant en science des données et informatique à l'Université de Pittsburgh, avec une mineure en français. J'ai passé le semestre dernier en échange à l'ENSEA de Cergy, en France, et je suis de retour à Pittsburgh, après un deuxième été en ingénierie chez BNY. Mon travail se situe à l'intersection de l'apprentissage automatique, de la programmation système et de l'ingénierie de données — j'aime les problèmes à la fois mathématiquement intéressants et concrètement difficiles.",
    aboutP2:
      "En dehors de l'ingénierie, je lis des articles de recherche, de la philosophie et de l'histoire, je réfléchis sérieusement à la physique et aux mathématiques pour elles-mêmes, je m'entraîne sur LeetCode pour le pur plaisir d'un algorithme élégant, j'écris de la poésie et je fais de la musique. Les liens entre les domaines m'intéressent autant que les domaines eux-mêmes.",
    facts: [
      { label: "Actuellement", value: "De retour à Pitt, Pittsburgh PA · promo 2027" },
      { label: "Études", value: "Science des données + Informatique @ Pitt · mineure en français" },
      { label: "Moyenne", value: "3,76 · Dean's List" },
      { label: "Recherche", value: "TAL, vision par ordinateur, apprentissage profond" },
      { label: "Programmation", value: "Python, C++, Java, R, C#, C, SQL" },
      { label: "Langues", value: "Anglais & Français" },
      { label: "Algorithmes", value: "Accro à LeetCode — prog. dynamique, graphes, les classiques" },
      { label: "Objectif", value: "Licence → Doctorat / Master → Recherche en IA" },
      { label: "Sports", value: "Fidèle à Pittsburgh — noir et or, en toute saison" },
      { label: "Aussi", value: "Batteur · Poète · Athlète académique" },
    ],
    rootsLabel: "Attaches",
    coursework: "cours suivis",
    connectionsHeading: "les liens",
    connectionsBlurb:
      "Les domaines qui me tiennent à cœur ne sont pas des voies séparées — ils s'empruntent constamment les uns aux autres. Voici la forme que ça prend.",
    sectionExp: "02 — expérience",
    sectionProj: "03 — projets",
    viewAll: "voir tout sur github →",
    sectionResearch: "04 — recherche",
    researchInterests: "Intérêts actuels : apprentissage profond, TAL, vision par ordinateur, calcul GPU.",
    gamesHeading: "aussi fan de",
    sectionMusic: "05 — musique",
    musicHeading: "Batterie, composition,",
    musicHeadingAccent: "et la suite.",
    musicBlurb:
      "Avant le code, il y avait le rythme. J'ai composé une grande partie de cet album et j'y ai joué de la batterie — la musique est une de mes façons de réfléchir. D'autres projets à venir.",
    musicSoon: "d'autres à venir",
    musicListen: "Écouter sur Spotify ↗",
    scroll: "défiler",
    footerTag: "Pittsburgh · Je construis des choses",
  },
} satisfies Record<Lang, unknown>;

/* ── favorite games (original pixel homages, mapped by key) ── */
export const games: { key: string; label: string }[] = [
  { key: "minecraft", label: "Minecraft" },
  { key: "elderscrolls", label: "Skyrim · Oblivion" },
  { key: "pokemon", label: "Pokémon" },
  { key: "zelda", label: "Zelda" },
  { key: "mario", label: "Mario" },
  { key: "sonic", label: "Sonic" },
];

export const SPOTIFY_ALBUM_ID = "05v0il6BwD1Pge2k69NQVa";
