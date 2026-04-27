export const gameSession = {
  finish: () => sessionStorage.setItem("game-finished", "true"),
  reset: () => sessionStorage.removeItem("game-finished"),
  isFinished: () => sessionStorage.getItem("game-finished") === "true",
};
