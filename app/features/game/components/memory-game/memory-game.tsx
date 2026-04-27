import { motion } from "motion/react";

import { Button } from "~/ui/button/button";
import { MemoryCard } from "../memory-card/memory-card";
import { Spinner } from "~/ui";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useMemoryGame } from "../../hooks/use-memory-game";

import styles from "./memory-game.module.scss";
import { CardGridSkeleton } from "../card-grid-skeleton/card-grid-skeleton";

export const MemoryGame = () => {
  const {
    isRefetchBlocked,
    isFetching,
    handleReloadGame,
    cards,
    startGame,
    gameStarted,
    flipCard,
    getMatches,
    turns,
  } = useMemoryGame();

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
                aria-label={"Traer otros personajes"}
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
        {isFetching ? (
          <CardGridSkeleton />
        ) : (
          cards.map((card) => (
            <motion.li key={card.id} layout transition={{ duration: 0.5 }}>
              <MemoryCard card={card} flipCard={flipCard} />
            </motion.li>
          ))
        )}
      </ul>
    </>
  );
};
