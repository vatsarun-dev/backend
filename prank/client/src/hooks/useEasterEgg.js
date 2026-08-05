import { useState, useEffect, useCallback, useRef } from 'react';
import { PROFIT_RESPONSES } from '../utils/constants';

/**
 * useLogoClick
 * Fires `onActivate` after `threshold` clicks within `resetMs` ms.
 */
export function useLogoClick(threshold = 5, resetMs = 3000) {
  const [count,    setCount]    = useState(0);
  const [active,   setActive]   = useState(false);
  const timerRef               = useRef(null);

  const handleClick = useCallback(() => {
    setCount(prev => {
      const next = prev + 1;
      if (next >= threshold) {
        setActive(true);
        clearTimeout(timerRef.current);
        return 0;
      }
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCount(0), resetMs);
      return next;
    });
  }, [threshold, resetMs]);

  const close = useCallback(() => setActive(false), []);

  return { count, active, handleClick, close };
}

/**
 * useKeyboardEasterEgg
 * Listens for a typed `keyword` anywhere on the page, then fires `onMatch`.
 */
export function useKeyboardEasterEgg(keyword = 'profit', responses = PROFIT_RESPONSES) {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const buffer               = useRef('');

  useEffect(() => {
    const handle = (e) => {
      // Only letters
      if (e.key.length !== 1) return;
      buffer.current = (buffer.current + e.key.toLowerCase()).slice(-keyword.length);
      if (buffer.current === keyword) {
        const msg = responses[Math.floor(Math.random() * responses.length)];
        setMessage(msg);
        setVisible(true);
        buffer.current = '';
        setTimeout(() => setVisible(false), 4000);
      }
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [keyword, responses]);

  return { message, visible };
}
