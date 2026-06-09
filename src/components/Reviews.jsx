import { useInView } from '../hooks/useInView';
import { REVIEWS, SITE } from '../data';
import './Reviews.css';



export default function Reviews() {
  const [ref, visible] = useInView(0.1);

  return (
    <section className="reviews" id="reviews" aria-labelledby="reviews-title" ref={ref}>
      <div className="container">

        <header className={`reviews__head reveal${visible ? ' visible' : ''}`}>
          <span className="eyebrow">Vendégvélemények</span>
          <h2 className="reviews__title" id="reviews-title">
            A vendégek a hangulat miatt maradnak
          </h2>
          <div className="reviews__meta" aria-label={`${SITE.rating} csillag, ${SITE.reviewCount} értékelés`}>
            <span className="reviews__rating">{SITE.rating}</span>
            <span className="reviews__stars" aria-hidden="true">★★★★★</span>
            <span className="reviews__count">{SITE.reviewCount} Google értékelés alapján</span>
          </div>
        </header>

        <div className="reviews__grid">
          {REVIEWS.map((r, i) => (
            <blockquote
              key={i}
              className={`reviews__card reveal d${i + 1}${visible ? ' visible' : ''}`}
            >
              <span className="reviews__mark" aria-hidden="true">"</span>
              <p className="reviews__text">{r.text}</p>
              <footer className="reviews__footer">
                <span className="reviews__stars-sm" aria-hidden="true">★★★★★</span>
                <cite className="reviews__source">{r.source}</cite>
              </footer>
            </blockquote>
          ))}
        </div>

        {/* Conversion CTA */}
        <div className={`reviews__cta reveal d4${visible ? ' visible' : ''}`}>
          <p className="reviews__cta-copy">
            Foglaljon asztalt — vagy csak nézzen be egy kávéra.
          </p>
          <div className="reviews__cta-btns">
            <a
              href={SITE.phoneHref}
              className="btn btn-primary"
              aria-label="Asztalfoglalás telefonon"
            >
              Asztalfoglalás
            </a>
            <a
              href={SITE.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              aria-label="Útvonal Google Maps-en"
            >
              Útvonal
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
