import { useGameStore } from "../store/game-store";
import type { Card } from "../types/card";
import { resolveMatch } from "../utils/game-utils";
import { useSafeTimer } from "./use-safe-timer";

export const useFlipCard = () => {
  const { cards, gameStarted, setCards, setTurns } = useGameStore();
  const { safeTimer, safeTimerRef } = useSafeTimer();

  // Only two cards can be face-up at a time.
  // When the 2nd card is flipped, we schedule match resolution after a short delay.
  // If the user flips another card before the delay finishes, we abort the pending
  // resolution and resolve immediately with the new state.

  const flipCard = async (card: Card) => {
    // Ignore clicks before the game starts and ignore already-unflipped/matched cards.
    if (!gameStarted || card.status !== "flipped") return;

    // Cancel any pending "resolve match" timer (we're changing the board again).
    safeTimerRef.current?.abort();

    const nextCards = cards.map((c): Card => {
      if (c.id === card.id) {
        return { ...c, status: "unflipped" };
      }
      return c;
    });

    setCards(nextCards);
    maybeResolveTurn(nextCards);
  };

  const maybeResolveTurn = (currentCards: Card[]) => {
    const faceUp = currentCards.filter((card) => card.status === "unflipped");

    // Wait until exactly two cards are face-up.
    if (faceUp.length !== 2) return;

    setTurns((t) => t + 1);

    safeTimer(() => {
      setCards((cards) => resolveMatch(cards, faceUp));
    }, 1000);
  };

  return {
    flipCard,
  };
};
