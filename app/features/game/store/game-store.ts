import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { Card } from "../types/card";
import type { IsRecord } from "../types/is-record";

type setCardsCallback = (currentState: Card[]) => Card[];
type setTurnsCallback = (currentState: number) => number;
type setElapsedMsCallback = (currentState: number) => number;

interface GameState {
  cards: Card[];
  gameStarted: boolean;
  turns: number;
  elapsedMs: number;
  isRecord: IsRecord;
  deleteOnMatch: boolean;

  setCards: (value: Card[] | setCardsCallback) => void;
  setDeleteOnMatch: (value: boolean) => void;
  setGameStarted: (value: boolean) => void;
  setTurns: (value: number | setTurnsCallback) => void;
  setElapsedMs: (value: number | setElapsedMsCallback) => void;
  setIsRecord: (value: IsRecord) => void;
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
        isRecord: { newPersonalRecord: false, newGlobalRecord: false },
        deleteOnMatch: false,

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
        setIsRecord: (value) => set({ isRecord: value }),
        setDeleteOnMatch: (value) => set({ deleteOnMatch: value }),
        isGameFinished: () => {
          const { cards, deleteOnMatch } = get();
          if (deleteOnMatch) return Boolean(cards.length === 0);
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
            isRecord: {
              newGlobalRecord: false,
              newPersonalRecord: false,
            },
          });
        },
      }),
      { name: "game-store" },
    ),
  ),
);
