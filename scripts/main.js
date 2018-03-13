import Game from "./game";

const game = new Game();
window.game = game;

function startGame() {
  game.startGame();
}

function getChip() {
  game.getChip();
}
