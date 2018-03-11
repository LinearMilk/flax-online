class GameBoard {
  constructor(draw) {
    this.squares = [];
    this.rooms = [];
    this.draw = draw;
  }

  /**
   * Create and draw the game board, room and placed chips (if it is redrawing)
   * @param  {Board}  selectedBoard   - the selected board in play
   * @param  {array}  players         - the array of players in play
   * @param {boolean} redraw          - flag if it is creating the board board for the first time (false) or redrawing (true)
   */
  createGameBoard(selectedBoard, players, redraw = false) {
    this.draw.gameBoardFrame(selectedBoard.getBoardWidth(),selectedBoard.getBoardHeight(),squareSize);

    // Draw all the squares from the board
    for (var i=1; i<=selectedBoard.getBoardWidth();i++) {
      for (var j=1; j<=selectedBoard.getBoardHeight();j++) {
        this.draw.gameSquare(i,j);
        if(!redraw){
          this.squares.push({
            xCoordinate: i,
            yCoordinate: j,
            roomNumber: 0,
            activeChip: null,
            bottomChip: null,
            startingTile: ""
          });
        }
      }
    }

    // Draw all the lightened squares for the rooms
    selectedBoard.getRooms().forEach(room => {
      var roomNumber = room.roomNum;
      room.roomSquares.forEach(roomSquare => {
        var x = roomSquare[0], y = roomSquare[1];
        this.draw.rooms(x,y);
        if(!redraw){
          (this.getBoard().find(square => {
            if(square.xCoordinate === x && square.yCoordinate === y) return true;
          })).roomNumber = roomNumber;
        }
      });
    });

    // Draw Starting tiles
    this.createStartingTiles(players);

    // Draw all the chips played on that board
    if(redraw){
      this.squares.forEach(square => {
        if(square.bottomChip) this.draw.bottomChip(square.bottomChip, 3);
        if(square.activeChip) this.draw.chip(square.activeChip);
    });
    }
  }

  /**
   * Create and draw starting tiles for the players in game
   * @param  {array} player  - array of players in play
   */
  createStartingTiles(players){
    players.forEach(player => {
      (this.getBoard().find(square => {
        var squareCoordinates = [square.xCoordinate, square.yCoordinate].toString();
        var startingPosCoodinates = player.getStartingPosition().toString();

        if(squareCoordinates == startingPosCoodinates) return true;
      })).startingTile = player;

      this.draw.startingTile(player.getStartingPosition(), player.getColour());
    });
    
  }

  getBoard(){
    return this.squares;
  }

  placeChip(x,y, player, chip){
    var boardSquare = this.squares.find(square => {
      if(square.xCoordinate === x && square.yCoordinate === y) return true;
    });

    if(boardSquare.bottomChip === null){
      if(boardSquare.activeChip != null) {
        boardSquare.bottomChip = boardSquare.activeChip;
        this.draw.bottomChip(boardSquare.bottomChip, 3);
      }

      //TODO get rid of this from here
      var playedChip = player.playChip(x, y, chip.value);
      this.draw.chip(playedChip);
      boardSquare.activeChip = playedChip;
    }
  }


  getClickCoordinates(xClick,yClick) {
    var border = gameBoardFrameSize*2;

    var x = Math.floor((xClick-border)/squareSize)+1;
    var y = Math.floor((yClick-border)/squareSize)+1;
    var xInSquare = ((x*(squareSize))+border-5) - xClick;
    var yInSquare = ((y*(squareSize))+border-5) - yClick;

    // If clicked on the edges of the square, do NOT draw the Chip (square == [40, 40])
    if(xInSquare <= 5 || xInSquare >= 35 || yInSquare <= 5 || yInSquare >= 35){
      return null;
    }

    return [x,y];
  }

}
