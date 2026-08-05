/**
 * Random integer between min and max (inclusive)
 */
export const randInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Random float between min and max
 */
export const randFloat = (min, max) =>
  Math.random() * (max - min) + min;

/**
 * Clamp a value between min and max
 */
export const clamp = (val, min, max) =>
  Math.min(Math.max(val, min), max);

/**
 * Generate a random CSS colour from the vintage palette
 */
const PALETTE = ['#c8a84b', '#d4a017', '#8c5e2a', '#2d5a3d', '#9a7a2e', '#b8834a'];
export const randPaletteColor = () =>
  PALETTE[Math.floor(Math.random() * PALETTE.length)];

/**
 * Confetti piece data generator
 */
export function generateConfetti(count = 80) {
  const colors = ['#c8a84b', '#d4a017', '#2d5a3d', '#8c5e2a', '#e8c96a', '#f0e6c8', '#b8834a'];
  return Array.from({ length: count }, (_, i) => ({
    id:    i,
    color: colors[i % colors.length],
    left:  `${randFloat(0, 100)}vw`,
    size:  `${randInt(6, 14)}px`,
    delay: `${randFloat(0, 2)}s`,
    dur:   `${randFloat(2, 5)}s`,
    skew:  `skewX(${randInt(-20, 20)}deg)`,
  }));
}

/**
 * Floating money note positions
 */
export function generateMoneyNotes(count = 12) {
  return Array.from({ length: count }, (_, i) => ({
    id:     i,
    left:   `${randFloat(5, 95)}%`,
    top:    `${randFloat(10, 90)}%`,
    rotate: `${randInt(-20, 20)}deg`,
    scale:  randFloat(0.6, 1.4),
    delay:  `${randFloat(0, 4)}s`,
    dur:    `${randFloat(4, 8)}s`,
  }));
}

/**
 * Dust particle positions
 */
export function generateDustParticles(count = 30) {
  return Array.from({ length: count }, (_, i) => ({
    id:    i,
    left:  `${randFloat(0, 100)}%`,
    top:   `${randFloat(0, 100)}%`,
    size:  `${randFloat(1, 4)}px`,
    delay: `${randFloat(0, 8)}s`,
    dur:   `${randFloat(6, 14)}s`,
    opacity: randFloat(0.2, 0.7),
  }));
}

/**
 * Zero-pad number
 */
export const zeroPad = (n, width = 2) =>
  String(n).padStart(width, '0');

/**
 * Format currency (Indian style)
 */
export const formatINR = (n) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(n);
