let canvas = document.getElementById(canvasId);
let ctx = canvas.getContext("2d");

let draw = new Drawing(canvasId);
var player = new Player(startingColour, startingPosition);

function getChip(){
  console.log(player);
  var chipValues = player.getRandomChipType();

  var chip1 = new Chip(player.getColour(), chipValues[0], [1, 11]);
  var chip2 = new Chip(player.getColour(), chipValues[1], [2, 11]);


  if(chipValues){
    draw.drawChip(chip1);
    draw.drawChip(chip2);
  } else {
    draw.drawGameOver(1,11);
  }
}

function handleRandomClickedChip(x,y) {
    var value = Math.floor(Math.random() * Math.floor(6)+1);
    var colour = colours[Math.floor(Math.random() * Math.floor(4))];

    var boardSquare = board.find(square => {
      if(square.xCoordinate === x && square.yCoordinate === y) return true;
    });

    if(boardSquare.bottomChip === null){
      if(boardSquare.activeChip != null) {
        boardSquare.bottomChip = boardSquare.activeChip;
        draw.drawBottomChip(x,y, boardSquare.bottomChip.colour, 3);
      }
      //TODO get rid of this from here
      var chip = player.playChip(x, y, value);

      draw.drawChip(chip);
      boardSquare.activeChip = chip;
    }

    console.log(boardSquare);
  }
