import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLogoClick } from '../hooks/useEasterEgg';
import { APP_NAME, SCHEME_CODE } from '../utils/constants';

/* ── Secret Room Modal ────────────────────────────── */
function SecretRoom({ onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative max-w-lg w-full mx-4 old-paper rounded-sm p-8 vintage-border"
          initial={{ scale: 0.6, rotate: -8, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          exit={{ scale: 0.6, rotate: 8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          onClick={e => e.stopPropagation()}
        >
          {/* top stamp */}
          <div className="text-center mb-6">
            <span className="stamp-mark inline-block font-stamp text-rust text-xs border-2 border-rust px-3 py-1 rotate-[-6deg] opacity-80">
              TOP SECRET
            </span>
          </div>

          <h2 className="font-cinematic text-2xl text-center text-ink-black mb-1">
            🕵️ Secret Room
          </h2>
          <p className="font-stamp text-center text-bronze text-xs mb-6">
            For Authorised Personnel Only
          </p>

          <ul className="space-y-3 font-typewriter text-sm text-dark-brown">
            <li className="flex gap-3"><span className="text-old-gold">▸</span>The machine was built in 1998 using spare parts from a broken radio.</li>
            <li className="flex gap-3"><span className="text-old-gold">▸</span>Ramprasad ji has never paid taxes. Neither has the machine.</li>
            <li className="flex gap-3"><span className="text-old-gold">▸</span>The "Reserve Bank connection" is actually a landline to his cousin.</li>
            <li className="flex gap-3"><span className="text-old-gold">▸</span>The certificate was typed on a used typewriter bought for ₹40.</li>
            <li className="flex gap-3"><span className="text-old-gold">▸</span>21 seconds was chosen because that is how long the kettle takes.</li>
            <li className="flex gap-3"><span className="text-old-gold">▸</span>There are ₹14,000 inside the safe. Ramprasad denies this.</li>
          </ul>

          <div className="mt-6 pt-4 border-t border-bronze/30 text-center">
            <p className="font-stamp text-xs text-bronze/60">
              — Internal Department, File No. PDY/SECRET/99 —
            </p>
          </div>

          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-dark-brown text-old-gold text-sm font-bold flex items-center justify-center hover:bg-rust transition-colors"
          >
            ✕
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Navbar ───────────────────────────────────────── */
export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const { count, active, handleClick, close } = useLogoClick(5, 3000);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Home',        href: '#hero' },
    { label: 'About Scheme', href: '#intro' },
    { label: 'Certificate', href: '#certificate' },
    { label: 'Machine',     href: '#machine' },
    { label: 'Invest Now',  href: '#payment', highlight: true },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-[500] transition-all duration-500 ${
          scrolled
            ? 'bg-ink-black/95 border-b border-old-gold/30 backdrop-blur-sm'
            : 'bg-transparent'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
      >
        {/* top ticker */}
        <div className="bg-vintage-green/80 border-b border-old-gold/20 overflow-hidden h-6">
          <motion.div
            className="font-stamp text-[10px] text-old-gold/70 whitespace-nowrap flex items-center h-full"
            animate={{ x: ['100vw', '-100%'] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          >
            📋&nbsp;SCHEME CODE: {SCHEME_CODE}&nbsp;&nbsp;|&nbsp;&nbsp;
            ⚠️&nbsp;Investment in Paisa Double Yojana is subject to supernatural risks.&nbsp;&nbsp;|&nbsp;&nbsp;
            📞&nbsp;Helpline: 1800-PAISA-DO (Not operational on weekdays)&nbsp;&nbsp;|&nbsp;&nbsp;
            🏆&nbsp;Rated #1 Money Machine in Our Own Survey 1999&nbsp;&nbsp;|&nbsp;&nbsp;
            💰&nbsp;21 SECONDS MEIN PAISA DOUBLE — GUARANTEED*&nbsp;&nbsp;|&nbsp;&nbsp;
            📋&nbsp;SCHEME CODE: {SCHEME_CODE}&nbsp;&nbsp;
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={handleClick}
            className="group flex items-center gap-3 no-select focus:outline-none"
            title={count > 0 ? `${5 - count} more clicks…` : 'Paisa Double Yojana'}
            aria-label="Logo — click 5 times for surprise"
          >
            {/* coin icon */}
            <div className="relative w-10 h-10 flex items-center justify-center">
              <motion.div
                className="w-10 h-10 rounded-full bg-gradient-to-br from-old-gold via-gold-light to-gold-dark border-2 border-gold-dark flex items-center justify-center text-ink-black font-cinematic font-black text-lg shadow-lg"
                whileHover={{ scale: 1.1, rotate: 10 }}
                animate={count > 0 ? { rotate: [0, -10, 10, -5, 5, 0] } : {}}
                transition={{ duration: 0.4 }}
              >
                ₹
              </motion.div>
              {count > 0 && (
                <motion.span
                  key={count}
                  className="absolute -top-1 -right-1 bg-rust text-dirty-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  {count}
                </motion.span>
              )}
            </div>

            <div className="hidden sm:block text-left">
              <div className="font-cinematic text-old-gold text-sm font-bold leading-tight tracking-wide group-hover:text-gold-light transition-colors">
                {APP_NAME}
              </div>
              <div className="font-stamp text-[9px] text-old-gold/50 tracking-widest uppercase leading-tight">
                Est. 1998 · Govt. Approved*
              </div>
            </div>
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`
                    relative font-stamp text-xs tracking-widest uppercase px-4 py-2 transition-all duration-200
                    ${link.highlight
                      ? 'bg-old-gold text-ink-black hover:bg-gold-light border border-gold-dark font-bold shadow-lg px-5'
                      : 'text-paper-beige/70 hover:text-old-gold'}
                  `}
                >
                  {link.label}
                  {!link.highlight && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-old-gold transition-all duration-300 group-hover:w-full" />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2 text-old-gold"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-6 h-px bg-old-gold"
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="block w-6 h-px bg-old-gold"
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className="block w-6 h-px bg-old-gold"
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            />
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="md:hidden bg-ink-black/98 border-t border-old-gold/20 px-4 pb-4"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ul className="flex flex-col gap-1 pt-2">
                {navLinks.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={`block font-stamp text-xs tracking-widest uppercase px-4 py-3 transition-all ${
                        link.highlight
                          ? 'bg-old-gold text-ink-black font-bold text-center mt-2'
                          : 'text-paper-beige/70 hover:text-old-gold border-b border-old-gold/10'
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Secret Room */}
      {active && <SecretRoom onClose={close} />}
    </>
  );
}
