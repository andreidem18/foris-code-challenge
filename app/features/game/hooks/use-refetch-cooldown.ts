import { useEffect, useRef, useState } from "react";

interface Params<T> {
  refetch: () => Promise<T>;
  isRefetching: boolean;
}

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
    if (isRefetchBlocked) return;

    setIsCooldownActive(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    try {
      return await refetch();
    } finally {
      timeoutRef.current = setTimeout(() => {
        setIsCooldownActive(false);
        timeoutRef.current = null;
      }, 2000);
    }
  };

  return {
    triggerRefetch,
    isRefetchBlocked,
  };
};
