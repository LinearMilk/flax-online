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
    const possibleMoves = GameEngineChipMoves.checkMovesWithinBoard(
      chip,
      globals.gameBoardWidth,
      globals.gameBoardHeight
    );
    chip.validMoves = possibleMoves;

    const foundSquareWithChipNorth = GameEngineChipMoves.findNearestChip(squares, chip, "North");
    const foundSquareWithChipEast = GameEngineChipMoves.findNearestChip(squares, chip, "East");
    const foundSquareWithChipSouth = GameEngineChipMoves.findNearestChip(squares, chip, "South");
    const foundSquareWithChipWest = GameEngineChipMoves.findNearestChip(squares, chip, "West");

    // Check if there is a chip on the board closer than played chip's value
    chip.validMoves = GameEngineChipMoves.checkMovesNorth(chip, foundSquareWithChipNorth);
    chip.validMoves = GameEngineChipMoves.checkMovesEast(chip, foundSquareWithChipEast);
    chip.validMoves = GameEngineChipMoves.checkMovesSouth(chip, foundSquareWithChipSouth);
    chip.validMoves = GameEngineChipMoves.checkMovesWest(chip, foundSquareWithChipWest);

    // Check valid moves for the nearest chip north of the played chip
    if (foundSquareWithChipNorth) {
      GameEngineChipMoves.checkMovesSouth(
        foundSquareWithChipNorth.activeChip,
        GameEngineChipMoves.findSquare(squares, chip)
      );

      console.log("Chip to the north: ");
      console.log(foundSquareWithChipNorth.activeChip);
    }

    // Check valid moves for the nearest chip west of the played chip
    if (foundSquareWithChipEast) {
      GameEngineChipMoves.checkMovesWest(
        foundSquareWithChipEast.activeChip,
        GameEngineChipMoves.findSquare(squares, chip)
      );

      console.log("Chip to the east: ");
      console.log(foundSquareWithChipEast.activeChip);
    }

    // Check valid moves for the nearest chip south of the played chip
    if (foundSquareWithChipSouth) {
      GameEngineChipMoves.checkMovesNorth(
        foundSquareWithChipSouth.activeChip,
        GameEngineChipMoves.findSquare(squares, chip)
      );

      console.log("Chip to the south: ");
      console.log(foundSquareWithChipSouth.activeChip);
    }

    // Check valid moves for the nearest chip east of the played chip
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
   * Check if a chip on board is blocking the move in North direction
   * @param  {Chip} chipToBeChecked     - chip to be checked for valid move for the north position
   * @param  {square} squareWithChip 		- nearest square with a chip in the north position
   * @return {array}                    - array containing possible moves
   */
  static checkMovesNorth(chipToBeChecked, squareWithChip) {
    const chip = chipToBeChecked;
    if (!chip || !squareWithChip) return undefined;
    const possibleMoves = chip.validMoves;
    if (squareWithChip) {
      const foundChip = squareWithChip.activeChip;

      // if the found chip is on the way for the played chip
      if (chip.yPosition() - chip.value < foundChip.yPosition()) {
        possibleMoves[0] = null;
      }

      // if the found chip is exactly where the played chip can go
      if (chip.yPosition() - chip.value === foundChip.yPosition() && squareWithChip.bottomChip) {
        possibleMoves[0] = null;
      }
    }
    return possibleMoves;
  }

  /**
   * Check if there is a chip in the way, for the East position
   * @param  {Chip} chipToBeChecked     - chip to be checked for valid move for the east position
   * @param  {square} squareWithChip 		- nearest square with a chip in the east position
   * @return {array}                    - array containing possible moves
   */
  static checkMovesEast(chipToBeChecked, squareWithChip) {
    const chip = chipToBeChecked;
    const possibleMoves = chip.validMoves;
    if (squareWithChip) {
      const foundChip = squareWithChip.activeChip;

      // if the found chip is on the way for the played chip
      if (chip.xPosition() + chip.value > foundChip.xPosition()) {
        possibleMoves[1] = null;
      }

      // if the found chip is exactly where the played chip can go
      if (chip.xPosition() + chip.value === foundChip.xPosition() && squareWithChip.bottomChip) {
        possibleMoves[1] = null;
      }
    }
    return possibleMoves;
  }

  /**
   * Check if there is a chip in the way, for the South position
   * @param  {Chip} chipToBeChecked     - chip to be checked for valid move for the south position
   * @param  {square} squareWithChip 		- nearest square with a chip in the south position
   * @return {array}                    - array containing possible moves
   */
  static checkMovesSouth(chipToBeChecked, squareWithChip) {
    const chip = chipToBeChecked;
    const possibleMoves = chip.validMoves;
    if (squareWithChip) {
      const foundChip = squareWithChip.activeChip;

      // if the found chip is on the way for the played chip
      if (chip.yPosition() + chip.value > foundChip.yPosition()) {
        possibleMoves[2] = null;
      }

      // if the found chip is exactly where the played chip can go
      if (chip.yPosition() + chip.value === foundChip.yPosition() && squareWithChip.bottomChip) {
        possibleMoves[2] = null;
      }
    }
    return possibleMoves;
  }

  /**
   * Check if there is a chip in the way, for the West position
   * @param  {Chip} chipToBeChecked     - chip to be checked for valid move for the west position
   * @param  {square} squareWithChip 		- nearest square with a chip in the west position
   * @return {array}                    - array containing possible moves
   */
  static checkMovesWest(chipToBeChecked, squareWithChip) {
    const chip = chipToBeChecked;
    const possibleMoves = chip.validMoves;
    if (squareWithChip) {
      const foundChip = squareWithChip.activeChip;

      // if the found chip is on the way for the played chip
      if (chip.xPosition() - chip.value < foundChip.xPosition()) {
        possibleMoves[3] = null;
      }

      // if the found chip is exactly where the played chip can go
      if (chip.xPosition() - chip.value === foundChip.xPosition() && squareWithChip.bottomChip) {
        possibleMoves[3] = null;
      }
    }
    return possibleMoves;
  }

  /**
   * Check if move is within the board limits.
   * @param  {Chip} chip           - the played chip
   * @param  {int} gameBoardWidth  - width of the gamebord (in squares)
   * @param  {int} gameBoardHeight - heigth of the gamebord (in squares)
   * @return {array}               - the possible moves within the board limits [N, E, S, W]
   */
  static checkMovesWithinBoard(chip, gameBoardWidth, gameBoardHeight) {
    // Postions for [N, E, S, W]

    if (!chip || gameBoardWidth < 1 || gameBoardHeight < 1) return undefined;

    const northPosition = [chip.xPosition(), chip.yPosition() - chip.value];
    const eastPosition = [chip.xPosition() + chip.value, chip.yPosition()];
    const southPosition = [chip.xPosition(), chip.yPosition() + chip.value];
    const westPosition = [chip.xPosition() - chip.value, chip.yPosition()];

    const possibleMoves = [northPosition, eastPosition, southPosition, westPosition];

    for (let i = 0; i < possibleMoves.length; i += 1) {
      const [xPosition, yPostion] = possibleMoves[i];

      if (xPosition <= 0 || xPosition > gameBoardWidth || yPostion <= 0 || yPostion > gameBoardHeight) {
        possibleMoves[i] = null;
      }
    }

    return possibleMoves;
  }

  /**
   * finds nearest square with chip within placed chip's range (value), in one of the cardinal directions
   *
   * @param  {array} squares    - array containing squares of the board
   * @param  {chip} chip        - chip being placed
   * @param  {string} direction - direction to be checked: "North","East","South","West"
   * @return {square}           - the square containing the chip, undefined if there was no chip
   */
  static findNearestChip(squares, chip, direction) {
    const maxChipValue = 6;
    let foundSquare;
    if (!chip || !squares || squares.length === 0 || !direction) return undefined;
    for (let counter = 1; counter <= maxChipValue; counter += 1) {
      foundSquare = squares.find(square => {
        if (square.activeChip) {
          switch (direction) {
            case "North":
              if (square.xCoordinate === chip.xPosition() && square.yCoordinate === chip.yPosition() - counter) {
                return true;
              }
              break;
            case "East":
              if (square.xCoordinate === chip.xPosition() + counter && square.yCoordinate === chip.yPosition()) {
                return true;
              }
              break;
            case "South":
              if (square.xCoordinate === chip.xPosition() && square.yCoordinate === chip.yPosition() + counter) {
                return true;
              }
              break;
            case "West":
              if (square.xCoordinate === chip.xPosition() - counter && square.yCoordinate === chip.yPosition()) {
                return true;
              }
              break;
            default:
              return false;
          }
        }
        return false;
      });
      if (foundSquare && foundSquare.activeChip) break;
    }
    return foundSquare;
  }
}
