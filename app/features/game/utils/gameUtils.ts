import type { Card } from "../types/card";
import type { Character } from "../types/character";

export const setupBoard = (characters: Character[]): Card[] => {
  const duplicated = characters.flatMap((c) => [c, c]);

  return duplicated.map((character, i) => ({
    character,
    characterId: character.id,
    id: `${character.id} - ${i}`,
    status: "unflipped",
  }));
};

export const shuffle = (cards: Card[]): Card[] => {
  const result = [...cards];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
};

export const resolveMatch = (cards: Card[], ids: string[]): Card[] => {
  // Match
  if (ids[0] === ids[1]) {
    return cards.map((c) =>
      c.characterId === ids[0] ? { ...c, status: "matched" } : c,
    );
  }

  // No match
  return cards.map((c) =>
    ids.includes(c.characterId) ? { ...c, status: "flipped" } : c,
  );
};
