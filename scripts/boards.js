const gameBoards = {
  board1: {
    dimensions: [13, 9],
    numPlayers: 2,
    startingPositions: [[1, 9], [13, 1]],
    rooms: [
      {
        roomNum: 1,
        roomSquares: [[1, 1], [1, 2], [2, 1], [2, 2]]
      },
      {
        roomNum: 2,
        roomSquares: [
          [5, 1],
          [5, 2],
          [6, 1],
          [7, 1],
          [7, 2],
          [8, 1],
          [9, 1],
          [9, 2]
        ]
      },
      {
        roomNum: 3,
        roomSquares: [[12, 1], [12, 2], [13, 1], [13, 2]]
      },
      {
        roomNum: 4,
        roomSquares: [[2, 4], [2, 5], [2, 6], [3, 4], [3, 5], [3, 6], [4, 5]]
      },
      {
        roomNum: 5,
        roomSquares: [
          [6, 4],
          [6, 5],
          [6, 6],
          [7, 4],
          [7, 5],
          [7, 6],
          [8, 4],
          [8, 5],
          [8, 6]
        ]
      },
      {
        roomNum: 6,
        roomSquares: [
          [12, 4],
          [12, 5],
          [12, 6],
          [11, 4],
          [11, 5],
          [11, 6],
          [10, 5]
        ]
      },
      {
        roomNum: 7,
        roomSquares: [[1, 8], [1, 9], [2, 8], [2, 9]]
      },
      {
        roomNum: 8,
        roomSquares: [
          [5, 9],
          [5, 8],
          [6, 9],
          [7, 9],
          [7, 8],
          [8, 9],
          [9, 9],
          [9, 8]
        ]
      },
      {
        roomNum: 9,
        roomSquares: [[12, 9], [12, 8], [13, 9], [13, 8]]
      }
    ]
  }
};

export default gameBoards;
