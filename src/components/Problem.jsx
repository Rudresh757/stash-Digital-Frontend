import Reveal from "./Reveal.jsx";

const PAINS = [
  {
    title: "Leads that never pick up",
    text: "Form fills come in at 11pm and nobody calls them until the next afternoon. By then they've booked somewhere else.",
  },
  {
    title: "Price shoppers, not buyers",
    text: "Broad targeting brings people from three cities away who only wanted to know the price.",
  },
  {
    title: "Your front desk is busy",
    text: "Your team is serving patients and customers in the store. Chasing cold leads is the first thing that gets dropped.",
  },
  {
    title: 'Agencies that report "reach"',
    text: "You get a monthly PDF full of impressions and CPMs. What you wanted was a number of booked appointments.",
  },
];

export default function Problem() {
  return (
    <section className="section problem" aria-labelledby="problem-title">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Sound familiar?</p>
          <h2 id="problem-title">
            Your ads get clicks. <span className="lime">Your calendar</span> stays empty.
          </h2>
        </Reveal>

        <ul className="cards cards--4">
          {PAINS.map((p, i) => (
            <Reveal as="li" className="card" key={p.title} delay={i * 0.08}>
              <span className="card__index" aria-hidden="true">
                0{i + 1}
              </span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}