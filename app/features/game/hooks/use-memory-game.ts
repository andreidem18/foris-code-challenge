import { useEffect, useRef, useState } from "react";
import { useFetchCharacters } from "./use-fetch-characters";
import { useRefetchCooldown } from "./use-refetch-cooldown";
import { type Card } from "../types/card";
import { sleep } from "~/helpers";
import { useTimedAction } from "./use-timed-action";
import { resolveMatch, setupBoard, shuffle } from "../utils/gameUtils";
import { usePersistedState } from "~/hooks/use-persisted-state";

export const useMemoryGame = () => {
  const {
    data: characters,
    isRefetching,
    isLoading,
    refetch,
  } = useFetchCharacters();

  const [cards, setCards] = usePersistedState<Card[]>("gameBoard", []);
  const [gameStarted, setGameStarted] = useState(false);
  const [turns, setTurns] = useState(0);

  const { timedAction } = useTimedAction();

  const getMatches = () => {
    const cardsMatched = cards.filter(
      (card) => card.status === "matched",
    ).length;
    return cardsMatched / 2;
  };

  const hasInitialized = useRef(false);

  useEffect(() => {
    if (characters && !hasInitialized.current) {
      setCards(setupBoard(characters));
      hasInitialized.current = true;
    }
  }, [characters, setCards]);

  const { triggerRefetch, isRefetchBlocked } = useRefetchCooldown({
    refetch,
    isRefetching,
  });

  const handleReloadGame = async () => {
    const result = await triggerRefetch();

    if (result?.data) {
      setCards(setupBoard(result.data));
    }
  };

  const shuffleCards = async () => {
    for (let i = 0; i < 4; i++) {
      setCards((prev) => shuffle(prev));
      await sleep(300);
    }
  };

  const startGame = async () => {
    setGameStarted(true);
    setCards((cards) => cards.map((card) => ({ ...card, status: "flipped" })));
    await sleep(300);
    shuffleCards();
  };

  const flipCard = async (card: Card) => {
    if (!gameStarted || !(card.status === "flipped")) return;
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
    const unflippedIds = currentCards
      .filter((card) => card.status === "unflipped")
      .map((card) => card.characterId);

    if (unflippedIds.length !== 2) return;

    setTurns((t) => t + 1);

    timedAction(1000, () =>
      setCards((cards) => resolveMatch(cards, unflippedIds)),
    );
  };

  return {
    handleReloadGame,
    isRefetchBlocked,
    isLoading,
    cards,
    startGame,
    gameStarted,
    flipCard,
    getMatches,
    turns,
  };
};
