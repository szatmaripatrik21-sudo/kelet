import { useInView } from '../hooks/useInView';
import { BRAND_CARDS } from '../data';
import './BrandStory.css';

export default function BrandStory() {
  const [headRef, headVisible] = useInView(0.15);
  const [gridRef, gridVisible] = useInView(0.1);

  return (
    <section className="story" id="story" aria-labelledby="story-title">
      <div className="story__inner container">

        <div
          ref={headRef}
          className={`story__head reveal${headVisible ? ' visible' : ''}`}
        >
          <span className="eyebrow">A hely</span>
          <h2 className="story__title" id="story-title">
            A Bartók kreatív nappalija
          </h2>
          <p className="story__copy">
            Kelet nem csak egy kávézó: könyvekkel teli találkozópont, galériatér
            és esti beszélgetések helye a Bartók Béla úton. Reggel specialty kávé
            és reggeli, napközben munka, olvasás és brunch, este borok,
            sütemények és hosszú asztali beszélgetések.
          </p>
        </div>

        <div ref={gridRef} className="story__grid">
          {BRAND_CARDS.map((card, i) => (
            <article
              key={i}
              className={`story__card reveal d${i + 1}${gridVisible ? ' visible' : ''}`}
            >
              <span className="story__card-num" aria-hidden="true">
                {card.eyebrow}
              </span>
              <div
                className="story__card-accent"
                style={{ background: card.accent }}
                aria-hidden="true"
              />
              <h3 className="story__card-title">{card.title}</h3>
              <p className="story__card-body">{card.body}</p>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
