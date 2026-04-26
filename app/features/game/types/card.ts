import type { Character } from "./character";

export interface Card {
  id: string;
  characterId: string;
  character: Character;
  status: CardStatus;
}

export type CardStatus = "unflipped" | "flipped" | "matched";
