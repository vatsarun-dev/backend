import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { playTypeKey, playStamp, resumeAudio } from '../utils/sounds';

/**
 * SCENE 6: PAYMENT
 * Old railway ticket style receipt with mechanical printer animation
 */
export default function Scene6Payment({ onPayment }) {
  const [printing, setPrinting] = useState(false);
  const [printProgress, setPrintProgress] = useState(0);
  const [receiptVisible, setReceiptVisible] = useState(false);

  useEffect(() => {
    resumeAudio();
    
    // Start printing animation
    const timer = setTimeout(() => {
      setPrinting(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (printing && printProgress < 100) {
      const timer = setTimeout(() => {
        setPrintProgress(prev => Math.min(prev + 2, 100));
        if (Math.random() > 0.7) playTypeKey();
      }, 50);

      if (printProgress >= 100) {
        playStamp();
        setReceiptVisible(true);
      }

      return () => clearTimeout(timer);
    }
  }, [printing, printProgress]);

  const handlePay = () => {
    // In real implementation, integrate Razorpay here
    onPayment();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[9994] bg-gradient-to-br from-stone-900 via-amber-950/20 to-stone-900 overflow-auto flex items-center justify-center"
    >
      {/* Film grain */}
      <div className="absolute inset-0 opacity-[0.1] pointer-events-none bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='1.2' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '100px',
        }}
      />

      <div className="relative max-w-2xl mx-auto px-6">
        
        {/* Title */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-black text-amber-100 mb-2"
            style={{ textShadow: '3px 3px 0 rgba(0,0,0,0.5)' }}
          >
            PAYMENT RECEIPT
          </h2>
          <p className="text-amber-300/70">Please review your investment details</p>
        </motion.div>

        {/* Mechanical printer */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="relative bg-gradient-to-b from-zinc-700 to-zinc-900 border-8 border-zinc-800 p-8 mb-8"
          style={{ boxShadow: '0 12px 48px rgba(0,0,0,0.6)' }}
        >
          {/* Printer top */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-12 bg-zinc-700 border-4 border-zinc-800 flex items-center justify-center">
            <div className="flex gap-2">
              {[1, 2, 3].map(i => (
                <motion.div
                  key={i}
                  animate={{
                    opacity: printing ? [0.3, 1, 0.3] : 0.3,
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                  className="w-3 h-3 rounded-full bg-green-500"
                />
              ))}
            </div>
          </div>

          {/* Paper feed slot */}
          <div className="relative bg-black h-4 mb-4 border-2 border-zinc-900" />

          {/* Printing progress */}
          {printing && printProgress < 100 && (
            <motion.div
              className="mb-4"
              animate={{
                x: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 0.1,
                repeat: Infinity
              }}
            >
              <div className="bg-zinc-800 h-2 rounded overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-600 to-amber-400"
                  style={{ width: `${printProgress}%` }}
                />
              </div>
              <p className="text-amber-400 text-sm text-center mt-2 font-mono">
                PRINTING... {printProgress}%
              </p>
            </motion.div>
          )}

          {/* Receipt ticket */}
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{
              y: receiptVisible ? 0 : -100,
              opacity: receiptVisible ? 1 : 0
            }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative"
          >
            {/* Railway ticket style receipt */}
            <div className="relative bg-gradient-to-br from-amber-50 to-yellow-50 p-6 border-4 border-amber-900"
              style={{
                boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fef3c7 100%)',
              }}
            >
              {/* Burnt/torn edges effect */}
              <div className="absolute -top-1 left-0 right-0 h-1 bg-amber-900/30"
                style={{ clipPath: 'polygon(0 50%, 2% 100%, 4% 0%, 6% 100%, 8% 0%, 10% 100%, 12% 0%, 14% 100%, 16% 0%, 18% 100%, 20% 0%, 22% 100%, 24% 0%, 26% 100%, 28% 0%, 30% 100%, 32% 0%, 34% 100%, 36% 0%, 38% 100%, 40% 0%, 42% 100%, 44% 0%, 46% 100%, 48% 0%, 50% 100%, 52% 0%, 54% 100%, 56% 0%, 58% 100%, 60% 0%, 62% 100%, 64% 0%, 66% 100%, 68% 0%, 70% 100%, 72% 0%, 74% 100%, 76% 0%, 78% 100%, 80% 0%, 82% 100%, 84% 0%, 86% 100%, 88% 0%, 90% 100%, 92% 0%, 94% 100%, 96% 0%, 98% 100%, 100% 50%)' }}
              />

              {/* Header */}
              <div className="text-center border-b-2 border-dashed border-amber-900/50 pb-4 mb-4">
                <p className="text-xs font-mono text-amber-900/60">GOVT. OF INDIA</p>
                <h3 className="text-2xl font-black text-amber-900 tracking-tight">
                  PAISA DOUBLE YOJANA
                </h3>
                <p className="text-xs font-mono text-amber-900/70 mt-1">
                  Shri Dhanlaxmi Financial Services Pvt. Ltd.
                </p>
              </div>

              {/* Receipt details */}
              <div className="space-y-3 font-mono text-sm mb-4">
                <div className="flex justify-between border-b border-dotted border-amber-900/30 pb-1">
                  <span className="text-amber-900/70">Receipt No:</span>
                  <span className="font-bold text-amber-900">PDY/1998/{Math.floor(Math.random() * 9999).toString().padStart(4, '0')}</span>
                </div>
                <div className="flex justify-between border-b border-dotted border-amber-900/30 pb-1">
                  <span className="text-amber-900/70">Date:</span>
                  <span className="font-bold text-amber-900">15-AUG-1998</span>
                </div>
                <div className="flex justify-between border-b border-dotted border-amber-900/30 pb-1">
                  <span className="text-amber-900/70">Applicant:</span>
                  <span className="font-bold text-amber-900">Shri Optimistic Kumar</span>
                </div>
                <div className="flex justify-between border-b border-dotted border-amber-900/30 pb-1">
                  <span className="text-amber-900/70">Scheme Code:</span>
                  <span className="font-bold text-amber-900">PDY/GOI/1998-99/XIII-B</span>
                </div>
              </div>

              {/* Amount section */}
              <div className="bg-gradient-to-r from-green-100 to-emerald-50 border-2 border-green-700 p-4 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-green-900 font-bold">Investment Amount:</span>
                  <span className="text-4xl font-black text-green-700">₹1.00</span>
                </div>
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-dashed border-green-700/50">
                  <span className="text-green-900 font-bold">Expected Return:</span>
                  <span className="text-3xl font-black text-green-600">₹2.00</span>
                </div>
                <p className="text-xs text-green-900/60 text-center mt-2">
                  (Subject to market conditions, planetary alignment, and luck)
                </p>
              </div>

              {/* Terms */}
              <div className="text-xs text-amber-900/60 space-y-1 mb-4">
                <p>✓ Processing Time: 21 seconds*</p>
                <p>✓ Success Rate: Guaranteed**</p>
                <p>✓ Refund Policy: Contact us in 2099***</p>
                <p className="text-[9px] mt-2">
                  * Plus 6-8 years waiting period | ** Terms apply | *** If office still exists
                </p>
              </div>

              {/* Stamp mark */}
              {receiptVisible && (
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: -12 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                  className="absolute bottom-4 right-4"
                >
                  <div className="relative w-24 h-24 rounded-full border-4 border-red-600 flex items-center justify-center"
                    style={{ borderStyle: 'dashed' }}
                  >
                    <div className="text-center">
                      <p className="text-red-600 font-black text-xs">PAID</p>
                      <p className="text-red-600 text-[8px] font-bold">15-AUG-98</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Signature */}
              <div className="border-t-2 border-amber-900/30 pt-4 mt-4">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-amber-900/60 mb-1">Authorized By:</p>
                    <div className="font-signature text-2xl text-amber-900" style={{ fontFamily: 'cursive' }}>
                      R.H. Chaturvedi
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl mb-1">📜</div>
                    <p className="text-[8px] text-amber-900/50">OFFICIAL SEAL</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Payment button */}
        {receiptVisible && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <button
              onClick={handlePay}
              className="group relative px-20 py-6 bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 text-white font-black text-3xl tracking-wide border-4 border-green-800 overflow-hidden transition-all duration-300 hover:scale-105"
              style={{
                boxShadow: '0 12px 48px rgba(34,197,94,0.5), inset 0 2px 0 rgba(255,255,255,0.2)',
                textShadow: '0 3px 6px rgba(0,0,0,0.5)'
              }}
            >
              <span className="relative z-10">💰 Pay ₹1 & Start Machine</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
            </button>

            <p className="mt-4 text-amber-300/60 text-sm">
              Secure payment powered by hope and optimism
            </p>
            <p className="mt-2 text-amber-400/40 text-xs">
              Note: In production, Razorpay integration would appear here
            </p>
          </motion.div>
        )}
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
        }}
      />
    </motion.div>
  );
}
