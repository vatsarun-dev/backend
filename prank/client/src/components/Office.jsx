import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { playRing, playStamp, playDoorBell, startCashCounter, stopCashCounter } from '../utils/sounds';
import { FAKE_CALLS, REGISTER_ENTRIES } from '../utils/constants';

/* ─── Ceiling Fan ──────────────────────────────────── */
function CeilingFan({ fast }) {
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-20"
      onClick={() => {}}>
      <div className="w-1.5 h-14 bg-bronze/50" />
      <motion.div className="relative w-28 h-28"
        animate={{ rotate: 360 }} transition={{ duration: fast ? 0.8 : 3, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: 'center' }}>
        {[0,90,180,270].map(deg => (
          <div key={deg} className="absolute top-1/2 left-1/2 origin-left"
            style={{ transform:`rotate(${deg}deg) translateY(-50%)`, width:'52px', height:'14px',
                     marginLeft:'-4px', marginTop:'-7px' }}>
            <div className="w-full h-full bg-br-dark/90 border border-bronze/30 rounded-full"
              style={{ borderRadius:'50% 80% 80% 50%/50%' }} />
          </div>
        ))}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-bronze border-2 border-gold-dk z-10" />
      </motion.div>
    </div>
  );
}

/* ─── Tube Light ───────────────────────────────────── */
function TubeLight() {
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-56 pointer-events-none z-10"
      style={{ height:'6px', filter:'blur(3px)', boxShadow:'0 0 30px 8px rgba(255,255,200,.15)' }}>
      <div className="w-full h-full flicker"
        style={{ background:'rgba(255,255,200,.7)' }} />
    </div>
  );
}

/* ─── Clock ────────────────────────────────────────── */
function WallClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(id); }, []);
  const s = time.getSeconds() * 6;
  const m = (time.getMinutes() + time.getSeconds() / 60) * 6;
  const h = ((time.getHours() % 12) + time.getMinutes() / 60) * 30;
  return (
    <div className="absolute top-12 right-8 opacity-40 pointer-events-none z-20">
      <svg width="52" height="52" viewBox="0 0 52 52">
        <circle cx="26" cy="26" r="24" fill="none" stroke="#c8a84b" strokeWidth="1.5" />
        <circle cx="26" cy="26" r="22" fill="#1a1008" />
        {[...Array(12)].map((_,i) => {
          const a = (i/12)*Math.PI*2; const r1=18, r2=i%3===0?15:17;
          return <line key={i} x1={26+r2*Math.sin(a)} y1={26-r2*Math.cos(a)} x2={26+r1*Math.sin(a)} y2={26-r1*Math.cos(a)} stroke="#c8a84b" strokeWidth={i%3===0?1.5:.7} />;
        })}
        <line x1="26" y1="26" x2={26+12*Math.sin(h*Math.PI/180)} y2={26-12*Math.cos(h*Math.PI/180)} stroke="#c8a84b" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="26" y1="26" x2={26+16*Math.sin(m*Math.PI/180)} y2={26-16*Math.cos(m*Math.PI/180)} stroke="#e8c96a" strokeWidth="1.2" strokeLinecap="round" />
        <motion.line x1="26" y1="26" x2={26+18*Math.sin(s*Math.PI/180)} y2={26-18*Math.cos(s*Math.PI/180)} stroke="#e83030" strokeWidth=".8" strokeLinecap="round" animate={{rotate:0}} />
        <circle cx="26" cy="26" r="2" fill="#c8a84b" />
      </svg>
    </div>
  );
}

/* ─── CRT Monitor ──────────────────────────────────── */
function CRTMonitor({ text = 'C:\\PDY> _', color = '#00ff41' }) {
  return (
    <div className="relative" style={{ width:'140px' }}>
      <div className="rounded-sm overflow-hidden crt"
        style={{ background:'#1a1a1a', border:'5px solid #222', boxShadow:'4px 4px 0 #111,0 0 20px rgba(0,0,0,.8)' }}>
        <div className="relative bg-[#060c06] p-2" style={{ minHeight:'70px' }}>
          <div className="absolute inset-0 rounded-sm pointer-events-none"
            style={{ background:'radial-gradient(ellipse at center,transparent 55%,rgba(0,0,0,.6) 100%)' }} />
          <p className="font-mono text-[8px] leading-relaxed relative z-10"
            style={{ color, textShadow:`0 0 4px ${color}` }}>{text}</p>
        </div>
      </div>
      <div className="mx-auto w-10 h-2 bg-[#1a1a1a]" />
      <div className="mx-auto w-16 h-2 bg-[#111] rounded-b-sm" />
    </div>
  );
}

/* ─── Rotary Phone ─────────────────────────────────── */
function RotaryPhone({ onCall }) {
  const [ringing, setRinging] = useState(false);
  useEffect(() => {
    const id = setInterval(() => { setRinging(true); playRing(); setTimeout(() => setRinging(false), 600); }, 8000 + Math.random() * 6000);
    return () => clearInterval(id);
  }, []);
  return (
    <motion.div
      className="cursor-pointer select-none relative z-30"
      animate={ringing ? { x:[-2,2,-2,2,0], y:[-1,1,-1,1,0] } : {}}
      transition={{ duration:.15, repeat: ringing ? 4 : 0 }}
      onClick={() => { onCall(); playRing(); }}
      title="Click to answer"
    >
      <div className="w-16 h-10 bg-br-dark rounded-sm border border-bronze/40 flex flex-col items-center justify-center gap-1 relative"
        style={{ boxShadow:'2px 2px 0 #111' }}>
        <div className="w-12 h-1.5 bg-bronze/60 rounded-full" />
        <div className="w-10 h-4 bg-br-mid rounded-sm grid grid-cols-3 gap-px p-0.5">
          {[...Array(9)].map((_,i) => <div key={i} className="bg-ink/60 rounded-[1px]" />)}
        </div>
        {ringing && <motion.div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-gold" animate={{scale:[1,1.4,1]}} transition={{duration:.3,repeat:Infinity}} />}
      </div>
    </motion.div>
  );
}

/* ─── Steel Cupboard ───────────────────────────────── */
function SteelCupboard({ onOpen }) {
  const [open, setOpen] = useState(false);
  const toggle = () => { setOpen(o => !o); if (!open) onOpen(); };
  return (
    <motion.div className="cursor-pointer select-none" onClick={toggle} title="Open cupboard"
      whileHover={{ scale:1.02 }} style={{ zIndex:30 }}>
      <div className="w-20 h-28 bg-g-dark border border-gold/20 relative overflow-hidden"
        style={{ boxShadow:'3px 3px 0 #111,inset 0 0 20px rgba(0,0,0,.4)' }}>
        {/* door line */}
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gold/20" />
        {/* hinges */}
        {[20,72].map(t => <div key={t} className="absolute right-2 w-2 h-1.5 bg-bronze/60 rounded-sm" style={{top:`${t}%`}} />)}
        {/* handle */}
        <div className="absolute left-1/2 top-1/2 -translate-y-1/2 w-1 h-4 bg-gold/40 rounded-full" style={{marginLeft:'-2px'}} />
        {/* label */}
        <div className="absolute bottom-2 left-0 right-0 text-center">
          <span className="font-stamp text-[7px] text-gold/40 tracking-wider">FILE CABINET</span>
        </div>
        {/* open reveal */}
        <AnimatePresence>
          {open && (
            <motion.div className="absolute inset-0 bg-ink/90 flex flex-col items-center justify-center gap-1 p-2 z-10"
              initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
              {[...Array(3)].map((_,i) => (
                <div key={i} className="w-full h-5 bg-gold/20 border border-gold/30 flex items-center justify-center">
                  <span className="font-stamp text-[6px] text-gold/60">BUNDLE {i+1}</span>
                </div>
              ))}
              <span className="font-stamp text-[7px] text-gold/40 mt-1">₹ ₹ ₹</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ─── Cash Bundles ─────────────────────────────────── */
function CashBundles({ onHover }) {
  const [flying, setFlying] = useState(false);
  const trigger = () => { setFlying(true); onHover(); setTimeout(() => setFlying(false), 1500); };
  return (
    <div className="relative cursor-pointer" onMouseEnter={trigger} title="Hover for money">
      <div className="flex gap-1">
        {[...Array(3)].map((_,i) => (
          <div key={i} className="w-8 h-5 relative" style={{ transform:`rotate(${(i-1)*4}deg)` }}>
            <div className="w-full h-full bg-g-off border border-gold/30 flex items-center justify-center"
              style={{ boxShadow:'1px 1px 0 rgba(0,0,0,.4)' }}>
              <span className="text-[8px] text-gold/60 font-mono">₹</span>
            </div>
            <div className="absolute inset-1 border border-gold/15 rounded-[1px]" />
          </div>
        ))}
      </div>
      <AnimatePresence>
        {flying && [...Array(6)].map((_,i) => (
          <motion.div key={i} className="absolute pointer-events-none"
            style={{ left:`${20+i*10}%`, bottom:'100%', width:'12px', height:'7px',
                     background:'linear-gradient(135deg,#2d5a1e,#3a7a28)', border:'1px solid #4a8a34' }}
            initial={{ y:0, opacity:1, rotate:0 }}
            animate={{ y:-80, x:(i-2.5)*20, rotate:(i-3)*60, opacity:0 }}
            transition={{ duration:1, delay:i*.06 }} />
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ─── Register Book ────────────────────────────────── */
function RegisterBook({ onOpen }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div className="cursor-pointer" onClick={() => { setOpen(o=>!o); if(!open) onOpen(); }}
      whileHover={{scale:1.03}} title="View register">
      <div className="w-14 h-18 bg-beige border border-beige-dk relative"
        style={{ boxShadow:'2px 2px 0 #9a7a2e', height:'72px' }}>
        <div className="w-full h-3 bg-rust/80" />
        <div className="p-1 space-y-1">
          {[...Array(5)].map((_,i) => <div key={i} className="h-px bg-br-dark/20" />)}
        </div>
        <div className="absolute bottom-1 left-0 right-0 text-center">
          <span className="font-stamp text-[6px] text-br-dark/50">REGISTER</span>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div className="absolute left-full top-0 ml-2 w-56 bg-beige border border-beige-dk shadow-xl z-50 p-3"
            initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-10}}>
            <p className="font-stamp text-[9px] text-br-dark/60 tracking-widest uppercase border-b border-br-dark/20 pb-1 mb-2">Transaction Register 1999</p>
            {REGISTER_ENTRIES.map((e,i) => (
              <div key={i} className="flex justify-between text-[8px] font-type text-br-dark border-b border-br-dark/10 py-0.5">
                <span>{e.name}</span><span className="text-rust">{e.returned}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Smoke effect ─────────────────────────────────── */
function Smoke({ x = '50%', active = true }) {
  if (!active) return null;
  return (
    <div className="absolute pointer-events-none" style={{ left:x, bottom:'60px', zIndex:25 }}>
      {[...Array(3)].map((_,i) => (
        <motion.div key={i} className="absolute rounded-full"
          style={{ width:`${20+i*12}px`, height:`${20+i*12}px`, left:`${-i*4}px`,
                   background:`radial-gradient(circle,rgba(200,200,200,${.08-i*.02}) 0%,transparent 70%)`,
                   filter:'blur(4px)' }}
          animate={{ y:[0,-60-i*20], scale:[1,1.8], opacity:[.4,0] }}
          transition={{ duration:3+i, delay:i*.8, repeat:Infinity, ease:'easeOut' }} />
      ))}
    </div>
  );
}

/* ─── Outside Scene (Scene 1) ─────────────────────── */
export function SceneOutside({ onEnter }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background:'linear-gradient(180deg,#0a0a0a 0%,#1a1008 40%,#0d1a0d 100%)' }}>
      {/* rain drops */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-5">
        {[...Array(40)].map((_,i) => (
          <motion.div key={i} className="absolute w-px bg-beige/10"
            style={{ left:`${Math.random()*100}%`, top:'-5%', height:`${15+Math.random()*25}px` }}
            animate={{ y:['0vh','105vh'] }}
            transition={{ duration:.6+Math.random()*.4, delay:Math.random()*2, repeat:Infinity, ease:'linear' }} />
        ))}
      </div>

      {/* street light glow */}
      <div className="absolute top-0 right-[20%] w-2 h-3/4 bg-amber/10 pointer-events-none"
        style={{ filter:'blur(40px)', transformOrigin:'top' }} />

      <div className="relative z-20 text-center">
        {/* signboard */}
        <motion.div className="mx-auto mb-8 inline-block"
          initial={{ opacity:0, y:-30 }} animate={{ opacity:1, y:0 }} transition={{ duration:1, delay:.3 }}>
          <div className="relative border-4 border-bronze/60 px-8 py-5 bg-br-dark"
            style={{ boxShadow:'4px 4px 0 #111,0 0 40px rgba(200,168,75,.1)' }}>
            {/* peeling paint effect */}
            <div className="absolute top-1 right-2 w-4 h-3 bg-br-mid/60 rounded-sm" style={{clipPath:'polygon(0 0,100% 30%,70% 100%,0 100%)'}} />
            <div className="absolute bottom-2 left-3 w-3 h-2 bg-br-mid/50 rounded-sm" style={{clipPath:'polygon(30% 0,100% 0,100% 100%,0 70%)'}} />
            <div className="flicker">
              <p className="font-stamp text-gold/40 text-[10px] tracking-[.4em] uppercase mb-1">Registered Office</p>
              <h1 className="font-cin font-black text-3xl sm:text-4xl gold-text chroma leading-tight">Paisa Double</h1>
              <h1 className="font-cin font-black text-3xl sm:text-4xl gold-text chroma leading-tight">Yojana</h1>
              <p className="font-stamp text-mustard/60 text-xs tracking-widest mt-1">21 Seconds Mein Paisa Double</p>
            </div>
            <div className="absolute -bottom-1 left-4 right-4 h-px bg-gold/20" />
          </div>
          <div className="w-2 h-8 bg-bronze/40 mx-auto" />
        </motion.div>

        {/* street elements */}
        <motion.div className="flex items-end justify-center gap-8 mb-10"
          initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.8, duration:.8}}>
          {/* scooter */}
          <div className="opacity-30 text-4xl" title="Parked scooter">🛵</div>
          {/* sleeping dog */}
          <motion.div className="opacity-25 text-3xl" animate={{scaleX:[1,1.02,1]}} transition={{duration:3,repeat:Infinity}}>🐕</motion.div>
          {/* tea stall glow */}
          <div className="w-8 h-12 bg-amber/10 rounded-sm border border-amber/20 flex items-end justify-center pb-1" style={{filter:'drop-shadow(0 0 8px rgba(255,176,0,.2))'}}>
            <span className="text-xs">☕</span>
          </div>
        </motion.div>

        <motion.button
          onClick={() => { playDoorBell(); onEnter(); }}
          className="px-10 py-4 bg-gold text-ink font-stamp font-bold text-sm tracking-[.2em] uppercase relative overflow-hidden hover:bg-gold-lt transition-all"
          style={{ boxShadow:'4px 4px 0 #9a7a2e,0 0 30px rgba(200,168,75,.3)' }}
          whileHover={{scale:1.02}} whileTap={{scale:.97}}
          initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:1.2}}>
          <motion.span className="absolute inset-0 bg-white/10" initial={{x:'-100%'}} whileHover={{x:'100%'}} transition={{duration:.4}} />
          <span className="relative">🚪 Enter Office</span>
        </motion.button>
        <p className="font-stamp text-gold/30 text-[9px] tracking-widest mt-3 uppercase">Est. 1998 · Govt. Approved*</p>
      </div>
    </section>
  );
}

/* ─── Main Office Scene ────────────────────────────── */
export function SceneOffice({ fanFast, onFanClick, onCallAnswer, onCupboardOpen, onRegisterOpen, onCashHover }) {
  return (
    <div className="relative w-full overflow-hidden" style={{ minHeight:'90vh', background:'linear-gradient(180deg,#0d1a10 0%,#1a1008 60%,#0d0d0d 100%)' }}>
      <TubeLight />
      <CeilingFan fast={fanFast} />
      <WallClock />
      <Smoke x="30%" />
      <Smoke x="68%" />

      {/* back wall texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[.03]"
        style={{ backgroundImage:'repeating-linear-gradient(82deg,transparent,transparent 14px,rgba(140,94,42,.3) 14px,rgba(140,94,42,.3) 15px)' }} />

      {/* warm overhead glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-48 pointer-events-none"
        style={{ background:'radial-gradient(ellipse,rgba(255,200,80,.06) 0%,transparent 70%)', filter:'blur(20px)' }} />

      {/* calendar on left wall */}
      <div className="absolute left-4 top-[18%] opacity-20 pointer-events-none">
        <div className="w-14 h-18 bg-dwhite border border-beige-dk" style={{height:'72px'}}>
          <div className="h-4 bg-rust flex items-center justify-center">
            <span className="font-stamp text-[7px] text-dwhite">JANUARY 1999</span>
          </div>
          <div className="grid grid-cols-7 gap-px p-1">
            {[...Array(28)].map((_,i) => <div key={i} className="aspect-square bg-br-dark/15 text-[4px] text-br-dark/50 flex items-center justify-center font-type">{i+1}</div>)}
          </div>
        </div>
      </div>

      {/* main desk area */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 pt-28 pb-16">
        {/* desk surface */}
        <div className="relative bg-br-dark/80 border-t-4 border-bronze/40 rounded-sm p-6"
          style={{ boxShadow:'inset 0 4px 20px rgba(0,0,0,.5),0 8px 30px rgba(0,0,0,.4)' }}>

          {/* desk items row */}
          <div className="flex flex-wrap items-end justify-around gap-6">

            {/* CRT monitor */}
            <div className="flex flex-col items-center gap-1">
              <CRTMonitor text={'C:\\PDY> SYSTEM READY\nC:\\PDY> WEALTH.EXE\nC:\\PDY> _'} />
              <span className="font-stamp text-[8px] text-gold/20 tracking-wider">Main Terminal</span>
            </div>

            {/* phone */}
            <div className="flex flex-col items-center gap-1">
              <RotaryPhone onCall={onCallAnswer} />
              <span className="font-stamp text-[8px] text-gold/20 tracking-wider">Click to Answer</span>
            </div>

            {/* register */}
            <div className="relative flex flex-col items-center gap-1">
              <RegisterBook onOpen={onRegisterOpen} />
              <span className="font-stamp text-[8px] text-gold/20 tracking-wider">Transaction Log</span>
            </div>

            {/* cash bundles */}
            <div className="flex flex-col items-center gap-1">
              <CashBundles onHover={onCashHover} />
              <span className="font-stamp text-[8px] text-gold/20 tracking-wider">Hover Me</span>
            </div>

            {/* cupboard */}
            <div className="flex flex-col items-center gap-1">
              <SteelCupboard onOpen={onCupboardOpen} />
              <span className="font-stamp text-[8px] text-gold/20 tracking-wider">Click Cupboard</span>
            </div>
          </div>

          {/* paper stacks */}
          <div className="absolute top-4 right-6 flex gap-1 opacity-30 pointer-events-none">
            {[...Array(4)].map((_,i) => (
              <div key={i} className="bg-dwhite border border-beige-dk"
                style={{ width:'18px', height:'24px', transform:`rotate(${(i-1.5)*3}deg)` }} />
            ))}
          </div>

          {/* tea cups */}
          <div className="absolute bottom-4 left-6 opacity-30 pointer-events-none flex gap-2">
            <span className="text-lg">☕</span><span className="text-base">☕</span>
          </div>
        </div>
      </div>
    </div>
  );
}
