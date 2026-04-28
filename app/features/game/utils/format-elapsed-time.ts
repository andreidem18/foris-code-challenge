import { millisecondsToMinutes, millisecondsToSeconds } from "date-fns";

export function formatElapsedTime(ms: number) {
  const safeMs = Math.max(0, Math.floor(ms));

  // Keep parity with previous behavior: minutes are total minutes (can exceed 60).
  const minutes = millisecondsToMinutes(safeMs);
  const seconds = millisecondsToSeconds(safeMs) % 60;

  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");

  return `${mm}:${ss}`;
}
