import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { MENU_CATEGORIES, SITE } from '../data';
import './MenuHighlights.css';

export default function MenuHighlights() {
  const [active, setActive] = useState(0);
  const [headRef, headVisible] = useInView(0.1);

  const cat = MENU_CATEGORIES[active];

  return (
    <section className="menu" id="menu" aria-labelledby="menu-title">
      <div className="menu__inner container">

        <header
          ref={headRef}
          className={`menu__head reveal${headVisible ? ' visible' : ''}`}
        >
          <span className="eyebrow">Étlap</span>
          <h2 className="menu__title" id="menu-title">
            Étlap, ami nappal és este is működik
          </h2>
          <p className="menu__subtitle">
            Kávék, brunch, vegetáriánus fogások, sütemények, borok és frissítők
            egy meleg, könyves térben.
          </p>
        </header>

        {/* Tab bar */}
        <div className="menu__tabs" role="tablist" aria-label="Étlap kategóriák">
          {MENU_CATEGORIES.map((c, i) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={active === i}
              aria-controls="menu-panel"
              className={`menu__tab${active === i ? ' menu__tab--active' : ''}`}
              onClick={() => setActive(i)}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Items */}
        <div
          id="menu-panel"
          role="tabpanel"
          aria-label={cat.label}
          className="menu__panel"
          key={cat.id}
        >
          <div className="menu__grid">
            {cat.items.map((item) => (
              <div key={item.name} className="menu__item">
                <span className="menu__item-name">{item.name}</span>
                <span className="menu__item-dots" aria-hidden="true" />
                <span className="menu__item-price">{item.price}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="menu__footer">
          <p className="menu__note">
            Az árak tájékoztató jellegűek. Allergiás információkért kérdezze személyzetünket.
          </p>
          <div className="menu__footer-btns">
            <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
              Teljes étlap
            </a>
            <a
              href={SITE.phoneHref}
              className="btn btn-primary"
              aria-label="Asztalfoglalás telefonon"
            >
              Asztalfoglalás
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
