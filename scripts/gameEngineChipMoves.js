import * as globals from "./globals";

export default class GameEngineChipMoves {
	/**
	 * Find the legal moves in the board for a played chip
	 * @param  {array} squares - the array of squares in the board
	 * @param  {Chip} chip     - the played chip
	 * @return {array}         - the possible moves in the 4 directions in the board [N, E, S, W]
	 */
	static findLegalMoves(squares, chip) {
		const possibleMoves = GameEngineChipMoves.checkMovesWithinBoard(chip);

		// Check is there is a chip in the way
		possibleMoves[0] = GameEngineChipMoves.checkMovesNorth(squares, chip, possibleMoves);
		possibleMoves[1] = GameEngineChipMoves.checkMovesEast(squares, chip, possibleMoves);
		possibleMoves[2] = GameEngineChipMoves.checkMovesSouth(squares, chip, possibleMoves);
		possibleMoves[3] = GameEngineChipMoves.checkMovesWest(squares, chip, possibleMoves);

		return possibleMoves;
	}

	/**
	 * Check if there is a chip in the way, for the North position
	 * @param  {chip} chip           - the played chip
	 * @param  {array} possibleMoves - the array of possible moves in the 4 directions
	 * @return {array}               - null if the move is not valid
	 */
	static checkMovesNorth(squares, chip, possibleMoves) {
		const foundSquareWithChip = GameEngineChipMoves.findNearestChipsNorth(squares, chip);
		if (foundSquareWithChip) {
			const foundChip = foundSquareWithChip.activeChip;

			// if the found chip is on the way for the played chip
			if (chip.yPosition() - chip.value < foundChip.yPosition()) {
				return null;
			}

			// if the found chip is exactly where the played chip can go
			if (chip.yPosition() - chip.value === foundChip.yPosition() && foundSquareWithChip.bottomChip) {
				return null;
			}
		}

		return possibleMoves[0];
	}

	/**
	 * Check if there is a chip in the way, for the East position
	 * @param  {chip} chip           - the played chip
	 * @param  {array} possibleMoves - the array of possible moves in the 4 directions
	 * @return {array}               - null if the move is not valid
	 */
	static checkMovesEast(squares, chip, possibleMoves) {
		const foundSquareWithChip = GameEngineChipMoves.findNearestChipsEast(squares, chip);
		if (foundSquareWithChip) {
			const foundChip = foundSquareWithChip.activeChip;

			// if the found chip is on the way for the played chip
			if (chip.xPosition() + chip.value > foundChip.xPosition()) {
				return null;
			}

			// if the found chip is exactly where the played chip can go
			if (chip.xPosition() + chip.value === foundChip.xPosition() && foundSquareWithChip.bottomChip) {
				return null;
			}
		}
		return possibleMoves[1];
	}

	/**
	 * Check if there is a chip in the way, for the South position
	 * @param  {chip} chip           - the played chip
	 * @param  {array} possibleMoves - the array of possible moves in the 4 directions
	 * @return {array}               - null if the move is not valid
	 */
	static checkMovesSouth(squares, chip, possibleMoves) {
		const foundSquareWithChip = GameEngineChipMoves.findNearestChipsSouth(squares, chip);
		if (foundSquareWithChip) {
			const foundChip = foundSquareWithChip.activeChip;

			// if the found chip is on the way for the played chip
			if (chip.yPosition() + chip.value > foundChip.yPosition()) {
				return null;
			}

			// if the found chip is exactly where the played chip can go
			if (chip.yPosition() + chip.value === foundChip.yPosition() && foundSquareWithChip.bottomChip) {
				return null;
			}
		}

		return possibleMoves[2];
	}

	/**
	 * Check if there is a chip in the way, for the West position
	 * @param  {chip} chip           - the played chip
	 * @param  {array} possibleMoves - the array of possible moves in the 4 directions
	 * @return {array}               - null if the move is not valid
	 */
	static checkMovesWest(squares, chip, possibleMoves) {
		const foundSquareWithChip = GameEngineChipMoves.findNearestChipsWest(squares, chip);
		if (foundSquareWithChip) {
			const foundChip = foundSquareWithChip.activeChip;

			// if the found chip is on the way for the played chip
			if (chip.xPosition() - chip.value < foundChip.xPosition()) {
				return null;
			}

			// if the found chip is exactly where the played chip can go
			if (chip.xPosition() - chip.value === foundChip.xPosition() && foundSquareWithChip.bottomChip) {
				return null;
			}
		}
		return possibleMoves[3];
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
	 * @return {square}        - the square containing the chip, null if there was no chip in the north direction
	 */
	static findNearestChipsNorth(squares, chip) {
		const maxChipValue = 6;
		let foundSquare = null;
		for (let i = 1; i <= maxChipValue; i += 1) {
			foundSquare = squares.find(square => {
				if (
					square.xCoordinate === chip.xPosition() &&
					square.yCoordinate === chip.yPosition() - i &&
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
	static findNearestChipsEast(squares, chip) {
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
	static findNearestChipsSouth(squares, chip) {
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
	static findNearestChipsWest(squares, chip) {
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
