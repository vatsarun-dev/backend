import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROCESSING_STEPS } from '../utils/constants';
import { playTypeKey } from '../utils/sounds';

function PrinterMachine({ active }) {
  return (
    <div className="relative mx-auto w-56 h-16 mb-6">
      {/* body */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-br-dark border-t-2 border-gold/30 flex items-center justify-between px-4">
        <div className="flex gap-1">
          {[...Array(3)].map((_,i) => (
            <motion.div key={i} className="w-2 h-2 rounded-full"
              style={{ background: active ? ['#e83030','#ffb000','#30ff60'][i] : '#333' }}
              animate={active ? { opacity:[1,.2,1] } : {}}
              transition={{ duration:.8, delay:i*.25, repeat:Infinity }} />
          ))}
        </div>
        <div className="w-20 h-2 bg-ink border border-gold/15 rounded-sm overflow-hidden">
          {active && <motion.div className="h-full bg-gold/60" animate={{ x:['-100%','100%'] }} transition={{ duration:.8,repeat:Infinity }} />}
        </div>
      </div>
      {/* paper strip */}
      <AnimatePresence>
        {active && (
          <motion.div className="absolute left-1/2 -translate-x-1/2 bg-dwhite border border-beige-dk"
            style={{ bottom:'38px', width:'140px' }}
            initial={{ height:0, opacity:0 }} animate={{ height:30, opacity:1 }} exit={{ height:0, opacity:0 }}>
            {[...Array(3)].map((_,i) => (
              <motion.div key={i} className="mx-2 mt-1 rounded-full bg-br-dark/20"
                style={{ height:'2px' }}
                initial={{ width:'0%' }} animate={{ width:`${50+Math.random()*45}%` }}
                transition={{ delay:i*.12 }} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProcessingScreen({ active, onComplete }) {
  const [current,   setCurrent]   = useState(-1);
  const [progress,  setProgress]  = useState(0);
  const [done,      setDone]      = useState(false);

  useEffect(() => {
    if (!active) { setCurrent(-1); setProgress(0); setDone(false); return; }
    let total = 0;
    PROCESSING_STEPS.forEach((step, i) => { total += step.dur; });

    let elapsed = 0;
    PROCESSING_STEPS.forEach((step, i) => {
      setTimeout(() => {
        setCurrent(i);
        setProgress(Math.round(((i + 1) / PROCESSING_STEPS.length) * 100));
        playTypeKey();
        if (i === PROCESSING_STEPS.length - 1) {
          setTimeout(() => { setDone(true); setTimeout(onComplete, 800); }, step.dur - 200);
        }
      }, elapsed);
      elapsed += step.dur;
    });
  }, [active]);

  if (!active) return null;

  return (
    <motion.div className="fixed inset-0 z-[800] flex items-center justify-center"
      style={{ background:'rgba(10,5,0,.96)', backdropFilter:'blur(4px)' }}
      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>

      {/* scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-15"
        style={{ backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.5) 2px,rgba(0,0,0,.5) 4px)' }} />

      <div className="w-full max-w-xl mx-4 relative z-10">

        {/* header LED */}
        <div className="led led-amber text-center py-3 px-6 mb-6 font-mono text-sm tracking-widest">
          ⚙ PAISA DOUBLE YOJANA — PROCESSING ⚙
        </div>

        {/* progress bar */}
        <div className="mb-5">
          <div className="flex justify-between text-[10px] font-stamp text-gold/50 mb-1">
            <span className="uppercase tracking-widest">Wealth Transfer Progress</span>
            <span className="font-mono text-crt">{progress}%</span>
          </div>
          <div className="h-4 bg-ink border border-gold/20 overflow-hidden">
            <motion.div className="h-full relative overflow-hidden"
              style={{ width:`${progress}%`, background:'linear-gradient(90deg,#2d5a3d,#c8a84b,#d4a017)' }}
              transition={{ duration:.3 }}>
              <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                animate={{ x:['-100%','200%'] }} transition={{ duration:.8,repeat:Infinity }} />
            </motion.div>
          </div>
        </div>

        <PrinterMachine active={!done} />

        {/* message list terminal */}
        <div className="border border-gold/15 overflow-hidden"
          style={{ boxShadow:'inset 0 0 30px rgba(0,0,0,.6)' }}>
          <div className="bg-br-dark/80 px-4 py-2 flex items-center gap-2 border-b border-gold/15">
            {['#e83030','#ffb000','#30ff60'].map(c => <div key={c} className="w-2 h-2 rounded-full" style={{background:c}} />)}
            <span className="font-mono text-[9px] text-gold/30 ml-2">WEALTH.EXE — Processing Log</span>
          </div>
          <div className="max-h-60 overflow-y-auto divide-y divide-gold/8">
            {PROCESSING_STEPS.map((step, i) => {
              const state = i < current ? 'done' : i === current ? 'active' : 'pending';
              return (
                <motion.div key={i}
                  className={`flex items-center gap-3 px-4 py-2.5 ${state==='active'?'bg-crt/5':''}`}
                  initial={{ opacity:0 }} animate={{ opacity: state==='pending'?.25:1 }}>
                  <span className="w-5 text-center text-sm shrink-0">
                    {state==='done'?<span className="text-gold">✓</span>
                    :state==='active'?<motion.span className="text-crt inline-block" animate={{rotate:360}} transition={{duration:.8,repeat:Infinity,ease:'linear'}}>⚙</motion.span>
                    :<span className="text-gold/20">○</span>}
                  </span>
                  <span className="text-lg shrink-0">{step.icon}</span>
                  <span className={`font-type text-xs flex-1 ${state==='active'?'text-crt':'text-beige/60'}`}
                    style={state==='active'?{textShadow:'0 0 6px rgba(0,255,65,.4)'}:{}}>
                    {state==='active' ? <span className="tw-cursor">{step.label}</span> : step.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        <AnimatePresence>
          {done && (
            <motion.div className="text-center mt-5"
              initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}}
              transition={{type:'spring',stiffness:300}}>
              <div className="inline-block border-2 border-gold px-8 py-3"
                style={{boxShadow:'0 0 30px rgba(200,168,75,.3)'}}>
                <span className="font-stamp text-gold text-sm tracking-[.3em] uppercase">✦ Transfer Complete ✦</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
