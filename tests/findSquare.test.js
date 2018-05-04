import GameEngineChipMoves from "../scripts/gameEngineChipMoves";
import Chip from "../scripts/model/chip";
import * as testConstants from "./testConstants";

beforeEach(() => {
  testConstants.clearChipsFromSquares();
});

test("chip null should return no square (undefined)", () => {
  expect(GameEngineChipMoves.findSquare(testConstants.squares, null)).toBe(undefined);
});

test("empty squares should return no square (undefined)", () => {
  expect(GameEngineChipMoves.findSquare([], testConstants.chipOne)).toBe(undefined);
});

test("squares=null should return no square (undefined)", () => {
  expect(GameEngineChipMoves.findSquare(null, testConstants.chipOne)).toBe(undefined);
});

test("chip on [1,1] should return square on [1,1]", () => {
  testConstants.squares[0].activeChip = testConstants.chipOne;
  expect(GameEngineChipMoves.findSquare(testConstants.squares, testConstants.chipOne)).toBe(testConstants.squares[0]);
});

test("chip on [2,2] that is not in the board should return no square (undefined)", () => {
  const chip = new Chip("white", 1, [2, 2]);
  expect(GameEngineChipMoves.findSquare(testConstants.squares, chip)).toBe(undefined);
});
