import { useNavigate } from "react-router";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import { CheckIcon } from "@radix-ui/react-icons";

import { sleep } from "~/helpers";
import { Spinner } from "~/ui";
import { useAuth } from "~/features/auth/hooks/use-auth";
import { useSaveScore } from "~/features/scores/mutations/use-save-score";

import { useGameStore } from "../store/game-store";
import type { LocationState } from "../types/locationState";
import { shuffle } from "../utils/game-utils";

const SHUFFLE_PASSES = 4;
const SHUFFLE_STEP_DELAY_MS = 300;
const PREP_TOAST_MS = 3000;

export const useMemoryGame = () => {
  const { mutateAsync: saveScoreMutation } = useSaveScore();

  const {
    cards,
    setCards,
    gameStarted,
    setGameStarted,
    turns,
    isGameFinished,
    setElapsedMs,
    elapsedMs,
    setIsRecord,
  } = useGameStore();
  const { user } = useAuth();

  const navigate = useNavigate();

  const startGame = async () => {
    // Reset timer and begin the "prep" flow.
    setElapsedMs(0);
    setGameStarted(true);

    const toastId = toast.warning("Prepárate...", {
      icon: (
        <Spinner style={{ color: "#8A3324", height: "1rem", width: "1rem" }} />
      ),
      position: "top-center",
    });

    // Briefly show all cards so the player gets a quick glance.
    setCards((cards) => cards.map((card) => ({ ...card, status: "flipped" })));
    await sleep(SHUFFLE_STEP_DELAY_MS);

    // Shuffle a few times for a simple animation.
    await shuffleCards();

    // Hide cards until the countdown finishes.
    setCards((cards) =>
      cards.map((card) => ({ ...card, status: "unflipped" })),
    );
    await sleep(PREP_TOAST_MS);

    // Start playing: cards are now clickable ("flipped" state in this codebase).
    setCards((cards) => cards.map((card) => ({ ...card, status: "flipped" })));
    toast.success("¡A jugar!", {
      id: toastId,
      icon: <CheckIcon />,
      position: "top-center",
    });
  };

  const shuffleCards = async () => {
    for (let i = 0; i < SHUFFLE_PASSES; i++) {
      setCards((prev) => shuffle(prev));
      await sleep(SHUFFLE_STEP_DELAY_MS);
    }
  };

  const saveScore = useCallback(async () => {
    if (!user) {
      toast.error(
        "Hay un problema con la autenticación. No es posible guardar tu puntaje",
      );
      return;
    }

    // `useSaveScore` returns whether this score is a new record.
    const isRecord = await saveScoreMutation({
      time: elapsedMs,
      turns,
      userId: user.uid,
      userName: user.displayName || "Anonimo",
      photoURL: user.photoURL,
    });
    setIsRecord(isRecord);
  }, [elapsedMs, saveScoreMutation, turns, user, setIsRecord]);

  useEffect(() => {
    // End of game: persist score and redirect to finish screen.
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

  const getMatches = () => {
    // Each match is represented by two cards.
    const matchedCards = cards.filter((card) => card.status === "matched");
    return matchedCards.length / 2;
  };

  return {
    cards,
    startGame,
    gameStarted,
    getMatches,
    turns,
  };
};
