import GameEngineChipMoves from "../scripts/gameEngineChipMoves";
import Chip from "../scripts/chip";
import * as testConstants from "./testConstants";

beforeEach(() => {
  testConstants.clearChipsFromSquares();
});

test("chip null should return (undefined)", () => {
  expect(GameEngineChipMoves.checkMovesEast(null, testConstants.squares[0])).toBe(undefined);
});

test("square null should return (undefined)", () => {
  expect(GameEngineChipMoves.checkMovesEast(testConstants.chipThree, null)).toBe(undefined);
});

test("chip(1) on [1,1] with square [2,1] containing a chip ", () => {
  testConstants.chipOne.validMoves = [null, [2, 1], [1, 2], null];
  testConstants.squares[2].activeChip = testConstants.chipTwo;
  expect(GameEngineChipMoves.checkMovesEast(testConstants.chipOne, testConstants.squares[2])).toEqual(
    testConstants.chipOne.validMoves
  );
});

test("chip(1) on [2,2] with square [2,1] containing two chips ", () => {
  testConstants.chipThree.validMoves = [[2, 1], null, null, [1, 2]];
  testConstants.squares[2].activeChip = testConstants.chipTwo;
  testConstants.squares[2].bottomChip = testConstants.chipTwo;
  expect(GameEngineChipMoves.checkMovesEast(testConstants.chipOne, testConstants.squares[2])).toEqual([
    null,
    null,
    [1, 2],
    null
  ]);
});
