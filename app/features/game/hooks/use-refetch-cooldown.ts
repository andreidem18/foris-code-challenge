import { useEffect, useRef, useState } from "react";

interface Params<T> {
  refetch: () => Promise<T>;
  isRefetching: boolean;
}

const COOLDOWN_MS = 2000;

export const useRefetchCooldown = <T>({ refetch, isRefetching }: Params<T>) => {
  const [isCooldownActive, setIsCooldownActive] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const isRefetchBlocked = isRefetching || isCooldownActive;

  const triggerRefetch = async () => {
    // Prevent spamming the backend: block while refetching and for a short
    // cooldown window after each attempt.
    if (isRefetchBlocked) return;

    setIsCooldownActive(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    try {
      return await refetch();
    } finally {
      timeoutRef.current = setTimeout(() => {
        setIsCooldownActive(false);
        timeoutRef.current = null;
      }, COOLDOWN_MS);
    }
  };

  return {
    triggerRefetch,
    isRefetchBlocked,
  };
};
