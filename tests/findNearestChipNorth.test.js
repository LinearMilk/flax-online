import GameEngineChipMoves from "../scripts/gameEngineChipMoves";
import Chip from "../scripts/chip";
import * as testConstants from "./testConstants";

beforeEach(() => {
  testConstants.clearChipsFromSquares();
});

test("chip null should return no square (undefined)", () => {
  expect(GameEngineChipMoves.findNearestChipNorth(testConstants.squares, null)).toBe(undefined);
});

test("empty squares should return no square (undefined)", () => {
  expect(GameEngineChipMoves.findNearestChipNorth([], testConstants.chipOne)).toBe(undefined);
});

test("squares=null should return no square (undefined)", () => {
  expect(GameEngineChipMoves.findNearestChipNorth(null, testConstants.chipOne)).toBe(undefined);
});

test("any chip on [1,1] should return outside of board (undefined)", () => {
  expect(GameEngineChipMoves.findNearestChipNorth(testConstants.squares, testConstants.chipOne)).toBe(undefined);
});

test("chip on [2,2] that is not in the board should return no square (undefined)", () => {
  const chip = new Chip("white", 1, [2, 2]);
  expect(GameEngineChipMoves.findNearestChipNorth(testConstants.squares, chip)).toBe(undefined);
});

test("chip(1) on [2,2] with chip on the board at [2,1] should return square [2,1]", () => {
  const chip = new Chip("white", 1, [2, 2]);
  const existingChipLocation = 2;
  testConstants.squares[existingChipLocation].activeChip = testConstants.chipTwo;
  expect(GameEngineChipMoves.findNearestChipNorth(testConstants.squares, testConstants.chipThree)).toEqual(
    testConstants.squares[existingChipLocation]
  );
});
