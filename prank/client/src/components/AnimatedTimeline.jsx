import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROCESSING_MESSAGES } from '../utils/constants';

/* ── Printer feed visual ─────────────────────────────── */
function PrinterFeed({ active }) {
  return (
    <div className="relative mx-auto w-64 h-20 overflow-hidden">
      {/* printer body */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-dark-brown border-t-2 border-old-gold/40 rounded-sm z-10 flex items-center justify-center gap-2">
        <div className="w-3 h-3 rounded-full bg-bronze/60" />
        <div className="w-16 h-2 bg-ink-black border border-old-gold/20 rounded-sm" />
        <motion.div
          className="w-2 h-2 rounded-full"
          animate={active ? { backgroundColor: ['#ff3030', '#30ff60', '#ff3030'] } : { backgroundColor: '#555' }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>
      {/* paper strip feeding out */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 bg-dirty-white border border-paper-beige/60 z-20"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 60, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-2 space-y-1">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-1 bg-dark-brown/20 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${60 + Math.random() * 40}%` }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Progress bar ────────────────────────────────────── */
function ProgressBar({ progress }) {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-2">
        <span className="font-stamp text-[10px] text-old-gold/60 tracking-widest uppercase">Processing</span>
        <span className="font-mono text-crt-green text-xs">{Math.round(progress)}%</span>
      </div>
      <div className="h-3 bg-ink-black border border-old-gold/30 overflow-hidden">
        <motion.div
          className="h-full relative overflow-hidden"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #2d5a3d, #c8a84b, #d4a017)',
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {/* shimmer */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      </div>
      {/* tick marks */}
      <div className="flex justify-between mt-1">
        {[0, 25, 50, 75, 100].map(n => (
          <span key={n} className="font-mono text-[8px] text-old-gold/30">{n}</span>
        ))}
      </div>
    </div>
  );
}

/* ── Single message row ──────────────────────────────── */
function MessageRow({ msg, index, current }) {
  const state =
    index < current  ? 'done'
    : index === current ? 'active'
    : 'pending';

  return (
    <motion.div
      className={`flex items-center gap-4 py-3 px-4 border-l-2 transition-all duration-300 ${
        state === 'done'    ? 'border-old-gold/60 opacity-60'
        : state === 'active' ? 'border-crt-green bg-crt-green/5'
        : 'border-old-gold/10 opacity-30'
      }`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: state === 'pending' ? 0.3 : 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      {/* status icon */}
      <div className="w-6 h-6 flex items-center justify-center shrink-0">
        {state === 'done' && <span className="text-old-gold text-sm">✓</span>}
        {state === 'active' && (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="text-crt-green text-sm inline-block"
          >
            ⚙
          </motion.span>
        )}
        {state === 'pending' && <span className="text-old-gold/30 text-sm">○</span>}
      </div>

      {/* icon */}
      <span className="text-lg w-7 shrink-0">{msg.icon}</span>

      {/* text */}
      <span className={`font-typewriter text-sm ${
        state === 'active' ? 'text-crt-green' : 'text-paper-beige/70'
      }`}
        style={state === 'active' ? { textShadow: '0 0 6px rgba(0,255,65,0.5)' } : {}}
      >
        {state === 'active' ? <span className="typewriter-cursor">{msg.text}</span> : msg.text}
      </span>

      {/* timestamp */}
      {state !== 'pending' && (
        <span className="ml-auto font-mono text-[9px] text-old-gold/30 shrink-0">
          {new Date().toLocaleTimeString('en-IN', { hour12: false })}
        </span>
      )}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   ANIMATED TIMELINE
══════════════════════════════════════════════════════ */
export default function AnimatedTimeline({ active, onComplete }) {
  const [current,   setCurrent]  = useState(0);
  const [progress,  setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const timerRef                 = useRef(null);

  useEffect(() => {
    if (!active) return;
    setCurrent(0);
    setProgress(0);
    setCompleted(false);

    // advance through messages
    PROCESSING_MESSAGES.forEach((msg, i) => {
      timerRef.current = setTimeout(() => {
        setCurrent(i);
        setProgress(((i + 1) / PROCESSING_MESSAGES.length) * 100);
        if (i === PROCESSING_MESSAGES.length - 1) {
          setTimeout(() => {
            setCompleted(true);
            onComplete?.();
          }, 1200);
        }
      }, msg.delay);
    });

    return () => clearTimeout(timerRef.current);
  }, [active, onComplete]);

  if (!active) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[800] flex items-center justify-center bg-ink-black/95 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* film grain overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="w-full max-w-2xl mx-4">

        {/* header */}
        <motion.div className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="led-amber inline-block px-6 py-3 mb-4 font-mono text-lg tracking-widest">
            ⚙ PAISA DOUBLE YOJANA PROCESSING ⚙
          </div>
          <p className="font-stamp text-old-gold/50 text-xs tracking-widest uppercase">
            Please remain seated. Machine is warming up.
          </p>
        </motion.div>

        {/* progress bar */}
        <div className="mb-6">
          <ProgressBar progress={progress} />
        </div>

        {/* printer animation */}
        <div className="mb-6">
          <PrinterFeed active={!completed} />
        </div>

        {/* message list */}
        <div
          className="border border-old-gold/20 bg-ink-black/80 overflow-hidden"
          style={{ boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5)' }}
        >
          {/* terminal header */}
          <div className="bg-dark-brown/80 px-4 py-2 flex items-center gap-2 border-b border-old-gold/20">
            <div className="w-2 h-2 rounded-full bg-rust" />
            <div className="w-2 h-2 rounded-full bg-mustard" />
            <div className="w-2 h-2 rounded-full bg-office-green" />
            <span className="font-mono text-[10px] text-old-gold/40 ml-2 tracking-widest">
              WEALTH.EXE — Processing Log
            </span>
          </div>
          <div className="divide-y divide-old-gold/10 max-h-64 overflow-y-auto">
            {PROCESSING_MESSAGES.map((msg, i) => (
              <MessageRow key={i} msg={msg} index={i} current={current} />
            ))}
          </div>
        </div>

        {/* completion */}
        <AnimatePresence>
          {completed && (
            <motion.div
              className="text-center mt-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="inline-block border-2 border-old-gold px-8 py-3 bg-dark-green/30"
                style={{ boxShadow: '0 0 30px rgba(200,168,75,0.3)' }}
              >
                <p className="font-stamp text-old-gold text-sm tracking-[0.3em] uppercase">
                  ✦ Processing Complete ✦
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
