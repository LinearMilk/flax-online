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

function drawClickedChip(x,y) {
  var value = Math.floor(Math.random() * Math.floor(6)+1);
  var colour = colours[Math.floor(Math.random() * Math.floor(4))];

  var boardSquare = board.find(square => {
    if(square.xCoordinate === x && square.yCoordinate === y) return true;
  });

  if(boardSquare.bottomChip === null){
    if(boardSquare.activeChip != null) {
      boardSquare.bottomChip = boardSquare.activeChip;
      drawBottomChip(x,y, boardSquare.bottomChip.colour, 3);
    } 

    drawChip(x,y, colour, value);
    boardSquare.activeChip = {
      colour: colour,
      value: value
    };
  }

  console.log(boardSquare);
}

function drawChip(xPosition,yPosition, colour, value) {
  ctx.save();
  ctx.translate(((xPosition-0.5)*squareSize+gameBoardFrameSize), ((yPosition-0.5)*squareSize+gameBoardFrameSize));
  ctx.beginPath();
  ctx.arc(0,0,chipRadius,0,2*Math.PI);
  ctx.fillStyle = colour;
  ctx.fill();
  drawChipBorder();
  ctx.restore();
  drawChipValue(xPosition, yPosition, value);
}

function drawBottomChip(xPosition,yPosition, colour, offset) {
  ctx.save();
  ctx.translate(((xPosition-0.5)*squareSize+gameBoardFrameSize)+offset, ((yPosition-0.5)*squareSize+gameBoardFrameSize)+offset);
  ctx.beginPath();
  ctx.arc(0,0,chipRadius,0,2*Math.PI);
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

