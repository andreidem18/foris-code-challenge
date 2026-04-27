import { useEffect, useRef, useState } from "react";
import { useFetchCharacters } from "./use-fetch-characters";
import { useRefetchCooldown } from "./use-refetch-cooldown";
import { type Card } from "../types/card";
import { sleep } from "~/helpers";
import { useSafeTimer } from "./use-safe-timer";
import { resolveMatch, setupBoard, shuffle } from "../utils/game-utils";
import { usePersistedState } from "~/hooks/use-persisted-state";
import { useNavigate } from "react-router";
import type { GameResult } from "../types/game-result";
import { gameSession } from "../utils/game-session";

export const useMemoryGame = () => {
  const {
    data: characters,
    isRefetching,
    isFetching,
    refetch,
  } = useFetchCharacters();

  const [cards, setCards] = usePersistedState<Card[]>("gameBoard", []);
  const [gameStarted, setGameStarted] = useState(false);
  const [turns, setTurns] = useState(0);
  const navigate = useNavigate();

  const { safeTimer, safeTimerRef } = useSafeTimer();

  const getMatches = () => {
    const cardsMatched = cards.filter(
      (card) => card.status === "matched",
    ).length;
    return cardsMatched / 2;
  };

  const hasInitialized = useRef(false);

  useEffect(() => {
    if (characters && !hasInitialized.current) {
      gameSession.reset();
      setCards(setupBoard(characters));
      hasInitialized.current = true;
    }
  }, [characters, setCards]);

  // Check game end
  useEffect(() => {
    if (!cards.length) return;
    const isFinished = cards.every((card) => card.status === "matched");
    if (isFinished) {
      gameSession.finish();
      navigate("/game/finish", { state: { turns } satisfies GameResult });
      setCards([]);
    }
  }, [cards, navigate, setCards, turns]);

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
    gameSession.start();
    setGameStarted(true);
    setCards((cards) => cards.map((card) => ({ ...card, status: "flipped" })));
    await sleep(300);
    shuffleCards();
  };

  const flipCard = async (card: Card) => {
    if (!gameStarted || !(card.status === "flipped")) return;
    if (safeTimerRef.current) safeTimerRef.current.abort();
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
    handleReloadGame,
    isRefetchBlocked,
    isFetching,
    cards,
    startGame,
    gameStarted,
    flipCard,
    getMatches,
    turns,
  };
};
