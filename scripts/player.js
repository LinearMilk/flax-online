class Player {

	constructor(colour, startingPosition){
		this.colour = colour;
		this.startingPosition = startingPosition;
		this.chipSupply = [8,8,8];
		this.chipsOnBoard = [];
	}

	getColour(){
		return this.colour;
	}

	playChip(x, y, chipValue) {
		var newChip = new Chip(this.colour, chipValue, [x, y]);
		this.chipsOnBoard.push(newChip);
		// TODO
		// draw chip on board

		return newChip;
	}

	getLastChip(){
		return this.chipsOnBoard[this.chipsOnBoard.length - 1];
	}

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

		return this.getRandomChipOptions(chip);
	}

	getRandomChipOptions(chip){
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
