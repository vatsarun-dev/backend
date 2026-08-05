import { motion } from 'framer-motion';

/**
 * SCENE 1: OUTSIDE OFFICE
 */
export default function Scene1Outside({ onEnter }) {

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[9999] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden"
    >
      {/* Film grain */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '100px'
        }} />
      </div>

      {/* Main content */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="relative w-full max-w-4xl"
        >
          {/* Signboard */}
          <div className="relative bg-gradient-to-br from-amber-700 via-yellow-800 to-amber-900 border-4 border-yellow-900 p-8 mb-8 shadow-2xl">
            <h1 className="text-5xl md:text-7xl font-black text-center text-yellow-50 tracking-tight leading-none mb-3"
              style={{
                textShadow: '3px 3px 0 rgba(0,0,0,0.5), 0 0 30px rgba(254,243,199,0.4)',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}
            >
              PAISA DOUBLE
            </h1>
            <h2 className="text-4xl md:text-6xl font-black text-center text-amber-200 tracking-tight"
              style={{
                textShadow: '2px 2px 0 rgba(0,0,0,0.5)',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}
            >
              YOJANA
            </h2>
            
            <div className="mt-4 pt-3 border-t-2 border-yellow-700">
              <p className="text-center text-yellow-100 text-lg md:text-xl font-semibold"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.6)' }}
              >
                "21 Seconds Mein Paisa Double"
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="text-center text-amber-100 space-y-2 mb-6">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-sm"
            >
              Shri Dhanlaxmi Financial Services Pvt. Ltd.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-xs text-amber-200 opacity-50"
            >
              Est. 1998 | Govt. Approved* | ISO 9002 Pending
            </motion.p>
          </div>

          {/* Props */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex justify-around text-5xl mb-8"
          >
            <span title="Ramprasad ji's Scooter">🛵</span>
            <span title="Office Dog">🐕</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Enter button */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10"
      >
        <button
          onClick={onEnter}
          className="px-12 py-4 bg-gradient-to-br from-amber-600 via-yellow-600 to-amber-700 text-white font-bold text-xl border-2 border-yellow-400 hover:scale-105 transition-transform shadow-2xl"
          style={{
            textShadow: '0 2px 4px rgba(0,0,0,0.5)'
          }}
        >
          Enter Office →
        </button>
        
        <p className="text-center mt-3 text-amber-300 text-sm opacity-60">
          Click to enter the office
        </p>
      </motion.div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)'
        }}
      />
    </motion.div>
  );
}
