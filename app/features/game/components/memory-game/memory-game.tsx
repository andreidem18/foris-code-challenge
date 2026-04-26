import { Button } from "~/ui/button/button";
import { useFetchCharacters } from "../../hooks/use-fetch-characters";
import { MemoryCard } from "../memory-card/memory-card";
import { useEffect, useRef, useState } from "react";

import styles from "./memory-game.module.scss";
import { Spinner } from "~/ui";
import { ReloadIcon } from "@radix-ui/react-icons";

export const MemoryGame = () => {
  const {
    data: charactersList,
    isRefetching,
    isLoading,
    refetch,
  } = useFetchCharacters();

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

  // TODO: improve loading state
  if (isLoading) return <div>Loading...</div>;
  if (!charactersList) return <></>;

  return (
    <>
      <div className={styles.gameHeader}>
        <div className={styles.charactersContainer}>
          <h3>Personajes</h3>
          <Button
            onClick={handleRefetch}
            disabled={isRefetchBusy}
            className={styles.refetchButton}
            variant="outline"
          >
            {isRefetchBusy ? <Spinner /> : <ReloadIcon />}
          </Button>
        </div>
        <Button className={styles.playButton}>Jugar</Button>
      </div>
      <ul className={styles.cardList}>
        {charactersList.map((character) => (
          <li key={character.id}>
            <MemoryCard character={character} />
          </li>
        ))}
      </ul>
    </>
  );
};
