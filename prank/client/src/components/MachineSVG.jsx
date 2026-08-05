import { motion } from 'framer-motion';

/* ── Gear ─────────────────────────────────────────── */
export function Gear({ cx, cy, r, teeth=10, cw=true, speed=4, fill='#4a2c1a', stroke='#c8a84b' }) {
  const tooth = () => {
    const out = r + r*.3; const w = (2*Math.PI)/teeth;
    let d = '';
    for (let i=0;i<teeth;i++) {
      const a0=i*w-w*.22, a1=i*w+w*.22, a2=i*w+w*.55, a3=i*w+w*.78;
      d+=`M${cx+r*Math.cos(a0)} ${cy+r*Math.sin(a0)} L${cx+out*Math.cos(a1)} ${cy+out*Math.sin(a1)} L${cx+out*Math.cos(a2)} ${cy+out*Math.sin(a2)} L${cx+r*Math.cos(a3)} ${cy+r*Math.sin(a3)} `;
    }
    return d;
  };
  return (
    <motion.g animate={{rotate:cw?360:-360}} transition={{duration:speed,repeat:Infinity,ease:'linear'}}
      style={{transformOrigin:`${cx}px ${cy}px`}}>
      <circle cx={cx} cy={cy} r={r} fill={fill} stroke={stroke} strokeWidth="1.5" />
      <path d={tooth()} fill={fill} stroke={stroke} strokeWidth=".8" strokeLinejoin="round" />
      {/* spokes */}
      {[0,60,120,180,240,300].map(a => (
        <line key={a} x1={cx} y1={cy}
          x2={cx+(r*.7)*Math.cos(a*Math.PI/180)} y2={cy+(r*.7)*Math.sin(a*Math.PI/180)}
          stroke={stroke} strokeWidth=".8" opacity=".5" />
      ))}
      <circle cx={cx} cy={cy} r={r*.18} fill="#1a0e06" stroke={stroke} strokeWidth=".8" />
      <circle cx={cx} cy={cy} r={r*.07} fill={stroke} />
    </motion.g>
  );
}

/* ── Pressure Gauge ────────────────────────────────── */
export function PressureGauge({ cx, cy, r=26, label='PSI', pct=0.3, running=false }) {
  const needleAngle = -140 + pct*280;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r+2} fill="#1a0e06" stroke="#8c5e2a" strokeWidth="2" />
      <circle cx={cx} cy={cy} r={r}   fill="#0d0d0d" stroke="#c8a84b" strokeWidth="1.2" />
      <circle cx={cx} cy={cy} r={r-4} fill="#080808" stroke="#9a7a2e" strokeWidth=".5" />
      {[...Array(13)].map((_,i) => {
        const a=(-140+i*23.3)*Math.PI/180;
        return <line key={i} x1={cx+(r-5)*Math.cos(a)} y1={cy+(r-5)*Math.sin(a)}
          x2={cx+(r-8-(!!(i%3===0)*2))*Math.cos(a)} y2={cy+(r-8-(!!(i%3===0)*2))*Math.sin(a)}
          stroke="#c8a84b" strokeWidth={i%3===0?1.2:.6} />;
      })}
      {/* coloured arc */}
      <path d={`M${cx+(r-3)*Math.cos(-140*Math.PI/180)} ${cy+(r-3)*Math.sin(-140*Math.PI/180)} A${r-3} ${r-3} 0 1 1 ${cx+(r-3)*Math.cos(-40*Math.PI/180)} ${cy+(r-3)*Math.sin(-40*Math.PI/180)}`}
        fill="none" stroke="#e83030" strokeWidth="1.5" strokeLinecap="round" opacity=".4" />
      {/* needle */}
      <motion.g style={{transformOrigin:`${cx}px ${cy}px`}}
        animate={running ? {rotate:[needleAngle*180/Math.PI, (needleAngle+60)*180/Math.PI,(needleAngle+40)*180/Math.PI]} : {rotate: needleAngle*180/Math.PI}}
        transition={running?{duration:2,repeat:Infinity,ease:'easeInOut'}:{duration:1}}>
        <line x1={cx} y1={cy} x2={cx+(r-7)*Math.cos(needleAngle)} y2={cy+(r-7)*Math.sin(needleAngle)}
          stroke="#e83030" strokeWidth="1.5" strokeLinecap="round" />
      </motion.g>
      <circle cx={cx} cy={cy} r={2.5} fill="#c8a84b" />
      <text x={cx} y={cy+r-1} textAnchor="middle" fontSize="5" fill="#c8a84b" fontFamily="monospace">{label}</text>
    </g>
  );
}

/* ── Blinking Bulb ─────────────────────────────────── */
export function Bulb({ cx, cy, r=6, color='#ffb000', delay=0, active=false }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r+1} fill="rgba(0,0,0,0)" />
      <circle cx={cx} cy={cy} r={r} fill={active?color:'#1a1a1a'} stroke="#444" strokeWidth=".8" />
      {active && (
        <motion.circle cx={cx} cy={cy} r={r+3} fill="none" stroke={color} strokeWidth="1"
          animate={{opacity:[.8,0,.8],scale:[1,1.6,1]}}
          transition={{duration:.9,delay,repeat:Infinity}}
          style={{transformOrigin:`${cx}px ${cy}px`}} />
      )}
    </g>
  );
}

/* ── Piston ────────────────────────────────────────── */
export function Piston({ x, y, active }) {
  return (
    <motion.g animate={active?{y:[-6,0,-6]}:{}} transition={{duration:.4,repeat:Infinity,ease:'easeInOut'}}>
      <rect x={x-5} y={y} width="10" height="30" fill="#3a2010" stroke="#8c5e2a" strokeWidth="1" rx="1" />
      <rect x={x-7} y={y+25} width="14" height="5" fill="#4a2c1a" stroke="#c8a84b" strokeWidth=".8" rx="1" />
    </motion.g>
  );
}

/* ── Steam puff ────────────────────────────────────── */
export function SVGSteam({ x, y, active }) {
  if (!active) return null;
  return (
    <>
      {[0,1,2].map(i => (
        <motion.circle key={i} cx={x+(i-1)*5} cy={y} r={5+i*3}
          fill={`rgba(200,200,200,${.12-i*.03})`}
          animate={{cy:[y,y-40],r:[5+i*3,18],opacity:[.5,0]}}
          transition={{duration:1.5+i*.3,delay:i*.4,repeat:Infinity,ease:'easeOut'}} />
      ))}
    </>
  );
}

/* ── LED display ───────────────────────────────────── */
export function LEDStrip({ value, x, y, w=110, h=18 }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="#050d05" stroke="#1a2a1a" strokeWidth="1.5" rx="1" />
      <rect x={x+2} y={y+2} width={w-4} height={h-4} fill="#060f06" />
      <text x={x+w/2} y={y+h*.68} textAnchor="middle" fontSize="8" fontFamily="'Share Tech Mono',monospace"
        fill="#00ff41" style={{filter:'drop-shadow(0 0 3px #00ff41)'}}>{value}</text>
    </g>
  );
}

/* ══════════════════════════════════════════════════════
   FULL MACHINE SVG
══════════════════════════════════════════════════════ */
export default function MoneyMachineSVG({ running, counter }) {
  const val = String(counter).padStart(10,'0');
  return (
    <svg viewBox="0 0 400 480" className="w-full max-w-lg mx-auto" style={{filter:'drop-shadow(0 0 30px rgba(200,168,75,.3))'}}>

      {/* ── STEAM PIPES ── */}
      {[60,120,200,280,340].map(x => (
        <g key={x}>
          <rect x={x-5} y={50} width="10" height="40" fill="#3a2010" stroke="#8c5e2a" strokeWidth="1" />
          <ellipse cx={x} cy={50} rx="8" ry="4" fill="#5a3018" stroke="#c8a84b" strokeWidth=".8" />
          <SVGSteam x={x} y={48} active={running} />
        </g>
      ))}

      {/* ── MAIN BODY ── */}
      <rect x="20" y="88" width="360" height="320" rx="4" fill="#2c1a0e" stroke="#c8a84b" strokeWidth="2" />
      <rect x="24" y="92" width="352" height="312" rx="3" fill="#1a0e06" stroke="#9a7a2e" strokeWidth=".5" />

      {/* rivet holes top */}
      {[35,50,350,365].map(x => <circle key={x} cx={x} cy={95} r="3" fill="#3a2010" stroke="#8c5e2a" strokeWidth=".8" />)}
      {[35,50,350,365].map(x => <circle key={x} cx={x} cy={396} r="3" fill="#3a2010" stroke="#8c5e2a" strokeWidth=".8" />)}

      {/* ── TOP GAUGE PANEL ── */}
      <rect x="30" y="100" width="340" height="80" rx="2" fill="#240e04" stroke="#8c5e2a" strokeWidth="1" />
      <PressureGauge cx={80}  cy={148} r={28} label="WEALTH" pct={running?.3:.1} running={running} />
      <PressureGauge cx={160} cy={145} r={32} label="PRESSURE" pct={running?.65:.2} running={running} />
      <PressureGauge cx={248} cy={145} r={32} label="LUCK" pct={running?.8:.4} running={running} />
      <PressureGauge cx={336} cy={148} r={28} label="HEAT" pct={running?.5:.15} running={running} />

      {/* ── GEAR ASSEMBLY ── */}
      <rect x="30" y="188" width="200" height="120" rx="2" fill="#150a02" stroke="#8c5e2a" strokeWidth="1" />
      <Gear cx={75}  cy={245} r={34} teeth={14} cw={true}  speed={3.5} />
      <Gear cx={140} cy={228} r={20} teeth={9}  cw={false} speed={2.2} />
      <Gear cx={178} cy={255} r={24} teeth={11} cw={true}  speed={2.8} fill="#3a2010" />
      <Gear cx={140} cy={268} r={18} teeth={8}  cw={false} speed={1.9} />
      {/* connecting rod */}
      <rect x="110" y="242" width="35" height="6" rx="2" fill="#3a2010" stroke="#8c5e2a" strokeWidth=".8" />

      {/* ── PISTON ROW ── */}
      <rect x="30" y="188" width="200" height="12" rx="1" fill="#1a0e06" />
      <Piston x={60}  y={188} active={running} />
      <Piston x={90}  y={188} active={running} />
      <Piston x={120} y={188} active={running} />

      {/* ── RIGHT CONTROL PANEL ── */}
      <rect x="240" y="188" width="130" height="120" rx="2" fill="#150a02" stroke="#8c5e2a" strokeWidth="1" />

      {/* CRT mini */}
      <rect x="250" y="196" width="80" height="48" rx="1" fill="#080d08" stroke="#2a2a2a" strokeWidth="1.5" />
      <rect x="253" y="199" width="74" height="42" fill="#050a05" />
      {running ? (
        <>
          <text x="290" y="213" textAnchor="middle" fontSize="5.5" fill="#00ff41" fontFamily="monospace" style={{filter:'drop-shadow(0 0 2px #00ff41)'}}>PROCESSING</text>
          <text x="290" y="222" textAnchor="middle" fontSize="4.5" fill="#00ff41" fontFamily="monospace">WEALTH.EXE</text>
          <text x="290" y="231" textAnchor="middle" fontSize="4" fill="#ffb000" fontFamily="monospace">K47:ACTIVE</text>
        </>
      ) : (
        <text x="290" y="222" textAnchor="middle" fontSize="5.5" fill="#333" fontFamily="monospace">STANDBY</text>
      )}
      {running && (
        <motion.rect x="253" y="199" width="74" height="5" fill="rgba(0,255,65,.06)"
          animate={{y:[199,241,199]}} transition={{duration:1.8,repeat:Infinity,ease:'linear'}} />
      )}

      {/* bulbs grid */}
      {[342,355,368].map((x,ci) => [210,224,238,252,266].map((y,ri) => (
        <Bulb key={`${ci}-${ri}`} cx={x} cy={y} r={5}
          color={['#ff3030','#ffb000','#30ff60'][ci]}
          delay={ci*.3+ri*.15} active={running} />
      )))}

      {/* dial */}
      <circle cx="310" cy="275" r="14" fill="#1a0e06" stroke="#c8a84b" strokeWidth="1" />
      <motion.line x1="310" y1="275" x2="310" y2="264"
        stroke="#c8a84b" strokeWidth="1.5" strokeLinecap="round"
        animate={running?{rotate:360}:{}}
        style={{transformOrigin:'310px 275px'}}
        transition={{duration:3,repeat:Infinity,ease:'linear'}} />
      <circle cx="310" cy="275" r="2.5" fill="#c8a84b" />

      {/* big lever */}
      <rect x="345" y="255" width="14" height="40" rx="3" fill={running?'#8b3a1a':'#3a2010'} stroke="#c8a84b" strokeWidth="1" />
      <circle cx="352" cy="254" r="8" fill={running?'#e83030':'#4a2c1a'} stroke="#c8a84b" strokeWidth="1.2" />
      {running && <motion.circle cx="352" cy="254" r="12" fill="none" stroke="#e83030" strokeWidth="1"
        animate={{opacity:[.7,0],scale:[1,1.5]}} transition={{duration:.8,repeat:Infinity}}
        style={{transformOrigin:'352px 254px'}} />}

      {/* ── MONEY CONVEYOR ── */}
      <rect x="30" y="316" width="340" height="28" rx="2" fill="#150a02" stroke="#8c5e2a" strokeWidth="1" />
      <text x="200" y="333" textAnchor="middle" fontSize="7" fill="#9a7a2e" fontFamily="'Courier Prime',monospace">
        ── INPUT SLOT: INSERT ₹1 ──▶  OUTPUT: PROFIT ──▶
      </text>
      {running && (
        <motion.rect x="32" y="318" width="16" height="24" rx="1" fill="#c8a84b"
          animate={{x:[32,352,32]}} transition={{duration:2,repeat:Infinity,ease:'linear'}} />
      )}

      {/* ── LED DISPLAY ── */}
      <LEDStrip value={`WEALTH: ${val}`} x={80} y={352} w={160} h={22} />

      {/* ── EMERGENCY STOP ── */}
      <circle cx={360} cy={363} r={14} fill="#8b1a1a" stroke="#e83030" strokeWidth="1.5" />
      <circle cx={360} cy={363} r={10} fill={running?'#e83030':'#5a1010'} />
      <text x={360} y={367} textAnchor="middle" fontSize="4.5" fill="#fff" fontFamily="monospace">STOP</text>

      {/* ── BOTTOM LEGS ── */}
      {[50,140,260,350].map(x => (
        <g key={x}>
          <rect x={x} y={408} width="14" height="38" fill="#2c1a0e" stroke="#4a2c1a" strokeWidth="1" />
          <rect x={x-5} y={442} width="24" height="8" rx="1" fill="#1a0e06" stroke="#4a2c1a" strokeWidth=".8" />
        </g>
      ))}

      {/* ── MODEL PLATE ── */}
      <rect x="240" y="390" width="120" height="16" rx="1" fill="#1a0e06" stroke="#9a7a2e" strokeWidth=".5" />
      <text x="300" y="401" textAnchor="middle" fontSize="5" fill="#9a7a2e" fontFamily="'Courier Prime',monospace">MODEL K-47 · MFD 1998 · PDY©</text>

      {/* warning plate */}
      <rect x="30" y="390" width="100" height="16" rx="1" fill="#2a1000" stroke="#d4a017" strokeWidth=".8" />
      <text x="80" y="401" textAnchor="middle" fontSize="5" fill="#d4a017" fontFamily="monospace">⚠ HIGH VOLTAGE ⚠</text>
    </svg>
  );
}
