import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { playStamp, playTypeKey, resumeAudio } from '../utils/sounds';
import { OFFICER } from '../utils/constants';

/**
 * SCENE 4: CUSTOMER VERIFICATION
 * Old employee checks papers, animated documents, stamps, photos, fingerprints
 */
export default function Scene4Verification({ onComplete }) {
  const [step, setStep] = useState(0); // 0: intro, 1: documents, 2: photo, 3: fingerprint, 4: stamps, 5: complete
  const [stamped, setStamped] = useState([]);

  useEffect(() => {
    resumeAudio();
  }, []);

  useEffect(() => {
    if (step === 0) {
      const timer = setTimeout(() => setStep(1), 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleStamp = (id) => {
    if (!stamped.includes(id)) {
      playStamp();
      setStamped(prev => [...prev, id]);
    }
  };

  const handleProceed = () => {
    setStep(5);
    setTimeout(() => onComplete(), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[9996] bg-gradient-to-br from-stone-900 via-amber-950/20 to-stone-900 overflow-auto"
    >
      {/* Film grain */}
      <div className="absolute inset-0 opacity-[0.12] pointer-events-none bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '100px',
        }}
      />

      <div className="container mx-auto px-6 py-12 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-black text-amber-100 mb-3"
            style={{ textShadow: '3px 3px 0 rgba(0,0,0,0.5)' }}
          >
            CUSTOMER VERIFICATION
          </h2>
          <p className="text-amber-300/70 text-lg">
            Officer: {OFFICER}
          </p>
        </motion.div>

        {/* Old employee character */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="text-8xl filter drop-shadow-2xl"
            >
              👴
            </motion.div>
            {/* Speech bubble */}
            {step === 1 && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -right-32 top-0 bg-white border-4 border-gray-800 p-4 rounded-lg max-w-xs"
                style={{
                  boxShadow: '4px 4px 0 rgba(0,0,0,0.3)',
                }}
              >
                <p className="text-gray-900 text-sm font-semibold">
                  "Sab documents ready hain? Verification zaroori hai..."
                </p>
                <div className="absolute left-0 top-1/2 -translate-x-2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-white" />
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Verification steps */}
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* Documents check */}
          {step >= 1 && (
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-amber-100 to-yellow-50 border-4 border-amber-800 p-6"
              style={{
                boxShadow: '8px 8px 0 rgba(0,0,0,0.2)',
                transform: 'rotate(-1deg)'
              }}
            >
              <div className="flex items-start gap-6">
                <div className="text-6xl">📄</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-black text-gray-900 mb-3">Application Form PDY-001</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex justify-between border-b border-dashed border-gray-400 pb-1">
                      <span className="font-semibold">Applicant Name:</span>
                      <span>Shri Optimistic Kumar</span>
                    </div>
                    <div className="flex justify-between border-b border-dashed border-gray-400 pb-1">
                      <span className="font-semibold">Investment Amount:</span>
                      <span className="text-green-700 font-bold">₹1.00</span>
                    </div>
                    <div className="flex justify-between border-b border-dashed border-gray-400 pb-1">
                      <span className="font-semibold">Expected Return:</span>
                      <span className="text-green-700 font-bold">₹2.00 (Theoretical)</span>
                    </div>
                    <div className="flex justify-between border-b border-dashed border-gray-400 pb-1">
                      <span className="font-semibold">Processing Time:</span>
                      <span>21 Seconds*</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    * Plus 6-8 years of optional waiting period
                  </p>
                </div>

                {/* Stamp it button */}
                <motion.button
                  onClick={() => { handleStamp('doc'); setStep(2); }}
                  disabled={stamped.includes('doc')}
                  whileHover={{ scale: stamped.includes('doc') ? 1 : 1.1 }}
                  whileTap={{ scale: stamped.includes('doc') ? 1 : 0.9 }}
                  className={`px-6 py-3 font-bold text-lg border-4 transition-all ${
                    stamped.includes('doc')
                      ? 'bg-red-700 text-white border-red-900 cursor-not-allowed'
                      : 'bg-red-600 text-white border-red-800 hover:bg-red-500'
                  }`}
                >
                  {stamped.includes('doc') ? '✓ VERIFIED' : 'STAMP IT'}
                </motion.button>
              </div>

              {/* Stamp mark */}
              {stamped.includes('doc') && (
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: -15 }}
                  className="absolute top-4 right-4 w-32 h-32 flex items-center justify-center"
                  style={{
                    border: '4px solid rgba(220, 38, 38, 0.8)',
                    borderRadius: '50% 50% 50% 50% / 45% 45% 55% 55%',
                  }}
                >
                  <div className="text-center">
                    <p className="text-red-600 font-black text-lg">APPROVED</p>
                    <p className="text-red-600 text-xs font-bold">15-AUG-98</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Passport photo */}
          {step >= 2 && (
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-blue-50 to-slate-100 border-4 border-slate-700 p-6"
              style={{
                boxShadow: '8px 8px 0 rgba(0,0,0,0.2)',
                transform: 'rotate(1deg)'
              }}
            >
              <div className="flex items-start gap-6">
                <div className="relative border-4 border-slate-800 bg-gray-300 p-2">
                  <div className="text-7xl">🧑</div>
                  <div className="absolute bottom-1 right-1 bg-white px-2 py-1 text-[8px] font-mono border border-gray-400">
                    PHOTO ID
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-black text-gray-900 mb-3">Identity Verification</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>📍 Address: Optimism Street, Hope Nagar, Mumbai - 400001</p>
                    <p>🎂 DOB: 01-Jan-1970 (Always optimistic age)</p>
                    <p>🆔 ID Number: OPT/1998/00042</p>
                  </div>
                </div>

                <motion.button
                  onClick={() => { handleStamp('photo'); setStep(3); }}
                  disabled={stamped.includes('photo')}
                  whileHover={{ scale: stamped.includes('photo') ? 1 : 1.1 }}
                  whileTap={{ scale: stamped.includes('photo') ? 1 : 0.9 }}
                  className={`px-6 py-3 font-bold text-lg border-4 transition-all ${
                    stamped.includes('photo')
                      ? 'bg-green-700 text-white border-green-900 cursor-not-allowed'
                      : 'bg-green-600 text-white border-green-800 hover:bg-green-500'
                  }`}
                >
                  {stamped.includes('photo') ? '✓ VERIFIED' : 'VERIFY'}
                </motion.button>
              </div>

              {stamped.includes('photo') && (
                <motion.div
                  initial={{ scale: 0, rotate: 45 }}
                  animate={{ scale: 1, rotate: 12 }}
                  className="absolute top-4 right-4 w-28 h-28 rounded-full border-4 border-green-600 flex items-center justify-center bg-green-600/10"
                >
                  <p className="text-green-700 font-black text-base">VALID</p>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Fingerprint */}
          {step >= 3 && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-purple-100 to-pink-50 border-4 border-purple-800 p-6"
              style={{
                boxShadow: '8px 8px 0 rgba(0,0,0,0.2)',
                transform: 'rotate(-0.5deg)'
              }}
            >
              <div className="flex items-center gap-6">
                <div className="text-7xl">👆</div>

                <div className="flex-1">
                  <h3 className="text-2xl font-black text-gray-900 mb-3">Biometric Verification</h3>
                  <p className="text-gray-700 text-sm mb-4">
                    Place your thumb on the scanner for final authentication.
                  </p>
                  
                  {/* Fake fingerprint scanner */}
                  <div className="relative w-32 h-32 bg-gradient-to-br from-gray-900 to-gray-700 border-4 border-gray-600 flex items-center justify-center">
                    <motion.div
                      animate={{
                        opacity: [0.3, 0.7, 0.3],
                        scale: [0.9, 1.1, 0.9],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                      className="text-6xl filter grayscale"
                    >
                      🔴
                    </motion.div>
                  </div>
                </div>

                <motion.button
                  onClick={() => { handleStamp('finger'); setStep(4); }}
                  disabled={stamped.includes('finger')}
                  whileHover={{ scale: stamped.includes('finger') ? 1 : 1.1 }}
                  whileTap={{ scale: stamped.includes('finger') ? 1 : 0.9 }}
                  className={`px-6 py-3 font-bold text-lg border-4 transition-all ${
                    stamped.includes('finger')
                      ? 'bg-blue-700 text-white border-blue-900 cursor-not-allowed'
                      : 'bg-blue-600 text-white border-blue-800 hover:bg-blue-500'
                  }`}
                >
                  {stamped.includes('finger') ? '✓ SCANNED' : 'SCAN NOW'}
                </motion.button>
              </div>

              {stamped.includes('finger') && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 text-center"
                >
                  <div className="text-6xl">✅</div>
                  <p className="text-blue-700 font-bold text-xs mt-1">MATCH: 99.9%</p>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Final approval */}
          {step >= 4 && stamped.length === 3 && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-green-600 to-emerald-700 border-4 border-green-800 p-8 text-center"
              style={{ boxShadow: '0 12px 48px rgba(34,197,94,0.4)' }}
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 0.5,
                  repeat: 2,
                }}
                className="text-9xl mb-4"
              >
                ✅
              </motion.div>
              <h3 className="text-4xl font-black text-white mb-3">
                VERIFICATION COMPLETE
              </h3>
              <p className="text-green-100 text-lg mb-6">
                All documents approved. You may proceed to the Money Doubling Machine.
              </p>

              <button
                onClick={handleProceed}
                className="px-16 py-5 bg-white text-green-700 font-black text-2xl border-4 border-green-900 hover:bg-green-50 transition-all hover:scale-105"
                style={{
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                Enter Machine Room →
              </button>
            </motion.div>
          )}
        </div>

        {/* Progress indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-3"
        >
          {[1, 2, 3].map(s => (
            <div
              key={s}
              className={`w-4 h-4 rounded-full border-2 transition-all ${
                stamped.length >= s
                  ? 'bg-green-500 border-green-600'
                  : step >= s
                  ? 'bg-amber-500 border-amber-600 animate-pulse'
                  : 'bg-gray-600 border-gray-700'
              }`}
            />
          ))}
        </motion.div>
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)',
        }}
      />
    </motion.div>
  );
}
