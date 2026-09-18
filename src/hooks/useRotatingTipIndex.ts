import {useEffect, useState} from 'react';
import {useReducedMotion} from './useReducedMotion';

/**
 * Cycles 0…length-1 on a fixed interval.
 * With prefers-reduced-motion — stays at 0 (static first tip).
 */
export function useRotatingTipIndex(length: number, intervalMs: number): number {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced || length <= 1) return undefined;

    const id = window.setInterval(() => {
      setIndex(prev => (prev + 1) % length);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [reduced, length, intervalMs]);

  return index;
}
