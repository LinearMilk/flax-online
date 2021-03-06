const gameBoards = {
  board1: {
    dimensions: [13, 9],
    randomChipRow: 11,
    numPlayers: 2,
    startingPositions: [[1, 9], [13, 1]],
    tieBreakerRoomNum: 5,
    rooms: [
      {
        roomNum: 1,
        roomSquares: [[1, 1], [1, 2], [2, 1], [2, 2]]
      },
      {
        roomNum: 2,
        roomSquares: [[5, 1], [5, 2], [6, 1], [7, 1], [7, 2], [8, 1], [9, 1], [9, 2]]
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
        roomSquares: [[6, 4], [6, 5], [6, 6], [7, 4], [7, 5], [7, 6], [8, 4], [8, 5], [8, 6]]
      },
      {
        roomNum: 6,
        roomSquares: [[12, 4], [12, 5], [12, 6], [11, 4], [11, 5], [11, 6], [10, 5]]
      },
      {
        roomNum: 7,
        roomSquares: [[1, 8], [1, 9], [2, 8], [2, 9]]
      },
      {
        roomNum: 8,
        roomSquares: [[5, 9], [5, 8], [6, 9], [7, 9], [7, 8], [8, 9], [9, 9], [9, 8]]
      },
      {
        roomNum: 9,
        roomSquares: [[12, 9], [12, 8], [13, 9], [13, 8]]
      }
    ]
  },
  board2: {
    dimensions: [12, 10],
    randomChipRow: 12,
    numPlayers: 2,
    startingPositions: [[8, 10], [5, 1]],
    tieBreakerRoomNum: 6,
    rooms: [
      {
        roomNum: 1,
        roomSquares: [[1, 1], [1, 2], [2, 1]]
      },
      {
        roomNum: 2,
        roomSquares: [[4, 1], [5, 1], [6, 1], [4, 2]]
      },
      {
        roomNum: 3,
        roomSquares: [[10, 1], [11, 1], [11, 2]]
      },
      {
        roomNum: 4,
        roomSquares: [[8, 3], [9, 3], [9, 4]]
      },
      {
        roomNum: 5,
        roomSquares: [[1, 5], [1, 6], [2, 6]]
      },
      {
        roomNum: 6,
        roomSquares: [[6, 5], [7, 5], [6, 6], [7, 6]]
      },
      {
        roomNum: 7,
        roomSquares: [[11, 5], [12, 5], [12, 6]]
      },
      {
        roomNum: 8,
        roomSquares: [[4, 7], [4, 8], [5, 8]]
      },
      {
        roomNum: 9,
        roomSquares: [[2, 10], [3, 10], [2, 9]]
      },
      {
        roomNum: 10,
        roomSquares: [[7, 10], [8, 10], [9, 10], [9, 9]]
      },
      {
        roomNum: 11,
        roomSquares: [[11, 10], [12, 10], [12, 9]]
      }
    ]
  },
  board3: {
    dimensions: [12, 10],
    randomChipRow: 12,
    numPlayers: 2,
    startingPositions: [[8, 10], [5, 1]],
    tieBreakerRoomNum: 5,
    rooms: [
      {
        roomNum: 1,
        roomSquares: [[1, 1], [1, 2], [2, 1], [2, 2]]
      },
      {
        roomNum: 2,
        roomSquares: [[4, 1], [5, 1], [6, 1], [4, 2]]
      },
      {
        roomNum: 3,
        roomSquares: [[10, 1], [9, 2], [10, 2], [11, 2], [9, 3]]
      },
      {
        roomNum: 4,
        roomSquares: [[1, 5], [1, 6], [2, 6], [1, 7]]
      },
      {
        roomNum: 5,
        roomSquares: [[6, 4], [5, 5], [6, 5], [7, 5], [6, 6], [7, 6], [8, 6], [7, 7]]
      },
      {
        roomNum: 6,
        roomSquares: [[11, 5], [12, 4], [12, 5], [12, 6]]
      },
      {
        roomNum: 7,
        roomSquares: [[3, 10], [2, 9], [3, 9], [4, 9], [4, 8]]
      },
      {
        roomNum: 8,
        roomSquares: [[7, 10], [8, 10], [9, 10], [9, 9]]
      },
      {
        roomNum: 9,
        roomSquares: [[11, 10], [11, 9], [12, 10], [12, 9]]
      }
    ]
  }
};

export default gameBoards;
