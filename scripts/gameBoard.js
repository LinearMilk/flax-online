function createGameBoard(i, j) {
  ctx.save();
  drawGameBoardFrame(gameBoardWidth,gameBoardHeight,squareSize);
  for (i=1; i<=gameBoardWidth;i++) {
    for (j=1; j<=gameBoardHeight;j++) {
      drawGameSquare(i,j);
      board.push({
        xCoordinate: i,
        yCoordinate: j,
        roomNumber: 0,
        activeTile: null,
        bottomTile: null
      });
    }
  }

  rooms.forEach(function(el) {
    el.forEach(function(element) {
      var x = element[0], y = element[1], roomNumber = element[2];
      drawRooms(x,y);
      (board.find(square => {
        if(square.xCoordinate === x && square.yCoordinate === y) return true;
      })).roomNumber = roomNumber;
    });
  });
  console.log(board);

  ctx.restore();
}

function drawGameSquare(xPosition,yPosition,) {
  ctx.fillStyle = squareBorderColour;
  ctx.fillRect((xPosition-1)*squareSize,(yPosition-1)*squareSize,squareSize,squareSize);
  ctx.fillStyle = squareColour;
  ctx.fillRect((xPosition-1)*squareSize+squareBorderSize,(yPosition-1)*squareSize+squareBorderSize,squareSize-2*squareBorderSize,squareSize-2*squareBorderSize);
}

function drawGameBoardFrame(width, height, fieldSize) {
  ctx.strokeStyle=gameBoardFrameColour;
  ctx.lineWidth=gameBoardFrameSize;
  ctx.strokeRect(gameBoardFrameSize/2,gameBoardFrameSize/2,width*fieldSize+gameBoardFrameSize,height*fieldSize+gameBoardFrameSize);
  ctx.translate(gameBoardFrameSize,gameBoardFrameSize);
}

function drawRooms(xPosition,yPosition) {
  ctx.fillStyle = squareRoomBorderColour;
  ctx.fillRect((xPosition-1)*squareSize,(yPosition-1)*squareSize,squareSize,squareSize);
  ctx.fillStyle = squareRoomColour;
  ctx.fillRect((xPosition-1)*squareSize+squareBorderSize,(yPosition-1)*squareSize+squareBorderSize,squareSize-2*squareBorderSize,squareSize-2*squareBorderSize);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function reloadPage() {
  window.location.reload(false);
}

function getClickCoordinates(x,y) {
  var x = Math.floor((x - squareBorderSize)/squareSize)+1;
  var y = Math.floor((y - squareBorderSize)/squareSize)+1;
  return [x,y];
}

function drawClickedTile(x,y) {
  var value = Math.floor(Math.random() * Math.floor(6)+1);
  var colour = colours[Math.floor(Math.random() * Math.floor(4))];

  var boardSquare = board.find(square => {
    if(square.xCoordinate === x && square.yCoordinate === y) return true;
  });

  if(boardSquare.bottomTile === null){
    if(boardSquare.activeTile != null) {
      boardSquare.bottomTile = boardSquare.activeTile;
      drawBottomTile(x,y, boardSquare.bottomTile.colour);
    }

    drawTile(x,y, colour, value);
    boardSquare.activeTile = {
      colour: colour,
      value: value
    };
  }

  console.log(boardSquare);

}

canvas.addEventListener('click',e => {
  xClick = e.clientX;
  yClick = e.clientY;
  var coordinates = getClickCoordinates(xClick,yClick)
  var x = coordinates[0];
  var y = coordinates[1];
  if (x>=0 && x<=gameBoardWidth && y>=0 && y<=gameBoardHeight) {
    drawClickedTile(x,y);
  }

} , false);
