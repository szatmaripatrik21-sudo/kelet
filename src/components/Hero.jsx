import RotatingWords from './RotatingWords';
import FloatingMedia from './FloatingMedia';
import { SITE, TRUST_CHIPS } from '../data';
import './Hero.css';

const PHRASES = [
  '☕ Specialty kávé reggeltől estig',
  '🥐 Brunch, ami nem siet',
  '📚 Könyvek között lassul le az idő',
  '🍷 Esti borok és hosszú beszélgetések',
];

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true" />

      {/* Desktop: floating image cards — hidden on mobile via CSS */}
      <FloatingMedia />

      {/* Mobile-only: two image cards above the headline */}
      <div className="hero__mobile-imgs" aria-hidden="true">
        <div className="hero__mobile-img hero__mobile-img--a">
          <img
            src="/hero-01-exterior-sign.jpg"
            alt=""
            loading="eager"
            draggable="false"
          />
        </div>
        <div className="hero__mobile-img hero__mobile-img--b">
          <img
            src="/hero-03-coffee-latte.jpg"
            alt=""
            loading="eager"
            draggable="false"
          />
        </div>
      </div>

      {/* Centered content */}
      <div className="hero__content">
        <p className="hero__eyebrow">Ráday utca 14 · Budapest</p>

        <h1 className="hero__title" id="hero-title">
          <span>Kelet Kávézó</span>
          <em>és Galéria</em>
        </h1>

        <p className="hero__lead">
          Könyvek, kávé, brunch és esti borok a Bartókon.
        </p>

        <div className="hero__phrase-rotator">
          <RotatingWords
            texts={PHRASES}
            rotationInterval={3400}
            mode="crossfade"
          />
        </div>
        <p className="sr-only">{PHRASES[0]}</p>

        <p className="hero__subtitle">
          Egy nyugodt budai találkozóhely reggelihez, munkához,
          olvasáshoz és hosszú esti beszélgetésekhez.
        </p>

        <div className="hero__ctas">
          <a
            href={SITE.phoneHref}
            className="btn btn-primary"
            aria-label="Asztalfoglalás – hívjon minket"
          >
            Asztalfoglalás
          </a>
          <a href="#menu" className="btn btn-outline">
            Étlap megtekintése
          </a>
          <a
            href={SITE.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            aria-label="Útvonal Google Maps-en (új lapon nyílik)"
          >
            Útvonal
          </a>
        </div>

        <div className="hero__chips" aria-label="Jellemzők és értékelések">
          {TRUST_CHIPS.map((chip, i) => (
            <div key={i} className="hero__chip">
              <span className="hero__chip-label">{chip.label}</span>
              {chip.sub && (
                <span className="hero__chip-sub">{chip.sub}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span className="hero__scroll-line" />
      </div>
    </section>
  );
}
