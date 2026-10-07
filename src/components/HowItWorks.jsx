import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Reveal from "./Reveal.jsx";
import useReducedMotion from "../hooks/useReducedMotion.js";

const STEPS = [
  {
    title: "Strategy call",
    when: "Week 0",
    text: "We look at your services, margins, location and current lead flow, and decide on the one offer we'll lead with.",
  },
  {
    title: "Offer & creative",
    when: "Week 1",
    text: "We write the ad copy, build the creatives and set up the lead form and CRM, all tuned to your area and your ideal client.",
  },
  {
    title: "Hyper-local launch",
    when: "Week 2",
    text: "Campaigns go live on Facebook and Instagram, targeted to the radius your best clients actually travel from.",
  },
  {
    title: "We qualify & book",
    when: "Ongoing",
    text: "Our system contacts every new lead fast, screens them, and books qualified people straight into your calendar.",
  },
  {
    title: "Optimise weekly",
    when: "Every week",
    text: "We cut what doesn't book and scale what does. You get a weekly report showing booked and held consultations.",
  },
];

export default function HowItWorks() {
  const reduced = useReducedMotion();
  const wrapRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start 65%", "end 60%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <section id="how" className="section how" aria-labelledby="how-title">
      <div className="container">
        <Reveal>
          <p className="eyebrow">How it works</p>
          <h2 id="how-title">
            From first call to <span className="lime">booked consults</span>
          </h2>
          <p className="lead">You handle the appointment. We handle everything that happens before it.</p>
        </Reveal>

        <div className="steps-wrap" ref={wrapRef}>
          <span className="steps__track" aria-hidden="true">
            <motion.span className="steps__fill" style={{ scaleY: reduced ? 1 : fill }} />
          </span>

          <ol className="steps">
            {STEPS.map((s, i) => (
              <Reveal as="li" className="step" key={s.title} y={20}>
                <span className="step__num" aria-hidden="true">
                  {i + 1}
                </span>
                <div className="step__body">
                  <p className="step__when">{s.when}</p>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}