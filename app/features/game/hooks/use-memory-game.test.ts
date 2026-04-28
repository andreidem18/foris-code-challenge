import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useMemoryGame } from "./use-memory-game";
import { charactersMockData } from "../mock-data/characters-mock-data";
import { cardsMockData } from "../mock-data/cards-mock-data";

const useFetchCharactersMock = vi.fn();

vi.mock("./use-fetch-characters", () => ({
  useFetchCharacters: (...args: unknown[]) => useFetchCharactersMock(...args),
}));

describe("useMemoryGame", () => {
  it("Should initialize cards", async () => {
    useFetchCharactersMock.mockReturnValue({
      data: charactersMockData,
    });
    const { result } = renderHook(() => useMemoryGame());

    expect(result.current.cards).toEqual(cardsMockData);
  });

  it("Should refetch when clicking reload", async () => {
    const refetchFn = vi.fn();
    useFetchCharactersMock.mockReturnValue({
      data: [],
      refetch: refetchFn,
    });
    const { result } = renderHook(() => useMemoryGame());

    await act(async () => {
      await result.current.handleReloadGame();
    });
    expect(refetchFn).toHaveBeenCalledOnce();
  });
});
