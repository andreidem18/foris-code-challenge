import { gql } from "graphql-request";

export const GET_CHARACTERS = gql`
  query CharactersByIds($ids: [ID!]!) {
    charactersByIds(ids: $ids) {
      id
      name
      status
      species
      image
    }
  }
`;
