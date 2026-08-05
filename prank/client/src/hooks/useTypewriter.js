import { useState, useEffect, useRef } from 'react';

/**
 * useTypewriter
 * Progressively reveals `text` one character at a time.
 * Returns { displayed, isDone }
 */
export function useTypewriter(text = '', speed = 60, startDelay = 0) {
  const [displayed, setDisplayed] = useState('');
  const [isDone, setIsDone]       = useState(false);
  const indexRef                  = useRef(0);
  const timerRef                  = useRef(null);
  const delayRef                  = useRef(null);

  useEffect(() => {
    indexRef.current = 0;
    setDisplayed('');
    setIsDone(false);

    delayRef.current = setTimeout(() => {
      timerRef.current = setInterval(() => {
        indexRef.current += 1;
        setDisplayed(text.slice(0, indexRef.current));

        if (indexRef.current >= text.length) {
          clearInterval(timerRef.current);
          setIsDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(delayRef.current);
      clearInterval(timerRef.current);
    };
  }, [text, speed, startDelay]);

  return { displayed, isDone };
}
