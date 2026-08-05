import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMouseParallax } from '../hooks/useParallax';
import { generateMoneyNotes, generateDustParticles } from '../utils/helpers';
import { APP_NAME, TAGLINE } from '../utils/constants';

const MONEY_NOTES = generateMoneyNotes(14);
const DUST        = generateDustParticles(25);

/* ── Ceiling Fan SVG ───────────────────────────────── */
function CeilingFan() {
  return (
    <div className="absolute top-2 left-1/2 -translate-x-1/2 pointer-events-none z-10 opacity-20">
      {/* rod */}
      <div className="w-1 h-16 bg-bronze/60 mx-auto" />
      {/* fan body */}
      <motion.div
        className="relative w-32 h-32 -mt-2"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: 'center center' }}
      >
        {/* 4 blades */}
        {[0, 90, 180, 270].map(deg => (
          <div
            key={deg}
            className="absolute top-1/2 left-1/2 origin-left"
            style={{ transform: `rotate(${deg}deg) translateY(-50%)` }}
          >
            <div
              className="w-14 h-5 rounded-full bg-dark-brown/80 border border-bronze/40"
              style={{
                borderRadius: '50% 80% 80% 50% / 50%',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.4)',
              }}
            />
          </div>
        ))}
        {/* hub */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-bronze border-2 border-gold-dark z-10" />
      </motion.div>
    </div>
  );
}

/* ── Money Note ─────────────────────────────────────── */
function FloatingNote({ note }) {
  return (
    <motion.div
      className="absolute money-note pointer-events-none select-none"
      style={{
        left:   note.left,
        top:    note.top,
        width:  `${60 * note.scale}px`,
        height: `${30 * note.scale}px`,
        rotate: note.rotate,
        zIndex: 5,
      }}
      animate={{
        y:      [0, -18, 0],
        rotate: [note.rotate, `${parseInt(note.rotate) + 6}deg`, note.rotate],
      }}
      transition={{
        duration: note.dur,
        delay:    note.delay,
        repeat:   Infinity,
        ease:     'easeInOut',
      }}
    />
  );
}

/* ── Light Ray ───────────────────────────────────────── */
function LightRay({ left, opacity, rotation, delay }) {
  return (
    <motion.div
      className="absolute top-0 pointer-events-none"
      style={{
        left,
        width:   '120px',
        height:  '100%',
        background: 'linear-gradient(180deg, rgba(200,168,75,0.12) 0%, transparent 80%)',
        transform: `rotate(${rotation}deg)`,
        transformOrigin: 'top center',
      }}
      animate={{ opacity: [opacity * 0.4, opacity, opacity * 0.6, opacity] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

/* ── Smoke Puff ──────────────────────────────────────── */
function SmokePuff({ left, delay }) {
  return (
    <motion.div
      className="absolute bottom-16 pointer-events-none rounded-full"
      style={{
        left,
        width:  '60px',
        height: '60px',
        background: 'radial-gradient(circle, rgba(200,168,75,0.06) 0%, transparent 70%)',
        filter: 'blur(8px)',
      }}
      animate={{
        y:       [0, -120],
        scale:   [1, 3],
        opacity: [0.5, 0],
      }}
      transition={{
        duration: 5,
        delay,
        repeat:   Infinity,
        ease:     'easeOut',
      }}
    />
  );
}

/* ── Background elements (office props) ─────────────── */
function OfficeProps() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Wall texture horizontal lines */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="absolute left-0 right-0 border-t border-paper-beige/[0.02]"
          style={{ top: `${14 + i * 14}%` }}
        />
      ))}

      {/* Left wall: calendar */}
      <div className="absolute left-6 sm:left-12 top-[22%] opacity-10">
        <div className="w-16 h-20 bg-dirty-white border border-paper-beige/30 flex flex-col">
          <div className="bg-rust h-5 flex items-center justify-center">
            <span className="font-stamp text-[8px] text-dirty-white">JANUARY</span>
          </div>
          <div className="flex-1 p-1 grid grid-cols-4 gap-px">
            {Array.from({ length: 28 }).map((_, i) => (
              <div key={i} className="aspect-square bg-paper-beige/20 text-[4px] flex items-center justify-center font-typewriter">
                {i + 1}
              </div>
            ))}
          </div>
          <div className="text-center font-stamp text-[7px] text-dark-brown bg-paper-beige/60 py-px">1999</div>
        </div>
      </div>

      {/* Right wall: telephone */}
      <div className="absolute right-8 sm:right-16 top-[20%] opacity-10">
        <div className="w-20 h-14 bg-dark-brown/80 rounded-sm border border-bronze/30 flex flex-col items-center justify-center gap-1">
          <div className="w-14 h-2 bg-bronze/60 rounded-full" />
          <div className="w-12 h-6 bg-bronze/40 rounded-sm grid grid-cols-3 gap-px p-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="bg-ink-black/60 rounded-sm" />
            ))}
          </div>
        </div>
      </div>

      {/* Clock */}
      <div className="absolute right-[15%] top-[8%] opacity-10">
        <div className="w-12 h-12 rounded-full border-2 border-bronze/60 bg-dirty-white/10 flex items-center justify-center relative">
          <div className="absolute w-px h-4 bg-dark-brown origin-bottom" style={{ transform: 'rotate(60deg)', bottom: '50%' }} />
          <div className="absolute w-px h-3 bg-dark-brown origin-bottom" style={{ transform: 'rotate(120deg)', bottom: '50%' }} />
          <div className="w-2 h-2 rounded-full bg-dark-brown" />
        </div>
      </div>

      {/* Tube light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-3 opacity-30 tube-light"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,200,0.8) 0%, rgba(255,255,200,0) 100%)',
          filter: 'blur(4px)',
          boxShadow: '0 0 40px 10px rgba(255,255,200,0.15)',
        }}
      />
    </div>
  );
}

/* ── Hero ────────────────────────────────────────────── */
export default function Hero({ onScrollDown }) {
  const ref               = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const mouse             = useMouseParallax(15);

  const bgY    = useTransform(scrollYProgress, [0, 1], ['0%',  '30%']);
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%',  '-15%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 120% 80% at 50% -10%, rgba(45,90,61,0.4) 0%, transparent 60%),
          radial-gradient(ellipse 60% 40% at 80% 50%, rgba(200,168,75,0.06) 0%, transparent 50%),
          linear-gradient(180deg, #0a0a0a 0%, #1a1008 40%, #0d2218 70%, #0a0a0a 100%)
        `,
      }}
    >
      {/* parallax background layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <OfficeProps />
      </motion.div>

      {/* Ceiling fan */}
      <CeilingFan />

      {/* Light rays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <LightRay left="20%"  opacity={0.4} rotation={-8}  delay={0} />
        <LightRay left="45%"  opacity={0.6} rotation={0}   delay={1.5} />
        <LightRay left="70%"  opacity={0.3} rotation={8}   delay={0.8} />
      </div>

      {/* Dust particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {DUST.map(d => (
          <motion.div
            key={d.id}
            className="absolute rounded-full bg-paper-beige"
            style={{
              left:    d.left,
              top:     d.top,
              width:   d.size,
              height:  d.size,
              opacity: d.opacity * 0.4,
            }}
            animate={{
              y:       [0, -80],
              x:       [0, (Math.random() - 0.5) * 30],
              opacity: [0, d.opacity * 0.4, 0],
            }}
            transition={{
              duration: d.dur,
              delay:    d.delay,
              repeat:   Infinity,
              ease:     'easeOut',
            }}
          />
        ))}
      </div>

      {/* Floating money notes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {MONEY_NOTES.map(n => <FloatingNote key={n.id} note={n} />)}
      </div>

      {/* Smoke puffs */}
      <SmokePuff left="25%" delay={0} />
      <SmokePuff left="55%" delay={2.5} />
      <SmokePuff left="75%" delay={1.2} />

      {/* Main content — mouse parallax */}
      <motion.div
        className="relative z-20 text-center px-4 sm:px-8 max-w-4xl"
        style={{ y: titleY, opacity }}
        animate={{
          x: mouse.x * 0.3,
          y: mouse.y * 0.3,
        }}
        transition={{ type: 'spring', stiffness: 80, damping: 20 }}
      >
        {/* top badge */}
        <motion.div
          className="mb-6 flex justify-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="gov-badge inline-flex items-center gap-2 px-5 py-2">
            <span className="text-old-gold text-xs">⭐</span>
            <span className="font-stamp text-old-gold text-[10px] tracking-[0.25em] uppercase">
              Government Approved Scheme · Since 1998
            </span>
            <span className="text-old-gold text-xs">⭐</span>
          </div>
        </motion.div>

        {/* main title */}
        <motion.h1
          className="font-cinematic font-black leading-none mb-4"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl gold-text"
            style={{ textShadow: '0 4px 30px rgba(200,168,75,0.3)' }}
          >
            Paisa
          </span>
          <span
            className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl gold-text"
            style={{ textShadow: '0 4px 30px rgba(200,168,75,0.3)' }}
          >
            Double
          </span>
          <span
            className="block text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-stamp text-mustard tracking-widest"
            style={{ textShadow: '0 2px 20px rgba(212,160,23,0.4)' }}
          >
            Yojana
          </span>
        </motion.h1>

        {/* tagline */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <div className="ornament-divider mb-4 mx-auto max-w-sm">
            <span className="font-stamp text-old-gold/40 text-xs">✦✦✦</span>
          </div>
          <p
            className="font-stamp text-xl sm:text-2xl md:text-3xl text-mustard tracking-wide"
            style={{ textShadow: '0 0 20px rgba(212,160,23,0.5)' }}
          >
            "{TAGLINE}"
          </p>
          <div className="ornament-divider mt-4 mx-auto max-w-sm">
            <span className="font-stamp text-old-gold/40 text-xs">✦✦✦</span>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <a
            href="#machine"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-old-gold text-ink-black font-stamp font-bold text-sm tracking-widest uppercase overflow-hidden transition-all duration-300 hover:bg-gold-light"
            style={{ boxShadow: '4px 4px 0 #9a7a2e, 0 0 30px rgba(200,168,75,0.3)' }}
          >
            <motion.span
              className="absolute inset-0 bg-white/10"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.4 }}
            />
            <span>💰</span>
            <span>Start Money Machine</span>
          </a>
          <a
            href="#intro"
            className="inline-flex items-center gap-2 px-6 py-4 border border-old-gold/50 text-old-gold font-stamp text-xs tracking-widest uppercase hover:border-old-gold hover:bg-old-gold/10 transition-all duration-300"
          >
            <span>Learn More</span>
            <span>↓</span>
          </a>
        </motion.div>

        {/* stats row */}
        <motion.div
          className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          {[
            { num: '21',     unit: 'Seconds', label: 'Doubling Time' },
            { num: '₹1',     unit: 'Only',    label: 'Investment' },
            { num: '100%',   unit: 'Guaranteed*', label: 'Results' },
          ].map(stat => (
            <div key={stat.label} className="text-center border-r border-old-gold/20 last:border-0 px-2">
              <div className="font-cinematic text-2xl sm:text-3xl text-old-gold font-black leading-none">{stat.num}</div>
              <div className="font-stamp text-[8px] text-mustard tracking-widest uppercase mt-1">{stat.unit}</div>
              <div className="font-stamp text-[9px] text-paper-beige/40 tracking-wide mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* scroll indicator */}
      <motion.button
        onClick={onScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-old-gold/40 hover:text-old-gold transition-colors group"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-label="Scroll down"
      >
        <span className="font-stamp text-[9px] tracking-widest uppercase">Scroll</span>
        <svg width="20" height="20" viewBox="0 0 20 20" className="opacity-60 group-hover:opacity-100">
          <path d="M10 3 L10 17 M4 11 L10 17 L16 11" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </motion.button>

      {/* bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #1a1008)' }}
      />
    </section>
  );
}
