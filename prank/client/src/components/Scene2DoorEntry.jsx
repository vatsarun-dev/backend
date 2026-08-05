import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { playDoorBell, resumeAudio } from '../utils/sounds';

/**
 * SCENE 2: DOOR ENTRY
 * Door opens, bell rings, walk into reception area
 */
export default function Scene2DoorEntry({ onComplete }) {
  const [doorOpen, setDoorOpen] = useState(false);

  useEffect(() => {
    resumeAudio();
    
    // Door opens after delay
    const timer = setTimeout(() => {
      setDoorOpen(true);
      playDoorBell();
    }, 800);

    // Proceed to next scene
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9998] bg-gradient-to-br from-stone-900 via-amber-950/20 to-stone-900 overflow-hidden flex items-center justify-center"
    >
      {/* Film grain */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '150px 150px',
        }}
      />

      {/* Door frame */}
      <div className="relative w-full max-w-2xl h-[600px]">
        {/* Door frame border */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/40 to-stone-800/40 border-8 border-amber-900/60 p-4">
          
          {/* Left door panel */}
          <motion.div
            className="absolute left-4 top-4 bottom-4 bg-gradient-to-br from-amber-800 to-amber-950 border-r-4 border-amber-950/80"
            initial={{ width: '48%' }}
            animate={{
              width: doorOpen ? '1%' : '48%',
              x: doorOpen ? '-100%' : '0%',
              opacity: doorOpen ? 0 : 1,
            }}
            transition={{ duration: 1.2, ease: [0.6, 0.05, 0.2, 0.95] }}
            style={{
              boxShadow: 'inset -4px 0 12px rgba(0,0,0,0.4)',
            }}
          >
            {/* Door panels texture */}
            <div className="w-full h-full p-6 space-y-4">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className="w-full h-32 border-4 border-amber-950/50 bg-amber-900/20"
                  style={{ boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3)' }}
                />
              ))}
            </div>

            {/* Door handle */}
            <div className="absolute top-1/2 right-4 -translate-y-1/2 w-12 h-4 bg-gradient-to-r from-yellow-700 to-yellow-600 rounded-full border-2 border-yellow-800"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
            />
          </motion.div>

          {/* Right door panel */}
          <motion.div
            className="absolute right-4 top-4 bottom-4 bg-gradient-to-br from-amber-800 to-amber-950 border-l-4 border-amber-950/80"
            initial={{ width: '48%' }}
            animate={{
              width: doorOpen ? '1%' : '48%',
              x: doorOpen ? '100%' : '0%',
              opacity: doorOpen ? 0 : 1,
            }}
            transition={{ duration: 1.2, ease: [0.6, 0.05, 0.2, 0.95] }}
            style={{
              boxShadow: 'inset 4px 0 12px rgba(0,0,0,0.4)',
            }}
          >
            {/* Door panels texture */}
            <div className="w-full h-full p-6 space-y-4">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className="w-full h-32 border-4 border-amber-950/50 bg-amber-900/20"
                  style={{ boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3)' }}
                />
              ))}
            </div>

            {/* Door handle */}
            <div className="absolute top-1/2 left-4 -translate-y-1/2 w-12 h-4 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-full border-2 border-yellow-800"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
            />
          </motion.div>

          {/* View through open door */}
          <motion.div
            className="absolute inset-4 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: doorOpen ? 1 : 0,
              scale: doorOpen ? 1 : 0.8,
            }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {/* Blurred office interior preview */}
            <div className="w-full h-full bg-gradient-to-b from-amber-950/40 via-stone-900/60 to-stone-950/80 relative overflow-hidden">
              {/* Desk silhouette */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 0.6 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-48 bg-gradient-to-t from-amber-950 to-amber-900/40"
                style={{ clipPath: 'polygon(10% 100%, 90% 100%, 85% 0, 15% 0)' }}
              />

              {/* Glowing light from inside */}
              <motion.div
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-3xl"
                style={{
                  background: 'radial-gradient(circle, rgba(251,191,36,0.3) 0%, transparent 70%)',
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Bell icon when door opens */}
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{
            scale: doorOpen ? [0, 1.3, 1] : 0,
            rotate: doorOpen ? [-45, 15, -10, 5, 0] : -45,
          }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute -top-16 left-1/2 -translate-x-1/2 text-7xl filter drop-shadow-2xl"
        >
          🔔
        </motion.div>

        {/* "Walking in" text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: doorOpen ? 1 : 0, y: doorOpen ? 0 : 20 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center"
        >
          <p className="text-amber-200/70 text-lg font-light tracking-wider">
            Entering office...
          </p>
          <div className="flex gap-1 justify-center mt-2">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-amber-400/60"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.8) 100%)',
        }}
      />
    </motion.div>
  );
}
