class Player {

	constructor(colour, startingPosition){
		this.colour = colour;
		this.startingPosition = startingPosition;
		this.tileSupply = [8,8,8];
	}

	getRandomTile(){
		if(this.tileSupply[0] + this.tileSupply[1] + this.tileSupply[2] === 0){
			return -1;
		}

		var tile = Math.floor(Math.random() * Math.floor(3));

		if(this.tileSupply[tile] != 0){
			this.tileSupply[tile]--;
		} else {
			tile = this.getRandomTile();
		}

		return tile;
	}

}