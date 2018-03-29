import GameEngineChipMoves from "../scripts/gameEngineChipMoves";
import * as testConstants from "./testConstants";

beforeEach(() => {
  testConstants.clearChipsFromSquares();
});

test("chip null should return (undefined)", () => {
  expect(GameEngineChipMoves.checkMovesSouth(null, testConstants.squares[0])).toBe(undefined);
});

test("square null should return (undefined)", () => {
  expect(GameEngineChipMoves.checkMovesSouth(testConstants.chipThree, null)).toBe(undefined);
});

test("chip(1) on [1,1] with square [1,2] containing a chip ", () => {
  testConstants.chipOne.validMoves = [null, [2, 1], [1, 2], null];
  testConstants.squares[1].activeChip = testConstants.chipSix;
  expect(GameEngineChipMoves.checkMovesSouth(testConstants.chipOne, testConstants.squares[1])).toEqual(
    testConstants.chipOne.validMoves
  );
});

test("chip(1) on [1,1] with square [2,1] containing two chips ", () => {
  testConstants.chipThree.validMoves = [[2, 1], null, null, [1, 2]];
  testConstants.squares[1].activeChip = testConstants.chipSix;
  testConstants.squares[1].bottomChip = testConstants.chipSix;
  expect(GameEngineChipMoves.checkMovesSouth(testConstants.chipOne, testConstants.squares[1])).toEqual([
    null,
    [2, 1],
    null,
    null
  ]);
});
