import { useEffect, useRef } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Traps Tab focus inside the returned ref while `active`, closes on Escape,
 * and restores focus to the previously focused element on deactivate.
 */
export default function useFocusTrap(active, onClose) {
  const ref = useRef(null);

  useEffect(() => {
    if (!active || !ref.current) return undefined;
    const node = ref.current;
    const previous = document.activeElement;
    const items = () => Array.from(node.querySelectorAll(FOCUSABLE));

    items()[0]?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose?.();
        return;
      }
      if (e.key !== "Tab") return;
      const list = items();
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      if (previous && previous.focus) previous.focus();
    };
  }, [active, onClose]);

  return ref;
}