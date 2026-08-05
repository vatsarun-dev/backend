import { useState, useEffect } from 'react';

/**
 * useParallax
 * Returns a style object with translateY/translateX based on scroll position.
 * `factor` controls how much it moves (0.1 = subtle, 0.5 = dramatic).
 */
export function useParallax(factor = 0.2) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handle = () => setOffset(window.scrollY);
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return {
    transform: `translateY(${offset * factor}px)`,
  };
}

/**
 * useMouseParallax
 * Returns x/y offsets based on mouse position for hero layers.
 */
export function useMouseParallax(strength = 20) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handle = (e) => {
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      setPos({
        x: ((e.clientX - cx) / cx) * strength,
        y: ((e.clientY - cy) / cy) * strength,
      });
    };
    window.addEventListener('mousemove', handle, { passive: true });
    return () => window.removeEventListener('mousemove', handle);
  }, [strength]);

  return pos;
}
