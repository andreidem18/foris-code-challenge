import { useGameStore } from "../store/game-store";
import type { Card } from "../types/card";
import { resolveMatch } from "../utils/game-utils";
import { useSafeTimer } from "./use-safe-timer";

export const useFlipCard = () => {
  const { cards, gameStarted, setCards, setTurns } = useGameStore();

  const { safeTimer, safeTimerRef } = useSafeTimer();

  const flipCard = async (card: Card) => {
    if (!gameStarted || !(card.status === "flipped")) return;
    safeTimerRef.current?.abort();
    const currentCards = cards.map((c): Card => {
      if (c.id === card.id) {
        return { ...c, status: "unflipped" };
      }
      return c;
    });
    setCards([...currentCards]);
    checkMatch(currentCards);
  };

  const checkMatch = async (currentCards: Card[]) => {
    const unflipped = currentCards.filter(
      (card) => card.status === "unflipped",
    );

    if (unflipped.length !== 2) return;

    setTurns((t) => t + 1);

    safeTimer(() => {
      setCards((cards) => resolveMatch(cards, unflipped));
    }, 1000);
  };

  return {
    flipCard,
  };
};
