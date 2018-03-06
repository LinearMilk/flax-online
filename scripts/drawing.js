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
    this.chipRadius = chipRadius;
    this.gameBoardFrameSize = gameBoardFrameSize;
    this.chipBorderColour="#636262";
    this.chipBorderWidth = 1;
  }

  drawGameBoardFrame(width, height, fieldSize) {
    this.ctx.lineWidth=this.gameBoardFrameSize;
    this.ctx.strokeRect(this.gameBoardFrameSize/2,this.gameBoardFrameSize/2,width*fieldSize+this.gameBoardFrameSize,height*fieldSize+this.gameBoardFrameSize);
    //not sure if translate should be part of this method
    this.ctx.translate(this.gameBoardFrameSize,this.gameBoardFrameSize);
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

  drawGameOver(x,y){
    // TODO
  }

  drawRandomClickedChip(x,y) {
    var value = Math.floor(Math.random() * Math.floor(6)+1);
    var colour = colours[Math.floor(Math.random() * Math.floor(4))];

    var boardSquare = board.find(square => {
      if(square.xCoordinate === x && square.yCoordinate === y) return true;
    });

    if(boardSquare.bottomChip === null){
      if(boardSquare.activeChip != null) {
        boardSquare.bottomChip = boardSquare.activeChip;
        this.drawBottomChip(x,y, boardSquare.bottomChip.colour, 3);
      }
      //TODO get rid of this from here
      var chip = player.playChip(x, y, value);

      this.drawChip(chip);
      boardSquare.activeChip = chip;
    }

    console.log(boardSquare);
  }

  drawChip(chip) {
    this.ctx.save();
    this.ctx.translate(((chip.xPosition()-0.5)*squareSize+gameBoardFrameSize), ((chip.yPosition()-0.5)*squareSize+gameBoardFrameSize));
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
    this.ctx.translate(((xPosition-0.5)*squareSize+gameBoardFrameSize)+offset, ((yPosition-0.5)*squareSize+gameBoardFrameSize)+offset);
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

  drawChipValue(x, y, value){
    switch(value) {
      case 1:
        drawValue1(x, y);
        break;
      case 2:
        drawValue2(x, y);
        break;
      case 3:
        drawValue3(x, y);
        break;
      case 4:
        drawValue4(x, y);
        break;
      case 5:
        drawValue5(x, y);
        break;
      case 6:
        drawValue6(x, y);
        break;
      default:
        break;
    }
  }




}
