import GameEngineChipMoves from "../scripts/gameEngineChipMoves";

import * as testConstants from "./testConstants";

test("chip null should return undefined", () => {
  expect(GameEngineChipMoves.checkMovesWithinBoard(null, 2, 2)).toBe(undefined);
});

test("gameBoardWidth < 1 should return undefined", () => {
  expect(GameEngineChipMoves.checkMovesWithinBoard(null, 0, 2)).toBe(undefined);
});

test("gameBoardHeight < 1 should return undefined", () => {
  expect(GameEngineChipMoves.checkMovesWithinBoard(null, 2, 0)).toBe(undefined);
});

test("chip(1) on [2,2] should return [[2,1],[3,2],[2,3],[1,2]]", () => {
  expect(GameEngineChipMoves.checkMovesWithinBoard(testConstants.chipThree, 3, 3)).toEqual([
    [2, 1],
    [3, 2],
    [2, 3],
    [1, 2]
  ]);
});

test("chip(4) on [3,3] on should return [null,null,null,null] on 5x5 board", () => {
  expect(GameEngineChipMoves.checkMovesWithinBoard(testConstants.chipFour, 5, 5)).toEqual([null, null, null, null]);
});

test("chip(4) on [5,6] on should return [[5,2],[9,6],[5,10],[1,6]] on 10x10 board", () => {
  expect(GameEngineChipMoves.checkMovesWithinBoard(testConstants.chipFive, 10, 10)).toEqual([
    [5, 2],
    [9, 6],
    [5, 10],
    [1, 6]
  ]);
});
