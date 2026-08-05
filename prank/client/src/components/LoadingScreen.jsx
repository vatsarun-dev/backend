import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTypewriter } from '../hooks/useTypewriter';
import { APP_NAME, TAGLINE } from '../utils/constants';

/* ── Projector film strip decoration ───────────────── */
function FilmStrip({ side }) {
  return (
    <div className={`absolute top-0 bottom-0 ${side === 'left' ? 'left-0' : 'right-0'} w-8 flex flex-col justify-around py-4 z-10`}>
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="w-5 h-3 mx-auto bg-transparent border border-paper-beige/10 rounded-sm" />
      ))}
    </div>
  );
}

/* ── Scanlines overlay ──────────────────────────────── */
function Scanlines() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-20 opacity-30"
      style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)',
      }}
    />
  );
}

/* ── Typewriter line ────────────────────────────────── */
function TypeLine({ text, speed = 55, startDelay = 0, className = '', showCursor = true }) {
  const { displayed, isDone } = useTypewriter(text, speed, startDelay);
  return (
    <span className={className}>
      {displayed}
      {!isDone && showCursor && <span className="typewriter-cursor" />}
      {isDone && showCursor && <span className="opacity-0">|</span>}
    </span>
  );
}

/* ── Main LoadingScreen ─────────────────────────────── */
export default function LoadingScreen({ onDone }) {
  const [phase, setPhase]       = useState(0);
  // phases: 0=black, 1=projector flicker, 2=title, 3=tagline, 4=sub, 5=disclaimer, 6=exit

  useEffect(() => {
    const timings = [
      600,   // → phase 1: projector flicker
      1400,  // → phase 2: show title
      3200,  // → phase 3: tagline
      5200,  // → phase 4: subtitle
      6800,  // → phase 5: disclaimer
      9000,  // → phase 6: exit
    ];
    const timers = timings.map((delay, i) =>
      setTimeout(() => setPhase(i + 1), delay)
    );
    // after exit animation fires onDone
    const doneTimer = setTimeout(onDone, 10400);
    return () => { timers.forEach(clearTimeout); clearTimeout(doneTimer); };
  }, [onDone]);

  return (
    <AnimatePresence>
      {phase < 6 && (
        <motion.div
          key="loading"
          className="fixed inset-0 z-[9998] bg-matte-black flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        >
          <FilmStrip side="left" />
          <FilmStrip side="right" />
          <Scanlines />

          {/* projector light cone */}
          {phase >= 1 && (
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[700px] pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.15, 0.08, 0.18, 0.12] }}
              transition={{ duration: 1.2, times: [0, 0.2, 0.4, 0.6, 1] }}
              style={{
                background: 'conic-gradient(from 90deg at 50% 0%, transparent 30%, rgba(240,230,200,0.15) 50%, transparent 70%)',
                filter: 'blur(8px)',
              }}
            />
          )}

          {/* dust particles in light */}
          {phase >= 1 && Array.from({ length: 18 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-paper-beige/40 pointer-events-none"
              style={{
                width:  `${1 + Math.random() * 3}px`,
                height: `${1 + Math.random() * 3}px`,
                left:   `${30 + Math.random() * 40}%`,
                top:    `${Math.random() * 60}%`,
              }}
              animate={{
                y:       [0, -60 - Math.random() * 40],
                x:       [0, (Math.random() - 0.5) * 30],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 4,
                delay:    Math.random() * 3,
                repeat:   Infinity,
                ease:     'easeOut',
              }}
            />
          ))}

          {/* main content */}
          <div className="relative z-30 text-center px-8 max-w-2xl">

            {/* government seal */}
            {phase >= 1 && (
              <motion.div
                className="mb-8 flex justify-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
              >
                <div className="w-20 h-20 rounded-full border-2 border-old-gold/60 flex items-center justify-center
                                bg-gradient-to-br from-dark-green to-ink-black shadow-lg"
                  style={{ boxShadow: '0 0 30px rgba(200,168,75,0.25), inset 0 0 20px rgba(0,0,0,0.5)' }}
                >
                  <span className="text-3xl select-none">⚖️</span>
                </div>
              </motion.div>
            )}

            {/* Title line */}
            {phase >= 2 && (
              <motion.div
                className="mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <p className="font-stamp text-old-gold/60 text-xs tracking-[0.3em] uppercase mb-3">
                  — Government Cinematic Division Presents —
                </p>
                <h1 className="font-cinematic text-4xl sm:text-5xl md:text-6xl font-black leading-tight">
                  <span className="gold-text">
                    <TypeLine
                      text={APP_NAME}
                      speed={80}
                      startDelay={0}
                      className="block"
                      showCursor={phase < 3}
                    />
                  </span>
                </h1>
              </motion.div>
            )}

            {/* Tagline */}
            {phase >= 3 && (
              <motion.div
                className="mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <p className="font-stamp text-mustard text-lg sm:text-xl tracking-wider">
                  <TypeLine
                    text={`"${TAGLINE}"`}
                    speed={60}
                    startDelay={0}
                    showCursor={phase < 4}
                  />
                </p>
              </motion.div>
            )}

            {/* Government approved line */}
            {phase >= 4 && (
              <motion.div
                className="mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="inline-block border-2 border-old-gold/50 px-6 py-2 bg-dark-green/40">
                  <p className="font-stamp text-old-gold text-sm tracking-[0.2em] uppercase">
                    ✦ &nbsp;Government Approved&nbsp; ✦
                  </p>
                </div>
              </motion.div>
            )}

            {/* Disclaimer */}
            {phase >= 5 && (
              <motion.p
                className="font-typewriter text-xs text-paper-beige/30 mt-6 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                * According to Internal Department (Committee of One Person)
              </motion.p>
            )}

            {/* loading bar */}
            {phase >= 2 && phase < 6 && (
              <motion.div
                className="mt-8 mx-auto w-48 h-[2px] bg-old-gold/20 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  className="h-full bg-old-gold"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 7, ease: 'linear' }}
                />
              </motion.div>
            )}
          </div>

          {/* bottom vintage text */}
          <div className="absolute bottom-6 left-0 right-0 text-center z-30">
            <p className="font-stamp text-[10px] text-paper-beige/20 tracking-widest uppercase">
              Shri Dhanlaxmi Financial Services Pvt. Ltd. · Est. 1998
            </p>
          </div>

          {/* corner ornaments */}
          {['top-4 left-8', 'top-4 right-8', 'bottom-4 left-8', 'bottom-4 right-8'].map(pos => (
            <div key={pos} className={`absolute ${pos} text-old-gold/20 text-lg pointer-events-none`}>✦</div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
