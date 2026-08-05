import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';

// Scene-by-scene flow components
import Scene1Outside       from './components/Scene1Outside';
import Scene2DoorEntry     from './components/Scene2DoorEntry';
import Scene3Reception     from './components/Scene3Reception';
import Scene4Verification  from './components/Scene4Verification';
import Scene5Machine       from './components/Scene5Machine';
import Scene6Payment       from './components/Scene6Payment';
import ProcessingScreen    from './components/ProcessingScreen';
import SuccessScreen       from './components/SuccessScreen';

import { useKeyboardEasterEgg } from './hooks/useEasterEgg';
import { CONSOLE_MESSAGES, PROFIT_RESPONSES }     from './utils/constants';
import './index.css';

/* ── Keyboard easter egg toast ─────────────────────── */
function EggToast({ message, visible }) {
  if (!visible) return null;
  return (
    <div className="fixed bottom-6 left-1/2 z-[9990] pointer-events-none"
      style={{ transform:'translateX(-50%)' }}>
      <div className="bg-ink border border-gold text-gold font-stamp text-xs tracking-wide px-6 py-3 max-w-sm text-center"
        style={{ boxShadow:'0 0 20px rgba(200,168,75,.3),4px 4px 0 #9a7a2e' }}>
        {message}
      </div>
    </div>
  );
}

export default function App() {
  // Scene progression: 1=outside, 2=door, 3=reception, 4=verification, 5=machine, 6=payment, 7=processing, 8=success
  const [scene, setScene] = useState(1);

  const { message: eggMsg, visible: eggVisible } = useKeyboardEasterEgg('profit', PROFIT_RESPONSES);

  // Console easter egg - show on mount
  useEffect(() => {
    console.log('App mounted, scene:', scene);
    try {
      console.log(...CONSOLE_MESSAGES);
    } catch(_) {
      // Silently fail if console is blocked
    }
  }, []);

  const handleOutsideEnter = useCallback(() => {
    setScene(2);
  }, []);

  const handleDoorComplete = useCallback(() => {
    setScene(3);
  }, []);

  const handleReceptionProceed = useCallback(() => {
    setScene(4);
  }, []);

  const handleVerificationComplete = useCallback(() => {
    setScene(5);
  }, []);

  const handleMachineActivate = useCallback(() => {
    setScene(6);
  }, []);

  const handlePayment = useCallback(() => {
    setScene(7);
  }, []);

  const handleProcessingDone = useCallback(() => {
    setScene(8);
  }, []);

  return (
    <div className="relative vignette bg-black min-h-screen overflow-hidden">

      {/* ── SCENE 1: OUTSIDE OFFICE ─────────────────────── */}
      <AnimatePresence>
        {scene === 1 && (
          <Scene1Outside key="scene1" onEnter={handleOutsideEnter} />
        )}
      </AnimatePresence>

      {/* ── SCENE 2: DOOR ENTRY ─────────────────────────── */}
      <AnimatePresence>
        {scene === 2 && (
          <Scene2DoorEntry key="scene2" onComplete={handleDoorComplete} />
        )}
      </AnimatePresence>

      {/* ── SCENE 3: RECEPTION/OFFICE ───────────────────── */}
      <AnimatePresence>
        {scene === 3 && (
          <Scene3Reception key="scene3" onProceed={handleReceptionProceed} />
        )}
      </AnimatePresence>

      {/* ── SCENE 4: VERIFICATION ───────────────────────── */}
      <AnimatePresence>
        {scene === 4 && (
          <Scene4Verification key="scene4" onComplete={handleVerificationComplete} />
        )}
      </AnimatePresence>

      {/* ── SCENE 5: MONEY MACHINE ──────────────────────── */}
      <AnimatePresence>
        {scene === 5 && (
          <Scene5Machine key="scene5" onActivate={handleMachineActivate} />
        )}
      </AnimatePresence>

      {/* ── SCENE 6: PAYMENT ─────────────────────────────── */}
      <AnimatePresence>
        {scene === 6 && (
          <Scene6Payment key="scene6" onPayment={handlePayment} />
        )}
      </AnimatePresence>

      {/* ── SCENE 7: PROCESSING ─────────────────────────── */}
      <AnimatePresence>
        {scene === 7 && (
          <ProcessingScreen
            key="scene7"
            active={true}
            onComplete={handleProcessingDone}
          />
        )}
      </AnimatePresence>

      {/* ── SCENE 8: SUCCESS ─────────────────────────────── */}
      <AnimatePresence>
        {scene === 8 && (
          <SuccessScreen key="scene8" show={true} />
        )}
      </AnimatePresence>

      {/* Keyboard easter egg toast */}
      <EggToast message={eggMsg} visible={eggVisible} />
    </div>
  );
}
