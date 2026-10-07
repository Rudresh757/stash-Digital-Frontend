import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { PopupModal } from "react-calendly";
import { CALENDLY_URL, captureUtm } from "../lib/api.js";

const CalendlyContext = createContext(null);

export function CalendlyProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState({});
  const [root, setRoot] = useState(null);
  const timer = useRef(null);

  useEffect(() => {
    setRoot(document.getElementById("root"));
  }, []);

  const openCalendly = useCallback((data) => {
    if (data && (data.name || data.email)) {
      setPrefill({ name: data.name || "", email: data.email || "" });
    }
    setOpen(true);

    // Fallback: if the popup iframe never mounts, open the link in a new tab.
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (!document.querySelector(".calendly-popup iframe")) {
        setOpen(false);
        window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
      }
    }, 4000);
  }, []);

  const close = useCallback(() => {
    clearTimeout(timer.current);
    setOpen(false);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  const value = useMemo(
    () => ({ openCalendly, setPrefill, prefill }),
    [openCalendly, prefill]
  );

  return (
    <CalendlyContext.Provider value={value}>
      {children}
      {root && (
        <PopupModal
          url={CALENDLY_URL}
          rootElement={root}
          open={open}
          onModalClose={close}
          prefill={prefill}
          utm={captureUtm()}
          pageSettings={{
            backgroundColor: "141612",
            textColor: "f1f3ea",
            primaryColor: "c6ff3d",
            hideGdprBanner: true,
          }}
        />
      )}
    </CalendlyContext.Provider>
  );
}

export default function useCalendly() {
  const ctx = useContext(CalendlyContext);
  if (!ctx) throw new Error("useCalendly must be used inside <CalendlyProvider>");
  return ctx;
}