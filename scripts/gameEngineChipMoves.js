export default class GameEngineChipMoves {
  /**
   * Find the legal moves in the board for a played chip
   * @param  {Board} board   - the game board
   * @param  {array} squares - the array of squares in the board
   * @param  {Chip} chip     - the played chip
   * @return {array}         - the possible moves in the 4 directions in the board [N, E, S, W]
   */
  static findLegalMoves(board, squares, playedChip) {
    const chip = playedChip;
    let possibleMoves = GameEngineChipMoves.checkMovesWithinBoard(board, chip);
    chip.validMoves = possibleMoves;

    const foundSquareWithChipNorth = GameEngineChipMoves.findNearestChip(squares, chip, "North");
    const foundSquareWithChipEast = GameEngineChipMoves.findNearestChip(squares, chip, "East");
    const foundSquareWithChipSouth = GameEngineChipMoves.findNearestChip(squares, chip, "South");
    const foundSquareWithChipWest = GameEngineChipMoves.findNearestChip(squares, chip, "West");

    // Check is there is a chip in the way
    possibleMoves = GameEngineChipMoves.checkMoves(chip, foundSquareWithChipNorth);
    possibleMoves = GameEngineChipMoves.checkMoves(chip, foundSquareWithChipEast);
    possibleMoves = GameEngineChipMoves.checkMoves(chip, foundSquareWithChipSouth);
    possibleMoves = GameEngineChipMoves.checkMoves(chip, foundSquareWithChipWest);

    // Check valid moves for the nearest chip in the north
    if (foundSquareWithChipNorth) {
      GameEngineChipMoves.checkMoves(
        foundSquareWithChipNorth.activeChip,
        GameEngineChipMoves.findSquare(squares, chip)
      );
    }

    // Check valid moves for the nearest chip in the east
    if (foundSquareWithChipEast) {
      GameEngineChipMoves.checkMoves(foundSquareWithChipEast.activeChip, GameEngineChipMoves.findSquare(squares, chip));
    }

    // Check valid moves for the nearest chip in the south
    if (foundSquareWithChipSouth) {
      GameEngineChipMoves.checkMoves(
        foundSquareWithChipSouth.activeChip,
        GameEngineChipMoves.findSquare(squares, chip)
      );
    }

    // Check valid moves for the nearest chip in the west
    if (foundSquareWithChipWest) {
      GameEngineChipMoves.checkMoves(foundSquareWithChipWest.activeChip, GameEngineChipMoves.findSquare(squares, chip));
    }

    return possibleMoves;
  }

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
        return false;
      });
    }
    return undefined;
  }

  /**
   * Check if there is a chip in the way in the given direction
   * @param  {Chip} chipToBeChecked     - chip to be check for valid move for the north position
   * @param  {square} squareWithChip 		- nearest square with a chip in the north position
   * @return {array}                    - possible moves for the chip [N, E, S, W]
   *
   */
  static checkMoves(chipToBeChecked, squareWithChip) {
    if (!chipToBeChecked) return undefined;
    const chip = chipToBeChecked;
    const possibleMoves = chip.validMoves;
    if (squareWithChip) {
      const foundChip = squareWithChip.activeChip;

      // for North and South positions

      if (chip.xPosition() === foundChip.xPosition()) {
        if (chip.yPosition() > foundChip.yPosition()) {
          if (
            chip.yPosition() - chip.value < foundChip.yPosition() ||
            (chip.yPosition() - chip.value === foundChip.yPosition() && squareWithChip.bottomChip)
          ) {
            possibleMoves[0] = null;
          }
        } else if (
          chip.yPosition() + chip.value > foundChip.yPosition() ||
          (chip.yPosition() + chip.value === foundChip.yPosition() && squareWithChip.bottomChip)
        ) {
          possibleMoves[2] = null;
        }
      }
      // for East and West postions
      if (chip.yPosition() === foundChip.yPosition()) {
        if (chip.xPosition() < foundChip.xPosition()) {
          if (
            chip.xPosition() + chip.value > foundChip.xPosition() ||
            (chip.xPosition() + chip.value === foundChip.xPosition() && squareWithChip.bottomChip)
          ) {
            possibleMoves[1] = null;
          }
        } else if (
          chip.xPosition() - chip.value < foundChip.xPosition() ||
          (chip.xPosition() - chip.value === foundChip.xPosition() && squareWithChip.bottomChip)
        ) {
          possibleMoves[3] = null;
        }
      }
    }
    return possibleMoves;
  }

  /**
   * Check if move is within the board limits.
   * @param  {Board} board - the game board
   * @param  {Chip}  chip  - the played chip
   * @return {array}       - the possible moves within the board limists [N, E, S, W]
   */
  static checkMovesWithinBoard(board, chip) {
    if (!chip || !board) return undefined;
    // Postions for [N, E, S, W]
    const northPosition = [chip.xPosition(), chip.yPosition() - chip.value];
    const eastPosition = [chip.xPosition() + chip.value, chip.yPosition()];
    const southPosition = [chip.xPosition(), chip.yPosition() + chip.value];
    const westPosition = [chip.xPosition() - chip.value, chip.yPosition()];

    const possibleMoves = [northPosition, eastPosition, southPosition, westPosition];

    for (let i = 0; i < possibleMoves.length; i += 1) {
      const [xPosition, yPostion] = possibleMoves[i];
      if (xPosition <= 0 || xPosition > board.getBoardWidth() || yPostion <= 0 || yPostion > board.getBoardHeight()) {
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
