/**
 * Scoring
 * Responsible for counting pips and scoring logic.
 */
export default class GameEngineScore {
  constructor(players, rooms) {
    this.players = players;
    this.rooms = rooms;
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
      const roomWinnersIndices = this.findHighestPipCountIndices(roomPipCount);
      // if there is at least one winner
      if (roomWinnersIndices !== -1) {
        roomWinnersIndices.forEach(player => {
          scores[player] += firstPlaceRoomScore;
        });
        if (roomWinnersIndices.length === 1 && noOfPlayers !== 2) {
          const roomRunnerUpsIndices = this.findSecondHighestPipCountIndices(roomPipCount);
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

  // breakTies(playersPipCount) {}

  /**
   * checks if there are any pips in room, and returns indices of players with highest amount of chips
   * @param  {array} roomPipCount - array containing pip counts for every player in one room
   * @return {array}              - array of indices of players with highest amount of chips
   */
  static findHighestPipCountIndices(roomPipCount) {
    const max = Math.max(...roomPipCount);
    if (max === 0) return -1;
    const indices = this.findIndicesOFMaxInArray(roomPipCount);
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
    const indicesOfMax = this.findIndicesOFMaxInArray(pipsWithoutMax);
    indicesOfMax.forEach(index => {
      pipsWithoutMax[index] = 0;
    });
    const indices = this.findIndicesOFMaxInArray(pipsWithoutMax);

    return indices;
  }

  /**
   * returns all indices containing max value of an array
   * @param  {array} array - array containing pip counts for every player in one room
   * @return {array}              - array of indices containg max value
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
