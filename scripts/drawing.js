class Drawing {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = canvas.getContext("2d");
    this.squareSize = squareSize;
    this.squareBorderSize = squareBorderSize;
    this.squareBorderColour = squareBorderColour;
    this.squareColour = squareColour;
    this.squareRoomBorderColour = squareRoomBorderColour;
    this.squareRoomColour = squareRoomColour;
  }

  drawGameBoardFrame(width, height, fieldSize) {
    this.ctx.lineWidth=gameBoardFrameSize;
    this.ctx.strokeRect(gameBoardFrameSize/2,gameBoardFrameSize/2,width*fieldSize+gameBoardFrameSize,height*fieldSize+gameBoardFrameSize);
    //not sure if translate should be part of this method
    this.ctx.translate(gameBoardFrameSize,gameBoardFrameSize);
  }

  drawGameSquare(xPosition,yPosition,) {
    ctx.fillStyle = this.squareBorderColour;
    ctx.fillRect((xPosition-1)*this.squareSize,(yPosition-1)*this.squareSize,this.squareSize,this.squareSize);
    ctx.fillStyle = this.squareColour;
    ctx.fillRect((xPosition-1)*this.squareSize+this.squareBorderSize,(yPosition-1)*this.squareSize+this.squareBorderSize,this.squareSize-2*this.squareBorderSize,this.squareSize-2*this.squareBorderSize);
  }

  drawRooms(xPosition,yPosition) {
    this.ctx.fillStyle = squareRoomBorderColour;
    this.ctx.fillRect((xPosition-1)*squareSize,(yPosition-1)*squareSize,squareSize,squareSize);
    this.ctx.fillStyle = squareRoomColour;
    this.ctx.fillRect((xPosition-1)*squareSize+squareBorderSize,(yPosition-1)*squareSize+squareBorderSize,squareSize-2*squareBorderSize,squareSize-2*squareBorderSize);
  }



}
