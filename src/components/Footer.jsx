import { SITE, HOURS } from '../data';
import './Footer.css';

const NAV_LINKS = [
  { label: 'Hangulat', href: '#story' },
  { label: 'Étlap', href: '#menu' },
  { label: 'Galéria', href: '#gallery' },
  { label: 'Nyitvatartás', href: '#visit' },
  { label: 'Kapcsolat', href: '#visit' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" aria-label="Lábléc">
      <div className="footer__inner container">

        <div className="footer__brand">
          <p className="footer__name">{SITE.name}</p>
          <p className="footer__tagline">{SITE.tagline}</p>
        </div>

        <nav className="footer__nav" aria-label="Gyors navigáció">
          <p className="footer__col-label">Menü</p>
          <ul className="footer__nav-list">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="footer__nav-link">{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <address className="footer__contact">
          <p className="footer__col-label">Elérhetőség</p>
          <ul className="footer__contact-list">
            <li>
              <a
                href={SITE.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__contact-link"
              >
                {SITE.address}
              </a>
            </li>
            <li>
              <a href={SITE.phoneHref} className="footer__contact-link">
                {SITE.phone}
              </a>
            </li>
            <li>
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__contact-link"
              >
                Facebook
              </a>
            </li>
          </ul>
        </address>

        <div className="footer__hours">
          <p className="footer__col-label">Nyitvatartás</p>
          <dl className="footer__hours-list">
            {HOURS.map((h) => (
              <div key={h.days} className="footer__hours-row">
                <dt>{h.days}</dt>
                <dd>{h.hours}</dd>
              </div>
            ))}
          </dl>
        </div>

      </div>

      <div className="footer__bottom container">
        <p className="footer__copy">
          &copy; {year} {SITE.name}. Minden jog fenntartva.
        </p>
      </div>
    </footer>
  );
}
