import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { playRing, playStamp, startCashCounter, stopCashCounter, playTypeKey, resumeAudio, startAmbient } from '../utils/sounds';
import { FAKE_CALLS, REGISTER_ENTRIES } from '../utils/constants';

/**
 * SCENE 3: RECEPTION / OFFICE INTERIOR
 * Interactive office with easter eggs - ceiling fan, telephone, cupboard, register, cash bundles
 */
export default function Scene3Reception({ onProceed }) {
  const [fanSpeed, setFanSpeed] = useState(3);
  const [phoneModal, setPhoneModal] = useState(false);
  const [cupboardOpen, setCupboardOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [hoveredCash, setHoveredCash] = useState(null);
  const [typewriterText, setTypewriterText] = useState('');

  const fanControls = useAnimation();

  useEffect(() => {
    resumeAudio();
    startAmbient();
    return () => stopCashCounter();
  }, []);

  // Fan rotation speed
  useEffect(() => {
    fanControls.start({
      rotate: 360,
      transition: {
        duration: 8 / fanSpeed,
        repeat: Infinity,
        ease: 'linear'
      }
    });
  }, [fanSpeed, fanControls]);

  const handleFanClick = () => {
    setFanSpeed(prev => Math.min(prev + 1, 10));
  };

  const handlePhoneClick = () => {
    playRing();
    const call = FAKE_CALLS[Math.floor(Math.random() * FAKE_CALLS.length)];
    setPhoneModal(call);
    setTimeout(() => setPhoneModal(false), 4000);
  };

  const handleCupboardClick = () => {
    setCupboardOpen(prev => !prev);
  };

  const handleRegisterClick = () => {
    setRegisterOpen(prev => !prev);
    playStamp();
  };

  const handleCashHover = (id) => {
    setHoveredCash(id);
    startCashCounter();
  };

  const handleCashLeave = () => {
    setHoveredCash(null);
    stopCashCounter();
  };

  // Typewriter effect on CRT
  useEffect(() => {
    const messages = [
      'SYSTEM READY',
      'LOADING FINANCIAL DATABASE...',
      'WEALTH MULTIPLIER: ACTIVE',
      'INVESTOR QUEUE: 2,847 PEOPLE',
      'AVERAGE WAIT TIME: 6-8 YEARS'
    ];
    let msgIndex = 0;
    let charIndex = 0;
    let currentMsg = '';

    const type = setInterval(() => {
      if (charIndex < messages[msgIndex].length) {
        currentMsg += messages[msgIndex][charIndex];
        setTypewriterText(currentMsg);
        playTypeKey();
        charIndex++;
      } else {
        clearInterval(type);
        setTimeout(() => {
          msgIndex = (msgIndex + 1) % messages.length;
          charIndex = 0;
          currentMsg = '';
          setTypewriterText('');
        }, 2000);
      }
    }, 80);

    return () => clearInterval(type);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[9997] bg-gradient-to-br from-stone-900 via-amber-950/30 to-stone-900 overflow-hidden"
    >
      {/* Film grain */}
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='1.2' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px',
        }}
      />

      {/* Volumetric light rays from ceiling */}
      <div className="absolute top-0 left-1/4 w-1 h-full opacity-10 blur-xl"
        style={{
          background: 'linear-gradient(to bottom, rgba(251,191,36,0.6) 0%, transparent 50%)',
          transform: 'rotate(5deg)',
        }}
      />
      <div className="absolute top-0 right-1/3 w-1 h-full opacity-10 blur-xl"
        style={{
          background: 'linear-gradient(to bottom, rgba(251,191,36,0.5) 0%, transparent 50%)',
          transform: 'rotate(-3deg)',
        }}
      />

      {/* Ceiling fan - INTERACTIVE */}
      <motion.div
        onClick={handleFanClick}
        animate={fanControls}
        className="absolute top-12 left-1/2 -translate-x-1/2 cursor-pointer group"
        title={`Click to speed up (speed: ${fanSpeed})`}
      >
        <svg width="120" height="120" viewBox="0 0 120 120" className="filter drop-shadow-lg">
          <g opacity="0.8">
            {/* Center hub */}
            <circle cx="60" cy="60" r="8" fill="#3f3f46" />
            {/* Blades */}
            {[0, 120, 240].map(angle => (
              <rect
                key={angle}
                x="54"
                y="15"
                width="12"
                height="45"
                fill="#52525b"
                rx="6"
                transform={`rotate(${angle} 60 60)`}
              />
            ))}
          </g>
        </svg>
        <div className="absolute inset-0 rounded-full bg-yellow-400/0 group-hover:bg-yellow-400/10 transition-colors" />
      </motion.div>

      <div className="container mx-auto px-6 py-8 h-full flex flex-col justify-between relative z-10">
        
        {/* Top section - Wall decorations */}
        <div className="flex justify-between items-start">
          {/* Wall calendar */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white border-4 border-red-600 p-3 w-32"
            style={{ boxShadow: '4px 4px 0 rgba(0,0,0,0.3)' }}
          >
            <div className="text-center border-b-2 border-red-500 pb-1 mb-2">
              <p className="text-red-600 font-bold text-sm">1998</p>
            </div>
            <div className="text-center">
              <p className="text-6xl font-black text-gray-900">15</p>
              <p className="text-xs font-bold text-gray-700">AUGUST</p>
            </div>
          </motion.div>

          {/* Clock */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="relative w-24 h-24 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 border-8 border-amber-800"
            style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.4)' }}
          >
            {/* Clock hands */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-1 h-8 bg-gray-900 origin-bottom"
              style={{ transform: 'translate(-50%, -100%)' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 w-1 h-6 bg-gray-700 origin-bottom"
              style={{ transform: 'translate(-50%, -100%)' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 3600, repeat: Infinity, ease: 'linear' }}
            />
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-gray-900 rounded-full -translate-x-1/2 -translate-y-1/2" />
          </motion.div>
        </div>

        {/* Main office area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Left: Desk with props */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-6"
          >
            {/* CRT Monitor */}
            <div className="relative bg-gradient-to-b from-gray-700 to-gray-900 p-6 pb-12 rounded-lg border-4 border-gray-800">
              <div className="relative bg-black aspect-[4/3] border-4 border-gray-900 p-4 overflow-hidden">
                {/* CRT curvature effect */}
                <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/20 pointer-events-none" />
                
                {/* Scanlines */}
                <div className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.1) 2px, rgba(0,255,0,0.1) 4px)',
                  }}
                />

                {/* Green terminal text */}
                <div className="font-mono text-green-400 text-xs leading-relaxed">
                  <p className="mb-2">C:\OFFICE\SYSTEM&gt; _</p>
                  <p className="text-green-300">{typewriterText}<span className="animate-pulse">_</span></p>
                </div>

                {/* CRT glow */}
                <div className="absolute inset-0 bg-green-500/5 blur-xl pointer-events-none" />
              </div>
              {/* Monitor stand */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-6 bg-gray-800 rounded-b-lg" />
            </div>

            {/* Telephone - INTERACTIVE */}
            <motion.div
              onClick={handlePhoneClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative bg-gradient-to-br from-red-800 to-red-950 p-4 rounded-lg border-2 border-red-700 cursor-pointer group"
              title="Click for a surprise call"
            >
              <div className="flex items-center gap-4">
                <div className="text-5xl">☎️</div>
                <div>
                  <p className="text-red-100 font-bold">Office Phone</p>
                  <p className="text-red-300 text-xs">Rotary Model XT-47</p>
                </div>
              </div>
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="absolute top-2 right-2 w-3 h-3 bg-red-400 rounded-full"
              />
            </motion.div>
          </motion.div>

          {/* Right: Filing cabinet and register */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="space-y-6"
          >
            {/* Steel cupboard - INTERACTIVE */}
            <motion.div
              onClick={handleCupboardClick}
              whileHover={{ scale: 1.02 }}
              className="relative bg-gradient-to-b from-gray-500 to-gray-700 p-6 rounded border-4 border-gray-600 cursor-pointer"
              style={{ boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.5), 0 8px 16px rgba(0,0,0,0.4)' }}
              title="Click to open"
            >
              <div className="text-center mb-4">
                <p className="text-gray-200 font-bold">Filing Cabinet</p>
                <p className="text-gray-400 text-xs">Confidential Documents</p>
              </div>

              <motion.div
                animate={{
                  height: cupboardOpen ? '200px' : '0px',
                  opacity: cupboardOpen ? 1 : 0,
                }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden"
              >
                {cupboardOpen && (
                  <div className="space-y-3 pt-4 border-t-2 border-gray-600">
                    {/* Cash bundles - INTERACTIVE */}
                    {[1, 2, 3].map(id => (
                      <motion.div
                        key={id}
                        onMouseEnter={() => handleCashHover(id)}
                        onMouseLeave={handleCashLeave}
                        className="relative bg-gradient-to-r from-green-700 to-green-600 p-3 border-2 border-green-800 cursor-pointer"
                        whileHover={{ scale: 1.05, x: 10 }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">💵</span>
                          <div>
                            <p className="text-green-100 font-bold text-sm">₹500 × 200</p>
                            <p className="text-green-200 text-xs">Total: ₹1,00,000</p>
                          </div>
                        </div>
                        
                        {/* Flying currency animation */}
                        {hoveredCash === id && (
                          <motion.div
                            initial={{ x: 0, y: 0, opacity: 1 }}
                            animate={{
                              x: Math.random() * 100 - 50,
                              y: -50 - Math.random() * 50,
                              opacity: 0,
                              rotate: Math.random() * 360
                            }}
                            transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.2 }}
                            className="absolute top-0 left-0 text-2xl pointer-events-none"
                          >
                            💸
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Lock */}
              <div className="absolute top-1/2 right-4 -translate-y-1/2 w-6 h-8 bg-yellow-600 rounded border-2 border-yellow-700" />
            </motion.div>

            {/* Register book - INTERACTIVE */}
            <motion.div
              onClick={handleRegisterClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative bg-gradient-to-br from-amber-900 to-amber-950 p-5 border-4 border-amber-800 cursor-pointer"
              style={{ boxShadow: '0 6px 16px rgba(0,0,0,0.5)' }}
              title="View transaction register"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">📖</span>
                <div>
                  <p className="text-amber-100 font-bold">Transaction Register</p>
                  <p className="text-amber-300 text-xs">Click to view entries</p>
                </div>
              </div>

              <motion.div
                animate={{
                  height: registerOpen ? 'auto' : '0px',
                  opacity: registerOpen ? 1 : 0,
                }}
                className="overflow-hidden"
              >
                {registerOpen && (
                  <div className="space-y-2 pt-3 border-t-2 border-amber-700">
                    {REGISTER_ENTRIES.map((entry, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-amber-950/50 p-2 border border-amber-800 text-xs"
                      >
                        <div className="flex justify-between text-amber-100">
                          <span className="font-semibold">{entry.name}</span>
                          <span className="text-amber-300">{entry.amount}</span>
                        </div>
                        <div className="text-amber-400 text-[10px] mt-1">
                          Returned: {entry.returned}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom: Proceed button */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center"
        >
          <button
            onClick={onProceed}
            className="group relative px-16 py-5 bg-gradient-to-br from-amber-600 via-yellow-600 to-amber-700 text-white font-bold text-2xl tracking-wide border-2 border-yellow-400 overflow-hidden transition-all duration-300 hover:scale-105"
            style={{
              boxShadow: '0 8px 32px rgba(245,158,11,0.5), inset 0 1px 0 rgba(255,255,255,0.3)',
              textShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }}
          >
            <span className="relative z-10">Proceed to Verification →</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
            />
          </button>
          <p className="mt-3 text-amber-300/60 text-sm">
            Explore the office or proceed to next step
          </p>
        </motion.div>
      </div>

      {/* Phone call modal */}
      {phoneModal && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-gradient-to-br from-gray-900 to-gray-950 border-4 border-amber-600 p-8 max-w-md"
          style={{ boxShadow: '0 0 60px rgba(245,158,11,0.4)' }}
        >
          <div className="text-center">
            <div className="text-6xl mb-4">📞</div>
            <p className="text-amber-100 text-lg font-light leading-relaxed">
              {phoneModal}
            </p>
          </div>
        </motion.div>
      )}

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)',
        }}
      />
    </motion.div>
  );
}
