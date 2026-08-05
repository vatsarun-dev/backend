import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ERROR_POPUPS } from '../utils/constants';
import { startAlarm, stopAlarm, playPowerCut, playSteam, playStamp } from '../utils/sounds';

/* ── Win98 Popup ──────────────────────────────────── */
function Win98Popup({ popup, onClose, zIndex }) {
  return (
    <motion.div className="fixed pointer-events-auto win98"
      style={{ zIndex, top:'50%', left:'50%', width:'320px',
               transform:`translate(calc(-50% + ${(popup.id-2)*60}px), calc(-50% + ${(popup.id-2)*40}px))` }}
      initial={{ scale:.4, opacity:0, y:-40 }}
      animate={{ scale:1, opacity:1, y:0 }}
      exit={{ scale:.7, opacity:0 }}
      transition={{ type:'spring', stiffness:400, damping:22 }}>
      <div className="win98-title cursor-move select-none">
        <span className="font-stamp text-white text-[11px]">{popup.title}</span>
        <div className="flex gap-1">
          <div className="win98-btn">_</div>
          <div className="win98-btn">□</div>
          <button className="win98-btn font-bold hover:bg-red-600 hover:text-white" onClick={onClose}>✕</button>
        </div>
      </div>
      <div className="p-4 bg-[#c0c0c0]">
        <div className="flex gap-3 items-start">
          <span className="text-3xl shrink-0">{popup.icon}</span>
          <p className="font-type text-xs text-black leading-relaxed whitespace-pre-line">{popup.body}</p>
        </div>
        <div className="mt-3 flex justify-center">
          <button className="win98-btn px-6 py-1.5 font-stamp text-[11px] text-black hover:bg-[#d4d4d4]"
            style={{width:'auto', boxShadow:'1px 1px 0 #fff inset,-1px -1px 0 #888 inset'}}
            onClick={onClose}>OK</button>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Money rain ───────────────────────────────────── */
function MoneyRain({ active }) {
  if (!active) return null;
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[7000]">
      {[...Array(30)].map((_,i) => (
        <motion.div key={i} className="absolute"
          style={{ left:`${Math.random()*100}vw`, top:'-30px', width:'40px', height:'20px',
                   background:'linear-gradient(135deg,#2d5a1e,#3a7a28)', border:'1px solid #4a8a34',
                   zIndex:7000 }}
          initial={{ y:0, rotate:0, opacity:1 }}
          animate={{ y:'110vh', rotate: (Math.random()-.5)*720, x:(Math.random()-.5)*100, opacity:[1,1,.4] }}
          transition={{ duration:1.5+Math.random()*2, delay:Math.random()*1.5, ease:'easeIn' }}>
          <div className="flex items-center justify-center h-full font-mono text-gold/50 text-[8px]">₹</div>
        </motion.div>
      ))}
      {/* confetti */}
      {[...Array(60)].map((_,i) => (
        <motion.div key={`c${i}`} className="absolute rounded-sm"
          style={{ left:`${Math.random()*100}vw`, top:'-10px',
                   width:`${6+Math.random()*8}px`, height:`${6+Math.random()*8}px`,
                   background: ['#c8a84b','#d4a017','#2d5a3d','#8c5e2a','#e8c96a'][i%5] }}
          animate={{ y:'110vh', rotate:(Math.random()-.5)*1080, x:(Math.random()-.5)*80 }}
          transition={{ duration:1.8+Math.random()*2, delay:Math.random()*2, ease:'easeIn' }} />
      ))}
    </div>
  );
}

/* ── Pressure gauge going wild ────────────────────── */
function ExplodingGauge() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80">
      <circle cx="40" cy="40" r="36" fill="#1a0e06" stroke="#c8a84b" strokeWidth="2" />
      <circle cx="40" cy="40" r="30" fill="#080808" />
      <motion.line x1="40" y1="40" x2="40" y2="15" stroke="#e83030" strokeWidth="2" strokeLinecap="round"
        animate={{ rotate:[0,300,260,320,290,310] }}
        transition={{ duration:.3, repeat:Infinity, ease:'linear' }}
        style={{ transformOrigin:'40px 40px' }} />
      <circle cx="40" cy="40" r="4" fill="#c8a84b" />
      <text x="40" y="65" textAnchor="middle" fontSize="7" fill="#e83030" fontFamily="monospace">MAX!</text>
    </svg>
  );
}

export default function SuccessScreen({ show }) {
  const [phase, setPhase]         = useState(0);
  // 0=hidden 1=celebrate 2=machine-crazy 3=power-cut 4=popups 5=final
  const [popups, setPopups]       = useState([]);
  const [closed, setClosed]       = useState([]);
  const [shake, setShake]         = useState(false);
  const [dark, setDark]           = useState(false);

  const doShake = useCallback(() => { setShake(true); setTimeout(() => setShake(false), 600); }, []);

  useEffect(() => {
    if (!show) { setPhase(0); setDark(false); setClosed([]); setPopups([]); return; }

    setPhase(1); doShake();
    startAlarm();

    const t2 = setTimeout(() => { setPhase(2); doShake(); playSteam(2); }, 3500);
    const t3 = setTimeout(() => {
      setPhase(3);
      stopAlarm();
      playPowerCut();
      setDark(true);
      doShake();
    }, 6000);

    const t4 = setTimeout(() => { setPhase(4); setDark(false); }, 7000);

    // stagger popups
    let popupSet = [];
    ERROR_POPUPS.forEach(p => {
      const t = setTimeout(() => {
        setPopups(prev => [...prev, p.id]);
        playStamp();
        doShake();
      }, 7000 + p.delay);
      popupSet.push(t);
    });

    const t5 = setTimeout(() => setPhase(5), 15000);

    return () => { [t2,t3,t4,t5,...popupSet].forEach(clearTimeout); stopAlarm(); };
  }, [show]);

  if (!show) return null;

  const closePopup = (id) => { setClosed(c => [...c, id]); doShake(); };

  return (
    <motion.div className="fixed inset-0 z-[700] flex items-center justify-center overflow-hidden"
      initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:.6 }}
      style={{ background: dark
        ? '#000'
        : phase<=2
          ? 'linear-gradient(135deg,#1a3a2a 0%,#0d2218 50%,#2c1a0e 100%)'
          : 'linear-gradient(135deg,#0a0a0a 0%,#0d0d0d 100%)' }}>

      <MoneyRain active={phase===1||phase===2} />

      {/* popups */}
      <AnimatePresence>
        {ERROR_POPUPS.map((p,i) =>
          popups.includes(p.id) && !closed.includes(p.id) && (
            <Win98Popup key={p.id} popup={p} zIndex={9000+i} onClose={() => closePopup(p.id)} />
          )
        )}
      </AnimatePresence>

      {/* red emergency light */}
      {phase===3 && (
        <motion.div className="absolute inset-0 pointer-events-none"
          style={{ background:'rgba(139,26,26,.6)' }}
          animate={{ opacity:[.6,.3,.6] }} transition={{ duration:.4,repeat:Infinity }} />
      )}

      <motion.div className="relative z-10 text-center px-6 max-w-2xl"
        animate={shake?{x:[-8,8,-6,6,-4,4,0],y:[-4,4,-3,3,0]}:{}}
        transition={shake?{duration:.5}:{}}>

        <AnimatePresence mode="wait">

          {/* Phase 1-2: celebration */}
          {(phase===1||phase===2) && (
            <motion.div key="celebrate" exit={{opacity:0}} transition={{duration:.4}}>
              <motion.div className="text-7xl mb-6" animate={{scale:[1,1.2,1],rotate:[-5,5,0]}} transition={{duration:1.5,repeat:Infinity}}>🏆</motion.div>
              <div className={phase===2?'glitch':''}>
                <h1 className="font-cin font-black text-5xl sm:text-7xl gold-text mb-4" style={{textShadow:'0 0 40px rgba(200,168,75,.5)'}}>
                  Congratulations!
                </h1>
              </div>
              <p className="font-stamp text-xl text-mustard/80 tracking-wide mb-6">Your investment has multiplied.</p>
              {phase===2 && (
                <>
                  <div className="flex justify-center gap-4 mb-4">
                    {[...Array(3)].map((_,i) => <ExplodingGauge key={i} />)}
                  </div>
                  <motion.p className="font-type text-crt text-sm" animate={{opacity:[1,0,1]}}
                    transition={{duration:.3,repeat:Infinity}} style={{textShadow:'0 0 8px #00ff41'}}>
                    ⚠ WARNING: MACHINE OVERLOADING… PRESSURE CRITICAL…
                  </motion.p>
                </>
              )}
            </motion.div>
          )}

          {/* Phase 3: power cut */}
          {phase===3 && (
            <motion.div key="powercut" className="text-center"
              initial={{opacity:0}} animate={{opacity:1}}>
              <p className="font-stamp text-rust text-2xl tracking-widest animate-pulse">⚡ POWER CUT ⚡</p>
            </motion.div>
          )}

          {/* Phase 4: glitching with popups */}
          {phase===4 && (
            <motion.div key="glitch-phase" className="glitch"
              initial={{opacity:0}} animate={{opacity:1}}>
              <p className="font-stamp text-crt text-xl tracking-widest" style={{textShadow:'0 0 10px #00ff41'}}>
                SYSTEM FAILURE
              </p>
            </motion.div>
          )}

          {/* Phase 5: XP screen */}
          {phase===5 && (
            <motion.div key="xp" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.9,ease:[.16,1,.3,1]}}>
              <motion.div className="w-32 h-32 rounded-full border-4 border-gold mx-auto mb-6 flex flex-col items-center justify-center"
                style={{background:'radial-gradient(circle,#1a3a2a,#0d0d0d)',boxShadow:'0 0 50px rgba(200,168,75,.4)'}}
                initial={{scale:0,rotate:-15}} animate={{scale:1,rotate:0}}
                transition={{type:'spring',stiffness:300,damping:18,delay:.2}}>
                <span className="font-cin font-black text-gold text-2xl leading-none">+100</span>
                <span className="font-stamp text-mustard text-xs tracking-widest uppercase">XP</span>
              </motion.div>

              <h2 className="font-cin font-black text-4xl sm:text-5xl gold-text mb-3">You Earned</h2>
              <p className="font-stamp text-2xl text-mustard tracking-widest mb-6">+100 Experience Points</p>

              {[
                { icon:'💡', text:'Financial Knowledge: Increased' },
                { icon:'🍀', text:'Luck Index: Significantly Increased' },
                { icon:'💰', text:'Money: Unchanged (₹1 spent, ₹0 returned)' },
              ].map((item,i) => (
                <motion.div key={i} className="flex items-center gap-3 bg-g-dark/30 border border-gold/15 px-5 py-3 mb-2 max-w-sm mx-auto"
                  initial={{opacity:0,x:-30}} animate={{opacity:1,x:0}} transition={{delay:.5+i*.15}}>
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-type text-beige/70 text-sm">{item.text}</span>
                </motion.div>
              ))}

              <motion.div className="mt-6" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.2}}>
                <p className="font-stamp text-gold/30 text-xs tracking-widest mb-4">
                  — Profit converted into Experience by Internal Department —
                </p>
                <button className="px-8 py-3 border border-gold/40 text-gold font-stamp text-xs tracking-widest uppercase hover:bg-gold/10 transition-all"
                  onClick={() => window.scrollTo({top:0,behavior:'smooth'})}>
                  ↑ Try Again (Same Result)
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
