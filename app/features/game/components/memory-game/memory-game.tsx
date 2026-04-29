import { motion } from "motion/react";

import { Button } from "~/ui/button/button";
import { MemoryCard } from "../memory-card/memory-card";
import { Spinner } from "~/ui";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useMemoryGame } from "../../hooks/use-memory-game";

import styles from "./memory-game.module.scss";
import { CardGridSkeleton } from "../card-grid-skeleton/card-grid-skeleton";
import { useFlipCard } from "../../hooks/use-flip-card";
import { GameTimer } from "../game-timer/game-timer";
import { usePopulateBoard } from "../../hooks/use-populate-board";

export const MemoryGame = () => {
  const { cards, startGame, gameStarted, getMatches, turns } = useMemoryGame();

  const { exitGame, isRefetchBlocked, isFetching, handleReloadGame } =
    usePopulateBoard();

  const { flipCard } = useFlipCard();

  return (
    <>
      <div className={styles.gameHeader}>
        {gameStarted ? (
          <>
            <div>Aciertos: {getMatches()}</div>
            <div className={styles.turnsAndExit}>
              <GameTimer />
              <div>Turnos: {turns}</div>
              <Button onClick={exitGame} variant="danger">
                Salir
              </Button>
            </div>
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
            <div className={styles.leftOptions}>
              <Button className={styles.playButton} onClick={startGame}>
                Jugar
              </Button>
            </div>
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
