import { Button } from "~/ui/button/button";
import { useFetchCharacters } from "../../hooks/useFetchCharacters";
import { MemoryCard } from "../memory-card/memory-card";

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

  // TODO: improve loading state
  if (isLoading) return <div>Loading...</div>;
  if (!charactersList) return <></>;

  return (
    <>
      <div className={styles.gameHeader}>
        <div className={styles.charactersContainer}>
          <h3>Personajes</h3>
          <Button
            onClick={() => refetch()}
            disabled={isRefetching}
            className={styles.refetchButton}
            variant="outline"
          >
            {isRefetching ? <Spinner /> : <ReloadIcon />}
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
