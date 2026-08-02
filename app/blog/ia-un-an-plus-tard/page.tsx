"use client";

import Link from "next/link";
import { useLang, LangToggle } from "../../components/lang";

const chrome = {
  en: {
    back: "← blog",
    kicker: "writing — essay",
    langNote: "written in French",
  },
  fr: {
    back: "← blog",
    kicker: "écriture — essai",
    langNote: "écrit en français",
  },
};

const VIDEO = "https://www.youtube.com/watch?v=Ks-ejefDfp0";

export default function IAUnAnPlusTard() {
  const [lang, , toggle] = useLang();
  const c = chrome[lang];

  return (
    <main className="min-h-screen bg-[#04100f] text-white">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="blob blob-1 absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-turq-600/15 blur-[140px] will-change-transform" />
        <div className="blob blob-3 absolute bottom-[5%] right-[-8%] w-[400px] h-[400px] rounded-full bg-emerald-500/10 blur-[120px] will-change-transform" />
      </div>

      <nav className="fixed top-0 w-full z-50 px-8 py-5 flex justify-between items-center border-b border-white/[0.06] backdrop-blur-md bg-[#04100f]/75">
        <Link href="/blog" className="font-mono text-sm text-white/55 hover:text-turq-300 transition-colors tracking-widest uppercase">{c.back}</Link>
        <LangToggle lang={lang} toggle={toggle} />
      </nav>

      <article className="page-enter relative z-10 max-w-2xl mx-auto px-8 pt-32 pb-24">
        <p className="font-mono text-cyan-400/80 text-xs tracking-[0.3em] uppercase mb-5">{c.kicker}</p>

        <h1 className="text-4xl md:text-5xl font-extralight tracking-tight leading-tight">
          <span className="bg-gradient-to-r from-turq-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
            L&rsquo;intelligence artificielle, un an plus tard
          </span>
        </h1>
        <p className="text-white/60 text-lg font-light italic mt-3">
          Efficacité, jetons, et la course mondiale
        </p>

        <div className="flex flex-wrap items-center gap-3 mt-6 mb-4">
          <span className="font-mono text-xs text-white/50 tracking-wide">
            Manny McGrail · 2026
          </span>
          <span className="text-white/25" aria-hidden>·</span>
          <span className="flex items-center gap-1.5 text-white/40 text-xs italic">
            <span aria-hidden className="not-italic opacity-70">✎</span>
            {c.langNote}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mb-12">
          {["essai", "IA"].map((tag) => (
            <span key={tag} className="px-2.5 py-1 border border-turq-500/25 bg-turq-500/[0.05] rounded-sm text-[11px] font-mono text-turq-300/80 tracking-wide">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-6 text-white/70 font-light leading-[1.85] text-[15px]">
          <p>
            La dernière fois que j&rsquo;ai écrit sur le sujet de l&rsquo;intelligence artificielle, c&rsquo;était il y a environ un an. Depuis lors, énormément de changements ont eu lieu en dépit de ce court laps de temps, ce qui a provoqué ce billet que vous lisez actuellement. Quels que soient vos sentiments envers cette nouvelle technologie, elle change la manière dont on interagit avec le monde ; d&rsquo;aucuns demandent des conseils à l&rsquo;intelligence artificielle tandis que d&rsquo;autres l&rsquo;utilisent au quotidien pour leur flux de travail (en particulier chez moi, c&rsquo;est le codage, ce dont je parlerai plus loin dans ce texte). Mais ce sont seulement quelques exemples de ce qui se fait souvent avec l&rsquo;intelligence artificielle, et la capacité des modèles continue de progresser en termes d&rsquo;efficacité, de coût, de mémoire, et bien plus. Après avoir regardé{" "}
            <a href={VIDEO} target="_blank" rel="noopener noreferrer"
              className="text-turq-300/90 hover:text-turq-300 underline decoration-turq-500/40 hover:decoration-turq-400 underline-offset-2 transition-colors">
              cette rubrique sur l&rsquo;intelligence artificielle sur Radio-Canada ↗
            </a>
            , j&rsquo;ai su aussitôt qu&rsquo;il fallait écrire à ce sujet vu les gains qui se sont réalisés, et un manque de vulgarisation qui me semble très présent.
          </p>
          <p>
            D&rsquo;abord, pourquoi se soucie-t-on de l&rsquo;efficacité en ce qui concerne les modèles ? Bien que la question paraisse simple au premier abord, il s&rsquo;agit d&rsquo;un problème beaucoup plus difficile sous le capot, à rebours de ce qui est souvent entendu dans les médias. En effet, c&rsquo;est un problème qui ne se résout pas facilement, car la recherche est toujours en cours alors que les modèles deviennent de plus en plus complexes. Récemment, de nombreuses entreprises se sont demandé si cela valait la peine d&rsquo;investir autant d&rsquo;argent dans l&rsquo;usage de jetons, l&rsquo;unité de mesure qui s&rsquo;emploie pour évaluer le coût d&rsquo;un modèle, peu importe la tâche ; les jetons s&rsquo;apparentent à la monnaie universelle d&rsquo;un modèle, et c&rsquo;est ainsi que les compagnies mesurent leur usage par rapport à leur budget. Il s&rsquo;agit du ROI (retour sur investissement, qui provient de l&rsquo;anglais «&nbsp;return on investment&nbsp;»), et les grandes sociétés telles qu&rsquo;OpenAI, Google et Anthropic reconnaissent que si ce problème reste irrésolu, on risque de perdre un marché lucratif. C&rsquo;est ainsi nécessaire pour les entreprises de chercher un équilibre entre la qualité, l&rsquo;usage de jetons, les coûts de conception, et beaucoup d&rsquo;autres facteurs qui entrent en jeu concernant l&rsquo;adoption de l&rsquo;intelligence artificielle.
          </p>
          <p>
            D&rsquo;après une entrevue avec Sam Altman, le PDG d&rsquo;OpenAI aurait affirmé observer un gain d&rsquo;efficacité de 54&nbsp;% sur certaines tâches de programmation, ce qui pourrait aider à diminuer la facture. Par extension, certains estiment que cette actualité rendra cette nouvelle gamme de modèles plus attrayante pour le grand public. Cependant, malgré ces grandes améliorations, il semble en ce moment que Claude demeure le modèle principal en Amérique du Nord, et peut-être même dans le monde entier. Il restera une grande question pour OpenAI à l&rsquo;avenir : ces nouveaux modèles pourront-ils tenir tête à Anthropic, à une époque sans précédent dans l&rsquo;histoire de la technologie ? Il va de soi que l&rsquo;on ne le saura que dans un certain temps.
          </p>
          <p>
            Au-delà de l&rsquo;Occident, il y aura des questions continues au sujet de la Chine ; la Chine ne cesse pas de s&rsquo;imposer dans une filière de plus en plus concurrentielle. En lançant récemment des modèles très puissants (et bien utilisés) comme Kimi 3, ainsi que des mises à jour apportées aux autres modèles (par exemple, DeepSeek R4), il est plus qu&rsquo;évident que la Chine devient un grand rival pour des pays comme les États-Unis, ce qui soulève un autre aspect du problème, souvent sous-entendu, auquel les compagnies américaines devront faire face. En filigrane, l&rsquo;industrie se pose une question cruciale : le gouvernement américain pourra-t-il promulguer des lois capables de soutenir ses ambitions ?
          </p>
          <p>
            Alors même que je vous ai présenté beaucoup d&rsquo;informations ci-dessus, je ne peux pas vous fournir des certitudes. Le sujet est profond, délicat, et expérimental ; cette rédaction soulève plus de questions qu&rsquo;elle n&rsquo;apporte de réponses, et c&rsquo;est pourquoi il faudrait rédiger des billets ainsi. Les questions valorisent le progrès, et le progrès nous fait avancer collectivement.
          </p>
        </div>

        <div className="mt-14 pt-8 border-t border-white/[0.07]">
          <p className="font-mono text-white/40 text-xs leading-relaxed">
            Écrit à la suite de{" "}
            <a href={VIDEO} target="_blank" rel="noopener noreferrer"
              className="text-turq-300/80 hover:text-turq-300 transition-colors">
              cette rubrique de Radio-Canada ↗
            </a>{" "}
            sur l&rsquo;intelligence artificielle.
          </p>
        </div>
      </article>
    </main>
  );
}
