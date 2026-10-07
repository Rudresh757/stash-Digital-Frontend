import Reveal from "./Reveal.jsx";
import CalendlyButton from "./CalendlyButton.jsx";

const ITEMS = [
  {
    title: "Hyper-local Meta ad campaigns",
    text: "Facebook and Instagram, targeted to your service area.",
  },
  {
    title: "Ad copy & creatives",
    text: "Written and designed in-house, refreshed as they fatigue.",
  },
  {
    title: "Lead forms that pre-qualify",
    text: "Filter out tyre-kickers before they reach your calendar.",
  },
  {
    title: "Lead follow-up & booking",
    text: "We contact leads and book appointments for you.",
  },
  {
    title: "CRM & automation setup",
    text: "Every lead tracked from click to consultation.",
  },
  {
    title: "Weekly performance reports",
    text: "Booked, held and closed. Not impressions.",
  },
];

export default function Offer() {
  return (
    <section id="offer" className="section offer" aria-labelledby="offer-title">
      <div className="container offer__grid">
        <div>
          <Reveal>
            <p className="eyebrow">The offer</p>
            <h2 id="offer-title">
              Done-for-you <span className="lime">booking engine</span>
            </h2>
          </Reveal>

          <ul className="checklist">
            {ITEMS.map((it, i) => (
              <Reveal as="li" className="checklist__item" key={it.title} delay={i * 0.06} y={16}>
                <span className="checklist__tick" aria-hidden="true">
                  ✓
                </span>
                <div>
                  <h3>{it.title}</h3>
                  <p>{it.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal className="guarantee" delay={0.1}>
          <span className="guarantee__seal">Our guarantee</span>
          <p className="guarantee__big">
            <strong>20 held consults in 90 days.</strong>
          </p>
          <p className="guarantee__text">
            If we don't get 20 booked consultations that actually show up within your first 90 days,
            your next month is on us. We only win when your calendar fills.
          </p>
          <CalendlyButton size="lg">Check if you qualify →</CalendlyButton>
        </Reveal>
      </div>
    </section>
  );
}