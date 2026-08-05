import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { APP_NAME, SCHEME_CODE, OFFICER, INVESTMENT } from '../utils/constants';

/* ── Perforation edge ────────────────────────────────── */
function PerforationEdge({ side = 'top' }) {
  const isTopBottom = side === 'top' || side === 'bottom';
  return (
    <div className={`absolute ${
      side === 'top'    ? 'top-0 left-0 right-0 h-3 flex flex-row'
      : side === 'bottom' ? 'bottom-0 left-0 right-0 h-3 flex flex-row'
      : side === 'left'   ? 'left-0 top-0 bottom-0 w-3 flex flex-col'
      : 'right-0 top-0 bottom-0 w-3 flex flex-col'
    } overflow-hidden pointer-events-none`}
    >
      {Array.from({ length: isTopBottom ? 40 : 20 }).map((_, i) => (
        <div
          key={i}
          className={`${isTopBottom ? 'w-3 h-3' : 'w-3 h-3'} rounded-full bg-ink-black shrink-0`}
          style={{ margin: isTopBottom ? '0 2px' : '2px 0' }}
        />
      ))}
    </div>
  );
}

/* ── Amount display ──────────────────────────────────── */
function AmountBadge() {
  return (
    <div className="text-center py-8">
      <p className="font-stamp text-dark-brown/50 text-xs tracking-[0.3em] uppercase mb-2">
        Total Investment Amount
      </p>
      <div className="inline-flex items-baseline gap-1">
        <span className="font-cinematic text-7xl sm:text-8xl font-black text-dark-brown leading-none"
          style={{ textShadow: '2px 2px 0 rgba(44,26,14,0.2)' }}
        >
          {INVESTMENT}
        </span>
      </div>
      <p className="font-typewriter text-dark-brown/40 text-xs mt-2">
        (Rupees One Only)
      </p>
      <div className="mt-4 flex justify-center gap-2 items-center">
        <div className="h-px w-12 bg-old-gold/40" />
        <span className="font-stamp text-old-gold/40 text-xs">✦</span>
        <div className="h-px w-12 bg-old-gold/40" />
      </div>
    </div>
  );
}

/* ── Receipt row ─────────────────────────────────────── */
function ReceiptRow({ label, value, bold = false, highlight = false }) {
  return (
    <div className={`flex justify-between items-baseline py-1.5 border-b border-dark-brown/10 font-typewriter text-xs ${
      highlight ? 'bg-old-gold/10 -mx-2 px-2' : ''
    }`}>
      <span className={`text-dark-brown/60 ${bold ? 'font-bold' : ''}`}>{label}</span>
      <span className={`${bold ? 'font-bold text-dark-brown' : 'text-dark-brown/80'} ${highlight ? 'text-rust font-bold' : ''}`}>
        {value}
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   PAYMENT CARD
══════════════════════════════════════════════════════ */
export default function PaymentCard({ onPay, isPaid }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-5%' });

  const receiptNo = `REC/${new Date().getFullYear()}/PDY/${Math.floor(Math.random() * 90000 + 10000)}`;
  const now       = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <section id="payment" className="relative py-24 px-4 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1008 50%, #0a0a0a 100%)',
      }}
    >
      {/* ambient paper-yellow glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(240,230,200,0.03) 0%, transparent 70%)' }}
      />

      <div ref={ref} className="max-w-lg mx-auto relative z-10">

        {/* header */}
        <motion.div className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-stamp text-old-gold/50 text-xs tracking-[0.4em] uppercase mb-3">Final Step</p>
          <h2 className="font-cinematic text-4xl sm:text-5xl font-black gold-text mb-2">
            Investment Receipt
          </h2>
          <p className="font-stamp text-mustard/50 text-xs tracking-wider">
            Please retain for your records (and for emotional closure)
          </p>
        </motion.div>

        {/* Receipt card */}
        <motion.div
          className="relative receipt-paper pt-8 pb-8"
          style={{
            boxShadow: '0 20px 60px rgba(0,0,0,0.6), 4px 4px 0 rgba(200,168,75,0.2)',
          }}
          initial={{ opacity: 0, y: 40, rotate: -1 }}
          animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <PerforationEdge side="top" />
          <PerforationEdge side="bottom" />

          <div className="px-6 sm:px-8">
            {/* receipt header */}
            <div className="text-center mb-6 pb-4 border-b-2 border-dashed border-dark-brown/20">
              <p className="font-stamp text-dark-brown text-[10px] tracking-[0.4em] uppercase mb-1">
                Shri Dhanlaxmi Financial Services Pvt. Ltd.
              </p>
              <h3 className="font-cinematic text-xl font-black text-dark-brown">
                {APP_NAME}
              </h3>
              <p className="font-stamp text-bronze text-[9px] tracking-widest mt-1 uppercase">
                Official Payment Receipt
              </p>
            </div>

            {/* meta */}
            <div className="mb-4 space-y-0.5">
              <ReceiptRow label="Receipt No."    value={receiptNo} />
              <ReceiptRow label="Date"           value={now} />
              <ReceiptRow label="Scheme Code"    value={SCHEME_CODE} />
              <ReceiptRow label="Investor Name"  value="Valued Customer Ji" />
              <ReceiptRow label="Authorised By"  value={OFFICER} />
            </div>

            {/* separator */}
            <div className="border-t-2 border-dashed border-dark-brown/20 my-4" />

            {/* amount */}
            <AmountBadge />

            {/* breakdown */}
            <div className="mb-4 space-y-0.5">
              <ReceiptRow label="Principal Amount"     value="₹1.00" />
              <ReceiptRow label="Processing Fee"       value="₹0.00" />
              <ReceiptRow label="Astrologer Charges"   value="₹0.00" />
              <ReceiptRow label="Machine Warming Fee"  value="₹0.00" />
              <ReceiptRow label="Peon Tip (Optional)"  value="₹0.00" />
              <ReceiptRow label="Grand Total"          value="₹1.00" bold highlight />
            </div>

            {/* separator */}
            <div className="border-t-2 border-dashed border-dark-brown/20 my-4" />

            {/* expected returns */}
            <div className="bg-dark-green/10 border border-dark-green/20 p-4 mb-6 text-center">
              <p className="font-stamp text-dark-brown/60 text-[9px] tracking-[0.3em] uppercase mb-1">Expected Return (21 seconds)</p>
              <p className="font-cinematic text-4xl font-black text-dark-brown">₹2</p>
              <p className="font-typewriter text-dark-brown/40 text-[9px] mt-1">
                *Subject to machine availability, Ramprasad ji's mood, and cosmic alignment
              </p>
            </div>

            {/* CTA button */}
            <motion.button
              onClick={onPay}
              disabled={isPaid}
              className={`
                w-full py-5 font-stamp font-bold text-sm tracking-[0.25em] uppercase relative overflow-hidden
                transition-all duration-300
                ${isPaid
                  ? 'bg-dark-green/30 text-old-gold/40 border-2 border-old-gold/20 cursor-not-allowed'
                  : 'bg-dark-brown text-old-gold border-2 border-old-gold cursor-pointer hover:bg-bronze'
                }
              `}
              style={!isPaid ? { boxShadow: '3px 3px 0 #9a7a2e, 0 0 20px rgba(200,168,75,0.15)' } : {}}
              whileHover={!isPaid ? { scale: 1.01 } : {}}
              whileTap={!isPaid ? { scale: 0.98 } : {}}
            >
              {!isPaid && (
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-old-gold/10 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 0.5 }}
                />
              )}
              <span className="relative z-10">
                {isPaid ? '✓ Investment Received' : '💰 Start Money Machine — Pay ₹1'}
              </span>
            </motion.button>

            {/* fine print */}
            <p className="font-typewriter text-[8px] text-dark-brown/30 text-center mt-4 leading-relaxed">
              By proceeding you agree that Shri Dhanlaxmi Financial Services Pvt. Ltd. has no legal obligations,
              physical address, or working telephone. Any profit is theoretical. Ramprasad ji's decision is final.
            </p>

            {/* barcode-like decoration */}
            <div className="mt-4 flex justify-center gap-px">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i}
                  className="bg-dark-brown/40"
                  style={{
                    width:  `${Math.random() > 0.5 ? 2 : 1}px`,
                    height: `${20 + Math.random() * 10}px`,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
