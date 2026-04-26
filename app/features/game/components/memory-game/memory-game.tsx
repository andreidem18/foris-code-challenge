import { motion } from "motion/react";

import { Button } from "~/ui/button/button";
import { MemoryCard } from "../memory-card/memory-card";
import { Spinner } from "~/ui";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useMemoryGame } from "../../hooks/use-memory-game";

import styles from "./memory-game.module.scss";

export const MemoryGame = () => {
  const {
    isRefetchBlocked,
    isLoading,
    handleReloadGame,
    cards,
    startGame,
    gameStarted,
    flipCard,
    getMatches,
    turns,
  } = useMemoryGame();

  // TODO: improve loading state
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className={styles.gameHeader}>
        {gameStarted ? (
          <>
            <div>Aciertos: {getMatches()}</div>
            <div>Turnos: {turns}</div>
          </>
        ) : (
          <>
            <div className={styles.charactersContainer}>
              <h3>Personajes</h3>
              <Button
                onClick={handleReloadGame}
                disabled={isRefetchBlocked}
                className={styles.refetchButton}
                variant="outline"
              >
                {isRefetchBlocked ? <Spinner /> : <ReloadIcon />}
              </Button>
            </div>
            <Button className={styles.playButton} onClick={startGame}>
              Jugar
            </Button>
          </>
        )}
      </div>
      <ul className={styles.cardList}>
        {cards.map((card) => (
          <motion.li key={card.id} layout transition={{ duration: 0.5 }}>
            <MemoryCard card={card} flipCard={flipCard} />
          </motion.li>
        ))}
      </ul>
    </>
  );
};
