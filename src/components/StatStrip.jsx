import Counter from "./Counter.jsx";
import Reveal from "./Reveal.jsx";

export default function StatStrip() {
  return (
    <section className="stats" aria-label="Results">
      <div className="container stats__grid">
        <Reveal className="stat" delay={0}>
          <p className="stat__num">
            <span>$5K</span>
            <span className="stat__arrow" aria-hidden="true">→</span>
            <span className="lime">
              <Counter from={5} to={30} prefix="$" suffix="K" />
            </span>
          </p>
          <p className="stat__label">Monthly revenue for a medspa client, in one month of ads.</p>
        </Reveal>

        <Reveal className="stat" delay={0.1}>
          <p className="stat__num">
            <span>5</span>
            <span className="stat__arrow" aria-hidden="true">→</span>
            <span className="lime">
              <Counter from={5} to={30} />
            </span>
          </p>
          <p className="stat__label">
            Bookings per month for dermatology and medspa clinics we've worked with.
          </p>
        </Reveal>

        <Reveal className="stat" delay={0.2}>
          <p className="stat__num">
            <span className="lime">
              <Counter to={20} />
            </span>
            <span className="stat__slash" aria-hidden="true">/</span>
            <span>
              <Counter to={90} />
            </span>
          </p>
          <p className="stat__label">Held consultations guaranteed in your first 90 days.</p>
        </Reveal>
      </div>
    </section>
  );
}