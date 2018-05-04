import GameEngine from "./engine/gameEngine";

export default class Game {
  /**
   * Create a new game, inicializing the game board and players.
   * Add event listener to the canvas to watch for click events.
   */
  constructor() {
    this.gameEngine = new GameEngine();
    this.gameEngine.addEventListener();
  }

  /**
   * Start a new game with the selected board.
   * @param  {number} numPlayers - the selected number of players for the game
   */
  startGame() {
    this.gameEngine.drawGameBoard();
  }
}
