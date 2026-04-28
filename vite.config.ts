import { reactRouter } from "@react-router/dev/vite";
import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig(({ mode }) => ({
  plugins: [
    // 👇 solo cargar plugin fuera de test
    mode !== "test" && reactRouter(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./app"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./test/setup.ts",
    // In this repo/environment forks pool can hang on Windows.
    pool: "threads",
  },
}));
