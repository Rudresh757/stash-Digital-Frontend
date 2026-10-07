import { useRef } from "react";
import useCalendly from "../hooks/useCalendly.jsx";
import useReducedMotion from "../hooks/useReducedMotion.js";
import { CALENDLY_URL } from "../lib/api.js";

export default function CalendlyButton({
  children = "Book a call",
  variant = "primary", // "primary" | "ghost" | "link"
  size, // "sm" | "lg"
  prefill,
  className = "",
  onClick,
  magnetic = true,
  ...rest
}) {
  const { openCalendly } = useCalendly();
  const reduced = useReducedMotion();
  const ref = useRef(null);

  const classes =
    variant === "link"
      ? ["link-button", className]
      : ["btn", `btn--${variant}`, size ? `btn--${size}` : "", className];

  const handleClick = (e) => {
    onClick?.(e);
    try {
      openCalendly(prefill);
    } catch {
      window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
    }
  };

  const handleMove = (e) => {
    if (!magnetic || reduced || variant === "link" || e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.18;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.25;
    el.style.transform = `translate(${x.toFixed(1)}px, ${(y - 2).toFixed(1)}px)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <button
      ref={ref}
      type="button"
      className={classes.filter(Boolean).join(" ")}
      onClick={handleClick}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      {...rest}
    >
      {children}
    </button>
  );
}