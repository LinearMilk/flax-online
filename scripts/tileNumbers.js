function drawValue1(x, y) {
  drawValueOffset(x, y, 0, 0);
}

function drawValue2(x, y) {
  drawValueOffset(x, y, tileValueOffset, -tileValueOffset);
  drawValueOffset(x, y, -tileValueOffset, tileValueOffset);
}

function drawValue3(x, y) {
  drawValue1(x, y);
  drawValue2(x, y);
}

function drawValue4(x, y) {
  drawValue2(x, y);

  drawValueOffset(x, y, -tileValueOffset, -tileValueOffset);
  drawValueOffset(x, y, tileValueOffset, tileValueOffset);
}

function drawValue5(x, y) {
  drawValue1(x, y);
  drawValue4(x, y);
}

function drawValue6(x, y) {
  drawValue4(x, y);

  drawValueOffset(x, y, tileValueOffset, 0);
  drawValueOffset(x, y, -tileValueOffset, 0);
}

function drawValueOffset(x, y, offsetX, offsetY) {
  ctx.save();
  ctx.fillStyle = tileValueColour;
  ctx.translate((x-0.5)*squareSize+gameBoardFrameSize + offsetX, (y-0.5)*squareSize+gameBoardFrameSize + offsetY);
  ctx.beginPath();
  ctx.arc(0,0,3,0,2*Math.PI);
  ctx.fill();
  ctx.restore();
}