/**
 * Scoring
 * Responsible for counting pips and scoring logic.
 */
export default class GameEngineScore {
  constructor(players, rooms, tieBreakerRoomNum) {
    this.players = players;
    this.rooms = rooms;
    this.tieBreakerRoomNum = tieBreakerRoomNum;
  }
  /**
   * Count pips on all chips owned by a player in every room.
   * @param  {Player} player - the player that is making the mov
   * @param  {Board} board   - the chip being played
   * @return {array}         - array of [pipCount] in each room, 1st room at index 0
   */
  countPipsInRooms(player) {
    const chipsOnBoard = player.getChipsOnBoard();
    const pipsInRooms = [];
    this.rooms.forEach(room => {
      let sumOfPips = 0;
      room.roomSquares.forEach(square => {
        // console.log(square);
        const foundChip = chipsOnBoard.find(chip => {
          if (chip.xPosition() === square[0] && chip.yPosition() === square[1] && chip.isActive) return true;
          return false;
        });
        if (foundChip) sumOfPips += foundChip.value;
      });
      pipsInRooms.push(sumOfPips);
    });
    return pipsInRooms;
  }

  /**
   * Compile information about pips in each room for each player into an array
   * @param  {array} players - array containing all players in a game
   * @return {array}         - array of [[playerOneRoomOnePipCount,playerTwoRoomOnePipCount],[playerOneRoomTwoPipCount,playerTwoRoomTwoPipCount],...]
   */
  generateRoomPipCount(players) {
    const playersPipCount = [];
    players.forEach(player => {
      const pipsInRooms = this.countPipsInRooms(player);
      for (let room = 0; room < pipsInRooms.length; room += 1) {
        if (playersPipCount[room] === undefined) {
          playersPipCount[room] = [];
        }
        playersPipCount[room].push(pipsInRooms[room]);
      }
    });
    return playersPipCount;
  }

  /**
   * Calculates score based on roomPipCount
   * @param  {array} playerspipCount - array containing pip counts for every player in every room
   * @return {array}                 - array of [playerOneScore, playerTwoScore,...]
   */
  static countPoints(playersPipCount) {
    if (!playersPipCount) return undefined;
    const noOfPlayers = playersPipCount[0].length;
    const scores = Array(noOfPlayers).fill(0);
    const firstPlaceRoomScore = 4;
    const secondPlaceRoomScore = 2;

    playersPipCount.forEach(roomPipCount => {
      const roomWinnersIndices = GameEngineScore.findHighestPipCountIndices(roomPipCount);
      // if there is at least one winner
      if (roomWinnersIndices !== -1) {
        roomWinnersIndices.forEach(player => {
          scores[player] += firstPlaceRoomScore;
        });
        if (roomWinnersIndices.length === 1 && noOfPlayers !== 2) {
          const roomRunnerUpsIndices = GameEngineScore.findSecondHighestPipCountIndices(roomPipCount);
          if (roomRunnerUpsIndices !== -1) {
            roomRunnerUpsIndices.forEach(player => {
              scores[player] += secondPlaceRoomScore;
            });
          }
        }
      }
    });

    return scores;
  }

  /**
   * checks if there are any pips in room, and returns indices of players with highest amount of pips
   * @param  {array}playersPipCount       - array containing pip counts for every player in one room
   * @return {array}                      - array of indices of players with highest amount of pips in the tie breaker room
   */
  breakTies(playersPipCount) {
    const indices = GameEngineScore.findHighestPipCountIndices(playersPipCount[this.tieBreakerRoomNum - 1]);
    return indices;
  }

  /**
   * checks if there is a single player with highest score, in case of tie calls a tiebreaker and returns winner. If tiebreaker is still tied calls it a draw.
   * @param  {array} scores - array containing scores for all players
   * @return {array}        - array of indices of winners (single index if there is only one)
   */
  findWinner(scores) {
    let indices = [];
    const possibleWinnersIndices = GameEngineScore.findIndicesOFMaxInArray(scores);
    if (possibleWinnersIndices.length === 1) indices = possibleWinnersIndices;
    else {
      const pipCount = this.generateRoomPipCount(this.players);
      const tieBreakerWinners = this.breakTies(pipCount);
      if (Array.isArray(tieBreakerWinners)) {
        possibleWinnersIndices.forEach(index => {
          tieBreakerWinners.forEach(ind => {
            if (index === ind) indices.push(index);
          });
        });
      } else {
        indices = possibleWinnersIndices;
      }
    }
    return indices;
  }

  /**
   * logs winner (or winners) to the console, 2player ONLY
   * @param  {array} indices - array containing indices of winning player(s)
   * @return {undefined}
   */
  logWinner(indices) {
    let winnerText = "";
    if (indices.length === 1) {
      winnerText = `The winning player is: ${this.players[indices[0]].name}`;
    } else {
      winnerText = `Players ${this.players[indices[0]].name} & ${
        this.players[indices[1]].name
      } are tied for the victory.`;
    }
    return winnerText;
  }

  /**
   * checks if there are any pips in room, and returns indices of players with highest amount of pips
   * @param  {array} roomPipCount - array containing pip counts for every player in one room
   * @return {array}              - array of indices of players with highest amount of pips
   */
  static findHighestPipCountIndices(roomPipCount) {
    if (!roomPipCount) return -1;
    const max = Math.max(...roomPipCount);
    if (max === 0) return -1;
    const indices = GameEngineScore.findIndicesOFMaxInArray(roomPipCount);
    return indices;
  }

  /**
   * checks if there is/are player(s) with second highthest amount of pips in room, and returns their index, -1 if none
   * @param  {array} roomPipCount - array containing pip counts for every player in one room
   * @return {array}              - array of indices of player(s) with 2nd highest amount of chips
   */
  static findSecondHighestPipCountIndices(roomPipCount) {
    if (!roomPipCount) return undefined;
    const max = Math.max(...roomPipCount);

    // check if all pips counts are not the same and >0
    const lowerThanMax = roomPipCount.find(pipCount => {
      if (pipCount < max && pipCount > 0) return true;
      return false;
    });
    if (!lowerThanMax) return -1;

    // removing max values from the array considered
    const pipsWithoutMax = roomPipCount.slice();
    const indicesOfMax = GameEngineScore.findIndicesOFMaxInArray(pipsWithoutMax);
    indicesOfMax.forEach(index => {
      pipsWithoutMax[index] = 0;
    });
    const indices = GameEngineScore.findIndicesOFMaxInArray(pipsWithoutMax);

    return indices;
  }

  /**
   * returns all indices containing max value of an array
   * @param  {array} array - array containing pip counts for every player in one room
   * @return {array}       - array of indices containg max value
   */
  static findIndicesOFMaxInArray(array) {
    const indices = [];
    const max = Math.max(...array);
    let idx = array.indexOf(max);
    while (idx !== -1) {
      indices.push(idx);
      idx = array.indexOf(max, idx + 1);
    }
    return indices;
  }
}
