import { useEffect, useState } from "react";

export const usePersistedState = <T>(key: string, initial: T) => {
  const [state, setState] = useState<T>(() => {
    const saved = localStorage.getItem(key);
    
    if (!saved) {
      return initial;
    }
    try {
      return JSON.parse(saved) as T;
    } catch {
      localStorage.removeItem(key);
      return initial;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState] as const;
};
