import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { graphqlClient } from "../services/graphqlClient";
import { GET_CHARACTERS } from "../services/queries";
import { type CharacterReponse } from "../types/Character";

export const useFetchCharacters = () => {
  return useQuery({
    queryKey: ["characters"],
    queryFn: async () => {
      const data = await graphqlClient.request<CharacterReponse>(
        GET_CHARACTERS,
        {
          ids: getRandomIds(),
        },
      );
      return data.charactersByIds;
    },
    placeholderData: keepPreviousData,
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
