class Player {

	constructor(colour, startingPosition){
		this.colour = colour;
		this.startingPosition = startingPosition;
		this.tileSupply = [8,8,8];
	}

	getColour(){
		return this.colour;
	}

	getRandomTile(){
		if(this.tileSupply[0] + this.tileSupply[1] + this.tileSupply[2] === 0){
			return [];
		}

		var tile = Math.floor(Math.random() * Math.floor(3));

		if(this.tileSupply[tile] != 0){
			this.tileSupply[tile]--;
		} else {
			tile = this.getRandomTile();
		}

		return this.getRandomTileOptions(tile);
	}

	getRandomTileOptions(tile){
		switch(tile){
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