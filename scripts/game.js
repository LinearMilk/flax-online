var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var board = [];

var player = new Player(startingColour, startingPosition);
function getChip(){
  console.log(player);
  var chips = player.getRandomChip();

  drawChip(1, 11, player.getColour(), chips[0]);
  drawChip(2, 11, player.getColour(), chips[1]);
}

function drawChip(xPosition,yPosition, colour, value) {
  ctx.save();
  ctx.translate((xPosition-0.5)*squareSize+gameBoardFrameSize, (yPosition-0.5)*squareSize+gameBoardFrameSize);
  ctx.beginPath();
  ctx.arc(0,0,chipRadius,0,2*Math.PI);
  ctx.fillStyle = colour;
  ctx.fill();
  drawChipBorder();
  ctx.restore();
  drawChipValue(xPosition, yPosition, value);
}

function drawBottomChip(xPosition,yPosition, colour) {
  ctx.save();
  ctx.translate((xPosition-0.5)*squareSize+gameBoardFrameSize, (yPosition-0.5)*squareSize+gameBoardFrameSize);
  ctx.beginPath();
  ctx.arc(0,0,chipRadius + bottomChipBorder,0,2*Math.PI);
  ctx.fillStyle = colour;
  ctx.fill();
  drawChipBorder();
  ctx.restore();
}

function drawChipBorder(){
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#636262";
  ctx.stroke();
}

function drawChipValue(x, y, value){
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

