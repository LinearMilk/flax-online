import Game from "./game";
import "../css/game.css";

const game = new Game();
window.game = game;

export default function startGame() {
  game.startGame();
}
