"use client";

import Link from "next/link";
import { useLang, LangToggle } from "../../components/lang";

const chrome = {
  en: { back: "← blog", kicker: "writing — essay", langNote: null },
  fr: {
    back: "← blog",
    kicker: "écriture — essai",
    langNote: "Ce billet est rédigé en anglais.",
  },
};

export default function GenerativeAIEssay() {
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
            The Vast World of Generative Artificial Intelligence
          </span>
        </h1>
        <p className="text-white/60 text-lg font-light italic mt-3">
          The Ascent of Deep Learning and Its Effects
        </p>

        <div className="flex flex-wrap items-center gap-3 mt-6 mb-4">
          <span className="font-mono text-xs text-white/50 tracking-wide">
            Manny McGrail · University of Pittsburgh · April 9, 2025
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mb-12">
          {["EN", "essay", "AI", "deep learning"].map((tag) => (
            <span key={tag} className="px-2.5 py-1 border border-turq-500/25 bg-turq-500/[0.05] rounded-sm text-[11px] font-mono text-turq-300/80 tracking-wide">
              {tag}
            </span>
          ))}
        </div>

        {c.langNote && (
          <p className="font-mono text-white/40 text-xs mb-10 border-l-2 border-white/10 pl-4">{c.langNote}</p>
        )}

        <div className="flex flex-col gap-6 text-white/70 font-light leading-[1.85] text-[15px]">
          <p>
            The words &ldquo;artificial intelligence&rdquo; have been used in many contexts (and oftentimes ambiguously so) over the past few years, with generative artificial intelligence particularly becoming more powerful by the day. New research and engineering around the globe are sparking a seismic wave of new models that could have serious benefits to humanity, while also sounding the alarm for a large number of individuals due to its inherent ethical concerns and social factors. Furthermore, many people lack the necessary technical understanding of what is going on under the hood of these complex models, causing many people to develop falsehoods regarding how modern generative platforms work. This essay will discuss some of the aforementioned social and ethical factors from a holistic point of view, while also clearing up some of the common misconceptions, questions, and concerns regarding what is going on behind the scenes of many artificial intelligence models and tools being used today.
          </p>
          <p>
            Modern generative algorithms are truly just an expansion of a broader field called deep learning. While we think of artificial intelligence as a newer innovation, deep learning has actually been around since 1965. Tim Dettmers from the Nvidia Technical Blog describes precisely what these models looked like: &ldquo;The earliest deep-learning-like algorithms that had multiple layers of non-linear features can be traced back to Ivakhnenko and Lapa in 1965 (Figure 1), who used thin but deep models with polynomial activation functions which they analyzed with statistical methods&rdquo; (Dettmers). However, these models were limited despite their scope and applicability. Their training was purely based on more primitive mathematical and statistical methods, paired with the fact that model analysis was a new field that was often hard to quantify for its era — even though there was a more efficient way of doing this that was arguably less nebulous from an intuition standpoint. We eventually discovered a technique called gradient descent that was a more powerful way to train our models, and it works as follows: &ldquo;In terms of stochastic gradient descent, we go down the steepest path (the negative gradient or first derivative) on the landscape of the error function to find a local minimum, that is, the point that yields a low error for our task. We do this in tiny steps so that we do not get trapped in half-pipe-like obstacles&rdquo; (Dettmers). The basic idea is to find where we can decrease the error between what our model currently looks like and what we want it to look like (making the right predictions in the context of our data); this is the exact training schema that powers modern artificial intelligence models, and it is extraordinarily powerful when paired with the correct architecture, as we have seen in the past few years. Most modern architectures are called &ldquo;transformers,&rdquo; and they are very complex, attention-based neural networks that power the most advanced models that we have seen over the past few years. An article by Amazon Web Services describes transformers as being able to &ldquo;enable machines to understand, interpret, and generate human language in a way that&rsquo;s more accurate than ever before&rdquo; (&ldquo;What are Transformers in Artificial Intelligence?&rdquo;), making them a prime candidate for creating state-of-the-art large language models such as ChatGPT. Advanced models, such as GPTs (generative pre-trained transformers), essentially use one massive vector space to interpret what you are saying. &ldquo;By using more than 175 billion parameters, GPT models can generate text sequences that are adjusted for style and tone. GPT models have sparked the research in AI toward achieving artificial general intelligence&rdquo; (&ldquo;What are Transformers in Artificial Intelligence?&rdquo;). What makes this especially intriguing is that we have scaled models upwards, increasing the parameter count substantially and allowing for more dynamic models than ever before. However, this leads into a sandbox of unanswered questions, ranging from environmental concerns all the way to people worried about the movie <em>The Terminator</em> becoming a reality.
          </p>
          <p>
            All of these massive developments in artificial intelligence give humanity a reason to be excited, but like most developments, there is more to it than the surface. Many people are increasingly worried about the implications of such technology from a social context, given the ability it has to clearly take jobs, for instance. The <em>Harvard Business Review</em> writes in a 2024 article, &ldquo;We find that the introduction of ChatGPT and image-generating tools led to nearly immediate decreases in posts for online gig workers across job types, but particularly for automation-prone jobs. After the introduction of ChatGPT, there was a 21% decrease in the weekly number of posts&rdquo; (Demirci et al.). There is clear evidence that artificial intelligence is going to take jobs, and it will not necessarily be limited to a handful of industries. As mentioned earlier, the state-of-the-art artificial intelligence models are incredibly dynamic and powerful, and they can handle tasks from programming to generating unique images. This puts many different career fields in jeopardy — or at the very least, has the potential to change workflows at certain workplaces in a radical way. To make it seem all bleak would be unfair though, and the <em>Harvard Business Review</em> goes on to also write, &ldquo;Despite concerns about job losses, AI also offers opportunities for job augmentation and productivity gains. Our findings show that jobs requiring AI-related skills, such as those involving ChatGPT, are rising&rdquo; (Demirci et al.), and states that &ldquo;To stay competitive, employees must engage in continuous learning and upskilling&rdquo; (Demirci et al.). So while there is certainly some evident concern that people should have regarding artificial intelligence replacing jobs, we should also note that, at the end of the day, the job market is meritocratic in nature. Those who learn how to utilize artificial intelligence are going to be at a critical advantage — especially when considering modern workplaces and fields such as computer science, engineering, and potentially even medicine. One other thing that concerns some individuals is how artificial intelligence interacts with human beings. There was one horrific case that occurred back in October of 2024, where AP News reported, &ldquo;In the final moments before he took his own life, 14-year-old Sewell Setzer III took out his phone and messaged the chatbot that had become his closest friend&rdquo; (Payne). Regular people, and especially parents, were deeply frightened by this situation, and it is putting parents and mental health experts on high alert. The AP report also wrote, &ldquo;Youth mental health has reached crisis levels in recent years, according to U.S. Surgeon General Vivek Murthy, who has warned of the serious health risks of social disconnection and isolation&rdquo; (Payne). With our lives being digitized more by the day, we must think about artificial intelligence in a similar context; the risk of artificial intelligence further dividing human social interaction is very real, and average people and experts are seeming to find common ground on that subject. Despite the benefits that artificial intelligence offers, we will need to tread cautiously with our development of such an influential tool.
          </p>
          <p>
            At this point, we begin to ask ourselves: what is the future of this technology? To start, we will certainly continue to see extensive research and developments on the topic of artificial intelligence as a whole. Rather than living in our fears, it is likely we will need to embrace this technology, implement it into our workflows, and keep transparency paramount. Platforms such as Hugging Face and GitHub are doing an excellent job providing average developers with a platform to post their models, and even give large companies a platform to post their state-of-the-art work (for consumer and developer use). Thus, this is allowing consumers, developers, and companies to have a level of transparency with each other, ushering in a new era of collaborative innovation. Models such as Meta&rsquo;s LLaMA series and DeepSeek&rsquo;s R1 model are notable examples of this open-source philosophy at work, and even OpenAI has begun to shift to a more open philosophy with the announcement of an open-weights model within the past few days. As long as this open framework continues to be pushed, there is great potential for a sense of trust to be built in the artificial intelligence community, which will be important to prioritize as we try to make artificial intelligence safer and smarter while also preventing it from getting out of control.
          </p>
          <p>
            In conclusion, there are many aspects to the decisions that humanity will have to make as we continue to develop more capable artificial intelligence models. From the theoretical side of artificial intelligence all the way to the ethical standard we must hold ourselves to in developing this technology, there is going to be no shortage of debate on what values we must remain steadfast on. Artificial intelligence has great potential to improve the lives of many, but there are clearly important factors to consider as we enter this new era of technology.
          </p>
        </div>

        <div className="mt-14 pt-8 border-t border-white/[0.07]">
          <p className="font-mono text-white/40 text-xs leading-relaxed">
            Written for CS 0590 (Social Implications of Computing), University of Pittsburgh.
            Sources cited in-text: Dettmers (Nvidia Technical Blog); &ldquo;What are Transformers in
            Artificial Intelligence?&rdquo; (AWS); Demirci et al. (<em>Harvard Business Review</em>, 2024); Payne (AP News, 2024).
          </p>
        </div>
      </article>
    </main>
  );
}
