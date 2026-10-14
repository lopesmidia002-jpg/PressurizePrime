import { useEffect, useRef, useState } from 'react';

/** true quando o elemento chega a `margin` da área visível (só dispara uma vez). Usado para adiar
 *  imagens de fundo em CSS, que não aceitam loading="lazy". */
export const useNearViewport = <T extends Element>(margin = '400px') => {
  const ref = useRef<T>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    if (typeof IntersectionObserver === 'undefined') {
      setNear(true);
      return;
    }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) {
        setNear(true);
        observer.disconnect();
      }
    }, { rootMargin: margin });
    observer.observe(el);
    return () => observer.disconnect();
  }, [margin, near]);

  return [ref, near] as const;
};
