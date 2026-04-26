import { GraphQLClient } from "graphql-request";
import env from "~/config/env";

export const graphqlClient = new GraphQLClient(env.VITE_RICK_MORTY_GRAPHQL_URL);
