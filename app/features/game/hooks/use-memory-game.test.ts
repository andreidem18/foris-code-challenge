import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useMemoryGame } from "./use-memory-game";
import { charactersMockData } from "../mock-data/characters-mock-data";
import { cardsMockData } from "../mock-data/cards-mock-data";
import { usePopulateBoard } from "./use-populate-board";

const useFetchCharactersMock = vi.fn();

vi.mock("../queries/use-fetch-characters", () => ({
  useFetchCharacters: (...args: unknown[]) => useFetchCharactersMock(...args),
}));

vi.mock("~/features/scores/mutations/use-save-score", () => ({
  useSaveScore: () => ({ mutateAsync: vi.fn() }),
}));

export const useMemoryGameFacade = () => {
  const populateBoard = usePopulateBoard();
  const memoryGame = useMemoryGame();

  return {
    ...memoryGame,
    ...populateBoard,
  };
};

describe("useMemoryGame", () => {
  it("Should initialize cards", async () => {
    useFetchCharactersMock.mockReturnValue({
      data: charactersMockData,
    });
    const { result } = renderHook(() => useMemoryGameFacade());

    await waitFor(() => {
      expect(result.current.cards).toEqual(cardsMockData);
    });
  });

  it("Should refetch when clicking reload", async () => {
    const refetchFn = vi.fn();
    useFetchCharactersMock.mockReturnValue({
      data: [],
      refetch: refetchFn,
    });
    const { result } = renderHook(() => useMemoryGameFacade());

    await act(async () => {
      await result.current.handleReloadGame();
    });
    expect(refetchFn).toHaveBeenCalledOnce();
  });
});
