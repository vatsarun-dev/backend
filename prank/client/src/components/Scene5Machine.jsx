import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect } from 'react';
import { playMachineStart, playSteam, resumeAudio } from '../utils/sounds';

/**
 * SCENE 5: MONEY DOUBLING MACHINE
 * The hero section - incredible mechanical machine with gears, gauges, pipes, steam, lights
 */
export default function Scene5Machine({ onActivate }) {
  const [machineActive, setMachineActive] = useState(false);
  const [leverPulled, setLeverPulled] = useState(false);
  const [pressure, setPressure] = useState(0);
  const [steamActive, setSteamActive] = useState(false);

  const gearControls = useAnimation();
  const pistonControls = useAnimation();

  useEffect(() => {
    resumeAudio();
  }, []);

  useEffect(() => {
    if (machineActive) {
      // Gears rotate
      gearControls.start({
        rotate: 360,
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: 'linear'
        }
      });

      // Pistons pump
      pistonControls.start({
        y: [0, -20, 0],
        transition: {
          duration: 0.8,
          repeat: Infinity,
          ease: 'easeInOut'
        }
      });

      // Pressure increases
      const pressureTimer = setInterval(() => {
        setPressure(prev => Math.min(prev + 5, 100));
      }, 200);

      // Steam bursts
      const steamTimer = setInterval(() => {
        setSteamActive(true);
        playSteam(0.5);
        setTimeout(() => setSteamActive(false), 400);
      }, 2000);

      return () => {
        clearInterval(pressureTimer);
        clearInterval(steamTimer);
      };
    }
  }, [machineActive, gearControls, pistonControls]);

  const handleLeverPull = () => {
    if (leverPulled) return;
    setLeverPulled(true);
    playMachineStart();
    
    setTimeout(() => {
      setMachineActive(true);
    }, 800);

    setTimeout(() => {
      onActivate();
    }, 4000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[9995] bg-gradient-to-b from-gray-900 via-stone-900 to-black overflow-auto"
    >
      {/* Film grain */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='1.5' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px',
        }}
      />

      {/* Industrial lighting */}
      <div className="absolute top-0 left-1/4 w-48 h-48 blur-3xl opacity-20"
        style={{ background: 'radial-gradient(circle, #fbbf24 0%, transparent 70%)' }}
      />
      <div className="absolute top-0 right-1/4 w-48 h-48 blur-3xl opacity-20"
        style={{ background: 'radial-gradient(circle, #ef4444 0%, transparent 70%)' }}
      />

      <div className="container mx-auto px-6 py-12 relative z-10">
        
        {/* Title */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <motion.h1
            animate={{
              textShadow: machineActive
                ? ['0 0 20px rgba(251,191,36,0.5)', '0 0 40px rgba(251,191,36,0.8)', '0 0 20px rgba(251,191,36,0.5)']
                : '0 0 20px rgba(251,191,36,0.3)'
            }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-6xl md:text-7xl font-black text-amber-100 mb-3 tracking-tight"
          >
            MONEY DOUBLING MACHINE
          </motion.h1>
          <p className="text-amber-400/70 text-xl">Model K-47 | Est. 1998</p>
        </motion.div>

        {/* The Machine */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="relative max-w-6xl mx-auto"
        >
          {/* Main machine body */}
          <div className="relative bg-gradient-to-b from-zinc-800 via-stone-700 to-zinc-900 border-8 border-zinc-700 p-8 md:p-12"
            style={{
              boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.6), 0 20px 60px rgba(0,0,0,0.7)',
            }}
          >
            {/* Rivets */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-4 h-4 rounded-full bg-zinc-900 border-2 border-zinc-600"
                style={{
                  top: `${10 + (i % 3) * 40}%`,
                  left: i < 6 ? '2%' : '98%',
                  transform: 'translateX(-50%)',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.8)'
                }}
              />
            ))}

            {/* Top section - Gauges and displays */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              
              {/* Pressure gauge */}
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-900 to-black border-4 border-yellow-800 p-4 rounded-full aspect-square flex flex-col items-center justify-center">
                  <p className="text-yellow-400 text-xs font-bold mb-2">PRESSURE</p>
                  <motion.p
                    animate={{
                      color: pressure > 80 ? '#ef4444' : pressure > 50 ? '#fbbf24' : '#10b981'
                    }}
                    className="text-5xl font-black"
                  >
                    {pressure}%
                  </motion.p>
                  {/* Needle */}
                  <motion.div
                    animate={{
                      rotate: (pressure / 100) * 180 - 90
                    }}
                    className="absolute top-1/2 left-1/2 w-1 h-16 bg-red-500 origin-bottom"
                    style={{ transform: 'translate(-50%, -100%)' }}
                  />
                </div>
              </div>

              {/* LED Display */}
              <div className="bg-black border-4 border-green-700 p-4 flex flex-col items-center justify-center">
                <p className="text-green-500 text-xs font-bold mb-2 font-mono">STATUS MONITOR</p>
                <motion.div
                  animate={{
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-green-400 font-mono text-lg text-center leading-relaxed"
                >
                  {!machineActive && <p>READY</p>}
                  {machineActive && (
                    <>
                      <p>ACTIVE</p>
                      <p className="text-xs mt-2">PROCESSING...</p>
                    </>
                  )}
                </motion.div>
              </div>

              {/* Temperature gauge */}
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-900 to-black border-4 border-red-800 p-4 rounded-full aspect-square flex flex-col items-center justify-center">
                  <p className="text-red-400 text-xs font-bold mb-2">TEMP °C</p>
                  <motion.p
                    animate={{
                      scale: machineActive ? [1, 1.1, 1] : 1,
                    }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="text-5xl font-black text-orange-500"
                  >
                    {machineActive ? Math.floor(45 + pressure * 0.5) : 25}
                  </motion.p>
                </div>
              </div>
            </div>

            {/* Middle section - Gears and pipes */}
            <div className="relative bg-gradient-to-r from-zinc-900 via-stone-800 to-zinc-900 border-4 border-zinc-700 p-8 mb-8"
              style={{ boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.8)' }}
            >
              <div className="grid grid-cols-3 gap-6 items-center">
                
                {/* Large gear 1 */}
                <motion.svg
                  animate={gearControls}
                  width="120"
                  height="120"
                  viewBox="0 0 120 120"
                  className="mx-auto filter drop-shadow-lg"
                >
                  <circle cx="60" cy="60" r="40" fill="#52525b" />
                  {[...Array(8)].map((_, i) => {
                    const angle = (i * 360) / 8;
                    return (
                      <rect
                        key={i}
                        x="55"
                        y="15"
                        width="10"
                        height="25"
                        fill="#71717a"
                        transform={`rotate(${angle} 60 60)`}
                      />
                    );
                  })}
                  <circle cx="60" cy="60" r="15" fill="#3f3f46" />
                </motion.svg>

                {/* Pipes and conveyor */}
                <div className="space-y-4">
                  {/* Copper pipes */}
                  {[1, 2, 3].map(i => (
                    <div
                      key={i}
                      className="relative h-3 bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-700 rounded-full border-2 border-amber-800"
                      style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
                    >
                      {machineActive && (
                        <motion.div
                          animate={{ x: ['0%', '100%'] }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="absolute top-0 left-0 w-6 h-full bg-yellow-400 rounded-full opacity-60"
                        />
                      )}
                    </div>
                  ))}

                  {/* Steam valve */}
                  <div className="relative text-center">
                    <div className="inline-block bg-zinc-700 border-4 border-zinc-600 p-2 rounded">
                      <div className="w-8 h-8 bg-red-600 rounded-full" />
                    </div>
                    {steamActive && (
                      <motion.div
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 2, opacity: 0 }}
                        className="absolute top-0 left-1/2 -translate-x-1/2 text-4xl"
                      >
                        💨
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Large gear 2 */}
                <motion.svg
                  animate={gearControls}
                  width="120"
                  height="120"
                  viewBox="0 0 120 120"
                  className="mx-auto filter drop-shadow-lg"
                  style={{ animationDirection: 'reverse' }}
                >
                  <circle cx="60" cy="60" r="40" fill="#52525b" />
                  {[...Array(8)].map((_, i) => {
                    const angle = (i * 360) / 8 + 22.5;
                    return (
                      <rect
                        key={i}
                        x="55"
                        y="15"
                        width="10"
                        height="25"
                        fill="#71717a"
                        transform={`rotate(${angle} 60 60)`}
                      />
                    );
                  })}
                  <circle cx="60" cy="60" r="15" fill="#3f3f46" />
                </motion.svg>
              </div>

              {/* Pistons */}
              <div className="flex justify-center gap-8 mt-8">
                {[1, 2].map(i => (
                  <motion.div
                    key={i}
                    animate={pistonControls}
                    className="w-12 h-32 bg-gradient-to-b from-zinc-600 to-zinc-800 border-4 border-zinc-700 relative"
                  >
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-zinc-600 border-2 border-zinc-500" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom section - Money output and controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Money conveyor belt */}
              <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 border-4 border-amber-700 p-6">
                <p className="text-amber-400 text-sm font-bold mb-4 text-center">MONEY OUTPUT TRAY</p>
                <div className="relative h-32 bg-black border-2 border-amber-800 overflow-hidden">
                  {machineActive && (
                    <>
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ x: '-100%', y: Math.random() * 80 }}
                          animate={{ x: '200%' }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.4,
                            ease: 'linear'
                          }}
                          className="absolute text-4xl"
                        >
                          💵
                        </motion.div>
                      ))}
                    </>
                  )}
                </div>
              </div>

              {/* Control panel */}
              <div className="bg-gradient-to-br from-red-900 to-red-950 border-4 border-red-700 p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {/* Blinking lights */}
                  {[1, 2, 3, 4].map(i => (
                    <motion.div
                      key={i}
                      animate={{
                        opacity: machineActive ? [0.3, 1, 0.3] : 0.3,
                        backgroundColor: machineActive
                          ? ['#ef4444', '#fbbf24', '#ef4444']
                          : '#7f1d1d'
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                      className="h-8 rounded border-2 border-red-800"
                    />
                  ))}
                </div>

                {/* Emergency stop button */}
                <div className="text-center">
                  <div className="inline-block bg-yellow-600 border-4 border-yellow-800 p-2 rounded">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center border-4 border-red-800">
                      <span className="text-white font-black text-xs">STOP</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Big activation lever */}
            <motion.div
              className="absolute -right-12 top-1/2 -translate-y-1/2 cursor-pointer"
              whileHover={{ scale: leverPulled ? 1 : 1.1 }}
              onClick={handleLeverPull}
            >
              <motion.div
                animate={{
                  rotateZ: leverPulled ? 45 : 0
                }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                {/* Lever handle */}
                <div className="w-16 h-48 bg-gradient-to-b from-red-600 to-red-800 border-4 border-red-900 rounded-full relative"
                  style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.6)' }}
                >
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-yellow-500 rounded-full border-4 border-yellow-700">
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-black text-gray-900">
                      START
                    </div>
                  </div>
                </div>
              </motion.div>

              {!leverPulled && (
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute -left-24 top-1/2 -translate-y-1/2 bg-amber-600 text-white px-4 py-2 rounded border-2 border-amber-800 whitespace-nowrap"
                >
                  Pull to start! →
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Machine running indicator */}
          {machineActive && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-8"
            >
              <p className="text-amber-400 text-2xl font-bold animate-pulse">
                ⚡ MACHINE ACTIVATED ⚡
              </p>
              <p className="text-amber-500/70 text-sm mt-2">
                Processing your investment...
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Warning signs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex justify-center gap-6 mt-8"
        >
          {['⚠️ HIGH VOLTAGE', '☢️ CAUTION', '⚡ AUTHORIZED ONLY'].map((text, i) => (
            <div
              key={i}
              className="bg-yellow-400 text-black font-black text-xs px-4 py-2 border-4 border-black"
              style={{ transform: `rotate(${(i - 1) * 2}deg)` }}
            >
              {text}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Camera shake effect when machine active */}
      {machineActive && (
        <motion.div
          animate={{
            x: [0, -2, 2, -2, 2, 0],
            y: [0, 2, -2, 2, -2, 0],
          }}
          transition={{
            duration: 0.2,
            repeat: Infinity,
          }}
          className="fixed inset-0 pointer-events-none"
        />
      )}

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.7) 100%)',
        }}
      />
    </motion.div>
  );
}
