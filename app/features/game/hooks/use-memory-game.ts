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

  const shuffleCards = async () => {
    for (let i = 0; i < 4; i++) {
      setCards((prev) => shuffle(prev));
      await sleep(300);
    }
  };

  const startGame = async () => {
    setGameStarted(true);
    setCards((cards) => cards.map((card) => ({ ...card, status: "flipped" })));
    await sleep(700);
    shuffleCards();
  };

  const flipCard = async (card: Card) => {
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
    if (unflipped.length < 2) return;
    setTurns(turns + 1);
    await sleep(1000);
    if (unflipped[0].characterId === unflipped[1].characterId) {
      setCards((prev) =>
        prev.map((c) => {
          if (c.characterId === unflipped[0].characterId) {
            return { ...c, status: "matched" };
          }
          return c;
        }),
      );
      return;
    }
    setCards((prev) =>
      prev.map((c) => {
        if (c.status === "unflipped") {
          return { ...c, status: "flipped" };
        }
        return c;
      }),
    );
  };

  const handleReloadGame = async () => {
    const result = await triggerRefetch();

    if (result?.data) {
      setCards(setupBoard(result.data));
    }
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
