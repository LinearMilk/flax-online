import GameEngineChipMoves from "../scripts/gameEngineChipMoves";
import * as testConstants from "./testConstants";

beforeEach(() => {
  testConstants.clearChipsFromSquares();
});

test("chip null should return (undefined)", () => {
  expect(GameEngineChipMoves.checkMoves(null, testConstants.squares[0], "West")).toBe(undefined);
});

test("square null should return (undefined)", () => {
  expect(GameEngineChipMoves.checkMoves(testConstants.chipThree, null)).toBe(undefined);
});

test("chip(1) on [2,2] with square [2,1] containing a chip for North", () => {
  testConstants.chipThree.validMoves = [[2, 1], null, null, [1, 2]];
  testConstants.squares[2].activeChip = testConstants.chipTwo;
  expect(GameEngineChipMoves.checkMoves(testConstants.chipThree, testConstants.squares[2], "North")).toEqual(
    testConstants.chipThree.validMoves
  );
});

test("chip(1) on [2,2] with square [2,1] containing two chips for North", () => {
  testConstants.chipThree.validMoves = [[2, 1], null, null, [1, 2]];
  testConstants.squares[2].activeChip = testConstants.chipTwo;
  testConstants.squares[2].bottomChip = testConstants.chipTwo;
  expect(GameEngineChipMoves.checkMoves(testConstants.chipThree, testConstants.squares[2], "North")).toEqual([
    null,
    null,
    null,
    [1, 2]
  ]);
});

test("chip(1) on [1,1] with square [2,1] containing a chip checking for North", () => {
  testConstants.chipOne.validMoves = [null, [2, 1], [1, 2], null];
  testConstants.squares[2].activeChip = testConstants.chipTwo;
  expect(GameEngineChipMoves.checkMoves(testConstants.chipOne, testConstants.squares[2], "North")).toEqual(
    testConstants.chipOne.validMoves
  );
});

test("chip(1) on [1,1] with square [2,1] containing two chips for North", () => {
  testConstants.chipThree.validMoves = [[2, 1], null, null, [1, 2]];
  testConstants.squares[2].activeChip = testConstants.chipTwo;
  testConstants.squares[2].bottomChip = testConstants.chipTwo;
  expect(GameEngineChipMoves.checkMoves(testConstants.chipOne, testConstants.squares[2], "North")).toEqual(
    testConstants.chipOne.validMoves
  );
});

test("chip(1) on [1,1] with square [2,1] containing a chip for East", () => {
  testConstants.chipOne.validMoves = [null, [2, 1], [1, 2], null];
  testConstants.squares[2].activeChip = testConstants.chipTwo;
  expect(GameEngineChipMoves.checkMoves(testConstants.chipOne, testConstants.squares[2], "East")).toEqual(
    testConstants.chipOne.validMoves
  );
});

test("chip(1) on [1,1] with square [2,1] containing two chips for East", () => {
  testConstants.chipThree.validMoves = [[2, 1], null, null, [1, 2]];
  testConstants.squares[2].activeChip = testConstants.chipTwo;
  testConstants.squares[2].bottomChip = testConstants.chipTwo;
  expect(GameEngineChipMoves.checkMoves(testConstants.chipOne, testConstants.squares[2], "East")).toEqual([
    null,
    null,
    [1, 2],
    null
  ]);
});

test("chip(1) on [1,1] with square [1,2] containing a chip for South", () => {
  testConstants.chipOne.validMoves = [null, [2, 1], [1, 2], null];
  testConstants.squares[1].activeChip = testConstants.chipSix;
  expect(GameEngineChipMoves.checkMoves(testConstants.chipOne, testConstants.squares[1], "South")).toEqual(
    testConstants.chipOne.validMoves
  );
});

test("chip(1) on [1,1] with square [2,1] containing two chips for South", () => {
  testConstants.chipThree.validMoves = [[2, 1], null, null, [1, 2]];
  testConstants.squares[1].activeChip = testConstants.chipSix;
  testConstants.squares[1].bottomChip = testConstants.chipSix;
  expect(GameEngineChipMoves.checkMoves(testConstants.chipOne, testConstants.squares[1], "South")).toEqual([
    null,
    [2, 1],
    null,
    null
  ]);
});

test("chip(1) on [2,2] with square [1,2] containing a chip for West", () => {
  testConstants.chipThree.validMoves = [[2, 1], null, null, [1, 2]];
  testConstants.squares[1].activeChip = testConstants.chipSix;
  expect(GameEngineChipMoves.checkMoves(testConstants.chipThree, testConstants.squares[1], "West")).toEqual(
    testConstants.chipThree.validMoves
  );
});

test("chip(1) on [2,2] with square [1,2] containing two chips for West", () => {
  testConstants.chipThree.validMoves = [[2, 1], null, null, [1, 2]];
  testConstants.squares[1].activeChip = testConstants.chipSix;
  testConstants.squares[1].bottomChip = testConstants.chipSix;
  expect(GameEngineChipMoves.checkMoves(testConstants.chipThree, testConstants.squares[1], "West")).toEqual([
    [2, 1],
    null,
    null,
    null
  ]);
});
