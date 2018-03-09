class GameBoard {
  constructor(draw) {
    this.board = [];
    this.rooms = roomsGame1;
    this.draw = draw;
  }

  createGameBoard() {
    this.draw.gameBoardFrame(gameBoardWidth,gameBoardHeight,squareSize);
    for (var i=1; i<=gameBoardWidth;i++) {
      for (var j=1; j<=gameBoardHeight;j++) {
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

    this.rooms.forEach(function(el) {
      el.forEach(function(element) {
        var x = element[0], y = element[1], roomNumber = element[2];
        this.draw.rooms(x,y);
        (this.getBoard().find(square => {
          if(square.xCoordinate === x && square.yCoordinate === y) return true;
        })).roomNumber = roomNumber;
      }, this);
    }, this);
    console.log(this.board);
  }

  getBoard(){
    return this.board;
  }

  handleRandomClickedChip(x,y, player) {
    var value = Math.floor(Math.random() * Math.floor(6)+1);
    

    var boardSquare = this.board.find(square => {
      if(square.xCoordinate === x && square.yCoordinate === y) return true;
    });

    if(boardSquare.bottomChip === null){
      if(boardSquare.activeChip != null) {
        boardSquare.bottomChip = boardSquare.activeChip;
        this.draw.bottomChip(x,y, boardSquare.bottomChip.colour, 3);
      }

      //TODO get rid of this from here
      var chip = player.playChip(x, y, value);
      this.draw.chip(chip);
      boardSquare.activeChip = chip;
    }
    console.log(boardSquare);
  }


  getClickCoordinates(xClick,yClick) {
    var border = gameBoardFrameSize*2;
    var xLimit = (border+(squareSize*gameBoardWidth)-2);
    var yLimit = (border+(squareSize*gameBoardHeight)-2);

    if(xClick <= border || yClick <= border || xClick >= xLimit || yClick >= yLimit){
      return null;
    }

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


  reloadPage() {
    window.location.reload(false);
  }
}
