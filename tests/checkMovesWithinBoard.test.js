import GameEngineChipMoves from "../scripts/engine/gameEngineChipMoves";
import gameBoards from "../scripts/boards";
import Board from "../scripts/model/board";
import * as testConstants from "./testConstants";

const testBoardInfo = gameBoards.board2;
const testBoard = new Board(
  testBoardInfo.dimensions,
  testBoardInfo.numPlayers,
  testBoardInfo.rooms,
  testBoardInfo.startingPositions,
  testBoardInfo.randomChipRow
);

test("chip null should return undefined", () => {
  expect(GameEngineChipMoves.checkMovesWithinBoard(testBoard, null)).toBe(undefined);
});

test("board null should return undefined", () => {
  expect(GameEngineChipMoves.checkMovesWithinBoard(null, testConstants.chipOne)).toBe(undefined);
});

test("chip(1) on [2,2] should return [[2,1],[3,2],[2,3],[1,2]]", () => {
  expect(GameEngineChipMoves.checkMovesWithinBoard(testBoard, testConstants.chipThree)).toEqual([
    [2, 1],
    [3, 2],
    [2, 3],
    [1, 2]
  ]);
});

test("chip(4) on [3,3] on should return [null,[7,3],[3,7],null]", () => {
  expect(GameEngineChipMoves.checkMovesWithinBoard(testBoard, testConstants.chipFour)).toEqual([
    null,
    [7, 3],
    [3, 7],
    null
  ]);
});

test("chip(4) on [5,6] on should return [[5,2],[9,6],[5,10],[1,6]]", () => {
  expect(GameEngineChipMoves.checkMovesWithinBoard(testBoard, testConstants.chipFive)).toEqual([
    [5, 2],
    [9, 6],
    [5, 10],
    [1, 6]
  ]);
});
