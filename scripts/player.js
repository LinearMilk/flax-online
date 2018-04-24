import Chip from "./chip";

export default class Player {
  /**
   * Create a Player with a given colour and starting position. Generates the chip supply.
   * @param  {string} colour           - colour code for the player
   * @param  {array}  startingPosition - [x, y] relative position for the starting chip
   *
   * Ex: Player('#000000', [1,9])
   * Creates a player with colour black and starting position on column 1, row 9.
   */
  constructor(colour, startingPosition) {
    this.colour = colour;
    this.startingPosition = startingPosition;
    this.chipSupply = [5, 1, 1];
    this.chipsOnBoard = [];
    this.availableMoves = [startingPosition];
    this.isActive = false;
    this.name = "";
  }

  /**
   * Sets player's name
   * @param {string} name - player's name
   */
  setName(name) {
    this.name = name;
  }
  /**
   * Set this player as active/inactive
   * @param {boolean} isActive - true if player is active (playing), false it it's not
   */
  setIsActive(isActive) {
    this.isActive = isActive;
  }

  /**
   * Get the player's chips placed on board
   * @return {array} array of chips on board
   */
  getChipsOnBoard() {
    return this.chipsOnBoard;
  }

  /**
   * Get the player's colour
   * @return {string} the player's colour
   */
  getColour() {
    return this.colour;
  }

  /**
   * Get the player's available moves on the board
   * @return {array} the available moves for that player
   */
  getAvailableMoves() {
    return this.availableMoves;
  }

  /**
   * Get the player's starting position on the board
   * @return {array} the players [x, y] stating position
   */
  getStartingPosition() {
    return this.startingPosition;
  }

  /**
   * Get the number of chips left in the player's chip supply
   * @return {number} available chips to play
   */
  getChipCount() {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return this.chipSupply.reduce(reducer);
  }

  /**
   * Play the Chip on the given coordenates. Generates the chip object.
   * @param  {number} x         - x relative position of chip (column number)
   * @param  {number} y         - y relative position of chip (row number)
   * @param  {number} chipValue - chip value, from 1 to 6
   * @return {Chip}           new chip object
   */
  playChip(x, y, chipValue) {
    const newChip = new Chip(this.colour, chipValue, [x, y]);
    this.chipsOnBoard.push(newChip);
    return newChip;
  }

  /**
   * Get last Chip played
   * @return {Chip} last chip object played for this player
   */
  getLastChip() {
    return this.chipsOnBoard[this.chipsOnBoard.length - 1];
  }

  /**
   * Get a random chip from the chip supply.
   * There are 3 different chip types in the supply, 8 of each kind.
   *
   * @return {array} the chip value options from the chip supply [1,6], [2,5] or [3,4]
   */
  getRandomChipType() {
    const totalChips = this.chipSupply[0] + this.chipSupply[1] + this.chipSupply[2];
    if (totalChips === 0) {
      return [];
    }
    const typeOneSixChipChance = this.chipSupply[0] / totalChips;
    const typeTwoFiveChance = this.chipSupply[1] / totalChips;
    let chipType;
    let randomNumber;
    do {
      randomNumber = Math.random();
    } while (randomNumber === 0);
    if (randomNumber <= typeOneSixChipChance) {
      chipType = 0;
    } else if (randomNumber <= typeOneSixChipChance + typeTwoFiveChance) {
      chipType = 1;
    } else {
      chipType = 2;
    }
    this.chipSupply[chipType] -= 1;
    return Player.getRandomChipOptions(chipType);
  }

  /**
   * Get the chip type based on the option selected.
   * @param  {number} chipType - the option between 0, 1 and 2 of the chip type
   * @return {array}             the chip value options from the chip supply [1,6], [2,5] or [3,4]
   */
  static getRandomChipOptions(chipType) {
    switch (chipType) {
      case 0:
        return [1, 6];
      case 1:
        return [2, 5];
      case 2:
        return [3, 4];
      default:
        return null;
    }
  }
}
