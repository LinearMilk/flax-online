import Chip from "../scripts/chip";

const chip = new Chip("white", 1, [1, 1]);
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

export { chip, squares };
