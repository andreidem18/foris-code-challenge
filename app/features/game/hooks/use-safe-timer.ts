import { useEffect, useRef } from "react";
import { sleep } from "~/helpers";

// Function to have only a timeout at a time. If another is activated, it
// cancels the previous one and executes the callback immediately
export const useSafeTimer = () => {
  const safeTimerRef = useRef<AbortController | null>(null);

  const safeTimer = async (callback: () => void, time: number) => {
    if (safeTimerRef.current) safeTimerRef.current.abort();

    const controller = new AbortController();
    safeTimerRef.current = controller;

    try {
      await sleep(time, controller.signal);
      callback();
    } catch {
      callback();
    } finally {
      // safeTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      safeTimerRef.current?.abort();
    };
  }, []);

  return { safeTimer, safeTimerRef };
};
