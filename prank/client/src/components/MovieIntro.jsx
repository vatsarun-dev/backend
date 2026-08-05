import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { OFFICE_NAME, OFFICER, DEPT } from '../utils/constants';

/* ── Reveal line animation ──────────────────────────── */
const lineVariants = {
  hidden:  { opacity: 0, x: -40 },
  visible: (i) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.7, delay: i * 0.18, ease: [0.16, 1, 0.3, 1] },
  }),
};

/* ── Old monitor / CRT frame ────────────────────────── */
function OldMonitor({ children }) {
  return (
    <div className="relative mx-auto max-w-md">
      {/* monitor body */}
      <div
        className="relative rounded-sm overflow-hidden"
        style={{
          background: '#1a1a1a',
          border: '6px solid #2a2a2a',
          boxShadow: '0 0 0 2px #3a3a3a, 6px 6px 0 #111, 0 0 40px rgba(0,0,0,0.8)',
        }}
      >
        {/* CRT bezel */}
        <div
          className="absolute inset-0 rounded-sm pointer-events-none z-20"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.4) 100%)',
            boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5)',
          }}
        />
        {/* scanlines */}
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-20"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)',
          }}
        />
        {/* screen content */}
        <div className="relative z-30 bg-[#0a140a] p-6 min-h-[200px]">
          {children}
        </div>
      </div>
      {/* monitor stand */}
      <div className="mx-auto w-16 h-3 bg-[#2a2a2a] border-t border-[#3a3a3a]" />
      <div className="mx-auto w-24 h-2 bg-[#222]" />
    </div>
  );
}

/* ── Typewriter text in monitor ─────────────────────── */
function MonitorText() {
  return (
    <OldMonitor>
      <div className="font-mono text-crt-green text-xs leading-relaxed space-y-1">
        {[
          'C:\\PDY> INITIALISING SYSTEM...',
          'C:\\PDY> LOADING WEALTH.EXE...',
          'C:\\PDY> CONNECTING TO RAMPRASAD.NET...',
          'C:\\PDY> SCHEME VALIDATED: OK',
          'C:\\PDY> MONEY ENGINE: READY',
          'C:\\PDY> _',
        ].map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.5, duration: 0.1 }}
            style={{ textShadow: '0 0 6px #00ff41' }}
          >
            {line}
          </motion.div>
        ))}
      </div>
    </OldMonitor>
  );
}

/* ── File stack illustration ─────────────────────────── */
function FileStack() {
  return (
    <div className="relative w-20 h-24 mx-auto">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute w-full bg-dirty-white border border-paper-beige/60"
          style={{
            height: '72px',
            top:    `${i * 3}px`,
            left:   `${(i - 2) * 2}px`,
            transform: `rotate(${(i - 2) * 1.5}deg)`,
            boxShadow: '1px 1px 3px rgba(0,0,0,0.2)',
            zIndex: i,
          }}
        >
          <div className="mt-2 mx-2 space-y-1">
            {[...Array(4)].map((_, j) => (
              <div key={j} className="h-px bg-dark-brown/20" />
            ))}
          </div>
        </div>
      ))}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 bg-rust text-dirty-white font-stamp text-[7px] tracking-wider px-2 py-px"
        style={{ transform: 'translateX(-50%) rotate(-2deg)' }}
      >
        IMPORTANT
      </div>
    </div>
  );
}

/* ── MovieIntro ──────────────────────────────────────── */
export default function MovieIntro() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  const facts = [
    { icon: '🏛️', title: 'Est. 1998', desc: 'Founded in a single-room office in Chandni Chowk, Delhi — next to the samosa stall.' },
    { icon: '⚙️', title: 'The Machine', desc: 'Model K-47 money doubler. Hand-assembled by Ramprasad ji over three weekends.' },
    { icon: '📜', title: 'Certified', desc: 'Officially certified by the Internal Department (ourselves). Paperwork filed. Mostly.' },
    { icon: '💼', title: 'The Team', desc: 'Sri R.H. Chaturvedi (founder), one part-time peon, and a very experienced rubber stamp.' },
  ];

  return (
    <section id="intro" className="relative py-24 px-4 section-office-bg overflow-hidden">
      {/* top fade */}
      <div className="absolute top-0 inset-x-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #1a1008, transparent)' }} />

      {/* background filing cabinet lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="absolute left-0 right-0 border-t border-paper-beige"
            style={{ top: `${8 + i * 8}%` }} />
        ))}
      </div>

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">

        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-stamp text-old-gold/50 text-xs tracking-[0.4em] uppercase mb-3">
            Chapter One
          </p>
          <h2 className="font-cinematic text-4xl sm:text-5xl font-black gold-text mb-4">
            The Story Begins
          </h2>
          <div className="ornament-divider max-w-xs mx-auto">
            <span className="font-stamp text-old-gold/30 text-sm">◆</span>
          </div>
        </motion.div>

        {/* Two-column cinematic layout */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">

          {/* Left: story text */}
          <div className="space-y-5">
            {[
              { custom: 0, text: `It was 1998. India was changing. But ${OFFICE_NAME} had a different plan.` },
              { custom: 1, text: `In a small office with one ceiling fan, two chairs, and an optimistic attitude, ${OFFICER} had a vision.` },
              { custom: 2, text: 'A machine that could double your money. In 21 seconds. Certified by the Internal Department.' },
              { custom: 3, text: 'The government did not know about this. But that is fine. They were busy.' },
            ].map(({ custom, text }) => (
              <motion.p
                key={custom}
                className="font-newspaper text-paper-beige/80 text-base sm:text-lg leading-relaxed italic"
                custom={custom}
                variants={lineVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
              >
                {text}
              </motion.p>
            ))}

            <motion.div
              className="pt-4"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9 }}
            >
              <div className="inline-flex items-center gap-3 border-l-2 border-old-gold pl-4">
                <FileStack />
                <div>
                  <p className="font-stamp text-old-gold text-xs tracking-widest uppercase">Official Records</p>
                  <p className="font-typewriter text-paper-beige/50 text-xs mt-1">
                    {DEPT}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: old monitor */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <MonitorText />
            <p className="font-stamp text-center text-paper-beige/20 text-[10px] tracking-widest mt-3 uppercase">
              System Status: Operational (Mostly)
            </p>
          </motion.div>
        </div>

        {/* Fact cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {facts.map((fact, i) => (
            <motion.div
              key={fact.title}
              className="relative old-paper border border-old-gold/20 p-5 group overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
              whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }}
            >
              {/* corner fold */}
              <div className="absolute top-0 right-0 w-0 h-0"
                style={{
                  borderStyle: 'solid',
                  borderWidth: '0 16px 16px 0',
                  borderColor: `transparent rgba(200,168,75,0.3) transparent transparent`,
                }}
              />
              <div className="text-3xl mb-3">{fact.icon}</div>
              <h3 className="font-stamp text-dark-brown font-bold text-sm tracking-wide mb-2">
                {fact.title}
              </h3>
              <p className="font-typewriter text-dark-brown/70 text-xs leading-relaxed">
                {fact.desc}
              </p>
              {/* hover gold line */}
              <div className="absolute bottom-0 left-0 h-px bg-old-gold w-0 group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Cinematic quote */}
        <motion.blockquote
          className="mt-16 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="text-5xl text-old-gold/20 font-cinematic leading-none">"</div>
          <p className="font-newspaper text-xl sm:text-2xl italic text-paper-beige/60 leading-relaxed -mt-4">
            Paisa toh sabka double hoga.<br />
            <span className="text-base text-paper-beige/40">Thoda time lagega. Aur thoda trust.</span>
          </p>
          <div className="mt-4 font-stamp text-xs text-old-gold/40 tracking-widest uppercase">
            — Sri R.H. Chaturvedi, Founder &amp; Chief Machine Operator
          </div>
        </motion.blockquote>
      </div>

      {/* bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #1a1008, transparent)' }} />
    </section>
  );
}
