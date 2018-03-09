const canvasId = "game-canvas";
const gameBoardHeight = 9;
const squareSize = 46;
const gameBoardFrameSize = 10;

const squareBorderSize = 1;
const gameBoardWidth = 13;

const playerColours = ["#f9cb32","#90b531","#ed4630","#dc6fe6"];

const startingPosition = [1,9];
const startingColour = playerColours[3];

let xClick = -1;
let yClick = -1;

const game = new Game();


function startGame(){
	game.startGame();
}

function getChip(){
	game.getChip();
}
