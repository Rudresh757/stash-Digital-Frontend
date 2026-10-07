import { motion } from "framer-motion";
import Reveal from "./Reveal.jsx";
import useReducedMotion from "../hooks/useReducedMotion.js";

const MAX = 260; // px height of the $30K bar
const BEFORE = Math.round((MAX * 5) / 30); // $5K on the same scale

export default function CaseStudy() {
  const reduced = useReducedMotion();

  return (
    <section className="section case" aria-labelledby="case-title">
      <div className="container case__grid">
        <Reveal>
          <p className="eyebrow">Case study · Medspa</p>
          <h2 id="case-title">
            One month. <span className="lime">6× revenue.</span>
          </h2>
          <p className="lead">
            A local medspa came to us with steady walk-ins but no reliable way to fill the calendar.
            We rebuilt their offer, launched hyper-local campaigns and put a follow-up system on every
            lead.
          </p>
        </Reveal>

        <Reveal className="case__chart" delay={0.1}>
          <div
            className="case__bars"
            role="img"
            aria-label="Bar chart: monthly revenue went from $5K before to $30K after one month."
          >
            <div className="case__col">
              <p className="case__value">$5K</p>
              <div className="case__bar" style={{ height: BEFORE }} />
              <p className="case__label">
                Before
                <span>monthly revenue</span>
              </p>
            </div>

            <div className="case__col">
              <p className="case__value case__value--after">$30K</p>
              <motion.div
                className="case__bar case__bar--after"
                style={{ height: reduced ? MAX : BEFORE }}
                whileInView={{ height: MAX }}
                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                transition={{ duration: reduced ? 0 : 1.4, delay: reduced ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
              />
              <p className="case__label">
                After 1 month
                <span>monthly revenue</span>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}