import { SITE } from '../data';
import './MobileActionBar.css';

export default function MobileActionBar() {
  return (
    <nav className="mab" aria-label="Gyors műveletek">
      <a
        href={SITE.phoneHref}
        className="mab__btn"
        aria-label="Hívás – telefonos kapcsolat"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
        </svg>
        <span>Hívás</span>
      </a>

      <a
        href={SITE.googleMaps}
        target="_blank"
        rel="noopener noreferrer"
        className="mab__btn"
        aria-label="Útvonal – megnyitás Google Maps-en"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
          <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        <span>Útvonal</span>
      </a>

      <a
        href="#menu"
        className="mab__btn"
        aria-label="Étlap megtekintése"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
          <path d="M3 3h18M3 9h18M3 15h10"/>
        </svg>
        <span>Étlap</span>
      </a>

      <a
        href={SITE.phoneHref}
        className="mab__btn mab__btn--primary"
        aria-label="Asztalfoglalás – hívjon minket"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        <span>Foglalás</span>
      </a>
    </nav>
  );
}
