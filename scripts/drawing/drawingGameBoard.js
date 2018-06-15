import Drawing from "./drawing";
import * as globals from "../globals";

export default class DrawingGameBoard extends Drawing {
  constructor() {
    super();
    this.squareBorderSize = globals.squareBorderSize;
    this.squareBorderColour = "#ffffff";
    this.squareColour = "#fac861";
    this.squareRoomBorderColour = "#ffffff";
    this.squareRoomColour = "#fdf4b3";
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
   * Draw the player's starting tile, given it's position.
   * @param  {Player} player  - the player with x and y position for the starting tile and colour
   */
  startingTile(player) {
    const x = (player.startingPosition[0] - 1) * this.squareSize + this.squareBorderSize + 2;
    const y = (player.startingPosition[1] - 1) * this.squareSize + this.squareBorderSize + 2;
    const height = this.squareSize - 2 * this.squareBorderSize - 4;
    const width = this.squareSize - 2 * this.squareBorderSize - 4;

    this.ctx.fillStyle = player.colour.colour;
    this.ctx.strokeStyle = player.colour.border;
    this.ctx.lineWidth = 2;

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
}
