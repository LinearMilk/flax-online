class Board {
	constructor(dimensions, numPlayers, rooms, startingPositions){
		this.boardDimensions = dimensions;
		this.numPlayers = numPlayers;
		this.rooms = rooms;
		this.startingPositions = startingPositions;
	}

	getBoardWidth(){
		return this.boardDimensions[0];
	}

	getBoardHeight(){
		return this.boardDimensions[1];
	}

	getNumPlayers(){
		return this.numPlayers;
	}

	getRooms(){
		return this.rooms;
	}

	getStartingPositions(){
		return this.startingPositions;
	}
}