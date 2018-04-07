import Drawing from "./drawing";
import Player from "./player";
import Chip from "./chip";
import Board from "./board";
import GameEngineChipMoves from "./gameEngineChipMoves";
import GameEngineScore from "./GameEngineScore";
import gameBoards from "./boards";
import * as globals from "./globals";

/**
 * Game Engine
 * Responsible for all the logic regarding the game.
 */
export default class GameEngine {
  constructor() {
    this.selectedBoard = null;
    this.squares = [];
    this.rooms = [];
    this.draw = new Drawing();

    this.currentRandomChips = [];
    this.selectedChip = null;
    this.endGame = false;

    const selectedBoardInfo = gameBoards.board3;
    this.selectedBoard = new Board(
      selectedBoardInfo.dimensions,
      selectedBoardInfo.numPlayers,
      selectedBoardInfo.rooms,
      selectedBoardInfo.startingPositions,
      selectedBoardInfo.randomChipRow,
      selectedBoardInfo.tieBreakerRoomNum
    );
    this.rooms = selectedBoardInfo.rooms;

    const playerOne = new Player(globals.playerColours[0], this.selectedBoard.startingPositions[0]);
    const playerTwo = new Player(globals.playerColours[3], this.selectedBoard.startingPositions[1]);
    playerOne.setName("green");
    playerTwo.setName("red");

    this.players = [playerOne, playerTwo];
    this.activePlayer = playerOne;
    this.score = new GameEngineScore(this.players, this.rooms);
  }

  /**
   * Add event listener to the canvas
   */
  addEventListener() {
    let xClick = -1;
    let yClick = -1;
    this.draw.getCanvas().addEventListener(
      "click",
      e => {
        xClick = e.clientX;
        yClick = e.clientY;

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

            this.draw.clearRandomChips(1, this.selectedBoard.randomChipRow);

            const scores = GameEngineScore.countPoints(this.score.generateRoomPipCount(this.players));
            this.draw.currentScore(this.players, scores);

            // Change active player
            this.changeActivePlayer();

            this.getRandomChip();
            // redraw the board with valid moves
            this.createGameBoard(true);
          }
        }
      }
    }
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
   * Create and draw the game board.
   * Draws the Board frame, squares and the lightened squares representing the rooms.
   * Will draw the placed chips if it is redrawing.
   * Redrawing will clear out the valid moves highlights when it's a player's turn.
   *
   * @param  {boolean} redraw   - flag if it is creating the board for the first time (false) or redrawing (true)
   */
  createGameBoard(redraw = false) {
    this.draw.gameBoardFrame(
      this.selectedBoard.getBoardWidth(),
      this.selectedBoard.getBoardHeight(),
      globals.squareSize
    );

    // Draw all the squares from the board
    for (let i = 1; i <= this.selectedBoard.getBoardWidth(); i += 1) {
      for (let j = 1; j <= this.selectedBoard.getBoardHeight(); j += 1) {
        this.draw.gameSquare(i, j);
        if (!redraw) {
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
    this.selectedBoard.getRooms().forEach(room => {
      const roomNumber = room.roomNum;
      room.roomSquares.forEach(roomSquare => {
        const [x, y] = roomSquare;
        this.draw.rooms(x, y);
        if (!redraw) {
          this.squares.find(square => {
            if (square.xCoordinate === x && square.yCoordinate === y) {
              return true;
            }

            return false;
          }).roomNumber = roomNumber;
        }
      });
    });

    // Draw Starting tiles
    this.createStartingTiles(this.players);

    // Draw all the chips played on that board
    if (redraw) {
      // Highlight available moves
      const availableMoves = [];
      if (this.hasFirstMoveAvailable(this.activePlayer)) {
        const firstMoves = this.activePlayer.getStartingPosition();
        this.draw.highlightChip(firstMoves[0], firstMoves[1], this.activePlayer.colour);
        availableMoves.push(firstMoves);
      }

      this.activePlayer.chipsOnBoard.forEach(chip => {
        chip.validMoves.forEach(coordinates => {
          if (coordinates) {
            availableMoves.push(coordinates);
            this.draw.highlightChip(coordinates[0], coordinates[1], this.activePlayer.colour);
          }
        });
      });

      // drawing the chips should be after highlighting them
      this.squares.forEach(square => {
        if (square.bottomChip) this.draw.bottomChip(square.bottomChip, 3);
        if (square.activeChip) this.draw.chip(square.activeChip);
      });

      this.activePlayer.availableMoves = availableMoves;
    }

    // draw the first randomised chips for 1st player
    if (!redraw) {
      GameEngine.setActivePlayer(this.activePlayer);
      this.getRandomChip();
    }
  }

  static setActivePlayer(player) {
    player.setIsActive(true);
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
   * @return {boolean}       - true if there is no bottom chip (move availble), false if move not availble
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
   * Create and draw starting tiles for the players in game
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

      this.draw.startingTile(player.getStartingPosition(), player.getColour());
    });
  }

  /**
   * Get a random Chip from the current player
   */
  getRandomChip() {
    if (!this.endGame && this.currentRandomChips.length <= 0) {
      const chipValues = this.activePlayer.getRandomChipType();

      if (chipValues.length > 0) {
        const chip1 = new Chip(this.activePlayer.getColour(), chipValues[0], [1, this.selectedBoard.randomChipRow]);
        const chip2 = new Chip(this.activePlayer.getColour(), chipValues[1], [2, this.selectedBoard.randomChipRow]);

        this.currentRandomChips = [chip1, chip2];

        this.draw.chip(chip1);
        this.draw.chip(chip2);
      } else {
        this.draw.gameOver(1, this.selectedBoard.randomChipRow);
        this.endGame = true;
      }
    }
  }

  /**
   * Add a new chip to the board object and draw it on the canvas.
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
        this.draw.bottomChip(boardSquare.bottomChip);
      }

      const playedChip = player.playChip(x, y, chip.value);
      this.draw.chip(playedChip);
      boardSquare.activeChip = playedChip;
      playedChip.validMoves = GameEngineChipMoves.findLegalMoves(this.selectedBoard, this.squares, playedChip);

      return true;
    }

    return false;
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
