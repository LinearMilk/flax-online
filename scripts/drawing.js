/**
 * Class for drawing in the canvas.
 */
class Drawing {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.squareSize = squareSize;
    this.squareBorderSize = squareBorderSize;
    this.squareBorderColour = squareBorderColour;
    this.squareColour = squareColour;
    this.squareRoomBorderColour = squareRoomBorderColour;
    this.squareRoomColour = squareRoomColour;
    this.chipRadius = chipRadius;
    this.gameBoardFrameSize = gameBoardFrameSize;
    this.chipBorderColour="#636262";
    this.chipBorderWidth = 1;
  }

  getCanvas(){
    return this.canvas;
  }

  drawGameBoardFrame(width, height, fieldSize) {
    this.ctx.lineWidth=this.gameBoardFrameSize;
    this.ctx.strokeRect(this.gameBoardFrameSize/2,this.gameBoardFrameSize/2,width*fieldSize+this.gameBoardFrameSize,height*fieldSize+this.gameBoardFrameSize);
    //not sure if translate should be part of this method
    this.ctx.translate(this.gameBoardFrameSize,this.gameBoardFrameSize);
  }

  drawGameSquare(xPosition,yPosition,) {
    this.ctx.fillStyle = this.squareBorderColour;
    this.ctx.fillRect((xPosition-1)*this.squareSize,(yPosition-1)*this.squareSize,this.squareSize,this.squareSize);
    this.ctx.fillStyle = this.squareColour;
    this.ctx.fillRect((xPosition-1)*this.squareSize+this.squareBorderSize,(yPosition-1)*this.squareSize+this.squareBorderSize,this.squareSize-2*this.squareBorderSize,this.squareSize-2*this.squareBorderSize);
  }

  drawRooms(xPosition,yPosition) {
    this.ctx.fillStyle = squareRoomBorderColour;
    this.ctx.fillRect((xPosition-1)*squareSize,(yPosition-1)*squareSize,squareSize,squareSize);
    this.ctx.fillStyle = squareRoomColour;
    this.ctx.fillRect((xPosition-1)*squareSize+squareBorderSize,(yPosition-1)*squareSize+squareBorderSize,squareSize-2*squareBorderSize,squareSize-2*squareBorderSize);
  }

  drawGameOver(x,y){
    // TODO
  }

  drawChip(chip) {
    this.ctx.save();
    this.ctx.translate(((chip.xPosition()-0.5)*squareSize), ((chip.yPosition()-0.5)*squareSize));
    this.ctx.beginPath();
    this.ctx.arc(0,0,this.chipRadius,0,2*Math.PI);
    this.ctx.fillStyle = chip.colour;
    this.ctx.fill();
    this.drawChipBorder();
    this.ctx.restore();
    this.drawChipValue(chip.xPosition(), chip.yPosition(), chip.value);
  }

  drawBottomChip(xPosition,yPosition, colour, offset) {
    this.ctx.save();
    this.ctx.translate(((xPosition-0.5)*squareSize)+offset, ((yPosition-0.5)*squareSize)+offset);
    this.ctx.beginPath();
    this.ctx.arc(0,0,this.chipRadius,0,2*Math.PI);
    this.ctx.fillStyle = colour;
    this.ctx.fill();
    this.drawChipBorder();
    this.ctx.restore();
  }

  drawChipBorder(){
    this.ctx.lineWidth = this.chipBorderWidth;
    this.ctx.strokeStyle = this.chipBorderColour;
    this.ctx.stroke();
  }

  /**
   * Methods for Drawing chip numbers
   * TODO: change to private methods
   */

  drawChipValue(x, y, value){
    switch(value) {
      case 1:
        this.drawValue1(x, y);
        break;
      case 2:
        this.drawValue2(x, y);
        break;
      case 3:
        this.drawValue3(x, y);
        break;
      case 4:
        this.drawValue4(x, y);
        break;
      case 5:
        this.drawValue5(x, y);
        break;
      case 6:
        this.drawValue6(x, y);
        break;
      default:
        break;
    }
  }

  drawValue1(x, y) {
    this.drawValueOffset(x, y, 0, 0);
  }

  drawValue2(x, y) {
    this.drawValueOffset(x, y, chipValueOffset, -chipValueOffset);
    this.drawValueOffset(x, y, -chipValueOffset, chipValueOffset);
  }

  drawValue3(x, y) {
    this.drawValue1(x, y);
    this.drawValue2(x, y);
  }

  drawValue4(x, y) {
    this.drawValue2(x, y);

    this.drawValueOffset(x, y, -chipValueOffset, -chipValueOffset);
    this.drawValueOffset(x, y, chipValueOffset, chipValueOffset);
  }

  drawValue5(x, y) {
    this.drawValue1(x, y);
    this.drawValue4(x, y);
  }

  drawValue6(x, y) {
    this.drawValue4(x, y);

    this.drawValueOffset(x, y, chipValueOffset, 0);
    this.drawValueOffset(x, y, -chipValueOffset, 0);
  }

  drawValueOffset(x, y, offsetX, offsetY) {
    this.ctx.save();
    this.ctx.fillStyle = chipValueColour;
    this.ctx.translate((x-0.5)*squareSize + offsetX, (y-0.5)*squareSize + offsetY);
    this.ctx.beginPath();
    this.ctx.arc(0,0,3,0,2*Math.PI);
    this.ctx.fill();
    this.ctx.restore();
  }


}