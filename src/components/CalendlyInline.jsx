import { lazy, Suspense, useEffect, useRef, useState } from "react";
import useCalendly from "../hooks/useCalendly.jsx";
import { CALENDLY_URL, captureUtm } from "../lib/api.js";

const InlineWidget = lazy(() =>
  import("react-calendly").then((m) => ({ default: m.InlineWidget }))
);

export default function CalendlyInline({ height = 720 }) {
  const { prefill } = useCalendly();
  const holder = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = holder.current;
    if (!el) return undefined;
    if (!("IntersectionObserver" in window)) {
      setShow(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={holder} className="cal-inline" style={{ minHeight: height }}>
      {show ? (
        <Suspense fallback={<p className="cal-inline__status">Loading calendar…</p>}>
          <InlineWidget
            url={CALENDLY_URL}
            prefill={prefill}
            utm={captureUtm()}
            pageSettings={{
              backgroundColor: "141612",
              textColor: "f1f3ea",
              primaryColor: "c6ff3d",
              hideGdprBanner: true,
            }}
            styles={{ height: `${height}px`, minWidth: "300px" }}
          />
        </Suspense>
      ) : (
        <p className="cal-inline__status">Loading calendar…</p>
      )}
      <p className="cal-inline__fallback">
        Calendar not loading?{" "}
        <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
          Open it in a new tab
        </a>
        .
      </p>
    </div>
  );
}