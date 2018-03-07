let draw = new Drawing(canvasId);
var player = new Player(startingColour, startingPosition);
let gameBoard = new GameBoard();

function startGame() {
  gameBoard.createGameBoard();
}

function getChip(){
  console.log(player);
  var chipValues = player.getRandomChipType();

  var chip1 = new Chip(player.getColour(), chipValues[0], [1, 11]);
  var chip2 = new Chip(player.getColour(), chipValues[1], [2, 11]);


  if(chipValues){
    draw.chip(chip1);
    draw.chip(chip2);
  } else {
    draw.gameOver(1,11);
  }
}

draw.getCanvas().addEventListener('click',e => {
  xClick = e.clientX;
  yClick = e.clientY;
  var coordinates = gameBoard.getClickCoordinates(xClick,yClick);
  if(coordinates) {
    var x = coordinates[0];
    var y = coordinates[1];
    if (x>=0 && x<=gameBoardWidth && y>=0 && y<=gameBoardHeight) {
      gameBoard.handleRandomClickedChip(x,y);
    }
  }
} , false);
