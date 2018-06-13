/**
 * Size of the square in the board, in pixels.
 */
const squareSize = 46;

/**
 * Size of the border of each square, in pixels.
 */
const squareBorderSize = 1;

/**
 * Height of the game progress box, in pixels.
 */
const gameProgressBoxHeight = 50;

/**
 * Player's colours in the game.
 * colour and border for chip and first tile colour.
 * colourRgba and borderRgba for chip move highlight.
 */
const playerColours = [
  { colour: "#8bc63f", border: "#459445", colourRgba: "139, 198, 63", borderRgba: "69, 148, 69", name: "green" },
  { colour: "#ee5053", border: "#c3392f", colourRgba: "238, 80, 83", borderRgba: "195, 57, 47", name: "red" },
  { colour: "#3fabe3", border: "#1e73be", colourRgba: "63, 171, 227", borderRgba: "30, 115, 190", name: "blue" },
  { colour: "#808080", border: "#4f4f4f", colourRgba: "128, 128, 128", borderRgba: "79, 79, 79", name: "grey" }
];

/**
 * Seach for an array within another array
 * @param {array} haystack  - the array of arrays
 * @param {array} needle    - the array to be searched
 * @return the position of needle in haystack, -1 if it is not present
 */
function searchArrayInArray(haystack, needle) {
  let current;
  let j;
  for (let i = 0; i < haystack.length; i += 1) {
    if (needle.length === haystack[i].length) {
      current = haystack[i];
      for (j = 0; j < needle.length && needle[j] === current[j]; j += 1);
      if (j === needle.length) return i;
    }
  }
  return -1;
}

/**
 * Get the correct mouse click in the canvas (when canvas is not in position 0,0 of the html)
 * @param {object} canvas - the game canvas
 * @param {any} evt       - the click event
 * @return x, y with adjusted clicked positions
 */
function getMousePos(canvas, evt) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

export { squareSize, squareBorderSize, gameProgressBoxHeight, playerColours, searchArrayInArray, getMousePos };
