import { useEffect, useRef, useState } from "react";
import { useFetchCharacters } from "./use-fetch-characters";
import { useRefetchCooldown } from "./use-refetch-cooldown";
import { type Card } from "../types/card";
import type { Character } from "../types/character";
import { sleep } from "~/helpers";

export const useMemoryGame = () => {
  const {
    data: characters,
    isRefetching,
    isLoading,
    refetch,
  } = useFetchCharacters();

  const [cards, setCards] = useState<Card[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [turns, setTurns] = useState(0);

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
  }, [characters]);

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

  const timerControllerRef = useRef<AbortController>(null);

  const checkMatch = async (currentCards: Card[]) => {
    const unflippedIds = currentCards
      .filter((card) => card.status === "unflipped")
      .map((card) => card.characterId);

    // If is displaying the cards (timer active), cancel it
    if (timerControllerRef.current) timerControllerRef.current.abort();

    if (unflippedIds.length !== 2) return;

    setTurns((t) => t + 1);

    const controller = new AbortController();
    timerControllerRef.current = controller;

    try {
      await sleep(1000, controller.signal);
      resolveMatch(unflippedIds);
    } catch {
      // UX: Resolve immediate if cancel (if the user clic another card while the timer is active)
      resolveMatch(unflippedIds);
    } finally {
      timerControllerRef.current = null;
    }
  };

  const resolveMatch = (unflippedIds: string[]) => {
    // Match
    if (unflippedIds[0] === unflippedIds[1]) {
      setCards((prev) =>
        prev.map((c) =>
          c.characterId === unflippedIds[0] ? { ...c, status: "matched" } : c,
        ),
      );
      return;
    }

    // No match
    setCards((prev) =>
      prev.map((c) =>
        unflippedIds.includes(c.characterId) ? { ...c, status: "flipped" } : c,
      ),
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

const setupBoard = (characters: Character[]): Card[] => {
  const duplicated = characters.flatMap((c) => [c, c]);

  return duplicated.map((character, i) => ({
    character,
    characterId: character.id,
    id: `${character.id} - ${i}`,
    status: "unflipped",
  }));
};

const shuffle = (cards: Card[]) => {
  const result = [...cards]; // no mutar el original

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
};
