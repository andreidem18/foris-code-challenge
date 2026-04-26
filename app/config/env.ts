import { z } from "zod";

const envSchema = z.object({
  VITE_FIREBASE_API_KEY: z.string(),
  VITE_FIREBASE_AUTH_DOMAIN: z.string(),
  VITE_FIREBASE_PROJECT_ID: z.string(),
  VITE_FIREBASE_APP_ID: z.string(),
  VITE_RICK_MORTY_GRAPHQL_URL: z.string(),
});

const env = envSchema.parse(import.meta.env);

export default env;
