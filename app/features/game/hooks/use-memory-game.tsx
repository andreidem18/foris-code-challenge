import { useCallback, useEffect, useRef } from "react";
import { useFetchCharacters } from "./use-fetch-characters";
import { useRefetchCooldown } from "./use-refetch-cooldown";
import { sleep } from "~/helpers";
import { setupBoard, shuffle } from "../utils/game-utils";
import { useNavigate } from "react-router";
import { useGameStore } from "../store/game-store";
import type { LocationState } from "../types/locationState";
import { useSaveScore } from "~/features/scores/mutations/use-save-score";
import { useAuth } from "~/features/auth/hooks/use-auth";
import { toast } from "sonner";
import { Spinner } from "~/ui";
import { CheckIcon } from "@radix-ui/react-icons";

export const useMemoryGame = () => {
  const {
    data: characters,
    isRefetching,
    isFetching,
    refetch,
  } = useFetchCharacters();
  const { mutateAsync: saveScoreMutation } = useSaveScore();

  const {
    cards,
    setCards,
    gameStarted,
    setGameStarted,
    turns,
    resetGame,
    isGameFinished,
    setElapsedMs,
    elapsedMs,
    setIsRecord,
  } = useGameStore();
  const { user } = useAuth();

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

  const saveScore = useCallback(async () => {
    if (!user) {
      toast.error(
        "Hay un problema con la autenticación. No es posible guardar tu puntaje",
      );
      return;
    }
    const isRecord = await saveScoreMutation({
      time: elapsedMs,
      turns,
      userId: user.uid,
      userName: user.displayName || "Anonimo",
      photoURL: user.photoURL,
    });
    setIsRecord(isRecord);
  }, [elapsedMs, saveScoreMutation, turns, user, setIsRecord]);

  // Check game end
  useEffect(() => {
    if (!isGameFinished() || !gameStarted) return;
    const finishGame = async () => {
      saveScore();
      setGameStarted(false);
      navigate("/game/finish", {
        state: { fromGame: true } satisfies LocationState,
      });
    };
    finishGame();
  }, [
    cards,
    navigate,
    setCards,
    turns,
    setGameStarted,
    isGameFinished,
    saveScore,
    gameStarted,
  ]);

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
    setElapsedMs(0);
    setGameStarted(true);
    const toastId = toast.warning("Prepárate...", {
      icon: (
        <Spinner style={{ color: "#8A3324", height: "1rem", width: "1rem" }} />
      ),
      position: "top-center",
    });
    setCards((cards) => cards.map((card) => ({ ...card, status: "flipped" })));
    await sleep(300);
    await shuffleCards();
    setCards((cards) =>
      cards.map((card) => ({ ...card, status: "unflipped" })),
    );
    await sleep(3000);
    setCards((cards) => cards.map((card) => ({ ...card, status: "flipped" })));
    toast.success("¡A jugar!", {
      id: toastId,
      icon: <CheckIcon />,
      position: "top-center",
    });
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
