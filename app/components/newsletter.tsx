import type { Lang } from "./lang";
import { newsletter } from "../content";

const copy = {
  en: {
    title: "Get new writing by email",
    soon: "A newsletter is on the way, for new essays and, later, videos. Until it launches, the RSS feed carries everything I publish.",
    live: "New essays and videos, sent when they’re published. Nothing else.",
    email: "Email address",
    subscribe: "Subscribe",
    substack: "Subscribe on Substack",
    rss: "RSS feed",
  },
  fr: {
    title: "Recevoir les nouveaux textes par courriel",
    soon: "Une infolettre arrive bientôt, pour les nouveaux essais puis les vidéos. D’ici là, le flux RSS reprend tout ce que je publie.",
    live: "Les nouveaux essais et vidéos, envoyés dès leur parution. Rien d’autre.",
    email: "Adresse courriel",
    subscribe: "S’abonner",
    substack: "S’abonner sur Substack",
    rss: "Flux RSS",
  },
};

/** Signup block for the end of essays and the notebook index.
 *  Reads `newsletter` from content.ts; renders a real form only once a
 *  provider is configured. */
export function Newsletter({ lang }: { lang: Lang }) {
  const c = copy[lang];
  const { provider, handle } = newsletter;
  const rss = <a href="/feed.xml" className="newsletter-rss">{c.rss} <span aria-hidden>↗</span></a>;

  return (
    <section className="newsletter" aria-labelledby="newsletter-title">
      <h2 id="newsletter-title">{c.title}</h2>
      {provider === null && (
        <div className="newsletter-body">
          <p>{c.soon}</p>
          {rss}
        </div>
      )}
      {provider === "buttondown" && (
        <div className="newsletter-body">
          <p>{c.live}</p>
          <form
            className="newsletter-form"
            action={`https://buttondown.com/api/emails/embed-subscribe/${handle}`}
            method="post"
            target="_blank"
          >
            <label className="sr-only" htmlFor="newsletter-email">{c.email}</label>
            <input id="newsletter-email" type="email" name="email" required autoComplete="email" placeholder={c.email} />
            <input type="hidden" name="tag" value={lang} />
            <button type="submit">{c.subscribe}</button>
          </form>
          {rss}
        </div>
      )}
      {provider === "substack" && (
        <div className="newsletter-body">
          <p>{c.live}</p>
          <a className="newsletter-button" href={`https://${handle}.substack.com/subscribe`} target="_blank" rel="noopener noreferrer">
            {c.substack} <span aria-hidden>↗</span>
          </a>
          {rss}
        </div>
      )}
    </section>
  );
}
