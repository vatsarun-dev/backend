import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Popup
 * Windows 98 / 2000 style error dialog.
 * Props:
 *   title   — string  (titlebar text)
 *   message — string  (body, supports \n)
 *   icon    — string  (emoji icon)
 *   onClose — fn
 *   show    — boolean
 *   zIndex  — number  (default 9000)
 */
export default function Popup({ title = 'Error', message = '', icon = '❌', onClose, show = true, zIndex = 9000 }) {
  const [dragging, setDragging]   = useState(false);
  const [pos,      setPos]        = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const onMouseDown = (e) => {
    setDragging(true);
    setDragStart({ x: e.clientX - pos.x, y: e.clientY - pos.y });
  };
  const onMouseMove = (e) => {
    if (!dragging) return;
    setPos({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };
  const onMouseUp = () => setDragging(false);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed pointer-events-none"
          style={{ inset: 0, zIndex }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="win-popup absolute pointer-events-auto"
            style={{
              top:  `calc(50% + ${pos.y}px)`,
              left: `calc(50% + ${pos.x}px)`,
              transform: 'translate(-50%, -50%)',
              width: '320px',
              userSelect: dragging ? 'none' : 'auto',
            }}
            initial={{ scale: 0.5, opacity: 0, y: -30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
          >
            {/* title bar */}
            <div
              className="win-titlebar cursor-move select-none"
              onMouseDown={onMouseDown}
            >
              <span className="font-stamp text-white text-[11px] truncate flex-1">{title}</span>
              <div className="flex gap-1 ml-2">
                {/* minimize (fake) */}
                <div className="win-btn text-[8px]">_</div>
                {/* maximize (fake) */}
                <div className="win-btn text-[8px]">□</div>
                {/* close */}
                <button
                  className="win-btn text-[10px] font-bold hover:bg-red-600 hover:text-white transition-colors"
                  onClick={onClose}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* body */}
            <div className="p-4 bg-[#c0c0c0]">
              <div className="flex gap-3 items-start">
                <span className="text-3xl shrink-0 mt-0.5">{icon}</span>
                <div className="flex-1">
                  <p className="font-typewriter text-xs text-black leading-relaxed whitespace-pre-line">
                    {message}
                  </p>
                </div>
              </div>

              {/* button row */}
              <div className="mt-4 flex justify-center gap-2">
                <button
                  className="win-btn px-6 py-1.5 font-stamp text-[11px] text-black hover:bg-[#d4d4d4] active:shadow-none"
                  style={{ boxShadow: '1px 1px 0 #fff inset, -1px -1px 0 #888 inset', width: 'auto' }}
                  onClick={onClose}
                >
                  OK
                </button>
              </div>
            </div>

            {/* status bar */}
            <div className="border-t border-[#888] bg-[#c0c0c0] px-2 py-0.5 flex items-center gap-2">
              <span className="font-typewriter text-[8px] text-black/60">
                PDY System v3.1 (Build 9847-B)
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
