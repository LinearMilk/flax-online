const squareSize = 46;
const gameBoardFrameSize = 10;
const squareBorderSize = 1;

const playerColours = [
  { colour: "#8bc63f", border: "#459445" },
  { colour: "#ee5053", border: "#c3392f" },
  { colour: "#3fabe3", border: "#1e73be" },
  { colour: "#808080", border: "#4f4f4f" }
];

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

export { squareSize, gameBoardFrameSize, squareBorderSize, playerColours, searchArrayInArray };
