import Reveal from "./Reveal.jsx";

const NICHES = [
  { tag: "Aesthetics", title: "Medspas & aesthetic dermatology", text: "Injectables, laser, skin treatments." },
  { tag: "Wellness", title: "IV therapy clinics", text: "Drips, boosters and memberships." },
  { tag: "Body", title: "Body contouring & weight loss", text: "Consult-led, high-value programs." },
  { tag: "Auto", title: "Luxury used & CPO dealers", text: "Test drives and showroom visits." },
  { tag: "Powersports", title: "Powersports dealers", text: "Bikes, ATVs, side-by-sides, marine." },
];

const FIT = [
  "Have a proven service people already buy",
  "Can take 20+ more appointments a month",
  "Want booked calendars, not raw lead lists",
];

const NOT_FIT = [
  "Just opened and have no reviews yet",
  "Can't handle more appointments",
  "Want the cheapest leads regardless of quality",
];

export default function WhoWeHelp() {
  return (
    <section id="who" className="section who" aria-labelledby="who-title">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Who we help</p>
          <h2 id="who-title">
            High-ticket, <span className="lime">local</span> businesses
          </h2>
          <p className="lead">
            We work with a small number of clients in the USA, Canada and Australia, in industries
            where one booked appointment is worth hundreds or thousands of dollars.
          </p>
        </Reveal>

        <ul className="cards cards--niches">
          {NICHES.map((n, i) => (
            <Reveal as="li" className="card card--niche" key={n.title} delay={i * 0.07}>
              <span className="card__tag">{n.tag}</span>
              <h3>{n.title}</h3>
              <p>{n.text}</p>
            </Reveal>
          ))}
        </ul>

        <div className="fit">
          <Reveal className="fit__col fit__col--yes">
            <h3>A good fit if you…</h3>
            <ul>
              {FIT.map((t) => (
                <li key={t}>
                  <span aria-hidden="true">✓</span> {t}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="fit__col fit__col--no" delay={0.1}>
            <h3>Not a fit if you…</h3>
            <ul>
              {NOT_FIT.map((t) => (
                <li key={t}>
                  <span aria-hidden="true">✕</span> {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}