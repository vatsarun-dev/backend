/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── v2 short names ──────────────────────────────
        gold:          '#c8a84b',
        'gold-lt':     '#e8c96a',
        'gold-dk':     '#9a7a2e',
        mustard:       '#d4a017',
        'g-dark':      '#0d2218',
        'g-mid':       '#1a3a2a',
        'g-off':       '#2d5a3d',
        'br-dark':     '#2c1a0e',
        'br-mid':      '#4a2c1a',
        beige:         '#f0e6c8',
        'beige-dk':    '#d4c4a0',
        dwhite:        '#f5f0e8',
        bronze:        '#8c5e2a',
        'bronze-lt':   '#b8834a',
        ink:           '#1a1008',
        rust:          '#8b3a1a',
        crt:           '#00ff41',
        amber:         '#ffb000',

        // ── v1 long names (backward compat) ─────────────
        'old-gold':        '#c8a84b',
        'gold-light':      '#e8c96a',
        'gold-dark':       '#9a7a2e',
        'vintage-green':   '#1a3a2a',
        'dark-green':      '#0d2218',
        'office-green':    '#2d5a3d',
        'mustard-dark':    '#a67c00',
        'dark-brown':      '#2c1a0e',
        'brown-mid':       '#4a2c1a',
        'paper-beige':     '#f0e6c8',
        'paper-dark':      '#d4c4a0',
        'dirty-white':     '#f5f0e8',
        'bronze-light':    '#b8834a',
        'matte-black':     '#0a0a0a',
        'ink-black':       '#1a1008',
        'crt-green':       '#00ff41',
        'crt-amber':       '#ffb000',
      },
      fontFamily: {
        // v2
        cin:    ['"Playfair Display"', 'Georgia', 'serif'],
        stamp:  ['"Special Elite"', '"Courier New"', 'monospace'],
        type:   ['"Courier Prime"', '"Courier New"', 'monospace'],
        news:   ['"IM Fell English"', 'Georgia', 'serif'],
        mono:   ['"Share Tech Mono"', 'monospace'],
        // v1 aliases
        cinematic:  ['"Playfair Display"', 'Georgia', 'serif'],
        typewriter: ['"Courier Prime"', '"Courier New"', 'monospace'],
        newspaper:  ['"IM Fell English"', 'Georgia', 'serif'],
      },
      animation: {
        'fan':        'spin-cw 3s linear infinite',
        'fan-slow':   'spin-cw 6s linear infinite',
        'gear-cw':    'spin-cw 4s linear infinite',
        'gear-ccw':   'spin-ccw 3s linear infinite',
        'float':      'float 4s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shake':      'shake .5s ease-in-out',
        // v1 aliases
        'fan-spin':   'spin-cw 3s linear infinite',
        'glow-pulse': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        'spin-cw':    { to: { transform: 'rotate(360deg)' } },
        'spin-ccw':   { to: { transform: 'rotate(-360deg)' } },
        'float': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-12px)' },
        },
        'pulse-glow': {
          '0%,100%': { boxShadow: '0 0 10px #c8a84b,0 0 20px #c8a84b' },
          '50%':     { boxShadow: '0 0 20px #c8a84b,0 0 40px #c8a84b,0 0 60px #c8a84b' },
        },
        'shake': {
          '0%,100%': { transform: 'translate(0)' },
          '20%':     { transform: 'translate(-5px,-3px)' },
          '40%':     { transform: 'translate(5px,3px)' },
          '60%':     { transform: 'translate(-4px,2px)' },
          '80%':     { transform: 'translate(4px,-2px)' },
        },
      },
    },
  },
  plugins: [],
};
