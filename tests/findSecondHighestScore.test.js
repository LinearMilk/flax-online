import GameEngine from "../scripts/gameEngine";
import * as testConstants from "./testConstants";

test("no pips array should return (undefined)", () => {
  expect(GameEngine.findSecondHighestScore(null)).toBe(undefined);
});

test("no pips should return -1 (4 players)", () => {
  expect(GameEngine.findSecondHighestScore([0, 0, 0, 0])).toEqual(-1);
});

test("all equal pip counts should return -1 (3 players)", () => {
  expect(GameEngine.findSecondHighestScore([2, 2, 2])).toEqual(-1);
});

test("no pips should return -1 (2 players)", () => {
  expect(GameEngine.findSecondHighestScore([0, 0])).toEqual(-1);
});

test("all equal pip counts should return -1 (2 players)", () => {
  expect(GameEngine.findSecondHighestScore([5, 5])).toEqual(-1);
});

test("no pips should return -1 (3 players)", () => {
  expect(GameEngine.findSecondHighestScore([0, 0, 0])).toEqual(-1);
});

test("all equal pip counts should return -1 (3 players)", () => {
  expect(GameEngine.findSecondHighestScore([10, 10, 10])).toEqual(-1);
});
