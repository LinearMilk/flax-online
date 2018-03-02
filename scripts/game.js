function createGameBoard(i, j) {
  // var gameBoard = [[]];
  var gameBoardWidth = 13;
  var gameBoardHeight = 9;

  //this is to save canvas state before any transformations, to allow for clearRect to work properly.
  var canvas = document.getElementById("game-canvas");
  var ctx = canvas.getContext("2d");
  ctx.save();

  drawGameBoardFrame(13,9,40);
  for (i=1; i<=gameBoardWidth;i++) {
    for (j=1; j<=gameBoardHeight;j++) {
      drawGameSquare(i,j);
    }
  }
  rooms.forEach(function(element) {
    element.forEach(function(element) {
      drawRooms(element[0],element[1]);
    });
  });
}


function drawGameSquare(xPosition,yPosition,) {
  var squareBorderColour= "#cc00ff";
  var squareBorderSize= 2;
  var squareColour= "#000066";
  var squareSize= 40;
  var canvas = document.getElementById("game-canvas");
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = squareBorderColour;
  ctx.fillRect((xPosition-1)*squareSize,(yPosition-1)*squareSize,squareSize,squareSize);
  ctx.fillStyle = squareColour;
  ctx.fillRect((xPosition-1)*squareSize+squareBorderSize,(yPosition-1)*squareSize+squareBorderSize,squareSize-2*squareBorderSize,squareSize-2*squareBorderSize);
}

function drawGameBoardFrame(width, height, fieldSize) {
  var gameBoardFrameColour= "#cc00ff";
  var gameBoardFrameSize= 10;
  var canvas = document.getElementById("game-canvas");
  var ctx = canvas.getContext("2d");
  ctx.strokeStyle=gameBoardFrameColour;
  ctx.lineWidth=gameBoardFrameSize;
  ctx.strokeRect(gameBoardFrameSize/2,gameBoardFrameSize/2,width*fieldSize+gameBoardFrameSize,height*fieldSize+gameBoardFrameSize);
  ctx.translate(gameBoardFrameSize,gameBoardFrameSize);
}

function drawRooms(xPosition,yPosition) {
  var squareBorderColour= "#ffffff";
  var squareBorderSize= 2;
  var squareColour= "#66ccff";
  var squareSize= 40;
  var canvas = document.getElementById("game-canvas");
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = squareBorderColour;
  ctx.fillRect((xPosition-1)*squareSize,(yPosition-1)*squareSize,squareSize,squareSize);
  ctx.fillStyle = squareColour;
  ctx.fillRect((xPosition-1)*squareSize+squareBorderSize,(yPosition-1)*squareSize+squareBorderSize,squareSize-2*squareBorderSize,squareSize-2*squareBorderSize);
}









function clearCanvas() {
  var canvas = document.getElementById("game-canvas");
  var ctx = canvas.getContext("2d");
  ctx.restore();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function reloadPage() {
  window.location.reload(false);
}

function showRooms() {
  console.log(rooms);
}
