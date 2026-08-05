/**
 * SOUND ENGINE
 * Uses Web Audio API to synthesise all sounds procedurally.
 * Zero external audio files — no copyright risk.
 */

let ctx = null;
const getCtx = () => {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  return ctx;
};

/* ── Resume context on first user gesture ─────────── */
export const resumeAudio = () => {
  const c = getCtx();
  if (c.state === 'suspended') c.resume();
};

/* ── Master gain (volume) ──────────────────────────── */
let masterGain = null;
const getMaster = () => {
  const c = getCtx();
  if (!masterGain) {
    masterGain = c.createGain();
    masterGain.gain.value = 0.4;
    masterGain.connect(c.destination);
  }
  return masterGain;
};

/* helper: schedule a buffer-source */
function play(buffer, { gain = 0.5, loop = false, when = 0 } = {}) {
  const c = getCtx();
  const src = c.createBufferSource();
  src.buffer = buffer;
  src.loop = loop;
  const g = c.createGain();
  g.gain.value = gain;
  src.connect(g);
  g.connect(getMaster());
  src.start(c.currentTime + when);
  return { src, gain: g };
}

/* helper: generate white/brown noise buffer */
function makeNoise(duration = 1, brown = false) {
  const c = getCtx();
  const len = Math.ceil(c.sampleRate * duration);
  const buf = c.createBuffer(1, len, c.sampleRate);
  const data = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < len; i++) {
    const white = Math.random() * 2 - 1;
    if (brown) { last = (last + 0.02 * white) / 1.02; data[i] = last * 3.5; }
    else        data[i] = white;
  }
  return buf;
}

/* ── COIN DROP ─────────────────────────────────────── */
export function playCoin() {
  const c = getCtx();
  const osc = c.createOscillator();
  const g   = c.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(1800, c.currentTime);
  osc.frequency.exponentialRampToValueAtTime(600, c.currentTime + 0.3);
  g.gain.setValueAtTime(0.4, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.35);
  osc.connect(g); g.connect(getMaster());
  osc.start(); osc.stop(c.currentTime + 0.35);
}

/* ── STAMP ─────────────────────────────────────────── */
export function playStamp() {
  const buf = makeNoise(0.08);
  const c = getCtx();
  const src = c.createBufferSource();
  src.buffer = buf;
  const g = c.createGain();
  const f = c.createBiquadFilter();
  f.type = 'bandpass'; f.frequency.value = 200; f.Q.value = 0.5;
  g.gain.setValueAtTime(0.8, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.12);
  src.connect(f); f.connect(g); g.connect(getMaster());
  src.start(); src.stop(c.currentTime + 0.12);
}

/* ── TYPEWRITER KEY ────────────────────────────────── */
export function playTypeKey() {
  const c = getCtx();
  const buf = makeNoise(0.04);
  const src = c.createBufferSource();
  src.buffer = buf;
  const g = c.createGain();
  const f = c.createBiquadFilter();
  f.type = 'highpass'; f.frequency.value = 1000;
  g.gain.setValueAtTime(0.3, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.05);
  src.connect(f); f.connect(g); g.connect(getMaster());
  src.start(); src.stop(c.currentTime + 0.05);
}

/* ── TELEPHONE RING ────────────────────────────────── */
export function playRing() {
  const c = getCtx();
  [0, 0.15].forEach(delay => {
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = 'square'; o.frequency.value = 480;
    g.gain.setValueAtTime(0, c.currentTime + delay);
    g.gain.linearRampToValueAtTime(0.15, c.currentTime + delay + 0.01);
    g.gain.setValueAtTime(0.15, c.currentTime + delay + 0.12);
    g.gain.linearRampToValueAtTime(0, c.currentTime + delay + 0.14);
    o.connect(g); g.connect(getMaster());
    o.start(c.currentTime + delay);
    o.stop(c.currentTime + delay + 0.15);
  });
}

/* ── MACHINE STARTUP ───────────────────────────────── */
export function playMachineStart() {
  const c = getCtx();
  // low rumble
  const buf = makeNoise(2, true);
  const { src, gain: g } = play(buf, { gain: 0, loop: false });
  g.gain.linearRampToValueAtTime(0.5, c.currentTime + 0.3);
  g.gain.setValueAtTime(0.5, c.currentTime + 1.5);
  g.gain.linearRampToValueAtTime(0, c.currentTime + 2);

  // rising tone
  const osc = c.createOscillator();
  const og  = c.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(60, c.currentTime);
  osc.frequency.linearRampToValueAtTime(220, c.currentTime + 1.8);
  og.gain.setValueAtTime(0, c.currentTime);
  og.gain.linearRampToValueAtTime(0.2, c.currentTime + 0.2);
  og.gain.linearRampToValueAtTime(0, c.currentTime + 2);
  osc.connect(og); og.connect(getMaster());
  osc.start(); osc.stop(c.currentTime + 2);
}

/* ── CASH COUNTER ──────────────────────────────────── */
let cashInterval = null;
export function startCashCounter() {
  if (cashInterval) return;
  cashInterval = setInterval(() => {
    const c = getCtx();
    const buf = makeNoise(0.02);
    const src = c.createBufferSource();
    src.buffer = buf;
    const g = c.createGain();
    const f = c.createBiquadFilter();
    f.type = 'bandpass'; f.frequency.value = 900; f.Q.value = 2;
    g.gain.setValueAtTime(0.25, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.025);
    src.connect(f); f.connect(g); g.connect(getMaster());
    src.start(); src.stop(c.currentTime + 0.03);
  }, 120);
}
export function stopCashCounter() {
  clearInterval(cashInterval);
  cashInterval = null;
}

/* ── DOOR BELL ─────────────────────────────────────── */
export function playDoorBell() {
  const c = getCtx();
  [0, 0.25].forEach((delay, i) => {
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = 'sine';
    o.frequency.value = i === 0 ? 880 : 1100;
    g.gain.setValueAtTime(0.3, c.currentTime + delay);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + delay + 0.5);
    o.connect(g); g.connect(getMaster());
    o.start(c.currentTime + delay);
    o.stop(c.currentTime + delay + 0.6);
  });
}

/* ── STEAM HISS ────────────────────────────────────── */
export function playSteam(duration = 1.5) {
  const c = getCtx();
  const buf = makeNoise(duration);
  const src = c.createBufferSource();
  src.buffer = buf;
  const g = c.createGain();
  const f = c.createBiquadFilter();
  f.type = 'bandpass'; f.frequency.value = 3000; f.Q.value = 0.3;
  g.gain.setValueAtTime(0, c.currentTime);
  g.gain.linearRampToValueAtTime(0.3, c.currentTime + 0.1);
  g.gain.setValueAtTime(0.3, c.currentTime + duration - 0.2);
  g.gain.linearRampToValueAtTime(0, c.currentTime + duration);
  src.connect(f); f.connect(g); g.connect(getMaster());
  src.start(); src.stop(c.currentTime + duration);
}

/* ── ALARM ─────────────────────────────────────────── */
let alarmInterval = null;
export function startAlarm() {
  if (alarmInterval) return;
  let phase = 0;
  alarmInterval = setInterval(() => {
    const c = getCtx();
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = 'square';
    o.frequency.value = phase % 2 === 0 ? 640 : 480;
    g.gain.setValueAtTime(0.15, c.currentTime);
    g.gain.linearRampToValueAtTime(0, c.currentTime + 0.2);
    o.connect(g); g.connect(getMaster());
    o.start(); o.stop(c.currentTime + 0.21);
    phase++;
  }, 220);
}
export function stopAlarm() {
  clearInterval(alarmInterval);
  alarmInterval = null;
}

/* ── POWER CUT (deep thud) ─────────────────────────── */
export function playPowerCut() {
  const c = getCtx();
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = 'sine'; o.frequency.setValueAtTime(120, c.currentTime);
  o.frequency.exponentialRampToValueAtTime(20, c.currentTime + 0.4);
  g.gain.setValueAtTime(0.6, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.5);
  o.connect(g); g.connect(getMaster());
  o.start(); o.stop(c.currentTime + 0.55);
}

/* ── AMBIENT LOOP (office hum) ─────────────────────── */
let ambientRef = null;
export function startAmbient() {
  if (ambientRef) return;
  const c = getCtx();
  // low hum
  const osc = c.createOscillator();
  const g   = c.createGain();
  osc.type = 'sine'; osc.frequency.value = 50;
  g.gain.value = 0.04;
  osc.connect(g); g.connect(getMaster());
  osc.start();
  ambientRef = { osc, g };
}
export function stopAmbient() {
  if (!ambientRef) return;
  ambientRef.osc.stop();
  ambientRef = null;
}
