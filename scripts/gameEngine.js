import Drawing from "./drawing";
import Player from "./player";
import Chip from "./chip";
import Board from "./board";
import GameEngineChipMoves from "./gameEngineChipMoves";
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

    const selectedBoardInfo = gameBoards.board2;
    this.selectedBoard = new Board(
      selectedBoardInfo.dimensions,
      selectedBoardInfo.numPlayers,
      selectedBoardInfo.rooms,
      selectedBoardInfo.startingPositions,
      selectedBoardInfo.randomChipRow
    );
    this.rooms = selectedBoardInfo.rooms;

    const playerOne = new Player(globals.playerColours[0], this.selectedBoard.startingPositions[0]);
    const playerTwo = new Player(globals.playerColours[1], this.selectedBoard.startingPositions[1]);
    playerOne.setName("green");
    playerTwo.setName("blue");

    // this.player = new Player(globals.playerColours[0], this.selectedBoard.startingPositions[0]);
    this.players = [playerOne, playerTwo];
    this.activePlayer = playerOne;
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

            console.log("scores...");
            console.log(GameEngine.countPoints2Player(this.generateRoomPipCount(this.players)));

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
   * Count pips on all chips owned by a player in every room.
   * @param  {Player} player - the player that is making the mov
   * @param  {Board} board   - the chip being played
   * @return {array}         - array of [pipCount] in each room, 1st room at index 0
   */
  countPipsInRooms(player) {
    const chipsOnBoard = player.getChipsOnBoard();
    const pipsInRooms = [];
    this.rooms.forEach(room => {
      let sumOfPips = 0;
      room.roomSquares.forEach(square => {
        // console.log(square);
        const foundChip = chipsOnBoard.find(chip => {
          if (chip.xPosition() === square[0] && chip.yPosition() === square[1] && chip.isActive) return true;
          return false;
        });
        if (foundChip) sumOfPips += foundChip.value;
      });
      pipsInRooms.push(sumOfPips);
    });
    return pipsInRooms;
  }

  /**
   * Compile information about pips in each room for each player into an array
   * @param  {array} players - array containing all players in a game
   * @return {array}         - array of [[playerOneRoomOnePipCount,playerTwoRoomOnePipCount],[playerOneRoomTwoPipCount,playerTwoRoomTwoPipCount],...]
   */
  generateRoomPipCount(players) {
    const playersPipCount = [];
    players.forEach(player => {
      const pipsInRooms = this.countPipsInRooms(player);
      for (let room = 0; room < pipsInRooms.length; room += 1) {
        if (playersPipCount[room] === undefined) {
          playersPipCount[room] = [];
        }
        playersPipCount[room].push(pipsInRooms[room]);
      }
    });
    return playersPipCount;
  }

  /**
   * Calculates score based on roomPipCount for 2 players ONLY
   * @param  {array} playerspipCount - array containing pip counts for every player in every room
   * @return {array}                 - array of [playerOneScore, playerTwoScore]
   */
  static countPoints2Player(playersPipCount) {
    const scores = Array(playersPipCount[0].length).fill(0);
    playersPipCount.forEach(roomPipCount => {
      const max = Math.max(...roomPipCount);

      if (max > 0) {
        for (let i = 0; i < roomPipCount.length; i += 1) {
          if (roomPipCount[i] === max) {
            scores[i] += 4;
          }
        }
      }
    });
    return scores;
  }

  /**
   * Calculates score based on roomPipCount
   * @param  {array} playerspipCount - array containing pip counts for every player in every room
   * @return {array}                 - array of [playerOneScore, playerTwoScore,...]
   */
  static countPoints(playersPipCount) {
    if (!playersPipCount) return undefined;
    const noOfPlayers = playersPipCount[0].length;
    const scores = Array(noOfPlayers).fill(0);
    const firstPlaceRoomScore = 4;
    const secondPlaceRoomScore = 2;

    if (noOfPlayers === 2) {
      // scoring variant for 2 players
      playersPipCount.forEach(roomPipCount => {
        const roomWinnersIndices = GameEngine.findHighestPipCountIndices(roomPipCount);
        if (roomWinnersIndices !== -1) {
          roomWinnersIndices.forEach(player => {
            scores[player] += firstPlaceRoomScore;
          });
        }
      });
    } else {
      console.log(secondPlaceRoomScore);
      // scoring variant for 3-4 players
    }

    return scores;
  }

  /**
   * checks if there are any pips in room, and returns indices of players with highest amount of chips
   * @param  {array} roomPipCount - array containing pip counts for every player in one room
   * @return {array}              - array of indices of players with highest amount of chips
   */
  static findHighestPipCountIndices(roomPipCount) {
    const max = Math.max(...roomPipCount);
    if (max === 0) return -1;
    const indices = GameEngine.findIndicesOFMaxInArray(roomPipCount);
    return indices;
  }

  /**
   * checks if there is/are player(s) with second highthest amount of pips in room, and returns their index, -1 if none
   * @param  {array} roomPipCount - array containing pip counts for every player in one room
   * @return {array}              - array of indices of player(s) with 2nd highest amount of chips
   */
  static findSecondHighestPipCountIndices(roomPipCount) {
    if (!roomPipCount) return undefined;
    const max = Math.max(...roomPipCount);

    // check if all pips counts are not the same and >0
    const lowerThanMax = roomPipCount.find(pipCount => {
      if (pipCount < max && pipCount > 0) return true;
      return false;
    });
    if (!lowerThanMax) return -1;

    // removing max values from the array considered
    const pipsWithoutMax = roomPipCount.slice();
    const indicesOfMax = GameEngine.findIndicesOFMaxInArray(pipsWithoutMax);
    indicesOfMax.forEach(index => {
      pipsWithoutMax[index] = 0;
    });
    const indices = GameEngine.findIndicesOFMaxInArray(pipsWithoutMax);

    return indices;
  }

  /**
   * returns all indices containing max value of an array
   * @param  {array} array - array containing pip counts for every player in one room
   * @return {array}              - array of indices containg max value
   */
  static findIndicesOFMaxInArray(array) {
    const indices = [];
    const max = Math.max(...array);
    let idx = array.indexOf(max);
    while (idx !== -1) {
      indices.push(idx);
      idx = array.indexOf(max, idx + 1);
    }
    return indices;
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
      this.squares.forEach(square => {
        if (square.bottomChip) this.draw.bottomChip(square.bottomChip, 3);
        if (square.activeChip) this.draw.chip(square.activeChip);
      });

      // Highlight available moves
      const availableMoves = [];
      if (this.hasFirstMoveAvailable(this.activePlayer)) {
        const firstMoves = this.activePlayer.getStartingPosition();
        this.draw.highlightChip(firstMoves[0], firstMoves[1]);
        availableMoves.push(firstMoves);
      }

      this.activePlayer.chipsOnBoard.forEach(chip => {
        chip.validMoves.forEach(coordinates => {
          if (coordinates) {
            availableMoves.push(coordinates);
            this.draw.highlightChip(coordinates[0], coordinates[1]);
          }
        });
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
