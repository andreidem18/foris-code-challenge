import { useEffect, useRef } from "react";

import { useGameStore } from "../store/game-store";

const TICK_MS = 1000;

// Keeps `elapsedMs` updated while the game is running.
export function useGameTimer() {
  const { gameStarted, isGameFinished,setElapsedMs, elapsedMs } = useGameStore();
  const gameFinished = isGameFinished();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastTickRef = useRef<number | null>(null);

  useEffect(() => {
    const running = gameStarted && !gameFinished;

    if (!running) {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      lastTickRef.current = null;
      return;
    }

    const time = elapsedMs === 0 ? 4000 : 0;

    const timeout = setTimeout(() => {
      lastTickRef.current = Date.now();

      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const last = lastTickRef.current ?? now;
        const delta = now - last;
        lastTickRef.current = now;

        setElapsedMs((prev) => prev + delta);
      }, TICK_MS);
    }, time);

    return () => {
      clearTimeout(timeout);

      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [gameStarted, gameFinished, setElapsedMs]);
}
