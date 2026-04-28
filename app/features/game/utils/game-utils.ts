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

export const resolveMatch = (cards: Card[], unflipped: Card[]): Card[] => {
  const characterIds = unflipped.map((card) => card.characterId);
  const cardIds = unflipped.map((card) => card.id);
  // Match
  if (characterIds[0] === characterIds[1]) {
    return cards.filter((c) => c.characterId !== characterIds[0]);
  }

  // No match
  return cards.map((c) =>
    cardIds.includes(c.id) ? { ...c, status: "flipped" } : c,
  );
};
