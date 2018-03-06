var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var board = [];

var player = new Player(startingColour, startingPosition);



function getChip(){
  console.log(player);
  var chipValues = player.getRandomChipType();

  var chip1 = new Chip(player.getColour(), chipValues[0], [1, 11]);
  var chip2 = new Chip(player.getColour(), chipValues[1], [2, 11]);


  if(chipValues){
    drawChip(chip1);
    drawChip(chip2);
  } else {
    drawGameOver(1,11);
  }
}

function drawGameOver(x,y){
  // TODO
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


    var chip = player.playChip(x, y, value);


    drawChip(chip);
    boardSquare.activeChip = chip;
  }

  console.log(boardSquare);
}

function drawChip(chip) {
  ctx.save();
  ctx.translate(((chip.xPosition()-0.5)*squareSize+gameBoardFrameSize), ((chip.yPosition()-0.5)*squareSize+gameBoardFrameSize));
  ctx.beginPath();
  ctx.arc(0,0,chipRadius,0,2*Math.PI);
  ctx.fillStyle = chip.colour;
  ctx.fill();
  drawChipBorder();
  ctx.restore();
  drawChipValue(chip.xPosition(), chip.yPosition(), chip.value);
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

