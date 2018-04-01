import GameEngineChipMoves from "../scripts/gameEngineChipMoves";
import * as testConstants from "./testConstants";

beforeEach(() => {
  testConstants.clearChipsFromSquares();
});

// test("chip null should return (undefined)", () => {
//   expect(GameEngineChipMoves.checkMovesWest(null, testConstants.squares[0])).toBe(undefined);
// });
//
// test("square null should return (undefined)", () => {
//   expect(GameEngineChipMoves.checkMovesWest(testConstants.chipThree, null)).toBe(undefined);
// });

// test("chip(1) on [2,2] with square [1,2] containing a chip ", () => {
//   testConstants.chipThree.validMoves = [[2, 1], null, null, [1, 2]];
//   testConstants.squares[1].activeChip = testConstants.chipSix;
//   expect(GameEngineChipMoves.checkMovesWest(testConstants.chipThree, testConstants.squares[1])).toEqual(
//     testConstants.chipThree.validMoves
//   );
// });
//
// test("chip(1) on [2,2] with square [1,2] containing two chips ", () => {
//   testConstants.chipThree.validMoves = [[2, 1], null, null, [1, 2]];
//   testConstants.squares[1].activeChip = testConstants.chipSix;
//   testConstants.squares[1].bottomChip = testConstants.chipSix;
//   expect(GameEngineChipMoves.checkMovesWest(testConstants.chipThree, testConstants.squares[1])).toEqual([
//     [2, 1],
//     null,
//     null,
//     null
//   ]);
// });
