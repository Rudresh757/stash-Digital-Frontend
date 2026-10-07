import { motion } from "framer-motion";
import { VSL_URL } from "../lib/api.js";
import useReducedMotion from "../hooks/useReducedMotion.js";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const TIMES = ["9:00", "10:30", "12:00", "1:30", "3:00", "4:30"];
// Decorative pattern only: cell index = row * 5 + column.
const BOOKED = [1, 2, 4, 6, 8, 9, 11, 13, 15, 16, 18, 21, 22, 24, 26, 28];
const RANK = Object.fromEntries(BOOKED.map((cell, i) => [cell, i]));

function CalendarVisual() {
  const reduced = useReducedMotion();

  return (
    <div
      className="cal-visual"
      role="img"
      aria-label="Illustration: a weekly calendar filling up with booked consultations"
    >
      <div className="cal-visual__bar">
        <span>Your calendar</span>
        <span>Week view</span>
      </div>
      <div className="cal-visual__grid">
        <span />
        {DAYS.map((d) => (
          <span key={d} className="cal-visual__day">
            {d}
          </span>
        ))}
        {TIMES.map((time, r) => (
          <div className="cal-visual__row" key={time}>
            <span className="cal-visual__time">{time}</span>
            {DAYS.map((d, c) => {
              const i = r * DAYS.length + c;
              const isBooked = i in RANK;
              return isBooked ? (
                <motion.div
                  key={d}
                  className="cal-visual__slot cal-visual__slot--booked"
                  initial={{ backgroundColor: "#1b1e18", color: "#1b1e18" }}
                  animate={{ backgroundColor: "#c6ff3d", color: "#0b0c0a" }}
                  transition={{
                    delay: reduced ? 0 : 0.5 + RANK[i] * 0.12,
                    duration: reduced ? 0 : 0.35,
                  }}
                >
                  Booked
                </motion.div>
              ) : (
                <div key={d} className="cal-visual__slot" />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function VslSlot() {
  return (
    <figure className="vsl">
      <div className="vsl__frame">
        {VSL_URL ? (
          <video
            className="vsl__video"
            src={VSL_URL}
            controls
            playsInline
            preload="metadata"
            aria-label="Watch: how we book 20 consults in 90 days"
          >
            {/* [PLACEHOLDER] add a captions <track> once the video exists */}
          </video>
        ) : (
          <>
            <CalendarVisual />
            <span className="vsl__badge">Video coming soon · 3 min</span>
          </>
        )}
      </div>
      <figcaption className="vsl__caption">
        <strong>Watch: how we book 20 consults in 90 days</strong>
        <span>Watch before you book your call</span>
      </figcaption>
    </figure>
  );
}