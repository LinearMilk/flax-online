import Game from "./game";

const game = new Game();
window.game = game;

export default function startGame() {
  game.startGame();
}
