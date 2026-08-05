import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resumeAudio, startAmbient } from '../utils/sounds';
import { TAGLINE } from '../utils/constants';

function Scratches() {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <motion.div key={i} className="absolute top-0 bottom-0"
          style={{ left:`${8+i*16}%`, width:`${.5+Math.random()}px`, background:`rgba(255,255,255,.05)` }}
          animate={{ opacity:[0,.9,0,.4,0] }}
          transition={{ duration:.09, repeat:Infinity, repeatDelay:.4+i*.35 }} />
      ))}
    </div>
  );
}

function FilmEdge({ side }) {
  return (
    <div className={`absolute top-0 bottom-0 ${side==='left'?'left-0':'right-0'} w-8 z-30 flex flex-col justify-around py-2`}>
      {[...Array(16)].map((_,i) => <div key={i} className="w-5 h-4 mx-auto border border-white/10 rounded-sm" />)}
    </div>
  );
}

function DustMotes() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {[...Array(28)].map((_,i) => (
        <motion.div key={i} className="absolute rounded-full bg-beige/25"
          style={{ width:`${1+Math.random()*3}px`, height:`${1+Math.random()*3}px`,
                   left:`${20+Math.random()*60}%`, top:`${Math.random()*80}%` }}
          animate={{ y:[0,-70], x:[0,(Math.random()-.5)*25], opacity:[0,.55,0] }}
          transition={{ duration:4+Math.random()*5, delay:Math.random()*6, repeat:Infinity }} />
      ))}
    </div>
  );
}

export default function CinematicIntro({ onEnter }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const ts = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1700),
      setTimeout(() => setPhase(3), 3600),
      setTimeout(() => setPhase(4), 5400),
    ];
    return () => ts.forEach(clearTimeout);
  }, []);

  const handleEnter = () => { resumeAudio(); startAmbient(); onEnter(); };

  return (
    <motion.div
      className="fixed inset-0 z-[9990] bg-black flex items-center justify-center overflow-hidden"
      exit={{ opacity:0, scale:1.05 }}
      transition={{ duration:1.3, ease:[.16,1,.3,1] }}
    >
      <FilmEdge side="left" />
      <FilmEdge side="right" />
      <Scratches />
      <DustMotes />

      {/* projector cone */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none z-5"
        style={{ width:'120%', height:'100%',
                 background:'conic-gradient(from 90deg at 50% -5%,transparent 35%,rgba(255,220,150,.055) 50%,transparent 65%)',
                 filter:'blur(12px)' }} />

      {/* scanlines */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-20"
        style={{ backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.5) 2px,rgba(0,0,0,.5) 4px)' }} />

      <div className="relative z-40 text-center px-6 max-w-2xl mx-auto">

        {phase>=1 && (
          <motion.p className="font-stamp text-white/25 text-[10px] tracking-[.4em] uppercase mb-6"
            initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.8}}>
            Internal Department Cinematic Division Presents
          </motion.p>
        )}

        {phase>=1 && (
          <motion.div className="flex justify-center mb-6"
            initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}}
            transition={{type:'spring',stiffness:200,damping:14,delay:.2}}>
            <div className="w-20 h-20 rounded-full border-2 border-gold/40 flex items-center justify-center"
              style={{background:'radial-gradient(circle,#1a3a2a,#0a0a0a)',boxShadow:'0 0 30px rgba(200,168,75,.2)'}}>
              <span className="text-3xl">⚖️</span>
            </div>
          </motion.div>
        )}

        {phase>=2 && (
          <motion.h1 className="font-cin font-black leading-none mb-4"
            initial={{opacity:0,y:30}} animate={{opacity:1,y:0}}
            transition={{duration:.9,ease:[.16,1,.3,1]}}>
            <span className="block text-5xl sm:text-7xl md:text-8xl gold-text chroma">Paisa Double</span>
            <span className="block text-3xl sm:text-5xl font-stamp text-mustard tracking-widest mt-2">Yojana</span>
          </motion.h1>
        )}

        {phase>=3 && (
          <motion.p className="font-stamp text-xl text-mustard/80 tracking-wide mb-8"
            initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.6}}>
            "{TAGLINE}"
          </motion.p>
        )}

        {phase>=4 && (
          <motion.button
            className="group relative px-10 py-4 border border-gold/60 text-gold font-stamp text-sm tracking-[.25em] uppercase overflow-hidden hover:border-gold transition-all"
            initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
            transition={{type:'spring',stiffness:300,damping:20}}
            onClick={handleEnter}
            style={{boxShadow:'0 0 20px rgba(200,168,75,.15)'}}>
            <motion.span className="absolute inset-0 bg-gold/10"
              initial={{x:'-100%'}} whileHover={{x:'100%'}} transition={{duration:.4}} />
            <span className="relative">Enter Office</span>
          </motion.button>
        )}

        {phase>=2 && phase<4 && (
          <div className="mt-8 w-40 h-px bg-gold/20 mx-auto overflow-hidden">
            <motion.div className="h-full bg-gold" initial={{width:'0%'}} animate={{width:'100%'}} transition={{duration:4,ease:'linear'}} />
          </div>
        )}
      </div>

      <div className="absolute bottom-0 inset-x-0 h-24 pointer-events-none z-30"
        style={{background:'linear-gradient(to top,rgba(10,5,0,.9),transparent)'}} />
      {['top-4 left-10','top-4 right-10','bottom-8 left-10','bottom-8 right-10'].map(p=>(
        <div key={p} className={`absolute ${p} text-gold/15 text-xl pointer-events-none z-30`}>✦</div>
      ))}
    </motion.div>
  );
}
