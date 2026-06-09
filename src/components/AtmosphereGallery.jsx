import { useInView } from '../hooks/useInView';
import { GALLERY_CARDS } from '../data';
import './AtmosphereGallery.css';

export default function AtmosphereGallery() {
  const [headRef, headVisible] = useInView(0.15);
  const [gridRef, gridVisible] = useInView(0.08);

  return (
    <section className="gallery" id="gallery" aria-labelledby="gallery-title">
      <div className="container">

        <header
          ref={headRef}
          className={`gallery__head reveal${headVisible ? ' visible' : ''}`}
        >
          <span className="eyebrow" style={{ color: 'rgba(233,164,58,0.8)' }}>Hangulat</span>
          <h2 className="gallery__title" id="gallery-title">
            Kávézó, galéria,<br />találkozóhely
          </h2>
        </header>

        <div ref={gridRef} className="gallery__grid">
          {GALLERY_CARDS.map((card, i) => (
            <article
              key={i}
              className={`gallery__card gallery__card--${i + 1} reveal d${Math.min(i + 1, 5)}${gridVisible ? ' visible' : ''}`}
              style={{ background: card.gradient }}
            >
              {card.img && (
                <img
                  src={card.img}
                  alt={`${card.label} — ${card.sublabel}`}
                  className="gallery__card-img"
                  loading="lazy"
                  decoding="async"
                />
              )}
              <div className="gallery__card-overlay" />
              <footer className="gallery__card-info">
                <h3 className="gallery__card-label">{card.label}</h3>
                <p className="gallery__card-sub">{card.sublabel}</p>
              </footer>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
