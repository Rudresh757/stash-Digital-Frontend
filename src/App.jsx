import { CalendlyProvider } from "./hooks/useCalendly.jsx";
import Ticker from "./components/Ticker.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import StatStrip from "./components/StatStrip.jsx";
import Problem from "./components/Problem.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import Offer from "./components/Offer.jsx";
import WhoWeHelp from "./components/WhoWeHelp.jsx";
import CaseStudy from "./components/CaseStudy.jsx";
import Faq from "./components/Faq.jsx";
import FinalCta from "./components/FinalCta.jsx";
import Footer from "./components/Footer.jsx";
import BackToTop from "./components/BackToTop.jsx";

export default function App() {
  return (
    <CalendlyProvider>
      <a className="skip-link" href="#main">Skip to content</a>
      <Ticker />
      <Navbar />
      <main id="main">
        <Hero />
        <StatStrip />
        <Problem />
        <HowItWorks />
        <Offer />
        <WhoWeHelp />
        <CaseStudy />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <BackToTop />
    </CalendlyProvider>
  );
}