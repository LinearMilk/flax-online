class Player {
	/**
	 * Create a Player with a given colour and starting position. Generates the chip supply.
	 * @param  {string} colour           - colour code for the player
	 * @param  {array}  startingPosition - [x, y] relative position for the starting chip
	 *
	 * Ex: Player('#000000', [1,9])
	 * Creates a player with colour black and starting position on column 1, row 9.
	 */
	constructor(colour, startingPosition){
		this.colour = colour;
		this.startingPosition = startingPosition;
		this.chipSupply = [8,8,8];
		this.chipsOnBoard = [];
	}

	/**
	 * Get the player's colour
	 * @return {string} the player's colour
	 */
	getColour(){
		return this.colour;
	}

	/**
	 * Play the Chip on the given coordenates.
	 * Generates the chip object and draws it on the board.
	 * @param  {number} x         - x relative position of chip (column number)
	 * @param  {number} y         - y relative position of chip (row number)
	 * @param  {number} chipValue - chip value, from 1 to 6
	 * @return {Chip}           new chip object
	 */
	playChip(x, y, chipValue) {
		var newChip = new Chip(this.colour, chipValue, [x, y]);
		this.chipsOnBoard.push(newChip);
		// TODO
		// draw chip on board

		return newChip;
	}

	/**
	 * Get last Chip played
	 * @return {Chip} lst chip object played for this player
	 */
	getLastChip(){
		return this.chipsOnBoard[this.chipsOnBoard.length - 1];
	}

	/**
	 * Get a random chip from the chip supply.
	 * There are 3 different chip types in the supply, 8 of each kind.
	 * 
	 * @return {array} the chip value options from the chip supply [1,6], [2,5] or [3,4]
	 */
	getRandomChipType(){
		if(this.chipSupply[0] + this.chipSupply[1] + this.chipSupply[2] === 0){
			return [];
		}

		var chip = Math.floor(Math.random() * Math.floor(3));

		if(this.chipSupply[chip] != 0){
			this.chipSupply[chip]--;
		} else {
			chip = this.getRandomChipType();
		}

		return this._getRandomChipOptions(chip);
	}


	_getRandomChipOptions(chip){
		switch(chip){
			case 0:
				return [1,6];
				break;
			case 1:
				return [2,5];
				break;
			case 2:
				return [3,4];
				break;
			default:
				break;
		}
	}
}
