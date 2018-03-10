class GameBoard {
  constructor(draw) {
    this.board = [];
    this.rooms = [];
    this.draw = draw;
  }

  createGameBoard(selectedBoard) {
    this.draw.gameBoardFrame(selectedBoard.getBoardWidth(),selectedBoard.getBoardHeight(),squareSize);
    for (var i=1; i<=selectedBoard.getBoardWidth();i++) {
      for (var j=1; j<=selectedBoard.getBoardHeight();j++) {
        this.draw.gameSquare(i,j);
        //TODO create method to add info to the board object
        this.board.push({
          xCoordinate: i,
          yCoordinate: j,
          roomNumber: 0,
          activeChip: null,
          bottomChip: null
        });
      }
    }

    selectedBoard.getRooms().forEach(room => {
      var roomNumber = room.roomNum;
      room.roomSquares.forEach(roomSquare => {
        var x = roomSquare[0], y = roomSquare[1];
        this.draw.rooms(x,y);
        (this.getBoard().find(square => {
          if(square.xCoordinate === x && square.yCoordinate === y) return true;
        })).roomNumber = roomNumber;
      });
    });

    console.log(this.board);
  }

  getBoard(){
    return this.board;
  }

  placeChip(x,y, player, chip){
    var boardSquare = this.board.find(square => {
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
