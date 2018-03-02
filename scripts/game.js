// logic for the count game


function createGameBoard(i, j) {
  var gameBoard = [[]];
  var gameBoardWidth = 13;
  var gameBoardHeight = 9;
  for (i=1; i<=gameBoardWidth;i++) {
    for (j=1; j<=gameBoardHeight;j++) {
      drawGameSquare(i,j);
    }
  }
}

function drawGameSquare(xPosition,yPosition) {
  var canvas = document.getElementById("game-canvas");
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = "#cc00ff";
  ctx.fillRect((xPosition-1)*30,(yPosition-1)*30,30,30);
  ctx.fillStyle = "#000066";
  ctx.fillRect((xPosition-1)*30+2,(yPosition-1)*30+2,26,26);
}

function clearCanvas() {
  var canvas = document.getElementById("game-canvas");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
