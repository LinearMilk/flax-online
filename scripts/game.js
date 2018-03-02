function createGameBoard(i, j) {
  // var gameBoard = [[]];
  var gameBoardWidth = 13;
  var gameBoardHeight = 9;

  //this is to save canvas state before any transformations, to allow for clearRect to work properly.
  var canvas = document.getElementById("game-canvas");
  var ctx = canvas.getContext("2d");
  ctx.save();
  drawGameBoardFrame(13,9,46);
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
  ctx.restore();
}

function drawGameSquare(xPosition,yPosition,) {
  var squareBorderColour= "#cc00ff";
  var squareBorderSize= 2;
  var squareColour= "#000066";
  var squareSize= 46;
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
  var squareSize= 46;
  var canvas = document.getElementById("game-canvas");
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = squareBorderColour;
  ctx.fillRect((xPosition-1)*squareSize,(yPosition-1)*squareSize,squareSize,squareSize);
  ctx.fillStyle = squareColour;
  ctx.fillRect((xPosition-1)*squareSize+squareBorderSize,(yPosition-1)*squareSize+squareBorderSize,squareSize-2*squareBorderSize,squareSize-2*squareBorderSize);
}

function drawTile(xPosition,yPosition, colour, value, isTop) {
  var squareSize= 46;
  var tileRadius = 17;
  var gameBoardFrameSize= 10;
  var canvas = document.getElementById("game-canvas");
  var ctx = canvas.getContext("2d");
  ctx.save();
  ctx.translate((xPosition-0.5)*squareSize+gameBoardFrameSize, (yPosition-0.5)*squareSize+gameBoardFrameSize);
  ctx.beginPath();
  ctx.arc(0,0,tileRadius,0,2*Math.PI);
  ctx.fillStyle = colour;
  ctx.fill();
  ctx.font="20px Verdana";
  ctx.fillStyle = "#000000";
  ctx.fillText(value,-5,8);
  ctx.restore();

}

function drawRandomTile() {
  var xPosition = Math.floor(Math.random() * Math.floor(13)+1);
  var yPosition = Math.floor(Math.random() * Math.floor(9)+1);
  var value = Math.floor(Math.random() * Math.floor(6)+1);
  var colours = ["yellow","lime","red","magenta"];
  var colour= colours[Math.floor(Math.random() * Math.floor(4))];
  drawTile(xPosition,yPosition,colour,value);
  console.log(xPosition,yPosition,colour,value);
}


function clearCanvas() {
  var canvas = document.getElementById("game-canvas");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function reloadPage() {
  window.location.reload(false);
}

function showRooms() {
  console.log(rooms);
}
