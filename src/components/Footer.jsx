import CalendlyButton from "./CalendlyButton.jsx";

const LINKS = [
  { href: "#how", label: "How it works" },
  { href: "#offer", label: "Offer" },
  { href: "#who", label: "Who we help" },
  { href: "#faq", label: "FAQ" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a href="#" className="nav__brand" aria-label="Stash Digital Media, back to top">
            <img src="/stash-logo.png" alt="" width="34" height="34" />
            <span>Stash Digital Media</span>
          </a>
          <p>© 2026 Stash Digital Media LLP</p>
          <p>Hyper-local Meta ads · USA · Canada · Australia</p>
        </div>

        <nav aria-label="Footer">
          <ul className="footer__links">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
            <li>
              <CalendlyButton variant="link">Book a call</CalendlyButton>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}