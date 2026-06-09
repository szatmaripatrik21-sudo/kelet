import { useEffect, useRef, useState, useCallback } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import './FloatingMedia.css';

const CARDS = [
  {
    id: 1,
    label: 'Kelet terasz',
    sublabel: 'Ráday utca 14',
    src: '/hero-01-exterior-sign.jpg',
    objectPosition: 'center center',
    gradient: 'linear-gradient(145deg, #C75B22 10%, #E09050 60%, #F5C97E 100%)',
    rotation: -10,
    depth: 0.6,
    floatDuration: 7.2,
    floatDelay: 0.2,
    enterDelay: 0.45,
  },
  {
    id: 2,
    label: 'Könyves belső',
    sublabel: 'Galéria & olvasás',
    src: '/hero-02-book-wall-interior.jpg',
    objectPosition: 'center center',
    gradient: 'linear-gradient(160deg, #3B1E10 0%, #7A4B2E 55%, #B07850 100%)',
    rotation: -3,
    depth: 0.4,
    floatDuration: 9.0,
    floatDelay: 1.4,
    enterDelay: 0.6,
  },
  {
    id: 3,
    label: 'Specialty kávé',
    sublabel: 'Flat white & matcha',
    src: '/hero-03-coffee-latte.jpg',
    objectPosition: 'center 15%',
    gradient: 'linear-gradient(135deg, #E8D0B0 0%, #C4956A 40%, #8B5A38 100%)',
    rotation: 6,
    depth: 1.0,
    floatDuration: 8.0,
    floatDelay: 0.8,
    enterDelay: 0.75,
  },
  {
    id: 4,
    label: 'Brunch & reggeli',
    sublabel: 'Vegetáriánus fogások',
    src: '/hero-04-brunch-plate.jpg',
    objectPosition: 'center center',
    gradient: 'linear-gradient(150deg, #8B9970 0%, #C5C89E 45%, #E8E0C0 100%)',
    rotation: -4,
    depth: 1.2,
    floatDuration: 7.6,
    floatDelay: 2.0,
    enterDelay: 0.9,
  },
  {
    id: 5,
    label: 'Esti hangulat',
    sublabel: 'Borok & sütemények',
    src: '/hero-05-evening-gallery.png',
    objectPosition: 'center center',
    gradient: 'linear-gradient(145deg, #2A1018 0%, #6B3050 40%, #C0604A 80%, #E08040 100%)',
    rotation: 15,
    depth: 1.5,
    floatDuration: 8.8,
    floatDelay: 1.6,
    enterDelay: 1.05,
  },
];

export default function FloatingMedia() {
  const containerRef = useRef(null);
  const reduced = useReducedMotion();
  const [expandedId, setExpandedId] = useState(null);

  /* pointer parallax */
  useEffect(() => {
    if (reduced) return;
    let isMobile = window.innerWidth < 768;
    const onResize = () => { isMobile = window.innerWidth < 768; };
    window.addEventListener('resize', onResize, { passive: true });

    const container = containerRef.current;
    if (!container) return;

    let rafId;
    let tx = 0, ty = 0;

    const onMove = (e) => {
      if (isMobile) return;
      tx = e.clientX / window.innerWidth  - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
    };

    const tick = () => {
      if (!isMobile) {
        container.querySelectorAll('.fm__parallax').forEach((el) => {
          const depth = parseFloat(el.dataset.depth ?? 1);
          el.style.transform = `translate(${tx * depth * 18}px, ${ty * depth * 18}px)`;
        });
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
    };
  }, [reduced]);

  /* click-outside + Escape to collapse */
  useEffect(() => {
    if (!expandedId) return;

    const onKey = (e) => {
      if (e.key === 'Escape') setExpandedId(null);
    };
    const onClickOutside = (e) => {
      if (!e.target.closest('.fm__card')) setExpandedId(null);
    };

    window.addEventListener('keydown', onKey);
    /* Use setTimeout so this listener doesn't fire on the same click that opened the card */
    const t = setTimeout(() => {
      window.addEventListener('click', onClickOutside);
    }, 0);

    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('click', onClickOutside);
      clearTimeout(t);
    };
  }, [expandedId]);

  const handleCardClick = useCallback((id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const expandedCard = CARDS.find((c) => c.id === expandedId);

  return (
    <>
      <div
        className={`fm${expandedId ? ' fm--has-expanded' : ''}`}
        ref={containerRef}
      >
        {CARDS.map((card) => {
          const isExpanded = expandedId === card.id;
          return (
            <div
              key={card.id}
              className={`fm__card-wrap fm__card-wrap--${card.id}${isExpanded ? ' fm__card-wrap--expanded' : ''}`}
              style={{
                '--rotation':    `${card.rotation}deg`,
                '--float-dur':   `${card.floatDuration}s`,
                '--float-delay': `${card.floatDelay}s`,
                '--enter-delay': `${card.enterDelay}s`,
              }}
            >
              <div className={`fm__float${reduced ? ' fm__float--reduced' : ''}`}>
                <div className="fm__parallax" data-depth={card.depth}>
                  <div
                    className="fm__card"
                    style={!card.src ? { background: card.gradient } : undefined}
                    onClick={() => handleCardClick(card.id)}
                    role="button"
                    tabIndex={0}
                    aria-label={`${card.label} — nagyítás`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleCardClick(card.id);
                      }
                    }}
                  >
                    {card.src ? (
                      <img
                        src={card.src}
                        alt={card.label}
                        className="fm__img"
                        loading="eager"
                        draggable="false"
                        style={{ objectPosition: card.objectPosition }}
                      />
                    ) : (
                      <div className="fm__fallback-label">
                        <span className="fm__fallback-title">{card.label}</span>
                        <span className="fm__fallback-sub">{card.sublabel}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox overlay */}
      {expandedCard && (
        <div
          className="fm__lightbox"
          onClick={() => setExpandedId(null)}
          role="dialog"
          aria-modal="true"
          aria-label={expandedCard.label}
        >
          <button
            className="fm__lightbox-close"
            onClick={() => setExpandedId(null)}
            aria-label="Bezárás"
          >✕</button>
          <div className="fm__lightbox-inner" onClick={(e) => e.stopPropagation()}>
            {expandedCard.src ? (
              <img
                src={expandedCard.src}
                alt={expandedCard.label}
                className="fm__lightbox-img"
                draggable="false"
                style={{ objectPosition: expandedCard.objectPosition }}
              />
            ) : (
              <div className="fm__lightbox-gradient" style={{ background: expandedCard.gradient }} />
            )}
            <div className="fm__lightbox-caption">
              <span className="fm__lightbox-title">{expandedCard.label}</span>
              <span className="fm__lightbox-sub">{expandedCard.sublabel}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
