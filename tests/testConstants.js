import Chip from "../scripts/chip";

const chipOne = new Chip("white", 1, [1, 1]);
const chipTwo = new Chip("white", 1, [2, 1]);
const chipThree = new Chip("white", 1, [2, 2]);
const chipFour = new Chip("white", 4, [3, 3]);
const chipFive = new Chip("white", 4, [5, 6]);

const squares = [
  {
    xCoordinate: 1,
    yCoordinate: 1,
    roomNumber: 0,
    activeChip: null,
    bottomChip: null,
    startingTile: ""
  },
  {
    xCoordinate: 1,
    yCoordinate: 2,
    roomNumber: 0,
    activeChip: null,
    bottomChip: null,
    startingTile: ""
  },
  {
    xCoordinate: 2,
    yCoordinate: 1,
    roomNumber: 0,
    activeChip: null,
    bottomChip: null,
    startingTile: ""
  },
  {
    xCoordinate: 2,
    yCoordinate: 2,
    roomNumber: 0,
    activeChip: null,
    bottomChip: null,
    startingTile: ""
  }
];

export { chipOne, chipTwo, chipThree, chipFour, chipFive, squares };
