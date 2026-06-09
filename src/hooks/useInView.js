import { useEffect, useRef, useState } from 'react';

export function useInView(threshold = 0.1) {
  const ref = useRef(null);

  // Initialise to true immediately when reduced motion is preferred —
  // avoids calling setState synchronously inside the effect body.
  const [inView, setInView] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    if (inView) return; // already visible (reduced-motion or already triggered)

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, inView]);

  return [ref, inView];
}
