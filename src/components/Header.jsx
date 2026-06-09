import { useState, useEffect } from 'react';
import { SITE } from '../data';
import './Header.css';

const NAV = [
  { label: 'Rólunk', href: '#story' },
  { label: 'Étlap', href: '#menu' },
  { label: 'Hangulat', href: '#gallery' },
  { label: 'Látogatás', href: '#visit' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className={`hdr${scrolled ? ' hdr--solid' : ''}${open ? ' hdr--open' : ''}`}>
      <div className="hdr__bar container">
        <a href="#" className="hdr__logo" aria-label="Kelet — főoldal">
          <span className="hdr__logo-name">{SITE.shortName}</span>
          <span className="hdr__logo-tag">{SITE.tagline}</span>
        </a>

        <nav className="hdr__nav" aria-label="Főnavigáció">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="hdr__link">
              {n.label}
            </a>
          ))}
        </nav>

        <a href={SITE.phoneHref} className="hdr__cta btn btn-primary">
          Asztalfoglalás
        </a>

        <button
          className={`hdr__burger${open ? ' hdr__burger--open' : ''}`}
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Menü"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Full-screen mobile drawer */}
      <nav
        className={`hdr__drawer${open ? ' hdr__drawer--open' : ''}`}
        aria-label="Mobil navigáció"
      >
        {NAV.map((n) => (
          <a
            key={n.href}
            href={n.href}
            className="hdr__drawer-link"
            onClick={() => setOpen(false)}
          >
            {n.label}
          </a>
        ))}
        <a
          href={SITE.phoneHref}
          className="btn btn-primary hdr__drawer-cta"
          onClick={() => setOpen(false)}
        >
          Asztalfoglalás
        </a>
        <div className="hdr__drawer-meta">
          <span>{SITE.address}</span>
          <span>Nyitva 7:30-tól</span>
        </div>
      </nav>
    </header>
  );
}
