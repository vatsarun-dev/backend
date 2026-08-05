import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import MachineSVG from './MachineSVG';
import { playMachineStart, playSteam } from '../utils/sounds';

export default function MoneyMachine({ onActivate }) {
  const ref     = useRef(null);
  const inView  = useInView(ref, { once: true, margin: '-10%' });
  const [running,  setRunning]  = useState(false);
  const [counter,  setCounter]  = useState(0);
  const [shake,    setShake]    = useState(false);

  const handleStart = () => {
    if (running) return;
    playMachineStart();
    setTimeout(() => playSteam(2), 400);
    setShake(true);
    setTimeout(() => setShake(false), 700);
    setRunning(true);

    // tick counter
    const iv = setInterval(() => {
      setCounter(c => c + Math.floor(Math.random() * 150 + 50));
    }, 80);

    setTimeout(() => {
      clearInterval(iv);
      onActivate();
    }, 2200);
  };

  return (
    <section id="machine" ref={ref} className="relative py-20 px-4 overflow-hidden"
      style={{ background:'linear-gradient(180deg,#0d0d0d 0%,#1a0e06 50%,#0d0d0d 100%)' }}>

      {/* ambient glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:'radial-gradient(ellipse 60% 40% at 50% 50%,rgba(200,168,75,.05) 0%,transparent 70%)' }} />

      <div className="max-w-6xl mx-auto">
        {/* header */}
        <motion.div className="text-center mb-12"
          initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.8}}>
          <p className="font-stamp text-gold/40 text-[10px] tracking-[.4em] uppercase mb-3">The Centrepiece</p>
          <h2 className="font-cin font-black text-5xl sm:text-6xl gold-text mb-3">Money Machine</h2>
          <p className="font-stamp text-mustard/50 text-sm tracking-wider">Model K-47 · Est. 1998 · Hand-Assembled</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* machine illustration */}
          <motion.div className="relative"
            initial={{opacity:0,x:-40}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:.9,delay:.2}}
            animate={shake?{x:[-6,6,-4,4,-2,2,0],y:[-3,3,-2,2,0]}:{}}
            transition={shake?{duration:.6}:{}} >
            {running && (
              <div className="absolute inset-0 pointer-events-none rounded-full"
                style={{ background:'radial-gradient(ellipse at center,rgba(200,168,75,.12) 0%,transparent 70%)', filter:'blur(20px)' }} />
            )}
            <MachineSVG running={running} counter={counter} />
          </motion.div>

          {/* specs + button */}
          <motion.div className="space-y-6"
            initial={{opacity:0,x:40}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:.9,delay:.3}}>

            {/* spec card */}
            <div className="paper border border-gold/20 p-5">
              <h3 className="font-stamp text-br-dark text-xs tracking-widest uppercase mb-4 border-b border-br-dark/20 pb-2">
                📋 Technical Specifications
              </h3>
              {[
                ['Model',         'K-47 Deluxe (Home Edition)'],
                ['Doubling Time', '21 Seconds (±19 sec)'],
                ['Input',         '₹1 (Other amounts: untested)'],
                ['Output',        '₹2 (Theoretical Maximum)'],
                ['Power',         '220V / Hope / Optimism'],
                ['Gears',         '4 installed, 2 operational'],
                ['Certified by',  'Internal Dept. (ourselves)'],
              ].map(([k,v]) => (
                <div key={k} className="flex gap-2 border-b border-br-dark/10 py-1 font-type text-xs text-br-dark">
                  <span className="text-bronze/70 min-w-[110px]">{k}:</span>
                  <span className="font-bold">{v}</span>
                </div>
              ))}
            </div>

            {/* warning */}
            <div className="border border-mustard/30 bg-mustard/5 p-4">
              <p className="font-stamp text-mustard text-xs">⚠️ WARNING</p>
              <p className="font-type text-beige/50 text-xs mt-1 leading-relaxed">
                Do not look directly at output slot. Machine may vibrate violently.
                Ramprasad ji accepts no liability. Results are purely theoretical.
              </p>
            </div>

            {/* THE BUTTON */}
            <motion.button onClick={handleStart} disabled={running}
              className={`relative w-full py-6 font-stamp font-black text-lg tracking-[.15em] uppercase overflow-hidden transition-all ${
                running
                  ? 'bg-g-dark/60 border-2 border-gold/20 text-gold/30 cursor-not-allowed'
                  : 'bg-gold text-ink border-2 border-gold-dk cursor-pointer hover:bg-gold-lt'
              }`}
              style={!running ? { boxShadow:'5px 5px 0 #9a7a2e,0 0 40px rgba(200,168,75,.3)' } : {}}
              whileHover={!running ? { scale:1.02 } : {}}
              whileTap={!running ? { scale:.96 } : {}}>
              {!running && (
                <motion.span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{x:['-100%','100%']}} transition={{duration:2,repeat:Infinity,repeatDelay:.5}} />
              )}
              <span className="relative z-10 flex items-center justify-center gap-3">
                {running
                  ? <><motion.span animate={{rotate:360}} transition={{duration:.8,repeat:Infinity,ease:'linear'}}>⚙️</motion.span> Activating…</>
                  : <>💰 Start Money Machine</>
                }
              </span>
            </motion.button>

            <p className="font-stamp text-beige/15 text-[9px] tracking-widest uppercase text-center">
              Investment: ₹1 · Expected Return: ₹2 · Time: 21 seconds
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
