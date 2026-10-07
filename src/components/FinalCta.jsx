import Reveal from "./Reveal.jsx";
import CalendlyButton from "./CalendlyButton.jsx";
import CalendlyInline from "./CalendlyInline.jsx";
import LeadForm from "./LeadForm.jsx";

export default function FinalCta() {
  return (
    <section id="book" className="section final" aria-labelledby="final-title">
      <div className="container">
        <Reveal className="final__head">
          <p className="eyebrow">Limited spots per city</p>
          <h2 id="final-title">
            Ready for a <span className="lime">full calendar?</span>
          </h2>
          <p className="lead">
            Book a free 30-minute strategy call. We'll show you exactly how we'd fill your calendar,
            and whether we're the right fit.
          </p>
          <div className="final__cta">
            <CalendlyButton size="lg">Book your free strategy call →</CalendlyButton>
          </div>
        </Reveal>

        <div className="final__grid">
          <Reveal className="final__form">
            <LeadForm />
          </Reveal>
          <Reveal className="final__cal" delay={0.1}>
            <CalendlyInline />
          </Reveal>
        </div>
      </div>
    </section>
  );
}