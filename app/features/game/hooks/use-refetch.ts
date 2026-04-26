import { useState, useRef, useEffect } from "react";

interface Params {
  refetch: () => void;
  isRefetching: boolean;
}

export const useRefetch = ({ refetch, isRefetching }: Params) => {
  const [isRefetchCooldown, setIsRefetchCooldown] = useState(false);

  const cooldownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    return () => {
      if (cooldownTimeoutRef.current) clearTimeout(cooldownTimeoutRef.current);
    };
  }, []);

  const isRefetchBusy = isRefetching || isRefetchCooldown;

  const handleRefetch = async () => {
    if (isRefetchBusy) return;

    // Disable immediately and keep disabled 2s after the refetch settles.
    setIsRefetchCooldown(true);
    if (cooldownTimeoutRef.current) clearTimeout(cooldownTimeoutRef.current);

    try {
      await refetch();
    } finally {
      cooldownTimeoutRef.current = setTimeout(() => {
        setIsRefetchCooldown(false);
        cooldownTimeoutRef.current = null;
      }, 2000);
    }
  };

  return { handleRefetch, isRefetchBusy };
};
