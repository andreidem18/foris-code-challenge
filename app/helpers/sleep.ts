export const sleep = (time: number, signal?: AbortSignal) =>
  new Promise((resolve, reject) => {
    const timeout = setTimeout(resolve, time);

    signal?.addEventListener("abort", () => {
      clearTimeout(timeout);
      reject(new Error("Aborted"));
    });
  });
