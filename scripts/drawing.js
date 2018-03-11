/**
 * Class for drawing in the canvas.
 */
class Drawing {
  constructor(canvasId) {
    this.canvas = document.getElementById("game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.squareSize = squareSize;
    this.squareBorderSize = squareBorderSize;
    this.squareBorderColour = "#e3698e";
    this.squareColour = "#030b3e";
    this.squareRoomBorderColour = "#ffffff";
    this.squareRoomColour = "#69d4fc";
    this.chipRadius = 17;
    this.gameBoardFrameSize = 10;
    this.chipBorderColour="#636262";
    this.chipBorderWidth = 1;
    this.chipValueColour = "#ffffff";
    this.chipValueOffset =7;
  }

  getCanvas(){
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
    this.ctx.lineWidth=this.gameBoardFrameSize;
    this.ctx.strokeRect(this.gameBoardFrameSize/2,
                        this.gameBoardFrameSize/2,
                        width*fieldSize+this.gameBoardFrameSize,
                        height*fieldSize+this.gameBoardFrameSize);
    this.ctx.translate(this.gameBoardFrameSize,this.gameBoardFrameSize);
  }

  /**
   * Draw the individual game square
   * @param  {number} xPosition - relative x position
   * @param  {number} yPosition - relative y position
   *
   * Ex: gameSquare(1,1) will draw the first square, gameSquare(1,5) will draw the 5th square in the first row (x)
   */
  gameSquare(xPosition,yPosition) {
    this.ctx.fillStyle = this.squareBorderColour;
    this.ctx.fillRect((xPosition-1)*this.squareSize,
                      (yPosition-1)*this.squareSize,
                      this.squareSize,
                      this.squareSize);
    this.ctx.fillStyle = this.squareColour;
    this.ctx.fillRect((xPosition-1)*this.squareSize+this.squareBorderSize,
                      (yPosition-1)*this.squareSize+this.squareBorderSize,
                      this.squareSize-2*this.squareBorderSize,
                      this.squareSize-2*this.squareBorderSize);
  }

  /**
   * Draw the individual square representing a room, in a different colour
   * @param  {number} xPosition - relative x position
   * @param  {number} yPosition - relative y positions
   */
  rooms(xPosition,yPosition) {
    this.ctx.fillStyle = this.squareRoomBorderColour;
    this.ctx.fillRect((xPosition-1)*squareSize,
                      (yPosition-1)*squareSize,
                      squareSize,
                      squareSize);
    this.ctx.fillStyle = this.squareRoomColour;
    this.ctx.fillRect((xPosition-1)*squareSize+squareBorderSize,
                      (yPosition-1)*squareSize+squareBorderSize,
                      squareSize-2*squareBorderSize,
                      squareSize-2*squareBorderSize);
  }

  /**
   * Draw Game Over Text
   * @param  {number} xPosition - relative x position
   * @param  {number} yPosition - relative y position
   */
  gameOver(xPosition,yPosition){
    this.clearRandomChips(xPosition,yPosition);
    this.ctx.fillStyle = 'red';
    this.ctx.font="20px Georgia";
    this.ctx.fillText("Game Over :(",10,450);
  }

  /**
   * Draw the player's starting tile, given it's position.
   * @param  {array} positions  - x and y position for the starting tile
   * @param  {string} colour    - the colour code of the player
   */
  startingTile(positions, colour){
    this.ctx.fillStyle = this.chipBorderColour;
    this.ctx.fillRect((positions[0]-1)*this.squareSize+2,
                      (positions[1]-1)*this.squareSize+2,
                      this.squareSize-4,
                      this.squareSize-4);
    this.ctx.fillStyle = colour;
    this.ctx.fillRect((positions[0]-1)*this.squareSize+this.squareBorderSize+2,
                      (positions[1]-1)*this.squareSize+this.squareBorderSize+2,
                      this.squareSize-2*this.squareBorderSize-4,
                      this.squareSize-2*this.squareBorderSize-4);
  }

  /**
   * Draw over random chips, clearing the canvas for the next chips
   * @param  {number} xPosition - relative x position
   * @param  {number} yPosition - relative y position
   */
  clearRandomChips(xPosition,yPosition){
    this.ctx.fillStyle = 'gray';
    this.ctx.fillRect((xPosition-1)*this.squareSize,(yPosition-1)*this.squareSize,100,100);
  }

  /**
   * Draw the chip
   * @param  {Chip} chip [chip object with positions, colour and value]
   */
  chip(chip) {
    this.ctx.save();
    this.ctx.translate(((chip.xPosition()-0.5)*squareSize), ((chip.yPosition()-0.5)*squareSize));
    this.ctx.beginPath();
    this.ctx.arc(0,0,this.chipRadius,0,2*Math.PI);
    this.ctx.fillStyle = chip.colour;
    this.ctx.fill();
    this._drawChipBorder();
    this.ctx.restore();
    this._drawChipValue(chip.xPosition(), chip.yPosition(), chip.value);
  }

  /**
   * Draw the bottom chip, when a chip is place on top of it
   * @param  {Chip} chip       - chip object with positions, colour and value
   * @param  {number} offset   - offset from the center, where the chip will be draw
   */
  bottomChip(chip, offset) {
    this.ctx.save();
    this.ctx.translate(((chip.xPosition()-0.5)*squareSize)+offset, ((chip.yPosition()-0.5)*squareSize)+offset);
    this.ctx.beginPath();
    this.ctx.arc(0,0,this.chipRadius,0,2*Math.PI);
    this.ctx.fillStyle = chip.colour;
    this.ctx.fill();
    this._drawChipBorder();
    this.ctx.restore();
  }

  /**
   * Highlight the selected chip and deHighlight the other.
   * @param  {Chip} selectChip - the selected Chip
   * @param  {Chip} chip       - the not select Chip
   */
  chipsHighlights(selectChip, chip){
    this._highlightChip(selectChip);
    this.chip(selectChip);
    this._deHighlightChip(chip);
    this.chip(chip);
  }


  /**
   * ********** Private Methods ************
   */
  
  _highlightChip(selectChip){
    this.ctx.save();
    this.ctx.translate(((selectChip.xPosition()-0.5)*squareSize), ((selectChip.yPosition()-0.5)*squareSize));
    this.ctx.beginPath();
    this.ctx.arc(0,0,this.chipRadius+3,0,2*Math.PI);
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = 'yellow';
    this.ctx.stroke();
    this.ctx.restore();
  }

  _deHighlightChip(chip){
    this.ctx.save();
    this.ctx.translate(((chip.xPosition()-0.5)*squareSize), ((chip.yPosition()-0.5)*squareSize));
    this.ctx.beginPath();
    this.ctx.arc(0,0,this.chipRadius+3,0,2*Math.PI);
    this.ctx.lineWidth = 6;
    this.ctx.strokeStyle = 'gray';
    this.ctx.stroke();
    this.ctx.restore();
  }

  /**
   * Draw the chip border
   */
  _drawChipBorder(){
    this.ctx.lineWidth = this.chipBorderWidth;
    this.ctx.strokeStyle = this.chipBorderColour;
    this.ctx.stroke();
  }

  /**
   * Draw the chip value
   * @param  {number} x     - relative x position
   * @param  {number} y     - relative y position
   * @param  {number} value - chip value
   */
  _drawChipValue(x, y, value){
    switch(value) {
      case 1:
        this._drawValueOffset(x, y, 0, 0);
        break;
      case 2:
        this._drawValueOffset(x, y, this.chipValueOffset, -this.chipValueOffset);
        this._drawValueOffset(x, y, -this.chipValueOffset, this.chipValueOffset);
        break;
      case 3:
        this._drawValueOffset(x, y, this.chipValueOffset, -this.chipValueOffset);
        this._drawValueOffset(x, y, -this.chipValueOffset, this.chipValueOffset);
        this._drawValueOffset(x, y, 0, 0);
        break;
      case 4:
        this._drawValueOffset(x, y, this.chipValueOffset, -this.chipValueOffset);
        this._drawValueOffset(x, y, -this.chipValueOffset, this.chipValueOffset);
        this._drawValueOffset(x, y, -this.chipValueOffset, -this.chipValueOffset);
        this._drawValueOffset(x, y, this.chipValueOffset, this.chipValueOffset);
        break;
      case 5:
        this._drawValueOffset(x, y, 0, 0);
        this._drawValueOffset(x, y, this.chipValueOffset, -this.chipValueOffset);
        this._drawValueOffset(x, y, -this.chipValueOffset, this.chipValueOffset);
        this._drawValueOffset(x, y, -this.chipValueOffset, -this.chipValueOffset);
        this._drawValueOffset(x, y, this.chipValueOffset, this.chipValueOffset);
        break;
      case 6:
        this._drawValueOffset(x, y, this.chipValueOffset, -this.chipValueOffset);
        this._drawValueOffset(x, y, -this.chipValueOffset, this.chipValueOffset);
        this._drawValueOffset(x, y, -this.chipValueOffset, -this.chipValueOffset);
        this._drawValueOffset(x, y, this.chipValueOffset, this.chipValueOffset);
        this._drawValueOffset(x, y, this.chipValueOffset, 0);
        this._drawValueOffset(x, y, -this.chipValueOffset, 0);
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
  _drawValueOffset(x, y, offsetX, offsetY) {
    this.ctx.save();
    this.ctx.fillStyle = this.chipValueColour;
    this.ctx.translate((x-0.5)*squareSize + offsetX, (y-0.5)*squareSize + offsetY);
    this.ctx.beginPath();
    this.ctx.arc(0,0,3,0,2*Math.PI);
    this.ctx.fill();
    this.ctx.restore();
  }
}
