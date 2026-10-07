import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal.jsx";
import useReducedMotion from "../hooks/useReducedMotion.js";

const FAQS = [
  {
    q: "How fast will I see booked appointments?",
    a: "Campaigns usually go live in the second week. Most clients see their first booked consultations within the first couple of weeks after launch.",
  },
  {
    q: "Do you need access to my front desk?",
    a: "No. Our own system contacts and books your leads. You just share your calendar availability and show up to the appointment.",
  },
  {
    q: "How does the guarantee work?",
    a: "If we don't deliver 20 booked consultations that show up within 90 days, your next month of management is free. We'll go over the details on the strategy call.",
  },
  {
    q: "Is ad spend included?",
    a: "No. Ad spend is paid directly to Meta from your own ad account, so you keep full ownership of the account and the data.",
  },
  {
    q: "Which countries do you work in?",
    a: "We work with businesses in the USA, Canada and Australia.",
  },
  {
    q: "Are there long-term contracts?",
    a: "We'll walk you through the engagement options on the call. We want you to stay because the calendar is full, not because of a contract.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(null);
  const reduced = useReducedMotion();
  const buttons = useRef([]);

  const onKeyDown = (e, i) => {
    const last = FAQS.length - 1;
    let next = null;
    if (e.key === "ArrowDown") next = i === last ? 0 : i + 1;
    else if (e.key === "ArrowUp") next = i === 0 ? last : i - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next !== null) {
      e.preventDefault();
      buttons.current[next]?.focus();
    }
  };

  return (
    <section id="faq" className="section faq" aria-labelledby="faq-title">
      <div className="container faq__wrap">
        <Reveal>
          <h2 id="faq-title">
            Questions we get <span className="lime">a lot</span>
          </h2>
        </Reveal>

        <div className="faq__list">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div className="faq__item" key={f.q}>
                <h3 className="faq__q">
                  <button
                    type="button"
                    id={`faq-btn-${i}`}
                    className="faq__btn"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    ref={(el) => (buttons.current[i] = el)}
                    onClick={() => setOpen(isOpen ? null : i)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                  >
                    <span>{f.q}</span>
                    <span className="faq__icon" aria-hidden="true" data-open={isOpen} />
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="panel"
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-btn-${i}`}
                      className="faq__panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduced ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p>{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}