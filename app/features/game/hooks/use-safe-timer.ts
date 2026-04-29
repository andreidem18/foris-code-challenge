import { useEffect, useRef } from "react";
import { sleep } from "~/helpers";

// A "single-flight" timeout helper.
//
// - At most one timer can be pending at a time.
// - Starting a new timer aborts the previous one.
// - If a timer is aborted, we still run the callback immediately (so callers can
//   rely on the callback happening exactly once per `safeTimer(...)` call).
export const useSafeTimer = () => {
  const safeTimerRef = useRef<AbortController | null>(null);

  const safeCancelTimer = () => {
    if (safeTimerRef.current) safeTimerRef.current.abort();
  }

  const safeTimer = async (callback: () => void, time: number) => {
    safeCancelTimer();

    const controller = new AbortController();
    safeTimerRef.current = controller;

    try {
      await sleep(time, controller.signal);
      callback();
    } catch {
      // Aborted (or sleep failed): run the callback right away.
      callback();
    } finally {
      safeTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      safeTimerRef.current?.abort();
    };
  }, []);

  return { safeTimer, safeCancelTimer };
};
