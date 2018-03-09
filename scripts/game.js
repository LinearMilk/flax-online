class Game {
  constructor(){
    this.draw = new Drawing(canvasId);
    this.player = new Player(startingColour, startingPosition);
    this.gameBoard = new GameBoard(this.draw);

    /**
     * Add event listener to the squares in the board
     */
    this.draw.getCanvas().addEventListener('click',e => {
      xClick = e.clientX;
      yClick = e.clientY;
      var coordinates = this.gameBoard.getClickCoordinates(xClick,yClick);
      if(coordinates) {
        var x = coordinates[0];
        var y = coordinates[1];
        if (x>=0 && x<=gameBoardWidth && y>=0 && y<=gameBoardHeight) {
          this.gameBoard.handleRandomClickedChip(x,y, this.player);
        }
      }
    } , false);
  }



  startGame() {
    this.gameBoard.createGameBoard();
  }

  /**
   * Get a random Chip from the current player
   */
  getChip(){
    console.log(this.player);
    var chipValues = this.player.getRandomChipType();

    if(chipValues){
      var chip1 = new Chip(this.player.getColour(), chipValues[0], [1, 11]);
      var chip2 = new Chip(this.player.getColour(), chipValues[1], [2, 11]);

      this.draw.chip(chip1);
      this.draw.chip(chip2);
    } else {
      this.draw.gameOver(1,11);
    }
  }

}