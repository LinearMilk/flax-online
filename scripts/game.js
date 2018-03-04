var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var board = [];

var player = new Player(startingColour, startingPosition);
function getTile(){
  console.log(player);
  var tiles = player.getRandomTile();

  drawTile(1, 11, player.getColour(), tiles[0]);
  drawTile(2, 11, player.getColour(), tiles[1]);
}

function drawTile(xPosition,yPosition, colour, value) {
  ctx.save();
  ctx.translate((xPosition-0.5)*squareSize+gameBoardFrameSize, (yPosition-0.5)*squareSize+gameBoardFrameSize);
  ctx.beginPath();
  ctx.arc(0,0,tileRadius,0,2*Math.PI);
  ctx.fillStyle = colour;
  ctx.fill();
  drawTileBorder();
  ctx.restore();
  drawTileValue(xPosition, yPosition, value);
}

function drawBottomTile(xPosition,yPosition, colour) {
  ctx.save();
  ctx.translate((xPosition-0.5)*squareSize+gameBoardFrameSize, (yPosition-0.5)*squareSize+gameBoardFrameSize);
  ctx.beginPath();
  ctx.arc(0,0,tileRadius + bottomTileBorder,0,2*Math.PI);
  ctx.fillStyle = colour;
  ctx.fill();
  drawTileBorder();
  ctx.restore();
}

function drawTileBorder(){
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#636262";
  ctx.stroke();
}

function drawTileValue(x, y, value){
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

function drawRandomTile() {
  var xPosition = Math.floor(Math.random() * Math.floor(gameBoardWidth)+1);
  var yPosition = Math.floor(Math.random() * Math.floor(gameBoardHeight)+1);
  var value = Math.floor(Math.random() * Math.floor(6)+1);
  var colour= colours[Math.floor(Math.random() * Math.floor(4))];
  drawTile(xPosition,yPosition,colour,value);
  console.log(xPosition,yPosition,colour,value);
}
