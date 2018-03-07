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
