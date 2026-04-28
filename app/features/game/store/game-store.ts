import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { Card } from "../types/card";

type setCardsCallback = (currentState: Card[]) => Card[];
type setTurnsCallback = (currentState: number) => number;

interface GameState {
  cards: Card[];
  gameStarted: boolean;
  turns: number;

  setCards: (value: Card[] | setCardsCallback) => void;
  setGameStarted: (value: boolean) => void;
  setTurns: (value: number | setTurnsCallback) => void;
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
          });
        },
      }),
      { name: "game-store" },
    ),
  ),
);
