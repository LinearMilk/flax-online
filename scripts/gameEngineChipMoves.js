import * as globals from "./globals";

export default class GameEngineChipMoves {
  /**
   * Find the legal moves in the board for a played chip
   * @param  {array} squares - the array of squares in the board
   * @param  {Chip} chip     - the played chip
   * @return {array}         - the possible moves in the 4 directions in the board [N, E, S, W]
   */
  static findLegalMoves(squares, playedChip) {
    const chip = playedChip;
    const possibleMoves = GameEngineChipMoves.checkMovesWithinBoard(chip);
    chip.validMoves = possibleMoves;

    const foundSquareWithChipNorth = GameEngineChipMoves.findNearestChipNorth(squares, chip);
    const foundSquareWithChipEast = GameEngineChipMoves.findNearestChipEast(squares, chip);
    const foundSquareWithChipSouth = GameEngineChipMoves.findNearestChipSouth(squares, chip);
    const foundSquareWithChipWest = GameEngineChipMoves.findNearestChipWest(squares, chip);

    // Check is there is a chip in the way
    GameEngineChipMoves.checkMovesNorth(chip, foundSquareWithChipNorth);
    GameEngineChipMoves.checkMovesEast(chip, foundSquareWithChipEast);
    GameEngineChipMoves.checkMovesSouth(chip, foundSquareWithChipSouth);
    GameEngineChipMoves.checkMovesWest(chip, foundSquareWithChipWest);

    // Check valid moves for the nearest chip in the north
    if (foundSquareWithChipNorth) {
      GameEngineChipMoves.checkMovesSouth(
        foundSquareWithChipNorth.activeChip,
        GameEngineChipMoves.findSquare(squares, chip)
      );

      console.log("Chip to the north: ");
      console.log(foundSquareWithChipNorth.activeChip);
    }

    // Check valid moves for the nearest chip in the east
    if (foundSquareWithChipEast) {
      GameEngineChipMoves.checkMovesWest(
        foundSquareWithChipEast.activeChip,
        GameEngineChipMoves.findSquare(squares, chip)
      );

      console.log("Chip to the east: ");
      console.log(foundSquareWithChipEast.activeChip);
    }

    // Check valid moves for the nearest chip in the south
    if (foundSquareWithChipSouth) {
      GameEngineChipMoves.checkMovesNorth(
        foundSquareWithChipSouth.activeChip,
        GameEngineChipMoves.findSquare(squares, chip)
      );

      console.log("Chip to the south: ");
      console.log(foundSquareWithChipSouth.activeChip);
    }

    // Check valid moves for the nearest chip in the west
    if (foundSquareWithChipWest) {
      GameEngineChipMoves.checkMovesEast(
        foundSquareWithChipWest.activeChip,
        GameEngineChipMoves.findSquare(squares, chip)
      );

      console.log("Chip to the west: ");
      console.log(foundSquareWithChipWest.activeChip);
    }

    console.log("Valid moves for played chip ");
    console.log(possibleMoves);

    return possibleMoves;
  }
  /**
   * finds square object matching chip's coordinates
   * @param  {array} squares - array of game squares
   * @param  {Chip} chip 		 - chip played on the board
   * @return {Square} 			 - square on the board
   */
  static findSquare(squares, chip) {
    if (chip && squares && squares.length > 0) {
      return squares.find(square => {
        if (
          square.xCoordinate === chip.xPosition() &&
          square.yCoordinate === chip.yPosition() &&
          square.activeChip === chip
        ) {
          return true;
        }
        return undefined;
      });
    }
    return undefined;
  }

  /**
   * Check if there is a chip in the way, for the North position
   * @param  {Chip} chipToBeChecked     - chip to be check for valid move for the north position
   * @param  {square} squareWithChip 		- nearest square with a chip in the north position
   */
  static checkMovesNorth(chipToBeChecked, squareWithChip) {
    const chip = chipToBeChecked;
    if (squareWithChip) {
      const foundChip = squareWithChip.activeChip;

      // if the found chip is on the way for the played chip
      if (chip.yPosition() - chip.value < foundChip.yPosition()) {
        chip.validMoves[0] = null;
      }

      // if the found chip is exactly where the played chip can go
      if (chip.yPosition() - chip.value === foundChip.yPosition() && squareWithChip.bottomChip) {
        chip.validMoves[0] = null;
      }
    }
  }

  /**
   * Check if there is a chip in the way, for the East position
   * @param  {Chip} chipToBeChecked     - chip to be check for valid move for the east position
   * @param  {square} squareWithChip 		- nearest square with a chip in the east position
   */
  static checkMovesEast(chipToBeChecked, squareWithChip) {
    const chip = chipToBeChecked;
    if (squareWithChip) {
      const foundChip = squareWithChip.activeChip;

      // if the found chip is on the way for the played chip
      if (chip.xPosition() + chip.value > foundChip.xPosition()) {
        chip.validMoves[1] = null;
      }

      // if the found chip is exactly where the played chip can go
      if (chip.xPosition() + chip.value === foundChip.xPosition() && squareWithChip.bottomChip) {
        chip.validMoves[1] = null;
      }
    }
  }

  /**
   * Check if there is a chip in the way, for the South position
   * @param  {Chip} chipToBeChecked     - chip to be check for valid move for the south position
   * @param  {square} squareWithChip 		- nearest square with a chip in the south position
   */
  static checkMovesSouth(chipToBeChecked, squareWithChip) {
    const chip = chipToBeChecked;
    if (squareWithChip) {
      const foundChip = squareWithChip.activeChip;

      // if the found chip is on the way for the played chip
      if (chip.yPosition() + chip.value > foundChip.yPosition()) {
        chip.validMoves[2] = null;
      }

      // if the found chip is exactly where the played chip can go
      if (chip.yPosition() + chip.value === foundChip.yPosition() && squareWithChip.bottomChip) {
        chip.validMoves[2] = null;
      }
    }
  }

  /**
   * Check if there is a chip in the way, for the West position
   * @param  {Chip} chipToBeChecked     - chip to be check for valid move for the west position
   * @param  {square} squareWithChip 		- nearest square with a chip in the west position
   */
  static checkMovesWest(chipToBeChecked, squareWithChip) {
    const chip = chipToBeChecked;
    if (squareWithChip) {
      const foundChip = squareWithChip.activeChip;

      // if the found chip is on the way for the played chip
      if (chip.xPosition() - chip.value < foundChip.xPosition()) {
        chip.validMoves[3] = null;
      }

      // if the found chip is exactly where the played chip can go
      if (chip.xPosition() - chip.value === foundChip.xPosition() && squareWithChip.bottomChip) {
        chip.validMoves[3] = null;
      }
    }
  }

  /**
   * Check if move is within the board limits.
   * @param  {chip} chip - the played chip
   * @return {array}     - the possible moves within the board limists [N, E, S, W]
   */
  static checkMovesWithinBoard(chip) {
    // Postions for [N, E, S, W]
    const northPosition = [chip.xPosition(), chip.yPosition() - chip.value];
    const eastPosition = [chip.xPosition() + chip.value, chip.yPosition()];
    const southPosition = [chip.xPosition(), chip.yPosition() + chip.value];
    const westPosition = [chip.xPosition() - chip.value, chip.yPosition()];

    const possibleMoves = [northPosition, eastPosition, southPosition, westPosition];

    for (let i = 0; i < possibleMoves.length; i += 1) {
      const [xPosition, yPostion] = possibleMoves[i];

      if (xPosition <= 0 || xPosition > globals.gameBoardWidth || yPostion <= 0 || yPostion > globals.gameBoardHeight) {
        possibleMoves[i] = null;
      }
    }

    return possibleMoves;
  }

  /**
   * Find the nearest square containing a chip in north direction from the played chip
   * @param  {array} squares - the array of squares on the board
   * @param  {Chip} chip     - the played chip
   * @return {square}        - the square containing the chip, undefined if there was no chip in the north direction
   */
  static findNearestChipNorth(squares, chip) {
    const maxChipValue = 6;
    let foundSquare;
    if (!chip) return undefined;
    for (let counter = 1; counter <= maxChipValue; counter += 1) {
      foundSquare = squares.find(square => {
        if (
          square.xCoordinate === chip.xPosition() &&
          square.yCoordinate === chip.yPosition() - counter &&
          square.activeChip
        ) {
          return true;
        }
        return false;
      });
      if (foundSquare && foundSquare.activeChip) break;
    }
    return foundSquare;
  }

  /**
   * Find the nearest square containing a chip in east direction from the played chip
   * @param  {array} squares - the array of squares on the board
   * @param  {Chip} chip     - the played chip
   * @return {square}        - the square containing the chip, null if there was no chip in the east direction
   */
  static findNearestChipEast(squares, chip) {
    const maxChipValue = 6;
    let foundSquare = null;
    for (let i = 1; i <= maxChipValue; i += 1) {
      foundSquare = squares.find(square => {
        if (
          square.xCoordinate === chip.xPosition() + i &&
          square.yCoordinate === chip.yPosition() &&
          square.activeChip
        ) {
          return true;
        }

        return false;
      });
      if (foundSquare && foundSquare.activeChip) break;
    }
    return foundSquare;
  }

  /**
   * Find the nearest square containing a chip in south direction from the played chip
   * @param  {array} squares - the array of squares on the board
   * @param  {Chip} chip     - the played chip
   * @return {square}        - the square containing the chip, null if there was no chip in the south direction
   */
  static findNearestChipSouth(squares, chip) {
    const maxChipValue = 6;
    let foundSquare = null;
    for (let i = 1; i <= maxChipValue; i += 1) {
      foundSquare = squares.find(square => {
        if (
          square.xCoordinate === chip.xPosition() &&
          square.yCoordinate === chip.yPosition() + i &&
          square.activeChip
        ) {
          return true;
        }

        return false;
      });
      if (foundSquare && foundSquare.activeChip) break;
    }
    return foundSquare;
  }

  /**
   * Find the nearest square containing a chip in west direction from the played chip
   * @param  {array} squares - the array of squares on the board
   * @param  {Chip} chip     - the played chip
   * @return {square}        - the square containing the chip, null if there was no chip in the west direction
   */
  static findNearestChipWest(squares, chip) {
    const maxChipValue = 6;
    let foundSquare = null;
    for (let i = 1; i <= maxChipValue; i += 1) {
      foundSquare = squares.find(square => {
        if (
          square.xCoordinate === chip.xPosition() - i &&
          square.yCoordinate === chip.yPosition() &&
          square.activeChip
        ) {
          return true;
        }

        return false;
      });
      if (foundSquare && foundSquare.activeChip) break;
    }
    return foundSquare;
  }
}
