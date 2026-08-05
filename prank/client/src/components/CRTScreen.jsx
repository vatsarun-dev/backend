import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * CRTScreen
 * Wraps children in an old CRT monitor shell.
 * Props:
 *   glitch   — boolean, activates glitch animation
 *   children — screen content
 *   className — extra classes for the screen area
 */
export default function CRTScreen({ children, glitch = false, className = '' }) {
  const [flicker, setFlicker] = useState(false);

  // random subtle flicker
  useEffect(() => {
    const id = setInterval(() => {
      if (Math.random() < 0.08) {
        setFlicker(true);
        setTimeout(() => setFlicker(false), 80 + Math.random() * 120);
      }
    }, 800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative inline-block w-full">
      {/* monitor outer shell */}
      <div
        className="relative rounded-sm overflow-hidden"
        style={{
          background: '#1c1c1c',
          border: '8px solid #242424',
          boxShadow: '0 0 0 2px #3a3a3a, 8px 8px 0 #111, 0 0 60px rgba(0,0,0,0.8)',
          borderRadius: '4px 4px 8px 8px',
        }}
      >
        {/* brand label */}
        <div className="absolute bottom-1 right-3 font-stamp text-[7px] text-white/10 tracking-widest select-none z-40">
          VIDEOCON VDT-21
        </div>

        {/* CRT curvature vignette */}
        <div
          className="absolute inset-0 rounded-sm pointer-events-none z-30"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)',
            boxShadow: 'inset 0 0 40px rgba(0,0,0,0.4)',
          }}
        />

        {/* scanlines */}
        <div
          className="absolute inset-0 pointer-events-none z-20 opacity-25"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.6) 2px, rgba(0,0,0,0.6) 4px)',
          }}
        />

        {/* moving scan line */}
        <motion.div
          className="absolute left-0 right-0 h-8 pointer-events-none z-20"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,255,65,0.04), transparent)' }}
          animate={{ top: ['-5%', '110%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />

        {/* flicker overlay */}
        {flicker && (
          <div className="absolute inset-0 bg-white/[0.03] pointer-events-none z-25" />
        )}

        {/* glitch bars */}
        {glitch && (
          <>
            <motion.div
              className="absolute left-0 right-0 h-2 bg-crt-green/10 pointer-events-none z-25"
              animate={{ top: ['10%', '80%', '30%', '60%'] }}
              transition={{ duration: 0.2, repeat: Infinity }}
            />
            <motion.div
              className="absolute left-0 right-0 h-1 bg-old-gold/15 pointer-events-none z-25"
              animate={{ top: ['60%', '20%', '70%', '10%'] }}
              transition={{ duration: 0.15, repeat: Infinity }}
            />
          </>
        )}

        {/* screen content */}
        <motion.div
          className={`relative z-10 bg-[#060c06] min-h-[120px] ${className}`}
          animate={glitch ? {
            x: [0, -3, 3, -2, 2, 0],
            filter: ['hue-rotate(0deg)', 'hue-rotate(30deg)', 'hue-rotate(-20deg)', 'hue-rotate(0deg)'],
          } : {}}
          transition={glitch ? { duration: 0.3, repeat: Infinity } : {}}
        >
          {children}
        </motion.div>
      </div>

      {/* monitor base */}
      <div className="mx-auto w-20 h-3 bg-[#1c1c1c] border-t border-[#3a3a3a]" />
      <div className="mx-auto w-32 h-4 bg-[#161616] rounded-b-sm border border-[#2a2a2a]" />
    </div>
  );
}
