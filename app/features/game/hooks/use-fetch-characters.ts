import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { graphqlClient } from "../services/graphql-client";
import { GET_CHARACTERS } from "../services/queries";
import { type CharacterResponse } from "../types/character";

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

    // Avoid cache to always fetch new characters
    gcTime: 0,
    staleTime: 0,
  });
};

const getRandomIds = () => {
  const maxIds = 6;
  const range = { min: 1, max: 826 };

  const result: number[] = [];
  while (result.length < maxIds) {
    const newId = Math.floor(Math.random() * range.max) + range.min;
    if (result.includes(newId)) continue;
    result.push(newId);
  }
  return result;
};
