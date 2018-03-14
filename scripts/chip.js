export default class Chip {
  /**
   * Create a chip with colour, chip value (from 1 to 6), and postion.
   * @param  {string} colour   - colour code for the chip
   * @param  {number} value    - chip value, from 1 to 6
   * @param  {array} position  - [x, y] relative position for the chip
   *
   * Ex: Chip('#000000', 6, [2,3]);
   * Will create a chip of black colour and value 6, located on the column 2 and row 3 of the board.
   */
  constructor(colour, value, position) {
    this.colour = colour;
    this.value = value;
    this.position = position;
    this.validMoves = [];
    this.isHighlighted = false;
    this.isActive = true;
  }

  /**
   * Get chip's x position in the board (the column number where it's located)
   * @return {number} column position of Chip
   *
   * Ex: 5 represents chip on the 5th column on the board
   */
  xPosition() {
    return this.position[0];
  }

  /**
   * Get chip's y position in the board (the row number where it's located)
   * @return {number} row position of Chip
   *
   * Ex: 5 represents chip on the 5th row on the board
   */
  yPosition() {
    return this.position[1];
  }

  /**
   * Sets chip to inactive and clears its valid moves, after another chip gets placed on top (in gameEngine)
   */
  inActivate() {
    this.validMoves = [];
    this.isActive = false;
  }
}
