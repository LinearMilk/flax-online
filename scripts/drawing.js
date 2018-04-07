import * as globals from "./globals";
/**
 * Class for drawing in the canvas.
 */
export default class Drawing {
  constructor() {
    this.canvas = document.getElementById("game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.squareSize = globals.squareSize;
    this.squareBorderSize = globals.squareBorderSize;
    this.squareBorderColour = "#ffffff";
    this.squareColour = "#fac861";
    this.squareRoomBorderColour = "#ffffff";
    this.squareRoomColour = "#fdf5c1";
    this.chipRadius = 17;
    this.gameBoardFrameSize = globals.gameBoardFrameSize;
    this.chipBorderWidth = 2;
    this.chipValueColour = "#ffffff";
    this.chipValueOffset = 7;
  }

  /**
   * Get the canvas reference
   * @return {element} the canvas element
   */
  getCanvas() {
    return this.canvas;
  }

  /**
   * Draw the gameboard Frame
   * @param  {number} width     - relative number of the column
   * @param  {number} height    - relative number of the row
   * @param  {number} fieldSize - the size of each square in pixels
   */
  gameBoardFrame(width, height, fieldSize) {
    this.ctx.restore();
    this.ctx.save();
    this.ctx.lineWidth = this.gameBoardFrameSize;
    this.ctx.strokeStyle = this.squareColour;
    this.ctx.strokeRect(
      this.gameBoardFrameSize / 2,
      this.gameBoardFrameSize / 2,
      width * fieldSize + this.gameBoardFrameSize,
      height * fieldSize + this.gameBoardFrameSize
    );
    this.ctx.translate(this.gameBoardFrameSize, this.gameBoardFrameSize);
  }

  /**
   * Draw the individual game square
   * @param  {number} xPosition - relative x position
   * @param  {number} yPosition - relative y position
   *
   * Ex: gameSquare(1,1) will draw the first square, gameSquare(1,5) will draw the 5th square in the first row (x)
   */
  gameSquare(xPosition, yPosition) {
    this.ctx.fillStyle = this.squareBorderColour;
    this.ctx.fillRect(
      (xPosition - 1) * this.squareSize,
      (yPosition - 1) * this.squareSize,
      this.squareSize,
      this.squareSize
    );
    this.ctx.fillStyle = this.squareColour;
    this.ctx.fillRect(
      (xPosition - 1) * this.squareSize + this.squareBorderSize,
      (yPosition - 1) * this.squareSize + this.squareBorderSize,
      this.squareSize - 2 * this.squareBorderSize,
      this.squareSize - 2 * this.squareBorderSize
    );
  }

  /**
   * Draw the individual square representing a room, in a different colour
   * @param  {number} xPosition - relative x position
   * @param  {number} yPosition - relative y positions
   */
  rooms(xPosition, yPosition) {
    this.ctx.fillStyle = this.squareRoomBorderColour;
    this.ctx.fillRect(
      (xPosition - 1) * this.squareSize,
      (yPosition - 1) * this.squareSize,
      this.squareSize,
      this.squareSize
    );
    this.ctx.fillStyle = this.squareRoomColour;
    this.ctx.fillRect(
      (xPosition - 1) * this.squareSize + this.squareBorderSize,
      (yPosition - 1) * this.squareSize + this.squareBorderSize,
      this.squareSize - 2 * this.squareBorderSize,
      this.squareSize - 2 * this.squareBorderSize
    );
  }

  /**
   * Draw Game Over Text
   * @param  {number} xPosition - relative x position
   * @param  {number} yPosition - relative y position
   */
  gameOver(xPosition, yPosition) {
    this.clearRandomChips(xPosition, yPosition);
    this.ctx.fillStyle = "red";
    this.ctx.font = "20px Georgia";
    this.ctx.fillText("Game Over :(", 10, 450);
  }

  /**
   * Draw the player's starting tile, given it's position.
   * @param  {array} positions  - x and y position for the starting tile
   * @param  {string} colour    - the colour code of the player
   */
  startingTile(positions, colour) {
    const x = (positions[0] - 1) * this.squareSize + this.squareBorderSize + 2;
    const y = (positions[1] - 1) * this.squareSize + this.squareBorderSize + 2;
    const height = this.squareSize - 2 * this.squareBorderSize - 4;
    const width = this.squareSize - 2 * this.squareBorderSize - 4;

    this.ctx.fillStyle = colour.colour;
    this.ctx.strokeStyle = colour.border;
    this.ctx.lineWidth = 1;

    let radius = 5;
    radius = { tl: radius, tr: radius, br: radius, bl: radius };

    this.ctx.beginPath();
    this.ctx.moveTo(x + radius.tl, y);
    this.ctx.lineTo(x + width - radius.tr, y);
    this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    this.ctx.lineTo(x + width, y + height - radius.br);
    this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    this.ctx.lineTo(x + radius.bl, y + height);
    this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    this.ctx.lineTo(x, y + radius.tl);
    this.ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
  }

  /**
   * Draw over random chips, clearing the canvas for the next chips
   * @param  {number} xPosition - relative x position
   * @param  {number} yPosition - relative y position
   */
  clearRandomChips(xPosition, yPosition) {
    this.ctx.fillStyle = "gray";
    this.ctx.fillRect((xPosition - 1) * this.squareSize, (yPosition - 1) * this.squareSize, 100, 100);
  }

  /**
   * Draw the chip
   * @param  {Chip} chip [chip object with positions, colour and value]
   */
  chip(chip) {
    this.ctx.save();
    this.ctx.translate((chip.xPosition() - 0.5) * this.squareSize, (chip.yPosition() - 0.5) * this.squareSize);
    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.chipRadius, 0, 2 * Math.PI);
    this.ctx.fillStyle = chip.colour.colour;
    this.ctx.fill();
    this.drawChipBorder(chip);
    this.ctx.restore();
    this.drawChipValue(chip.xPosition(), chip.yPosition(), chip.value);
  }

  /**
   * Draw the bottom chip, when a chip is place on top of it
   * @param  {Chip} chip       - chip object with positions, colour and value
   */
  bottomChip(chip) {
    const offset = 3;
    this.ctx.save();
    this.ctx.translate(
      (chip.xPosition() - 0.5) * this.squareSize + offset,
      (chip.yPosition() - 0.5) * this.squareSize + offset
    );
    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.chipRadius, 0, 2 * Math.PI);
    this.ctx.fillStyle = chip.colour.colour;
    this.ctx.fill();
    this.drawChipBorder(chip);
    this.ctx.restore();
  }

  /**
   * Highlight the selected chip and deHighlight the other.
   * @param  {Chip} selectChip - the selected Chip
   * @param  {Chip} chip       - the not select Chip
   */
  chipsHighlights(selectChip, chip) {
    this.highlightChip(selectChip.xPosition(), selectChip.yPosition());
    this.chip(selectChip);
    this.deHighlightChip(chip.xPosition(), chip.yPosition());
    this.chip(chip);
  }

  /**
   * ********** Private Methods ************
   */

  /**
   * Draw highlight aroud the chip
   * @param  {number} xPosition - relative x position for the highlight
   * @param  {number} yPosition - relative y position for the highlight
   */
  highlightChip(xPosition, yPosition) {
    this.ctx.save();
    this.ctx.translate((xPosition - 0.5) * this.squareSize, (yPosition - 0.5) * this.squareSize);
    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.chipRadius + 3, 0, 2 * Math.PI);
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = "white";
    this.ctx.stroke();
    this.ctx.restore();
  }

  /**
   * Remove the highlight aroud the chip
   * @param  {number} xPosition - relative x position
   * @param  {number} yPosition - relative y position
   */
  deHighlightChip(xPosition, yPosition) {
    this.ctx.save();
    this.ctx.translate((xPosition - 0.5) * this.squareSize, (yPosition - 0.5) * this.squareSize);
    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.chipRadius + 3, 0, 2 * Math.PI);
    this.ctx.lineWidth = 6;
    this.ctx.strokeStyle = "gray";
    this.ctx.stroke();
    this.ctx.restore();
  }

  /**
   * Draw the chip border
   * @param {Chip} chip - the chip containing the colour
   */
  drawChipBorder(chip) {
    this.ctx.lineWidth = this.chipBorderWidth;
    this.ctx.strokeStyle = chip.colour.border;
    this.ctx.stroke();
  }

  /**
   * Draw the chip value
   * @param  {number} x     - relative x position
   * @param  {number} y     - relative y position
   * @param  {number} value - chip value
   */
  drawChipValue(x, y, value) {
    switch (value) {
      case 1:
        this.drawValueOffset(x, y, 0, 0);
        break;
      case 2:
        this.drawValueOffset(x, y, this.chipValueOffset, -this.chipValueOffset);
        this.drawValueOffset(x, y, -this.chipValueOffset, this.chipValueOffset);
        break;
      case 3:
        this.drawValueOffset(x, y, this.chipValueOffset, -this.chipValueOffset);
        this.drawValueOffset(x, y, -this.chipValueOffset, this.chipValueOffset);
        this.drawValueOffset(x, y, 0, 0);
        break;
      case 4:
        this.drawValueOffset(x, y, this.chipValueOffset, -this.chipValueOffset);
        this.drawValueOffset(x, y, -this.chipValueOffset, this.chipValueOffset);
        this.drawValueOffset(x, y, -this.chipValueOffset, -this.chipValueOffset);
        this.drawValueOffset(x, y, this.chipValueOffset, this.chipValueOffset);
        break;
      case 5:
        this.drawValueOffset(x, y, 0, 0);
        this.drawValueOffset(x, y, this.chipValueOffset, -this.chipValueOffset);
        this.drawValueOffset(x, y, -this.chipValueOffset, this.chipValueOffset);
        this.drawValueOffset(x, y, -this.chipValueOffset, -this.chipValueOffset);
        this.drawValueOffset(x, y, this.chipValueOffset, this.chipValueOffset);
        break;
      case 6:
        this.drawValueOffset(x, y, this.chipValueOffset, -this.chipValueOffset);
        this.drawValueOffset(x, y, -this.chipValueOffset, this.chipValueOffset);
        this.drawValueOffset(x, y, -this.chipValueOffset, -this.chipValueOffset);
        this.drawValueOffset(x, y, this.chipValueOffset, this.chipValueOffset);
        this.drawValueOffset(x, y, this.chipValueOffset, 0);
        this.drawValueOffset(x, y, -this.chipValueOffset, 0);
        break;
      default:
        break;
    }
  }

  /**
   * Draw each pip individualy, given it's position
   * @param  {number} x       - relative x position
   * @param  {number} y       - relative y position
   * @param  {number} offsetX - offset x for the given pip
   * @param  {number} offsetY - offset y for the given pip
   */
  drawValueOffset(x, y, offsetX, offsetY) {
    this.ctx.save();
    this.ctx.fillStyle = this.chipValueColour;
    this.ctx.translate((x - 0.5) * this.squareSize + offsetX, (y - 0.5) * this.squareSize + offsetY);
    this.ctx.beginPath();
    this.ctx.arc(0, 0, 3, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.restore();
  }
}
