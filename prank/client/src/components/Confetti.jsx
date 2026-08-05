import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateConfetti, generateMoneyNotes } from '../utils/helpers';

/* ── Single confetti piece ───────────────────────────── */
function ConfettiPiece({ piece }) {
  return (
    <motion.div
      key={piece.id}
      className="fixed pointer-events-none"
      style={{
        left:            piece.left,
        top:             '-20px',
        width:           piece.size,
        height:          piece.size,
        backgroundColor: piece.color,
        transform:       piece.skew,
        zIndex:          8500,
      }}
      initial={{ y: -20, opacity: 1, rotate: 0 }}
      animate={{
        y:       ['0vh', '110vh'],
        rotate:  [0, 360 * (Math.random() > 0.5 ? 1 : -1) * (2 + Math.random() * 3)],
        opacity: [1, 1, 0.5],
        x:       [0, (Math.random() - 0.5) * 80],
      }}
      transition={{
        duration: piece.dur,
        delay:    piece.delay,
        ease:     'easeIn',
      }}
    />
  );
}

/* ── Floating money note ─────────────────────────────── */
function FallingNote({ note }) {
  return (
    <motion.div
      className="fixed pointer-events-none money-note"
      style={{
        left:    note.left,
        top:     '-40px',
        width:   `${50 * note.scale}px`,
        height:  `${25 * note.scale}px`,
        zIndex:  8400,
      }}
      animate={{
        y:      ['0vh', '110vh'],
        rotate: [0, 720],
        x:      [0, (Math.random() - 0.5) * 100],
      }}
      transition={{
        duration: note.dur * 1.5,
        delay:    note.delay,
        ease:     'easeIn',
      }}
    />
  );
}

/* ══════════════════════════════════════════════════════
   CONFETTI COMPONENT
   Props:
     active  — boolean, triggers the rain
     onDone  — called after initial burst settles (3s)
══════════════════════════════════════════════════════ */
export default function Confetti({ active = false }) {
  const [pieces,  setPieces]  = useState([]);
  const [notes,   setNotes]   = useState([]);
  const [running, setRunning] = useState(false);

  const confettiData = useMemo(() => generateConfetti(100), []);
  const notesData    = useMemo(() => generateMoneyNotes(20), []);

  useEffect(() => {
    if (!active) {
      setRunning(false);
      return;
    }
    setRunning(true);
    setPieces(confettiData);
    setNotes(notesData);

    // clear after animation
    const t = setTimeout(() => {
      setPieces([]);
      setNotes([]);
      setRunning(false);
    }, 6000);
    return () => clearTimeout(t);
  }, [active, confettiData, notesData]);

  if (!running && pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 8400 }}>
      {pieces.map(piece => <ConfettiPiece key={piece.id} piece={piece} />)}
      {notes.map(note   => <FallingNote  key={`n${note.id}`} note={note} />)}
    </div>
  );
}
