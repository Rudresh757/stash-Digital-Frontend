import { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import CalendlyButton from "./CalendlyButton.jsx";
import useActiveSection from "../hooks/useActiveSection.js";
import useFocusTrap from "../hooks/useFocusTrap.js";

const LINKS = [
  { id: "how", label: "How it works" },
  { id: "offer", label: "Offer" },
  { id: "who", label: "Who we help" },
  { id: "faq", label: "FAQ" },
];
const IDS = LINKS.map((l) => l.id);

function Drawer({ active, onClose }) {
  const ref = useFocusTrap(true, onClose);
  return (
    <>
      <motion.div
        className="drawer-backdrop"
        aria-hidden="true"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.aside
        ref={ref}
        id="mobile-menu"
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <button type="button" className="drawer__close" aria-label="Close menu" onClick={onClose}>
          ×
        </button>
        {LINKS.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            className="drawer__link"
            aria-current={active === l.id ? "true" : undefined}
            onClick={onClose}
          >
            {l.label}
          </a>
        ))}
        <CalendlyButton size="lg" onClick={onClose}>
          Book a call
        </CalendlyButton>
      </motion.aside>
    </>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(IDS);
  const close = useCallback(() => setOpen(false), []);

  return (
    <header className="nav">
      <div className="container nav__inner">
        <a href="#" className="nav__brand" aria-label="Stash Digital Media, back to top">
          <img src="/stash-logo.png" alt="" width="34" height="34" />
          <span>Stash Digital Media</span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="nav__link"
              aria-current={active === l.id ? "true" : undefined}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <CalendlyButton size="sm" className="nav__cta">
          Book a call
        </CalendlyButton>

        <button
          type="button"
          className="nav__burger"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {createPortal(
        <AnimatePresence>
          {open && <Drawer key="drawer" active={active} onClose={close} />}
        </AnimatePresence>,
        document.body
      )}
    </header>
  );
}