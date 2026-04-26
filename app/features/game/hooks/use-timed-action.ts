import { useRef } from "react";
import { sleep } from "~/helpers";

// Function to have only a timeout at a time. If another is activated, it
// cancels the previous one and executes the callback immediatly
export const useTimedAction = () => {
  const controllerRef = useRef<AbortController>(null);

  const timedAction = async (time: number, callback: () => void) => {
    if (controllerRef.current) controllerRef.current.abort();

    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      await sleep(time, controller.signal);
      callback();
    } catch {
      callback();
    } finally {
      controllerRef.current = null;
    }
  };

  return { timedAction };
};
