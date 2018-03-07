let draw = new Drawing(canvasId);
var player = new Player(startingColour, startingPosition);

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
