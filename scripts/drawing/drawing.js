import * as globals from "../globals";

/**
 * Class for drawing in the canvas.
 */
export default class Drawing {
  constructor() {
    this.canvas = document.getElementById("game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.squareSize = globals.squareSize;
    this.chipRadius = 17;
    this.chipBorderWidth = 2;
    this.chipValueColour = "#ffffff";
    this.chipValueOffset = 7;
    this.backgroundColour = "#e6e6e6";
  }

  /**
   * Get the canvas reference
   * @return {element} the canvas element
   */
  getCanvas() {
    return this.canvas;
  }

  /**
   * Draw game progress box, with random chip to play and other game info
   */
  gameProgressBox() {
    this.ctx.restore();
    this.ctx.save();
    this.gameProgressBoxBackground();
    this.progressBar();
    this.ctx.translate(0, globals.gameProgressBoxHeight);
  }

  gameProgressBoxBackground() {
    this.ctx.fillStyle = this.backgroundColour;
    this.ctx.fillRect(0, 0, 552, globals.gameProgressBoxHeight);
  }

  progressBar() {
    this.ctx.save();
    this.ctx.fillStyle = this.backgroundColour;
    this.ctx.fillRect(0, 0, 552, globals.gameProgressBoxHeight);
    this.ctx.translate(0, globals.gameProgressBoxHeight);
    this.ctx.restore();
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
    this.ctx.fillText("Game Over :(", 10, 500);
  }

  /**
   * Draw over random chips, clearing the canvas for the next chips
   * @param  {number} xPosition - relative x position
   * @param  {number} yPosition - relative y position
   */
  clearRandomChips(xPosition, yPosition) {
    this.ctx.fillStyle = this.backgroundColour;
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

  randomChips(chips) {
    this.chip(chips[0]);
    this.chip(chips[1]);
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
    this.highlightChip(selectChip.xPosition(), selectChip.yPosition(), chip.colour);
    this.chip(selectChip);
    this.deHighlightChip(chip.xPosition(), chip.yPosition());
    this.chip(chip);
  }

  /**
   * Draw highlight aroud the chip
   * @param  {number} xPosition - relative x position for the highlight
   * @param  {number} yPosition - relative y position for the highlight
   * @param  {object} colour    - the colour for the hightlight
   */
  highlightChip(xPosition, yPosition, colour) {
    this.ctx.save();
    this.ctx.translate((xPosition - 0.5) * this.squareSize, (yPosition - 0.5) * this.squareSize);
    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.chipRadius + 3, 0, 2 * Math.PI);
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = `rgba(${colour.borderRgba}, 0.5)`;
    this.ctx.stroke();
    this.ctx.restore();
    this.highlightChipInnerBorder(xPosition, yPosition, colour);
  }

  highlightChipInnerBorder(xPosition, yPosition, colour) {
    this.ctx.save();
    this.ctx.translate((xPosition - 0.5) * this.squareSize, (yPosition - 0.5) * this.squareSize);
    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.chipRadius, 0, 2 * Math.PI);
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = `rgba(${colour.colourRgba}, 0.5)`;
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
    this.ctx.strokeStyle = this.backgroundColour;
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

  /**
   * Draw players' names and current score
   * @param  {array} players - array containing players in the game
   * @param  {array} scores - array containing current scores
   */
  currentScore(players, score) {
    this.ctx.fillStyle = this.backgroundColour;
    this.ctx.fillRect(350, 480, 200, 100);
    this.ctx.fillStyle = players[0].colour.colour;
    this.ctx.font = "25px Georgia";
    this.ctx.fillText(`${players[0].name}: ${score[0]}`, 350, 500);
    this.ctx.fillStyle = players[1].colour.colour;
    this.ctx.font = "25px Georgia";
    this.ctx.fillText(`${players[1].name}: ${score[1]}`, 350, 530);
  }
}
