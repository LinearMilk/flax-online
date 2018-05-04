import GameEngineChipMoves from "../scripts/engine/gameEngineChipMoves";
import * as testConstants from "./testConstants";

beforeEach(() => {
  testConstants.clearChipsFromSquares();
});

test("chip null should return (undefined)", () => {
  expect(GameEngineChipMoves.checkMoves(null, testConstants.squares[0])).toBe(undefined);
});

test("square null should return valid moves of the chip unchanged", () => {
  expect(GameEngineChipMoves.checkMoves(testConstants.chipThree, null)).toEqual(testConstants.chipThree.validMoves);
});

test("chip(1) on [2,2] with square [2,1] containing a chip", () => {
  testConstants.chipThree.validMoves = [[2, 1], null, null, [1, 2]];
  testConstants.squares[2].activeChip = testConstants.chipTwo;
  expect(GameEngineChipMoves.checkMoves(testConstants.chipThree, testConstants.squares[2])).toEqual(
    testConstants.chipThree.validMoves
  );
});

test("chip(1) on [2,2] with square [2,1] containing two chips", () => {
  testConstants.chipThree.validMoves = [[2, 1], null, null, [1, 2]];
  testConstants.squares[2].activeChip = testConstants.chipTwo;
  testConstants.squares[2].bottomChip = testConstants.chipTwo;
  expect(GameEngineChipMoves.checkMoves(testConstants.chipThree, testConstants.squares[2])).toEqual([
    null,
    null,
    null,
    [1, 2]
  ]);
});

test("chip(1) on [1,1] with square [2,1] containing a chip checking for North", () => {
  testConstants.chipOne.validMoves = [null, [2, 1], [1, 2], null];
  testConstants.squares[2].activeChip = testConstants.chipTwo;
  expect(GameEngineChipMoves.checkMoves(testConstants.chipOne, testConstants.squares[2])).toEqual(
    testConstants.chipOne.validMoves
  );
});

test("chip(1) on [1,1] with square [2,1] containing two chips for North", () => {
  testConstants.chipThree.validMoves = [[2, 1], null, null, [1, 2]];
  testConstants.squares[2].activeChip = testConstants.chipTwo;
  testConstants.squares[2].bottomChip = testConstants.chipTwo;
  expect(GameEngineChipMoves.checkMoves(testConstants.chipOne, testConstants.squares[2])).toEqual(
    testConstants.chipOne.validMoves
  );
});

test("chip(1) on [1,1] with square [2,1] containing a chip for East", () => {
  testConstants.chipOne.validMoves = [null, [2, 1], [1, 2], null];
  testConstants.squares[2].activeChip = testConstants.chipTwo;
  expect(GameEngineChipMoves.checkMoves(testConstants.chipOne, testConstants.squares[2])).toEqual(
    testConstants.chipOne.validMoves
  );
});

test("chip(1) on [1,1] with square [2,1] containing two chips for East", () => {
  testConstants.chipOne.validMoves = [null, [2, 1], [1, 2], null];
  testConstants.squares[2].activeChip = testConstants.chipTwo;
  testConstants.squares[2].bottomChip = testConstants.chipTwo;
  expect(GameEngineChipMoves.checkMoves(testConstants.chipOne, testConstants.squares[2])).toEqual([
    null,
    null,
    [1, 2],
    null
  ]);
});

test("chip(1) on [1,1] with square [1,2] containing a chip for South", () => {
  testConstants.chipOne.validMoves = [null, [2, 1], [1, 2], null];
  testConstants.squares[1].activeChip = testConstants.chipSix;
  expect(GameEngineChipMoves.checkMoves(testConstants.chipOne, testConstants.squares[1])).toEqual(
    testConstants.chipOne.validMoves
  );
});

test("chip(1) on [1,1] with square [2,1] containing two chips for South", () => {
  testConstants.chipThree.validMoves = [[2, 1], null, null, [1, 2]];
  testConstants.squares[1].activeChip = testConstants.chipSix;
  testConstants.squares[1].bottomChip = testConstants.chipSix;
  expect(GameEngineChipMoves.checkMoves(testConstants.chipOne, testConstants.squares[1])).toEqual([
    null,
    [2, 1],
    null,
    null
  ]);
});

test("chip(1) on [2,2] with square [1,2] containing a chip for West", () => {
  testConstants.chipThree.validMoves = [[2, 1], null, null, [1, 2]];
  testConstants.squares[1].activeChip = testConstants.chipSix;
  expect(GameEngineChipMoves.checkMoves(testConstants.chipThree, testConstants.squares[1])).toEqual(
    testConstants.chipThree.validMoves
  );
});

test("chip(1) on [2,2] with square [1,2] containing two chips for West", () => {
  testConstants.chipThree.validMoves = [[2, 1], null, null, [1, 2]];
  testConstants.squares[1].activeChip = testConstants.chipSix;
  testConstants.squares[1].bottomChip = testConstants.chipSix;
  expect(GameEngineChipMoves.checkMoves(testConstants.chipThree, testConstants.squares[1])).toEqual([
    [2, 1],
    null,
    null,
    null
  ]);
});
