import Game from "./game";

const game = new Game();
window.game = game;

export function startGame() {
  game.startGame();
}

export function getChip() {
  game.getChip();
}
