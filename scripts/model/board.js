export default class Board {
  /**
   * Create a Board.
   * @param  {array} dimensions         - number of squares for the board [x, y]
   * @param  {number} numPlayers        - number of players
   * @param  {array} rooms              - rooms array with rooms object containing room number and array of positios belonging to the room
   * @param  {array} startingPositions  - the available starting positions [[x, y], [x, y]]
   * @param  {number} randomChipRow     - the row in the canvas where the random chip will be drawn
   * @param  {number} tieBreakerRoomNum  - number of room that will serve as tie breaker in case of players being tied for 1st place
   */
  constructor(dimensions, numPlayers, rooms, startingPositions, randomChipRow, tieBreakerRoomNum) {
    this.boardDimensions = dimensions;
    this.numPlayers = numPlayers;
    this.rooms = rooms;
    this.startingPositions = startingPositions;
    this.randomChipRow = randomChipRow;
    this.tieBreakerRoomNum = tieBreakerRoomNum;
  }

  /**
   * Get the Board's width (number of columns)
   * @return {number} number of columns for the board
   */
  getBoardWidth() {
    return this.boardDimensions[0];
  }

  /**
   * Get the Board's height (number of rows)
   * @return {number} number of rows for the board
   */
  getBoardHeight() {
    return this.boardDimensions[1];
  }

  /**
   * Get the number of players that can play on the Board
   * @return {number} number of players (2, 3 or 4)
   */
  getNumPlayers() {
    return this.numPlayers;
  }

  /**
   * Get rooms array of objects
   * @return {array} the rooms belonging to the board
   *
   * Ex: [
   *				{ "roomNum": 1,
   *					"roomSquares": [[1,1],[1,2],[2,1],[2,2]] },
   *				{ "roomNum": 2,
   *					"roomSquares": [[5,1],[5,2],[6,1],[7,1],[7,2],[8,1],[9,1],[9,2]] }
   *			]
   */
  getRooms() {
    return this.rooms;
  }

  /**
   * Get the starting positions for the room.
   * @return {array} the available starting positions [[x, y], [x, y]]
   */
  getStartingPositions() {
    return this.startingPositions;
  }
}
