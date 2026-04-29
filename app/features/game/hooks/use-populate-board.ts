import { useEffect, useRef } from "react";
import { useFetchCharacters } from "../queries/use-fetch-characters";
import { setupBoard } from "../utils/game-utils";
import { useRefetchCooldown } from "./use-refetch-cooldown";
import { useGameStore } from "../store/game-store";

export const usePopulateBoard = () => {
  const {
    data: characters,
    isRefetching,
    isFetching,
    refetch,
  } = useFetchCharacters();

  const { setCards, gameStarted, resetGame } = useGameStore();

  const hasInitialized = useRef(false);

  useEffect(() => {
    // Populate the board once we have the initial characters.
    // `hasInitialized` avoids resetting the board if react-query re-renders with the
    // same data.
    if (characters && !gameStarted && !hasInitialized.current) {
      setCards(setupBoard(characters));
      hasInitialized.current = true;
    }
  }, [characters, setCards, gameStarted]);

  const { triggerRefetch, isRefetchBlocked } = useRefetchCooldown({
    refetch,
    isRefetching,
  });

  const handleReloadGame = async () => {
    const result = await triggerRefetch();

    // Only rebuild the board if refetch returned new data.
    if (result?.data) {
      setCards(setupBoard(result.data));
    }
  };

  const exitGame = () => {
    resetGame();
    handleReloadGame();
  };

  return {
    isFetching,
    exitGame,
    isRefetchBlocked,
    handleReloadGame,
  };
};
