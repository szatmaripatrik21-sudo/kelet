import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import './RotatingWords.css';

/* ── Crossfade rotator (mode="crossfade") ────────────────
   Simple opacity+translate fade. Never exposes partial words.
   Used in Hero on both desktop and mobile.
──────────────────────────────────────────────────────── */
function CrossfadeRotator({ texts, interval = 3400 }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const reduced = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    if (reduced.current) return;
    let swapTimer;
    const id = setInterval(() => {
      setVisible(false);
      swapTimer = setTimeout(() => {
        setIndex(i => (i + 1) % texts.length);
        setVisible(true);
      }, 360);
    }, interval);
    return () => { clearInterval(id); clearTimeout(swapTimer); };
  }, [texts.length, interval]);

  return (
    <span
      className="rw rw--crossfade"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="sr-only">{texts[index]}</span>
      <span
        aria-hidden="true"
        className={`rw__cf${visible ? ' rw__cf--in' : ' rw__cf--out'}`}
      >
        {texts[index]}
      </span>
    </span>
  );
}

/* ── unicode-safe character splitter (from reference) ── */
function splitIntoCharacters(text) {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const segmenter = new Intl.Segmenter('hu', { granularity: 'grapheme' });
    return Array.from(segmenter.segment(text), ({ segment }) => segment);
  }
  return Array.from(text);
}

/* ── timing constants ────────────────────────────────── */
const EXIT_MS   = 520; // wait for staggered exit to complete
const ENTER_MS  = 950; // wait for staggered enter to finish (set phase → idle)

/* ── Staggered character rotator (mode="stagger") ────────
   All hooks live here so they run unconditionally. The public
   `RotatingWords` wrapper below picks this or the crossfade variant
   WITHOUT calling hooks itself (keeps rules-of-hooks satisfied).
──────────────────────────────────────────────────────── */
const StaggerRotator = forwardRef(function StaggerRotator(
  {
    texts        = [],
    rotationInterval = 2600,
    staggerDuration  = 0.025,
    staggerFrom      = 'last',
    splitBy          = 'characters',
    auto             = true,
    loop             = true,
    className        = '',
    onNext,
  },
  ref
) {
  /* currentIndex  = logically current (used for interval math, aria) */
  /* displayIndex  = what is actually rendered (trails currentIndex during swap) */
  const [currentIndex, setCurrentIndex]   = useState(0);
  const [displayIndex, setDisplayIndex]   = useState(0);
  const [phase, setPhase]                 = useState('idle'); // 'idle' | 'exit' | 'enter'

  const phaseTimer = useRef(null);
  const autoTimer  = useRef(null);

  /* reduced-motion — read once at mount */
  const reducedMotion = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  /* ── build word/character structure (from reference) ── */
  const elements = useMemo(() => {
    const text = texts[displayIndex] ?? '';
    if (splitBy === 'characters') {
      return text.split(' ').map((word, i, arr) => ({
        characters: splitIntoCharacters(word),
        needsSpace: i !== arr.length - 1,
      }));
    }
    const sep   = splitBy === 'words' ? ' ' : splitBy === 'lines' ? '\n' : splitBy;
    const parts = text.split(sep);
    return parts.map((el, i) => ({
      characters: [el],
      needsSpace: i !== parts.length - 1,
    }));
  }, [texts, displayIndex, splitBy]);

  const totalChars = useMemo(
    () => elements.reduce((sum, w) => sum + w.characters.length, 0),
    [elements]
  );

  /* ── stagger delay calculator (from reference) ─────── */
  const getStaggerDelay = useCallback(
    (index) => {
      const total = totalChars;
      if (staggerFrom === 'first')  return index * staggerDuration;
      if (staggerFrom === 'last')   return (total - 1 - index) * staggerDuration;
      if (staggerFrom === 'center') return Math.abs(Math.floor(total / 2) - index) * staggerDuration;
      if (staggerFrom === 'random') return Math.floor(Math.random() * total) * staggerDuration;
      return Math.abs((typeof staggerFrom === 'number' ? staggerFrom : 0) - index) * staggerDuration;
    },
    [staggerFrom, staggerDuration, totalChars]
  );

  const handleIndexChange = useCallback(
    (newIndex) => {
      setCurrentIndex(newIndex);
      onNext?.(newIndex);
    },
    [onNext]
  );

  /* ── core transition logic ────────────────────────── */
  const triggerChange = useCallback(
    (nextIndex) => {
      if (nextIndex === currentIndex) return;
      clearTimeout(phaseTimer.current);

      if (reducedMotion.current) {
        /* simple opacity fade for reduced motion */
        setPhase('exit');
        phaseTimer.current = setTimeout(() => {
          setDisplayIndex(nextIndex);
          handleIndexChange(nextIndex);
          setPhase('enter');
          phaseTimer.current = setTimeout(() => setPhase('idle'), 250);
        }, 180);
        return;
      }

      setPhase('exit');
      phaseTimer.current = setTimeout(() => {
        setDisplayIndex(nextIndex);
        handleIndexChange(nextIndex);
        setPhase('enter');
        phaseTimer.current = setTimeout(() => setPhase('idle'), ENTER_MS);
      }, EXIT_MS);
    },
    [currentIndex, handleIndexChange]
  );

  /* ── navigation helpers (from reference) ─────────── */
  const next = useCallback(() => {
    const n =
      currentIndex === texts.length - 1
        ? loop ? 0 : currentIndex
        : currentIndex + 1;
    triggerChange(n);
  }, [currentIndex, texts.length, loop, triggerChange]);

  const previous = useCallback(() => {
    const n =
      currentIndex === 0
        ? loop ? texts.length - 1 : currentIndex
        : currentIndex - 1;
    triggerChange(n);
  }, [currentIndex, texts.length, loop, triggerChange]);

  const jumpTo = useCallback(
    (i) => triggerChange(Math.max(0, Math.min(i, texts.length - 1))),
    [texts.length, triggerChange]
  );

  const reset = useCallback(() => triggerChange(0), [triggerChange]);

  /* ── expose navigation via ref (from reference) ───── */
  useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }), [
    next,
    previous,
    jumpTo,
    reset,
  ]);

  /* ── auto-rotation interval (from reference) ──────── */
  useEffect(() => {
    if (!auto || reducedMotion.current) return;
    autoTimer.current = setInterval(next, rotationInterval);
    return () => clearInterval(autoTimer.current);
  }, [next, rotationInterval, auto]);

  /* ── cleanup ──────────────────────────────────────── */
  useEffect(
    () => () => {
      clearTimeout(phaseTimer.current);
      clearInterval(autoTimer.current);
    },
    []
  );

  /* ── render ───────────────────────────────────────── */
  return (
    <span className={`rw ${className}`} role="text" aria-label={texts[currentIndex]}>
      {/* screen-reader-only current text (from reference) */}
      <span className="sr-only">{texts[currentIndex]}</span>

      <span aria-hidden="true" className="rw__visual">
        {elements.map((wordObj, wordIndex, array) => {
          const prevCharsCount = array
            .slice(0, wordIndex)
            .reduce((sum, w) => sum + w.characters.length, 0);

          return (
            <span
              key={`${displayIndex}-w${wordIndex}`}
              className="rw__word"
            >
              {wordObj.characters.map((char, charIndex) => {
                const delay = getStaggerDelay(prevCharsCount + charIndex);
                return (
                  /* outer clip — overflow:hidden creates the slide window */
                  <span key={charIndex} className="rw__clip">
                    <span
                      className={`rw__char rw__char--${phase}`}
                      style={{ animationDelay: `${delay}s` }}
                    >
                      {char}
                    </span>
                  </span>
                );
              })}
              {wordObj.needsSpace && (
                <span className="rw__space">{' '}</span>
              )}
            </span>
          );
        })}
      </span>
    </span>
  );
});

/* ── Public wrapper ──────────────────────────────────────
   Branches by `mode` with no hooks of its own, so neither the
   conditional return nor the children's hooks break rules-of-hooks.
──────────────────────────────────────────────────────── */
const RotatingWords = forwardRef(function RotatingWords(
  {
    texts        = [],
    rotationInterval = 2600,
    staggerDuration  = 0.025,
    staggerFrom      = 'last',
    splitBy          = 'characters',
    auto             = true,
    loop             = true,
    className        = '',
    mode             = 'stagger',
    onNext,
  },
  ref
) {
  if (mode === 'crossfade') {
    return <CrossfadeRotator texts={texts} interval={rotationInterval} />;
  }
  return (
    <StaggerRotator
      ref={ref}
      texts={texts}
      rotationInterval={rotationInterval}
      staggerDuration={staggerDuration}
      staggerFrom={staggerFrom}
      splitBy={splitBy}
      auto={auto}
      loop={loop}
      className={className}
      onNext={onNext}
    />
  );
});

export default RotatingWords;
