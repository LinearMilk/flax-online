var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var board = [];

function createGameBoard(i, j) {
  ctx.save();
  drawGameBoardFrame(gameBoardWidth,gameBoardHeight,squareSize);
  for (i=1; i<=gameBoardWidth;i++) {
    for (j=1; j<=gameBoardHeight;j++) {
      drawGameSquare(i,j);
      board.push({
        xCoordinate: i,
        yCoordinate: j,
        roomNumber: 0
      });
    }
  }

  rooms.forEach(function(el) {
    el.forEach(function(element) {
      var x = element[0], y = element[1], roomNumber = element[2];
      drawRooms(x,y);
      (board.find(function isRoom(square) {
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

function drawTile(xPosition,yPosition, colour, value, isTop) {
  ctx.save();
  ctx.translate((xPosition-0.5)*squareSize+gameBoardFrameSize, (yPosition-0.5)*squareSize+gameBoardFrameSize);
  ctx.beginPath();
  ctx.arc(0,0,tileRadius,0,2*Math.PI);
  ctx.fillStyle = colour;
  ctx.fill();
  ctx.font="20px Verdana";
  ctx.fillStyle = "#fff";
  ctx.fillText(value,-6,8);
  ctx.restore();

}

function drawRandomTile() {
  var xPosition = Math.floor(Math.random() * Math.floor(gameBoardWidth)+1);
  var yPosition = Math.floor(Math.random() * Math.floor(gameBoardHeight)+1);
  var value = Math.floor(Math.random() * Math.floor(6)+1);
  var colour= colours[Math.floor(Math.random() * Math.floor(4))];
  drawTile(xPosition,yPosition,colour,value);
  console.log(xPosition,yPosition,colour,value);
}


function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function reloadPage() {
  window.location.reload(false);
}

canvas.addEventListener('click', function(e) {
  var x = Math.floor((e.offsetX - squareBorderSize)/squareSize)+1;
  var y = Math.floor((e.offsetY - squareBorderSize)/squareSize)+1;
  drawTile(x,y, "lime", 9);
}, false);
