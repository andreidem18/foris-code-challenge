import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { Card } from "../types/card";

type setCardsCallback = (currentState: Card[]) => Card[];
type setTurnsCallback = (currentState: number) => number;
type setElapsedMsCallback = (currentState: number) => number;

interface GameState {
  cards: Card[];
  gameStarted: boolean;
  turns: number;
  elapsedMs: number;

  setCards: (value: Card[] | setCardsCallback) => void;
  setGameStarted: (value: boolean) => void;
  setTurns: (value: number | setTurnsCallback) => void;
  setElapsedMs: (value: number | setElapsedMsCallback) => void;
  resetGame: () => void;
  isGameFinished: () => boolean;
}

export const useGameStore = create<GameState>()(
  devtools(
    persist(
      (set, get) => ({
        cards: [],
        gameStarted: false,
        turns: 0,
        elapsedMs: 0,

        setCards: (value) => {
          if (typeof value === "function") {
            set((s) => ({ cards: value(s.cards) }));
            return;
          }
          set(() => ({ cards: value }));
        },
        setGameStarted: (value) => set(() => ({ gameStarted: value })),
        setTurns: (value) => {
          if (typeof value === "function") {
            set((s) => ({ turns: value(s.turns) }));
            return;
          }
          set(() => ({ turns: value }));
        },
        setElapsedMs: (value) => {
          if (typeof value === "function") {
            set((s) => ({ elapsedMs: value(s.elapsedMs) }));
            return;
          }
          set(() => ({ elapsedMs: value }));
        },
        isGameFinished: () => {
          const { cards } = get();
          return (
            Boolean(cards.length) &&
            cards.every((card) => card.status === "matched")
          );
        },
        resetGame: () => {
          set({
            cards: [],
            turns: 0,
            gameStarted: false,
            elapsedMs: 0,
          });
        },
      }),
      { name: "game-store" },
    ),
  ),
);
