class Chip {
	constructor(colour, value, position){
		this.colour = colour;
		this.value = value;
		this.position = position;
		this.validMoves = [];
	}

	xPosition(){
		return this.position[0];
	}

	yPosition(){
		return this.position[1];
	}


}