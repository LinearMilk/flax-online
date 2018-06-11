export default class Square {
  constructor(x, y) {
    this.xCoordinate = x;
    this.yCoordinate = y;
    this.roomNumber = 0;
    this.activeChip = null;
    this.bottomChip = null;
    this.startingTile = "";
  }
}
