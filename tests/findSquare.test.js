import GameEngineChipMoves from "../scripts/gameEngineChipMoves";
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

test("chip null should return no square (null)", () => {
  expect(GameEngineChipMoves.findSquare(squares, null)).toBe(undefined);
});

test("empty squares should return no square (null)", () => {
  expect(GameEngineChipMoves.findSquare([], chip)).toBe(undefined);
});

test("squares=null should return no square (null)", () => {
  expect(GameEngineChipMoves.findSquare(null, chip)).toBe(undefined);
});

test("chip on [1,1] should return square on [1,1]", () => {
  squares[0].activeChip = chip;
  expect(GameEngineChipMoves.findSquare(squares, chip)).toBe(squares[0]);
});

test("chip on [2,2] that is not in the board should return no square", () => {
  const chip = new Chip("white", 1, [2, 2]);
  expect(GameEngineChipMoves.findSquare(squares, chip)).toBe(undefined);
});
