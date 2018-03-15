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

		console.log(possibleMoves);
		return possibleMoves;
	}

	/**
	 * Check if there is a chip in the way, for the North position
	 * @param  {chip} chip           - the played chip
	 * @param  {array} possibleMoves - the array of possible moves in the 4 directions
	 * @return {array}               - null if the move is not valid
	 */
	static checkMovesNorth(squares, chip, possibleMoves) {
		if (possibleMoves[0]) {
			for (let i = 1; i <= chip.value; i += 1) {
				const foundSquare = squares.find(square => {
					if (square.xCoordinate === chip.xPosition() && square.yCoordinate === chip.yPosition() - i) {
						return true;
					}

					return false;
				});

				// TODO trigger the chip found to check if has still valid moves on south

				if (i === chip.value && foundSquare.bottomChip) {
					return null;
				}

				if (foundSquare.activeChip && i !== chip.value) {
					return null;
				}
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
		if (possibleMoves[1]) {
			for (let i = 1; i <= chip.value; i += 1) {
				const foundSquare = squares.find(square => {
					if (square.xCoordinate === chip.xPosition() + i && square.yCoordinate === chip.yPosition()) {
						return true;
					}

					return false;
				});

				// TODO trigger the chip found to check if has still valid moves on west

				if (i === chip.value && foundSquare.bottomChip) {
					return null;
				}

				if (foundSquare.activeChip && i !== chip.value) {
					return null;
				}
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
		if (possibleMoves[2]) {
			for (let i = 1; i <= chip.value; i += 1) {
				const foundSquare = squares.find(square => {
					if (square.xCoordinate === chip.xPosition() && square.yCoordinate === chip.yPosition() + i) {
						return true;
					}

					return false;
				});

				// TODO trigger the chip found to check if has still valid moves on north

				if (i === chip.value && foundSquare.bottomChip) {
					return null;
				}

				if (foundSquare.activeChip && i !== chip.value) {
					return null;
				}
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
		if (possibleMoves[3]) {
			for (let i = 1; i <= chip.value; i += 1) {
				const foundSquare = squares.find(square => {
					if (square.xCoordinate === chip.xPosition() - i && square.yCoordinate === chip.yPosition()) {
						return true;
					}

					return false;
				});

				// TODO trigger the chip found to check if has still valid moves on west

				if (i === chip.value && foundSquare.bottomChip) {
					return null;
				}

				if (foundSquare.activeChip && i !== chip.value) {
					return null;
				}
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
}
