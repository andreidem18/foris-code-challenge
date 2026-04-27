export const gameSession = {
  finish: () => {
    sessionStorage.setItem("game-finished", "true");
    sessionStorage.removeItem("game-started");
  },
  start: () => sessionStorage.setItem("game-started", "true"),
  reset: () => sessionStorage.removeItem("game-finished"),
  isFinished: () => sessionStorage.getItem("game-finished") === "true",
  isStarted: () => sessionStorage.getItem("game-started") === "true",
};
