import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { cardsMockData } from "../mock-data/cards-mock-data";
import { charactersMockData } from "../mock-data/characters-mock-data";
import type { Card } from "../types/card";
import { useFlipCard } from "./use-flip-card";
import { useMemoryGame } from "./use-memory-game";

const useFetchCharactersMock = vi.fn();

vi.mock("./use-fetch-characters", () => ({
  useFetchCharacters: (...args: unknown[]) => useFetchCharactersMock(...args),
}));

vi.mock("~/features/scores/mutations/use-save-score", () => ({
  useSaveScore: () => ({mutateAsync: vi.fn()}),
}));

export const useMemoryGameFacade = () => {
  const flipCard = useFlipCard();
  const memoryGame = useMemoryGame();

  return {
    ...memoryGame,
    ...flipCard,
  };
};

describe("useFlipCard", () => {
  it("Should mark cards as matched", async () => {
    vi.useFakeTimers();
    useFetchCharactersMock.mockReturnValue({
      data: charactersMockData,
    });
    const { result } = renderHook(() => useMemoryGameFacade());

    await act(async () => {
      result.current.startGame();
    });

    for (let i = 0; i < 4; i++) {
      await act(async () => {
        vi.advanceTimersByTime(3000);
      });
    }

    const [card1, card2] = findMatchedCards(result.current.cards);

    await act(async () => {
      result.current.flipCard(card1);
    });
    await act(async () => {
      result.current.flipCard(card2);
    });
    await act(async () => {
      vi.advanceTimersByTime(1500);
    });

    const updated = findMatchedCards(result.current.cards);

    expect(updated.every((c) => c.status === "matched")).toBe(true);
    expect(result.current.turns).toBe(1);
    expect(result.current.getMatches()).toBe(1);
  });

  it("Should flip again unmatched cards", async () => {
    vi.useFakeTimers();
    useFetchCharactersMock.mockReturnValue({
      data: charactersMockData,
    });
    const { result } = renderHook(() => useMemoryGameFacade());

    await act(async () => {
      result.current.startGame();
    });

    for (let i = 0; i < 4; i++) {
      await act(async () => {
        vi.advanceTimersByTime(3000);
      });
    }

    const [card1, card2] = findUnmatchedCards(result.current.cards);

    await act(async () => {
      result.current.flipCard(card1);
    });
    await act(async () => {
      result.current.flipCard(card2);
    });
    await act(async () => {
      vi.advanceTimersByTime(1500);
    });

    expect(result.current.cards.every((c) => c.status === "flipped")).toBe(
      true,
    );
    expect(result.current.turns).toBe(1);
    expect(result.current.getMatches()).toBe(0);
  });

  it("Should cancel timer when flipping a third card", async () => {
    vi.useFakeTimers();
    useFetchCharactersMock.mockReturnValue({
      data: charactersMockData,
    });
    const { result } = renderHook(() => useMemoryGameFacade());

    await act(async () => {
      result.current.startGame();
    });

    for (let i = 0; i < 4; i++) {
      await act(async () => {
        vi.advanceTimersByTime(3000);
      });
    }

    const [card1, card2] = findUnmatchedCards(result.current.cards);
    const card3 = result.current.cards.find(
      (c) => c.id !== card1.id && c.id !== card2.id,
    )!;

    await act(async () => {
      result.current.flipCard(card1);
    });
    await act(async () => {
      result.current.flipCard(card2);
    });
    await act(async () => {
      vi.advanceTimersByTime(500);
    });
    await act(async () => {
      result.current.flipCard(card3);
    });
    await act(async () => {
      vi.advanceTimersByTime(500);
    });

    expect(
      result.current.cards.filter((c) => c.status === "unflipped"),
    ).toHaveLength(1);
    expect(result.current.turns).toBe(1);
    expect(result.current.getMatches()).toBe(0);
  });
});

const findUnmatchedCards = (cards: Card[]) => {
  const card1 = cards[0];
  const card2 = cards.find((card) => card.characterId !== card1.characterId);
  if (!card2) throw new Error("There is a problem with cards array");
  return [card1, card2];
};

const findMatchedCards = (cards: Card[]) => {
  const characterId = cardsMockData[0].characterId;
  const [card1, card2] = cards.filter(
    (card) => card.characterId === characterId,
  );
  return [card1, card2];
};
