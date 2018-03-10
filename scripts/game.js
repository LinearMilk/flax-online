class Game {
  constructor(){
    this.draw = new Drawing();
    this.player = new Player(playerColours[3], [1,9]);
    this.gameBoard = new GameBoard(this.draw);
    this.currentRandomChips = [];
    this.selectedChip = null;
    this.endGame = false;
    this.selectedBoard = null;

    var selectedBoardInfo = game_boards.board1;
    this.selectedBoard = new Board(selectedBoardInfo.dimensions, selectedBoardInfo.numPlayers, selectedBoardInfo.rooms);

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
          if(this.selectedChip) {
            this.gameBoard.placeChip(x,y, this.player, this.selectedChip);
            
            // clean objects so player can't place same chip over and over
            this.currentRandomChips = [];
            this.selectedChip = null;

            this.draw.clearRandomChips(1,11);
          }
        }

        // Check for click on Chip choice
        if(y === 11 && this.currentRandomChips.length > 0){
          var deSelectedChip;
          if(x === 1) {
            this.selectedChip = this.currentRandomChips[0];
            deSelectedChip = this.currentRandomChips[1];
            deSelectedChip.isHighlighted = false;
          } else if(x === 2) {
            this.selectedChip = this.currentRandomChips[1];
            deSelectedChip = this.currentRandomChips[0];
            deSelectedChip.isHighlighted = false;
          } 

          if(x === 1 || x === 2) {
            this.selectedChip.isHighlighted = true;
            this.draw.chipsHighlights(this.selectedChip, deSelectedChip);
          }
        }
      }
    } , false);
  }

  reDraw(){
    this.draw.reDrawWholeBoard(this.selectedBoard, this.gameBoard.getBoard());
  }

  startGame(numPlayers) {
    this.gameBoard.createGameBoard(this.selectedBoard);
  }

  /**
   * Get a random Chip from the current player
   */
  getChip(){
    if(!this.endGame && this.currentRandomChips.length <= 0){
      console.log(this.player);

      var chipValues = this.player.getRandomChipType();

      if(chipValues.length > 0){
        var chip1 = new Chip(this.player.getColour(), chipValues[0], [1, 11]);
        var chip2 = new Chip(this.player.getColour(), chipValues[1], [2, 11]);

        this.currentRandomChips = [chip1, chip2];

        this.draw.chip(chip1);
        this.draw.chip(chip2);
      } else {
        this.draw.gameOver(1,11);
        this.endGame = true;
      }
    }
    
  }

}
