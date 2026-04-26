export interface CharacterReponse {
  charactersByIds: Character[];
}

export interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  image: string;
}
