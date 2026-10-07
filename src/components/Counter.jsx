import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import useReducedMotion from "../hooks/useReducedMotion.js";

export default function Counter({ from = 0, to, prefix = "", suffix = "", duration = 1.6 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduced = useReducedMotion();
  const [val, setVal] = useState(reduced ? to : from);

  useEffect(() => {
    if (!inView) return undefined;
    if (reduced) {
      setVal(to);
      return undefined;
    }
    const controls = animate(from, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduced, from, to, duration]);

  return (
    <span ref={ref} className="counter">
      <span aria-hidden="true">
        {prefix}
        {val}
        {suffix}
      </span>
      <span className="visually-hidden">
        {prefix}
        {to}
        {suffix}
      </span>
    </span>
  );
}