import { motion } from "framer-motion";
import CalendlyButton from "./CalendlyButton.jsx";
import VslSlot from "./VslSlot.jsx";
import useReducedMotion from "../hooks/useReducedMotion.js";

const CHIPS = ["Meta ads specialists", "Pre-qualified leads", "We book the appointment"];

export default function Hero() {
  const reduced = useReducedMotion();
  const fade = (delay) => ({
    initial: reduced ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0 : 0.7, delay: reduced ? 0 : delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy">
          <motion.p className="eyebrow" {...fade(0)}>
            The new era marketing agency
          </motion.p>

          <motion.h1 id="hero-title" {...fade(0.08)}>
            Stop buying <s className="strike">leads</s>. Start filling{" "}
            <span className="lime">your calendar.</span>
          </motion.h1>

          <motion.p className="lead hero__sub" {...fade(0.16)}>
            We run hyper-local Facebook &amp; Instagram campaigns for clinics and dealerships, then
            our team qualifies every lead and books them straight into your calendar.{" "}
            <strong className="lime">20 held consultations in 90 days, or your next month is free.</strong>
          </motion.p>

          <motion.div className="hero__ctas" {...fade(0.24)}>
            <CalendlyButton size="lg">Book your free strategy call →</CalendlyButton>
            <a href="#how" className="link-arrow">
              See how it works
            </a>
          </motion.div>

          <motion.ul className="chips" aria-label="Key points" {...fade(0.32)}>
            {CHIPS.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </motion.ul>
        </div>

        <motion.div className="hero__visual" {...fade(0.2)}>
          <VslSlot />
        </motion.div>
      </div>
    </section>
  );
}