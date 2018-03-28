import GameEngineChipMoves from "../scripts/gameEngineChipMoves";
import Chip from "../scripts/chip";
import * as testConstants from "./testConstants";

beforeEach(() => {
  testConstants.clearChipsFromSquares();
});

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

test("any chip on [1,1] for West should return outside of board (undefined)", () => {
  expect(GameEngineChipMoves.findNearestChip(testConstants.squares, testConstants.chipOne, "West")).toBe(undefined);
});

test("any chip on [2,2] for South should return outside of board (undefined) for 2x2 board", () => {
  expect(GameEngineChipMoves.findNearestChip(testConstants.squares, testConstants.chipThree, "South")).toBe(undefined);
});

test("any chip on [2,2] for East should return outside of board (undefined) for 2x2 board", () => {
  expect(GameEngineChipMoves.findNearestChip(testConstants.squares, testConstants.chipThree, "East")).toBe(undefined);
});

test("chip on [2,2] that is not in the board should return no square (undefined)", () => {
  expect(GameEngineChipMoves.findNearestChip(testConstants.squares, testConstants.chipThree, "South")).toBe(undefined);
});

test("chip(1) on [2,2] with chip on the board at [2,1] should return square [2,1] for North", () => {
  const existingChipLocation = 2;
  testConstants.squares[existingChipLocation].activeChip = testConstants.chipTwo;
  expect(GameEngineChipMoves.findNearestChip(testConstants.squares, testConstants.chipThree, "North")).toEqual(
    testConstants.squares[existingChipLocation]
  );
});

test("chip(1) on [2,1] with chip on the board at [1,1] should return square [1,1] for East", () => {
  const existingChipLocation = 0;
  testConstants.squares[existingChipLocation].activeChip = testConstants.chipOne;
  expect(GameEngineChipMoves.findNearestChip(testConstants.squares, testConstants.chipTwo, "East")).toEqual(
    testConstants.squares[existingChipLocation]
  );
});

test("chip(1) on [1,1] with chip on the board at [1,2] should return square [1,2] for South", () => {
  const existingChipLocation = 1;
  testConstants.squares[existingChipLocation].activeChip = testConstants.chipSix;
  expect(GameEngineChipMoves.findNearestChip(testConstants.squares, testConstants.chipOne, "South")).toEqual(
    testConstants.squares[existingChipLocation]
  );
});

test("chip(1) on [2,2] with chip on the board at [1,2] should return square [1,2] for West", () => {
  const existingChipLocation = 1;
  testConstants.squares[existingChipLocation].activeChip = testConstants.chipSix;
  expect(GameEngineChipMoves.findNearestChip(testConstants.squares, testConstants.chipThree, "West")).toEqual(
    testConstants.squares[existingChipLocation]
  );
});
