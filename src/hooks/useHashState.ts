import { useCallback, useEffect, useState } from 'react';

function readHash<T extends string>(allowed: readonly T[], fallback: T): T {
  const value = window.location.hash.slice(1);
  return (allowed as readonly string[]).includes(value) ? (value as T) : fallback;
}

/**
 * Keeps a value in sync with the URL hash so views are linkable
 * (e.g. `/#personal`) and work with the browser's back button.
 * Unknown hashes fall back to `fallback`.
 */
export function useHashState<T extends string>(
  allowed: readonly T[],
  fallback: T,
): [T, (next: T) => void] {
  const [value, setValue] = useState<T>(() => readHash(allowed, fallback));

  useEffect(() => {
    const onHashChange = () => {
      setValue(readHash(allowed, fallback));
    };
    window.addEventListener('hashchange', onHashChange);
    return () => {
      window.removeEventListener('hashchange', onHashChange);
    };
  }, [allowed, fallback]);

  const update = useCallback((next: T) => {
    setValue(next);
    if (window.location.hash.slice(1) !== next) {
      window.history.pushState(null, '', `#${next}`);
    }
  }, []);

  return [value, update];
}
