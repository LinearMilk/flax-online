import GameEngine from "../scripts/gameEngine";

test("no pips array should return (undefined)", () => {
  expect(GameEngine.countPoints(null)).toBe(undefined);
});

test("2p 1 room, 0 pips should return [0,0]", () => {
  expect(GameEngine.countPoints([[0, 0]])).toEqual([0, 0]);
});

test("2p 2r, 0 pips should return [0,0]", () => {
  expect(GameEngine.countPoints([[0, 0], [0, 0]])).toEqual([0, 0]);
});

test("2p 1r, 1 pip for 1st player should return [4,0]", () => {
  expect(GameEngine.countPoints([[1, 0]])).toEqual([4, 0]);
});

test("2p 1r, 1 pip for 2nd player should return [0,4]", () => {
  expect(GameEngine.countPoints([[0, 1]])).toEqual([0, 4]);
});

test("2p 4r, mixed pips should return [4,12]", () => {
  expect(GameEngine.countPoints([[2, 3], [0, 0], [1, 13], [4, 4]])).toEqual([4, 12]);
});

test("2p 6r, mixed pips should return [4,20]", () => {
  expect(GameEngine.countPoints([[7, 0], [1, 2], [1, 13], [20, 25], [2, 3], [0, 1]])).toEqual([4, 20]);
});

test("2p 7r, mixed pips should return [20,8]", () => {
  expect(GameEngine.countPoints([[2, 3], [4, 3], [3, 2], [1, 0], [2, 3], [2, 1], [3, 1]])).toEqual([20, 8]);
});

test("2p 5r, all rooms the same should return [20,20]", () => {
  expect(GameEngine.countPoints([[2, 2], [2, 2], [2, 2], [2, 2], [2, 2]])).toEqual([20, 20]);
});

test("3p 1r, 0 pips should return [0,0,0]", () => {
  expect(GameEngine.countPoints([[0, 0, 0]])).toEqual([0, 0, 0]);
});

test("3p 1r, 1 pip for each player should return [4,4,4]", () => {
  expect(GameEngine.countPoints([[0, 0, 0]])).toEqual([0, 0, 0]);
});

test("3p 1r, 2 pips pl1 should return [4,0,0]", () => {
  expect(GameEngine.countPoints([[2, 0, 0]])).toEqual([4, 0, 0]);
});

test("3p 1r, 2 pips pl2 should return [0,4,0]", () => {
  expect(GameEngine.countPoints([[0, 2, 0]])).toEqual([0, 4, 0]);
});

test("3p 1r, 2 pips pl3 should return [0,0,4]", () => {
  expect(GameEngine.countPoints([[0, 0, 2]])).toEqual([0, 0, 4]);
});

test("3p 1r, 2 pips pl1 1 pip pl2 should return [4,2,0]", () => {
  expect(GameEngine.countPoints([[2, 1, 0]])).toEqual([4, 2, 0]);
});

test("3p 1r, 2 pips pl2 1 pip pl 3 should return [0,4,2]", () => {
  expect(GameEngine.countPoints([[0, 2, 1]])).toEqual([0, 4, 2]);
});

test("3p 1r, 2 pips pl3 1 pip pl1 should return [2,0,4]", () => {
  expect(GameEngine.countPoints([[1, 0, 2]])).toEqual([2, 0, 4]);
});

test("3p 1r, 2 pips pl3 1 pip pl1 1 pip pl2 should return [2,2,4]", () => {
  expect(GameEngine.countPoints([[1, 1, 2]])).toEqual([2, 2, 4]);
});

test("3p 1r, 2 pips pl3 1 pip pl1 1 pip pl2 should return [2,2,4]", () => {
  expect(GameEngine.countPoints([[1, 1, 2]])).toEqual([2, 2, 4]);
});

test("3p 1r, 2 pips pl3 2 pip pl1 1 pip pl2 should return [4,2,4]", () => {
  expect(GameEngine.countPoints([[2, 1, 2]])).toEqual([4, 0, 4]);
});

test("3p 5r, mixed pips should return [16,10,14]", () => {
  expect(GameEngine.countPoints([[2, 1, 2], [5, 0, 0], [0, 1, 2], [2, 2, 2], [3, 1, 1]])).toEqual([16, 8, 14]);
});

test("4p 1r, 0 pips should return [0,0,0,0]", () => {
  expect(GameEngine.countPoints([[0, 0, 0, 0]])).toEqual([0, 0, 0, 0]);
});

test("3p 2r, 0 pips should return [0,0,0]", () => {
  expect(GameEngine.countPoints([[0, 0, 0], [0, 0, 0]])).toEqual([0, 0, 0]);
});

test("4p 2r, 0 pips should return [0,0,0,0]", () => {
  expect(GameEngine.countPoints([[0, 0, 0, 0], [0, 0, 0, 0]])).toEqual([0, 0, 0, 0]);
});

test("4p 2r, mixed pips should return [4,4,4,4]", () => {
  expect(GameEngine.countPoints([[1, 1, 0, 0], [0, 0, 1, 1]])).toEqual([4, 4, 4, 4]);
});

test("4p 2r, mixed pips should return [6,4,6,4]", () => {
  expect(GameEngine.countPoints([[5, 7, 5, 0], [1, 0, 1, 1]])).toEqual([6, 4, 6, 4]);
});

test("4p 2r, mixed pips should return [4,8,4,2]", () => {
  expect(GameEngine.countPoints([[5, 7, 5, 0], [1, 2, 1, 1]])).toEqual([4, 8, 4, 2]);
});

test("4p 5r, mixed pips should return [10,8,10,4]", () => {
  expect(GameEngine.countPoints([[13, 9, 15, 5], [7, 12, 2, 6], [5, 3, 15, 11], [12, 1, 7, 10], [7, 9, 7, 6]])).toEqual(
    [10, 8, 10, 4]
  );
});
