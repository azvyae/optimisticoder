import { useEffect, useRef, type ForwardedRef, type RefObject } from 'react';

function useForwardRef<T>(
  ref: ForwardedRef<T>,
  initialValue: T | null = null,
): RefObject<T> {
  const targetRef = useRef<T>(initialValue);

  useEffect(() => {
    if (!ref) return;

    if (typeof ref === 'function') {
      ref(targetRef.current);
    } else {
      ref.current = targetRef.current;
    }
  }, [ref]);

  return targetRef;
}

export { useForwardRef };
