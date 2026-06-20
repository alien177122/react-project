import {useCallback, useLayoutEffect, useRef, useState} from 'react';

export interface SlidingIndicatorMetrics {
  width: number;
  x: number;
}

export function useSlidingIndicator(activeIndex: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicator, setIndicator] = useState<SlidingIndicatorMetrics | null>(null);
  const [isReady, setIsReady] = useState(false);

  const setButtonRef = useCallback(
    (index: number) => (element: HTMLButtonElement | null) => {
      buttonRefs.current[index] = element;
    },
    [],
  );

  const syncIndicator = useCallback(() => {
    const container = containerRef.current;
    const activeButton = buttonRefs.current[activeIndex];
    if (!container || !activeButton) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const buttonRect = activeButton.getBoundingClientRect();

    setIndicator({
      width: buttonRect.width,
      x: buttonRect.left - containerRect.left + container.scrollLeft,
    });
  }, [activeIndex]);

  useLayoutEffect(() => {
    syncIndicator();
    const frame = requestAnimationFrame(() => setIsReady(true));
    return () => cancelAnimationFrame(frame);
  }, [syncIndicator]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return undefined;
    }

    const resizeObserver = new ResizeObserver(syncIndicator);
    resizeObserver.observe(container);

    container.addEventListener('scroll', syncIndicator, {passive: true});
    window.addEventListener('resize', syncIndicator);

    return () => {
      resizeObserver.disconnect();
      container.removeEventListener('scroll', syncIndicator);
      window.removeEventListener('resize', syncIndicator);
    };
  }, [syncIndicator]);

  return {
    containerRef,
    indicator,
    isReady,
    setButtonRef,
  };
}
