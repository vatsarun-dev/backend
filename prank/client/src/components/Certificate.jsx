import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { CERTIFICATE_DETAILS, APP_NAME, OFFICER } from '../utils/constants';

/* ── Seal SVG ────────────────────────────────────────── */
function GovernmentSeal({ size = 100 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-lg">
      {/* outer ring */}
      <circle cx="50" cy="50" r="46" fill="none" stroke="#c8a84b" strokeWidth="2" />
      <circle cx="50" cy="50" r="42" fill="none" stroke="#9a7a2e" strokeWidth="0.5" />
      {/* inner fill */}
      <circle cx="50" cy="50" r="38" fill="#0d2218" />
      {/* gear teeth around edge */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i / 24) * Math.PI * 2;
        const x1 = 50 + 40 * Math.cos(angle);
        const y1 = 50 + 40 * Math.sin(angle);
        const x2 = 50 + 46 * Math.cos(angle);
        const y2 = 50 + 46 * Math.sin(angle);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#c8a84b" strokeWidth="1.5" />;
      })}
      {/* star */}
      <text x="50" y="38" textAnchor="middle" fontSize="14" fill="#c8a84b" fontFamily="serif">⭐</text>
      {/* abbreviation */}
      <text x="50" y="52" textAnchor="middle" fontSize="8" fill="#e8c96a" fontFamily="'Courier Prime', monospace" fontWeight="bold">PDY</text>
      {/* bottom text arc */}
      <path id="arc" d="M 15,50 A 35,35 0 0,0 85,50" fill="none" />
      <text fontSize="5.5" fill="#c8a84b" fontFamily="'Courier Prime', monospace">
        <textPath href="#arc" startOffset="10%">GOVT. APPROVED · INTERNAL DEPT.</textPath>
      </text>
      {/* stars */}
      <text x="14" y="62" fontSize="5" fill="#c8a84b">★</text>
      <text x="82" y="62" fontSize="5" fill="#c8a84b">★</text>
    </svg>
  );
}

/* ── Red rubber stamp ────────────────────────────────── */
function RubberStamp({ text, show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="border-4 border-rust px-6 py-3 rotate-[-18deg]"
            style={{
              color: 'rgba(139, 58, 26, 0.85)',
              boxShadow: 'inset 0 0 0 2px rgba(139,58,26,0.3)',
            }}
            initial={{ scale: 2.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 600, damping: 18, delay: 0.3 }}
          >
            <span className="font-stamp text-rust text-2xl sm:text-3xl tracking-[0.3em] uppercase block text-center">
              {text}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Certificate ─────────────────────────────────────── */
export default function Certificate() {
  const ref      = useRef(null);
  const inView   = useInView(ref, { once: true, margin: '-8%' });
  const [stamped, setStamped] = useState(false);

  const d = CERTIFICATE_DETAILS;

  return (
    <section id="certificate" className="relative py-24 px-4 bg-ink-black overflow-hidden">
      {/* woodgrain bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(
            82deg,
            transparent,
            transparent 12px,
            rgba(140,94,42,0.3) 12px,
            rgba(140,94,42,0.3) 13px
          )`,
        }}
      />

      <div ref={ref} className="max-w-4xl mx-auto relative z-10">

        {/* section label */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-stamp text-old-gold/50 text-xs tracking-[0.4em] uppercase mb-3">Official Documentation</p>
          <h2 className="font-cinematic text-4xl sm:text-5xl font-black gold-text">
            Certificate of Authenticity
          </h2>
        </motion.div>

        {/* Certificate card */}
        <motion.div
          className="relative old-paper"
          initial={{ opacity: 0, y: 40, rotateX: 8 }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(200,168,75,0.2)' }}
        >
          <RubberStamp text="APPROVED" show={stamped} />

          {/* Certificate inner border */}
          <div className="m-4 sm:m-6 border-2 border-old-gold/40 p-6 sm:p-10 relative">
            {/* corner ornaments */}
            {['top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'].map(pos => (
              <div key={pos} className={`absolute ${pos} text-old-gold/40 text-xl pointer-events-none`}>✦</div>
            ))}

            {/* inner double border accent */}
            <div className="absolute inset-3 border border-old-gold/20 pointer-events-none" />

            {/* Header */}
            <div className="text-center mb-8 relative">
              {/* seals row */}
              <div className="flex justify-between items-start mb-4">
                <GovernmentSeal size={70} />
                <div className="flex-1 text-center px-4">
                  <p className="font-stamp text-dark-brown/60 text-[9px] tracking-[0.3em] uppercase mb-2">
                    Ministry of Incredible Finance (Internal Division)
                  </p>
                  <h3 className="font-cinematic text-3xl sm:text-4xl font-black text-dark-brown leading-tight">
                    Certificate of Verification
                  </h3>
                  <p className="font-stamp text-bronze text-xs tracking-widest mt-2 uppercase">
                    &amp; Official Authorisation
                  </p>
                  <div className="mt-3 flex justify-center gap-2 items-center">
                    <div className="h-px w-16 bg-old-gold/40" />
                    <span className="font-stamp text-old-gold/60 text-xs">✦</span>
                    <div className="h-px w-16 bg-old-gold/40" />
                  </div>
                </div>
                <GovernmentSeal size={70} />
              </div>
            </div>

            {/* Body text */}
            <div className="space-y-4 mb-8">
              <p className="font-newspaper text-dark-brown text-sm sm:text-base leading-relaxed text-center italic">
                This is to hereby certify, in the full authority vested upon us by ourselves, that the scheme known as
              </p>

              <div className="text-center py-3 border-y border-old-gold/30">
                <p className="font-cinematic text-2xl sm:text-3xl font-bold text-dark-brown">
                  "{APP_NAME}"
                </p>
                <p className="font-stamp text-bronze text-xs tracking-widest uppercase mt-1">
                  21 Seconds Mein Paisa Double
                </p>
              </div>

              <p className="font-newspaper text-dark-brown text-sm leading-relaxed text-center italic">
                has been duly examined, verified, and certified by the undersigned authority,
                and is found to be <strong>completely genuine</strong> in every possible way.
              </p>
            </div>

            {/* Details grid */}
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mb-8 font-typewriter text-xs text-dark-brown">
              {[
                { label: 'Certificate No.',    value: d.number },
                { label: 'Date of Issue',      value: d.issued },
                { label: 'Valid Until',         value: d.valid },
                { label: 'Issuing Authority',  value: d.ministry },
                { label: 'Division',            value: d.division },
                { label: 'Authorised By',       value: d.signatory },
              ].map(item => (
                <div key={item.label} className="flex gap-2 border-b border-dark-brown/10 pb-2">
                  <span className="text-bronze/70 min-w-[110px] shrink-0">{item.label}:</span>
                  <span className="text-dark-brown font-bold">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Signature area */}
            <div className="grid grid-cols-2 gap-8 pt-4 border-t border-old-gold/30">
              <div className="text-center">
                {/* signature scrawl */}
                <div className="h-10 flex items-end justify-center mb-1">
                  <svg viewBox="0 0 120 40" width="120" height="40" className="opacity-80">
                    <path
                      d="M10,30 C20,10 30,5 45,20 C55,30 60,8 75,15 C85,20 90,10 110,25"
                      fill="none" stroke="#2c1a0e" strokeWidth="1.5" strokeLinecap="round"
                    />
                    <path
                      d="M40,32 L50,28 M60,18 L65,30"
                      fill="none" stroke="#2c1a0e" strokeWidth="1" strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="border-t border-dark-brown/30 pt-1">
                  <p className="font-stamp text-dark-brown text-[9px] tracking-wide">{OFFICER}</p>
                  <p className="font-typewriter text-bronze/60 text-[8px]">Joint Secretary (Retd.)</p>
                </div>
              </div>
              <div className="text-center">
                <div className="h-10 flex items-end justify-center mb-1">
                  <GovernmentSeal size={40} />
                </div>
                <div className="border-t border-dark-brown/30 pt-1">
                  <p className="font-stamp text-dark-brown text-[9px] tracking-wide">Official Seal</p>
                  <p className="font-typewriter text-bronze/60 text-[8px]">Dept. of Wealth Multiplication</p>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="mt-6 font-typewriter text-[9px] text-dark-brown/40 text-center leading-relaxed">
              {d.disclaimer} Any resemblance to a legitimate government scheme is purely coincidental and frankly surprising.
              This certificate is valid in all jurisdictions where the holder is standing.
            </p>
          </div>
        </motion.div>

        {/* Stamp button */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <button
            onClick={() => setStamped(s => !s)}
            className="group inline-flex items-center gap-3 px-6 py-3 bg-rust/10 border border-rust/40 text-rust font-stamp text-xs tracking-widest uppercase hover:bg-rust/20 transition-all duration-300 active:scale-95"
          >
            <motion.span
              animate={stamped ? {} : { rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 2 }}
            >
              🔴
            </motion.span>
            {stamped ? 'Remove Stamp' : 'Apply Official Stamp'}
          </button>
          <p className="font-stamp text-paper-beige/20 text-[9px] tracking-widest mt-3 uppercase">
            Click to apply / remove approval stamp
          </p>
        </motion.div>
      </div>
    </section>
  );
}
