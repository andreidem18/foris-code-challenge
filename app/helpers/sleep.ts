export const sleep = (time: number, signal?: AbortSignal) =>
  new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new Error("Aborted"));
      return;
    }

    const timeout = setTimeout(() => {
      cleanup();
      resolve(undefined);
    }, time);

    const cleanup = () => {
      clearTimeout(timeout);
      signal?.removeEventListener("abort", onAbort);
    };
    const onAbort = () => {
      cleanup();
      reject(new Error("Aborted"));
    };

    signal?.addEventListener("abort", onAbort, { once: true });
  });
