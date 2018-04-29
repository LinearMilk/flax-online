import Drawing from "./drawing";
import Player from "./player";
import Chip from "./chip";
import Board from "./board";
import Square from "./square";
import GameEngineChipMoves from "./gameEngineChipMoves";
import GameEngineScores from "./gameEngineScores";
import gameBoards from "./boards";
import * as globals from "./globals";

/**
 * Game Engine
 * Responsible for all the logic regarding the game.
 */
export default class GameEngine {
  constructor() {
    this.draw = new Drawing();
    this.endGame = false;
    this.scores = null;

    this.currentRandomChips = [];
    this.selectedChip = null;

    this.selectedBoard = GameEngine.getSelectedBoard(gameBoards.board3);
    this.squares = this.createSquares();
    this.rooms = this.selectedBoard.rooms;
    this.assignRoomNumbersToSquares();

    this.players = this.createPlayers(this.selectedBoard.numPlayers);
    [this.activePlayer] = this.players;
    this.activePlayer.setIsActive(true);

    this.tieBreakerRoomNum = this.selectedBoard.tieBreakerRoomNum;

    this.scoreObject = new GameEngineScores(this.players, this.rooms, this.tieBreakerRoomNum);
    this.setPoints();

    this.createStartingTiles(this.players);

    this.currentRandomChips = this.getRandomChip();
  }

  /**
   * Add event listener to the canvas to listen to the clicks on the board
   */
  addEventListener() {
    let xClick = -1;
    let yClick = -1;
    this.draw.getCanvas().addEventListener(
      "click",
      e => {
        const pos = globals.getMousePos(this.draw.getCanvas(), e);
        xClick = pos.x + 10;
        yClick = pos.y + 10;

        const coordinates = GameEngine.getClickCoordinates(xClick, yClick);
        if (coordinates) {
          const [x, y] = coordinates;
          this.placeChipOnBoard(x, y);

          // Check for click on Chip choice
          this.selectChipToPlay(x, y);
        }
      },
      false
    );
  }

  /**
   * Create the players for the game
   * @param {number} numPlayers - the number of players for the game
   * @return the array of players
   */
  createPlayers(numPlayers) {
    const players = [];
    for (let i = 0; i < numPlayers; i += 1) {
      const player = new Player(globals.playerColours[i], this.selectedBoard.startingPositions[i]);
      player.setName(globals.playerColours[i].name);
      players.push(player);
    }

    return players;
  }

  /**
   * Create starting tiles for the players in game
   * @param  {array} player  - array of players in play
   */
  createStartingTiles(players) {
    players.forEach(player => {
      this.squares.find(square => {
        const squareCoordinates = [square.xCoordinate, square.yCoordinate].toString();
        const startingPosCoodinates = player.getStartingPosition().toString();

        if (squareCoordinates === startingPosCoodinates) {
          return true;
        }
        return false;
      }).startingTile = player;
    });
  }

  /**
   * Create the Squares in the board
   * @return array of square objects
   */
  createSquares() {
    const squares = [];
    for (let x = 1; x <= this.selectedBoard.getBoardWidth(); x += 1) {
      for (let y = 1; y <= this.selectedBoard.getBoardHeight(); y += 1) {
        squares.push(new Square(x, y));
      }
    }
    return squares;
  }

  /**
   * Set each squares are rooms, adding room number to it
   */
  assignRoomNumbersToSquares() {
    this.rooms.forEach(room => {
      const roomNumber = room.roomNum;
      room.roomSquares.forEach(roomSquare => {
        const [x, y] = roomSquare;
        this.squares.find(square => {
          if (square.xCoordinate === x && square.yCoordinate === y) {
            return true;
          }
          return false;
        }).roomNumber = roomNumber;
      });
    });
  }

  /**
   * Create the board object for the game
   * @param {object} selectedBoardInfo - the board selected for the game
   * @return the Board object for the game
   */
  static getSelectedBoard(selectedBoardInfo) {
    const selectedBoard = new Board(
      selectedBoardInfo.dimensions,
      selectedBoardInfo.numPlayers,
      selectedBoardInfo.rooms,
      selectedBoardInfo.startingPositions,
      selectedBoardInfo.randomChipRow,
      selectedBoardInfo.tieBreakerRoomNum
    );

    return selectedBoard;
  }

  /**
   * Place the selected chip on the board
   * @param  {number} x - the column of the click
   * @param  {number} y - the row of the click
   */
  placeChipOnBoard(x, y) {
    if (x >= 0 && x <= this.selectedBoard.getBoardWidth() && y >= 0 && y <= this.selectedBoard.getBoardHeight()) {
      if (this.selectedChip) {
        const clickIsOnValidMove = this.activePlayer.getAvailableMoves().find(coordinates => {
          if (coordinates.toString() === [x, y].toString()) return true;
          return false;
        });

        if (clickIsOnValidMove) {
          if (this.placeChip(x, y, this.activePlayer, this.selectedChip)) {
            // clear objects so player can't place same chip over and over
            this.currentRandomChips = [];
            this.selectedChip = null;

            // Change active player
            let playersChangingTurnsCounter = 0;
            do {
              this.changeActivePlayer();
              this.setAvailableMovesForActivePlayer();
              playersChangingTurnsCounter += 1;
              if (playersChangingTurnsCounter > this.players.length) this.endGame = true;
            } while (this.activePlayer.availableMoves.length === 0 && !this.endGame);
            this.currentRandomChips = this.getRandomChip();
            this.setPoints();

            // redraw the board with valid moves
            this.drawGameBoard();
          }
        }
      }
    }
  }

  /**
   * Add a new chip to the board object.
   * @param  {number} x      - the column for the chip's placement
   * @param  {number} y      - the row for the chip's placement
   * @param  {Player} player - the player that is making the move
   * @param  {Chip} chip     - the chip being played
   * @return {boolean} if the chip was placed or not
   */
  placeChip(x, y, player, chip) {
    const boardSquare = this.squares.find(square => {
      if (square.xCoordinate === x && square.yCoordinate === y) {
        return true;
      }
      return false;
    });

    if (boardSquare.bottomChip === null) {
      if (boardSquare.activeChip != null) {
        boardSquare.bottomChip = boardSquare.activeChip;
        boardSquare.bottomChip.inActivate();
      }

      const playedChip = player.playChip(x, y, chip.value);
      boardSquare.activeChip = playedChip;
      playedChip.validMoves = GameEngineChipMoves.findLegalMoves(this.selectedBoard, this.squares, playedChip);

      return true;
    }

    return false;
  }

  /**
   * Select the random chip clicked, highlighting it
   * @param  {number} x - the column of the click
   * @param  {number} y - the row of the click
   */
  selectChipToPlay(x, y) {
    if (y === this.selectedBoard.randomChipRow && this.currentRandomChips.length > 0) {
      let deSelectedChip;
      if (x === 1) {
        [this.selectedChip, deSelectedChip] = this.currentRandomChips;
        deSelectedChip.isHighlighted = false;
      } else if (x === 2) {
        [deSelectedChip, this.selectedChip] = this.currentRandomChips;
        deSelectedChip.isHighlighted = false;
      }

      if (x === 1 || x === 2) {
        this.selectedChip.isHighlighted = true;
        this.draw.chipsHighlights(this.selectedChip, deSelectedChip);
      }
    }
  }

  /**
   * Set the Available moves for the active player
   */
  setAvailableMovesForActivePlayer() {
    let availableMoves = [];

    // Get all available moves
    this.activePlayer.chipsOnBoard.forEach(chip => {
      chip.validMoves.forEach(coordinates => {
        if (coordinates) {
          const newMoveCoordinates = coordinates.toString();
          const coordinatesExistInAvailableMoves = availableMoves.find(move => {
            const existingMoveCoordinates = move.toString();
            if (existingMoveCoordinates === newMoveCoordinates) {
              return true;
            }
            return false;
          });
          if (!coordinatesExistInAvailableMoves) availableMoves.push(coordinates);
        }
      });
    });

    // Filters out players starting tiles
    availableMoves = availableMoves.filter(move => {
      const search = globals.searchArrayInArray(this.selectedBoard.startingPositions, move);
      if (search > -1) {
        return false;
      }
      return true;
    });

    // Add starting tile if available
    if (this.hasFirstMoveAvailable(this.activePlayer)) {
      const firstMoves = this.activePlayer.getStartingPosition();
      availableMoves.push(firstMoves);
    }

    this.activePlayer.availableMoves = availableMoves;
  }

  /**
   * Draw the game board.
   * Draws the Board frame, squares and the lightened squares representing the rooms.
   * Will draw the placed chips if it is redrawing.
   * Will clear out the valid moves highlights when it's a player's turn.
   */
  drawGameBoard() {
    this.draw.gameBoardFrame(
      this.selectedBoard.getBoardWidth(),
      this.selectedBoard.getBoardHeight(),
      globals.squareSize
    );

    // Draw all the squares and the lightened squares for the rooms
    this.squares.forEach(square => {
      this.draw.gameSquare(square.xCoordinate, square.yCoordinate);
      if (square.roomNumber > 0) this.draw.rooms(square.xCoordinate, square.yCoordinate);
    });

    // Draw Starting tiles
    this.players.forEach(player => {
      this.draw.startingTile(player);
    });

    this.draw.clearRandomChips(1, this.selectedBoard.randomChipRow);

    if (this.endGame) {
      this.draw.gameOver(1, this.selectedBoard.randomChipRow);
      this.scoreObject.logWinner(this.scoreObject.findWinner(this.scores));
    } else {
      // Draw all available moves
      if (this.activePlayer.availableMoves.length > 0) {
        this.activePlayer.availableMoves.forEach(move => {
          this.draw.highlightChip(move[0], move[1], this.activePlayer.colour);
        });
      }

      this.draw.randomChips(this.currentRandomChips);
    }

    // drawing the chips (should be after highlighting them)
    this.squares.forEach(square => {
      if (square.bottomChip) this.draw.bottomChip(square.bottomChip, 3);
      if (square.activeChip) this.draw.chip(square.activeChip);
    });

    // drawing the score
    this.draw.currentScore(this.players, this.scores);
  }

  /**
   * Changes active player - IMPORTANT - works only with 2 players.
   */
  changeActivePlayer() {
    this.players.forEach(player => {
      if (player.isActive) player.setIsActive(false);
      else {
        player.setIsActive(true);
        this.activePlayer = player;
      }
    });
  }

  /**
   * checks if there is a bottom tile on the starting position for that player
   * @param  {Player} player - player to check
   * @return {boolean}       - true if there is no bottom chip (move available), false if move not available
   */
  hasFirstMoveAvailable(player) {
    const startingSquare = this.squares.find(square => {
      const squareCoordinates = [square.xCoordinate, square.yCoordinate].toString();
      const startingPosCoodinates = player.getStartingPosition().toString();

      if (squareCoordinates === startingPosCoodinates) {
        return true;
      }
      return false;
    });
    const isBottomChipPresent = startingSquare.bottomChip === null;
    return isBottomChipPresent;
  }

  /**
   * Get a random Chip from the current player
   */
  getRandomChip() {
    let chip1;
    let chip2;

    if (!this.endGame && this.currentRandomChips.length <= 0) {
      const chipValues = this.activePlayer.getRandomChipType();

      if (chipValues.length > 0) {
        chip1 = new Chip(this.activePlayer.getColour(), chipValues[0], [1, this.selectedBoard.randomChipRow]);
        chip2 = new Chip(this.activePlayer.getColour(), chipValues[1], [2, this.selectedBoard.randomChipRow]);
      } else {
        this.endGame = true;
      }
    }

    return [chip1, chip2];
  }

  /**
   * Count the points for the game and set in this.scores
   */
  setPoints() {
    const playersPipCount = this.scoreObject.generateRoomPipCount(this.players);
    this.scores = GameEngineScores.countPoints(playersPipCount);
  }

  /**
   * Translater the click coordinates into column and row clicked on the board.
   * @param  {number} xClick - the x click coordinates in pixels
   * @param  {number} yClick - the y click coordinates in pixels
   * @return {array}         - the square clicked [column, row]
   */
  static getClickCoordinates(xClick, yClick) {
    const border = globals.gameBoardFrameSize * 2;

    const x = Math.floor((xClick - border) / globals.squareSize) + 1;
    const y = Math.floor((yClick - border) / globals.squareSize) + 1;
    const xInSquare = x * globals.squareSize + border - 5 - xClick;
    const yInSquare = y * globals.squareSize + border - 5 - yClick;

    // If clicked on the edges of the square, do NOT draw the Chip (square == [40, 40])
    if (xInSquare <= 5 || xInSquare >= 35 || yInSquare <= 5 || yInSquare >= 35) {
      return null;
    }

    return [x, y];
  }
}
