import { useEffect, useRef } from "react";
import { useFetchCharacters } from "./use-fetch-characters";
import { useRefetchCooldown } from "./use-refetch-cooldown";
import { sleep } from "~/helpers";
import { setupBoard, shuffle } from "../utils/game-utils";
import { useNavigate } from "react-router";
import { useGameStore } from "../store/game-store";
import type { LocationState } from "../types/locationState";

export const useMemoryGame = () => {
  const {
    data: characters,
    isRefetching,
    isFetching,
    refetch,
  } = useFetchCharacters();

  const {
    cards,
    setCards,
    gameStarted,
    setGameStarted,
    turns,
    resetGame,
    isGameFinished,
  } = useGameStore();
  const navigate = useNavigate();

  const getMatches = () => {
    const cardsMatched = cards.filter(
      (card) => card.status === "matched",
    ).length;
    return cardsMatched / 2;
  };

  const hasInitialized = useRef(false);

  useEffect(() => {
    if (characters && !gameStarted && !hasInitialized.current) {
      setCards(setupBoard(characters));
      hasInitialized.current = true;
    }
  }, [characters, setCards, gameStarted]);

  const exitGame = () => {
    resetGame();
    handleReloadGame();
  };

  // Check game end
  useEffect(() => {
    if (!cards.length) return;
    if (isGameFinished()) {
      setGameStarted(false);
      navigate("/game/finish", {
        state: { fromGame: true } satisfies LocationState,
      });
    }
  }, [cards, navigate, setCards, turns, setGameStarted, isGameFinished]);

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

  return {
    exitGame,
    handleReloadGame,
    isRefetchBlocked,
    isFetching,
    cards,
    startGame,
    gameStarted,
    getMatches,
    turns,
  };
};
