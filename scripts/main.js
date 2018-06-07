import Game from "./game";
import "../css/game.css";
import "../img/logo.png";
import "../img/splash-bg.png";

const game = new Game();
window.game = game;

export default function startGame() {
  game.startGame();
}
