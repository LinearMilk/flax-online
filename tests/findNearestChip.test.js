import GameEngineChipMoves from "../scripts/gameEngineChipMoves";
import Chip from "../scripts/chip";
import * as testConstants from "./testConstants";

test("chip null should return no square (undefined)", () => {
  expect(GameEngineChipMoves.findNearestChip(testConstants.squares, null, "West")).toBe(undefined);
});

test("empty squares should return no square (undefined)", () => {
  expect(GameEngineChipMoves.findNearestChip([], testConstants.chipOne, "East")).toBe(undefined);
});

test("squares=null should return no square (undefined)", () => {
  expect(GameEngineChipMoves.findNearestChip(null, testConstants.chipOne, "South")).toBe(undefined);
});

test("no direction should return no square (undefined)", () => {
  expect(GameEngineChipMoves.findNearestChip(null, testConstants.chipOne)).toBe(undefined);
});

test("any chip on [1,1] for North should return outside of board (undefined)", () => {
  expect(GameEngineChipMoves.findNearestChip(testConstants.squares, testConstants.chipOne, "North")).toBe(undefined);
});

test("chip on [2,2] that is not in the board should return no square (undefined)", () => {
  const chip = new Chip("white", 1, [2, 2]);
  expect(GameEngineChipMoves.findNearestChip(testConstants.squares, chip, "South")).toBe(undefined);
});

test("chip(1) on [2,2] with chip on the board at [2,1] should return square [2,1] for North", () => {
  const chip = new Chip("white", 1, [2, 2]);
  const existingChipLocation = 2;
  testConstants.squares[existingChipLocation].activeChip = testConstants.chipTwo;
  expect(GameEngineChipMoves.findNearestChipNorth(testConstants.squares, testConstants.chipThree)).toEqual(
    testConstants.squares[existingChipLocation]
  );
});
