import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { graphqlClient } from "../services/graphql-client";
import { GET_CHARACTERS } from "../services/queries";
import { type CharacterResponse } from "../types/character";

const CHARACTER_IDS_PER_GAME = 6;
const CHARACTER_ID_RANGE = { min: 1, max: 826 };

export const useFetchCharacters = () => {
  return useQuery({
    queryKey: ["characters"],
    queryFn: async () => {
      const data = await graphqlClient.request<CharacterResponse>(
        GET_CHARACTERS,
        {
          ids: getRandomIds(),
        },
      );
      return data.charactersByIds;
    },
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,

    // Avoid caching so each game reload gets fresh characters.
    gcTime: 0,
    staleTime: 0,
  });
};

const getRandomIds = () => {
  // Unique random IDs, used as GraphQL query variables.
  const result: number[] = [];
  while (result.length < CHARACTER_IDS_PER_GAME) {
    const newId =
      Math.floor(Math.random() * CHARACTER_ID_RANGE.max) +
      CHARACTER_ID_RANGE.min;
    if (result.includes(newId)) continue;
    result.push(newId);
  }
  return result;
};
