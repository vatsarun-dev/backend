import { motion } from 'framer-motion';
import { APP_NAME, SCHEME_CODE, OFFICE_NAME, OFFICER } from '../utils/constants';

/* ── Typewriter line row ─────────────────────────────── */
function FooterLink({ children, href = '#' }) {
  return (
    <a
      href={href}
      className="font-stamp text-[10px] tracking-widest text-paper-beige/30 hover:text-old-gold transition-colors uppercase"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-ink-black border-t border-old-gold/10 overflow-hidden">

      {/* top ornament border */}
      <div className="h-px bg-gradient-to-r from-transparent via-old-gold/40 to-transparent" />

      {/* woodgrain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            88deg, transparent, transparent 14px,
            rgba(140,94,42,0.4) 14px, rgba(140,94,42,0.4) 15px
          )`,
        }}
      />

      <div className="max-w-6xl mx-auto px-6 py-14 relative z-10">

        {/* top section */}
        <div className="grid sm:grid-cols-3 gap-8 mb-12">

          {/* brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-old-gold to-gold-dark flex items-center justify-center text-ink-black font-cinematic font-black text-lg">
                ₹
              </div>
              <div>
                <p className="font-cinematic text-old-gold text-sm font-bold">{APP_NAME}</p>
                <p className="font-stamp text-[9px] text-old-gold/40 tracking-widest uppercase">Est. 1998</p>
              </div>
            </div>
            <p className="font-typewriter text-paper-beige/30 text-xs leading-relaxed">
              India's most optimistic money-doubling scheme.
              Registered under no particular act.
            </p>
          </div>

          {/* links */}
          <div>
            <p className="font-stamp text-old-gold/50 text-[9px] tracking-[0.3em] uppercase mb-4">Useful Links</p>
            <ul className="space-y-2">
              {['Home', 'About Scheme', 'Certificate', 'The Machine', 'Invest Now', 'Refund Policy (N/A)'].map(l => (
                <li key={l}><FooterLink href="#">{l}</FooterLink></li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div>
            <p className="font-stamp text-old-gold/50 text-[9px] tracking-[0.3em] uppercase mb-4">Contact Office</p>
            <div className="space-y-2 font-typewriter text-xs text-paper-beige/30">
              <p>📍 Room No. 4, Near Samosa Stall,<br />Chandni Chowk, New Delhi – 110006</p>
              <p>📞 1800-PAISA-DO<br /><span className="text-[9px] text-paper-beige/20">(Not operational on weekdays)</span></p>
              <p>✉️ ramprasad@internaldepart.net<br /><span className="text-[9px] text-paper-beige/20">(Bounces. We know.)</span></p>
              <p>🕙 Office Hours: 10am – 10:21am</p>
            </div>
          </div>
        </div>

        {/* certificate strip */}
        <div className="border border-old-gold/20 bg-dark-green/10 px-6 py-4 mb-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-stamp text-old-gold text-[10px] tracking-[0.3em] uppercase mb-1">Certification Details</p>
              <p className="font-typewriter text-paper-beige/40 text-xs">
                Scheme Code: {SCHEME_CODE} &nbsp;|&nbsp; Authorised: {OFFICER} &nbsp;|&nbsp; Dept: Internal
              </p>
            </div>
            <div className="text-right">
              <div className="inline-block border border-old-gold/30 px-4 py-2">
                <p className="font-stamp text-old-gold/60 text-[9px] tracking-widest uppercase">Status</p>
                <motion.p
                  className="font-stamp text-crt-green text-xs"
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ textShadow: '0 0 6px #00ff41' }}
                >
                  ● ACTIVE (Mostly)
                </motion.p>
              </div>
            </div>
          </div>
        </div>

        {/* disclaimer wall */}
        <div className="mb-8 p-4 border border-paper-beige/5 bg-paper-beige/[0.02]">
          <p className="font-stamp text-[9px] text-paper-beige/20 tracking-widest uppercase mb-2">⚠ Legal Disclaimer</p>
          <p className="font-typewriter text-[9px] text-paper-beige/20 leading-relaxed">
            {OFFICE_NAME} is a fictional company created purely for entertainment purposes.
            "Paisa Double Yojana" is a satirical comedy experience. No real financial advice is offered,
            implied, or accidentally given. No actual money is collected, doubled, tripled, or handled
            in any way. Any resemblance to real financial schemes is coincidental and mildly concerning.
            The operator (Ramprasad ji) is not responsible for emotional expectations, unfulfilled dreams,
            or broken faith in the judicial system. Investment is subject to supernatural risks.
            Past performance of the machine is not indicative of future performance, mainly because it
            has no past performance. ₹1 invested is ₹1 you could have spent on chai. Scheme Code: {SCHEME_CODE}.
            This website uses no cookies, because cookies are expensive and the budget went into the machine.
          </p>
        </div>

        {/* bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-old-gold/10">
          <p className="font-stamp text-[9px] text-paper-beige/20 tracking-widest">
            © {year} {OFFICE_NAME}. All rights reserved (theoretically).
          </p>
          <div className="flex items-center gap-4">
            <FooterLink>Privacy Policy</FooterLink>
            <span className="text-paper-beige/10">·</span>
            <FooterLink>Terms of Service</FooterLink>
            <span className="text-paper-beige/10">·</span>
            <FooterLink>Refund Policy</FooterLink>
          </div>
        </div>

        {/* made with love */}
        <p className="text-center font-stamp text-[9px] text-paper-beige/10 tracking-widest mt-6 uppercase">
          Crafted with ₹1 and unlimited hope · Internal Department, 1998–{year}
        </p>
      </div>
    </footer>
  );
}
