import { useInView } from '../hooks/useInView';
import { SITE, HOURS } from '../data';
import './VisitSection.css';

export default function VisitSection() {
  const [ref, visible] = useInView(0.1);

  return (
    <section className="visit" id="visit" aria-labelledby="visit-title" ref={ref}>
      <div className="visit__inner container">

        {/* Left: info */}
        <div className={`visit__info reveal${visible ? ' visible' : ''}`}>
          <span className="eyebrow">Látogatás</span>
          <h2 className="visit__title" id="visit-title">
            Találkozzunk<br />a Bartókon
          </h2>

          <address className="visit__address">
            <a
              href={SITE.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="visit__address-link"
            >
              {SITE.address}
            </a>
          </address>

          <div className="visit__hours">
            <h3 className="visit__hours-label">Nyitvatartás</h3>
            <dl className="visit__hours-list">
              {HOURS.map((h) => (
                <div key={h.days} className="visit__hours-row">
                  <dt>{h.days}</dt>
                  <dd>{h.hours}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="visit__ctas">
            <a href={SITE.phoneHref} className="btn btn-primary">
              Asztalfoglalás
            </a>
            <a
              href={SITE.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              Útvonal Google Maps-en
            </a>
            <a href={SITE.phoneHref} className="btn btn-outline">
              Hívás
            </a>
          </div>

          <div className="visit__social">
            <a
              href={SITE.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="visit__social-link"
              aria-label="Kelet Facebook oldala"
            >
              Facebook
            </a>
          </div>
        </div>

        {/* Right: real interactive map */}
        <div className={`visit__map reveal d2${visible ? ' visible' : ''}`}>
          <div className="visit__map-card">
            <div className="visit__map-visual">
              <iframe
                title={`${SITE.name} a térképen — ${SITE.address}`}
                className="visit__map-frame"
                src="https://www.openstreetmap.org/export/embed.html?bbox=19.0476%2C47.4741%2C19.0556%2C47.4791&layer=mapnik&marker=47.4766%2C19.0516"
                loading="lazy"
              />
            </div>
            <a
              href={SITE.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="visit__map-cta"
              aria-label="Útvonal megnyitása Google Maps-en"
            >
              Megnyitás Google Maps-en →
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
