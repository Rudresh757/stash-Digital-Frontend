const ITEMS = [
  "Booked consults, not clicks",
  "USA",
  "Canada",
  "Australia",
  "20 held consults in 90 days or next month free",
  "Hyper-local Meta ads",
  "Medspas",
  "IV therapy",
  "Body contouring",
  "Dealerships",
];

const HALVES = [0, 1];
const REPEATS = [0, 1];

export default function Ticker() {
  return (
    <div className="ticker" role="region" aria-label="Highlights">
      <div className="ticker__track">
        {HALVES.map((half) => (
          <ul className="ticker__group" key={half}>
            {REPEATS.map((rep) =>
              ITEMS.map((text) => (
                <li
                  className="ticker__item"
                  key={`${half}-${rep}-${text}`}
                  aria-hidden={half > 0 || rep > 0 ? "true" : undefined}
                >
                  {text}
                </li>
              ))
            )}
          </ul>
        ))}
      </div>
    </div>
  );
}