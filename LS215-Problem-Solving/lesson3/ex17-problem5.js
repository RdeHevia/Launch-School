/* eslint-disable max-lines-per-function */
/*
CYPHER
INPUT: string, number of rails
OUTPUT: string
REQUIREMENTS: 
  - spaces -> remove spaces
  - empty strings
  - all letters should be capitalized
  - char (i): [j][i]
    i is multiple of (nbrOfRails - 1) -> j = nbrOfRails - 1
  - if number of rails = 1 -> return same string
  - if number of rails >= number of chars -> return same string
EXAMPLE:
WE ARE DISCOVERED FLEE AT ONCE, 3 rails -> WEAREDISCOVEREDFLEEATONCE -> 25 chars
W . . . E . . . C . . . R . . . L . . . T . . . E ; 7 letters, 6 groups of 3 '.'
. E . R . D . S . O . E . E . F . E . A . O . C .; 12 letters, 13 groups of 1 '.'
. . A . . . I . . . V . . . D . . . E . . . N . .; 6 letters, 2 groups of 2'.', 5 groups of 2 '.'
total number of chars -> 25

W (0): [0][0]
E (1): [1][1]
A (2): [2][2]
R (3): [1][3]
E (4): [0][4]
D (5): [1][5]
I (6): [2][6]
rail 1: W(0), E(4), 8, 12,...
rail 2: E(1), R(3), D(5), 7, 9...
rail 3: A(2), I(6), 10, 14...

HELLO, 6 rails: HELLO has 5 chars
H.... -> HELLO
.E...
..L..
...L.
....O
.....

HELLO 1 rail:
HELLO

char (i): [j][i]
i is multiple of (nbrOfRails - 1) -> j = nbrOfRails - 1

DATA STRUCTURE:
array of arrays; [rail1, rail2, rail3]; rail[chars or empty chars] total = numberofchars
positions: array of arrays
  [postion1, position2...]; positionI: {row: idx (number), column: idx (number)}

ALGORITHM:
 - remove the spaces from the string, make uppercase and split into an array of chars
 - create the array arrays to store the chypered message
  - number of subaarrays === number of rails
  - number of elements per subarray === number of chars of the message (w/o spaces)
  - elements: empty strings
 - find the position of the elements where we are going to store the chars
   - order by order of appearance filling in zig-zag
   - e.g. 3 rails: [{row:0, column:0}, {row:1, column:1}, ...]
 - iterate over the array of chars. for a character at position idx:
  - read the row and column at position idx
  - add the char to the array at position [row][column]
 - return the string (after converting into array)
----------------
letterPosition:
ALGORITHM:
  - declare a rowIdx = 0
  - Iterate from 0 until index < number of chars. For each char:
    - column = idx
    - row = rowIdx
    - if rowIdx < number of rails - 1 -> increase rowIdx by 1
    - if rowIdx === nubmer of rails - 1 -> set rowIdx = 0
----------------
DECYPHER:
INPUT: string, number of rails
OUTPUT: string

EXAMPLE: WECRLTEERDSOEEFEAOCAIVDEN, 25 chars, 3 rails
? . . . ? . . . ? . . . ? . . . ? . . . ? . . . ?
. ? . ? . ? . ? . ? . ? . ? . ? . ? . ? . ? . ? .
. . ? . . . ? . . . ? . . . ? . . . ? . . . ? . .
letter positions:
[0][0], [1][1], [2][2], [1][3], [0][4]...
filling:
W(0): [0][0]
E(1): [0][4]
C(2): [0][8]
...
ALGORITHM:
 - split the string int an array of chars
 - chreate the array of arrays used to dechiper the message
    - number of subaarrays === number of rails
    - number of elements per subarray === number of chars of the message (w/o spaces)
- find the position of the elements in zig zag
- new copy: sort the positions by first index: [all positions rail1, all postions rail2]
- fill a new array based on those positions
- extract the message based on the zig-zag position
- return the string
*/

function testEqual(actual, expected) {
  console.log(`${actual === expected}, actual:${actual}, expected:${expected}`);
}

function zigzagPositions(nbrOfChars, nbrOfRails) {
  let rowIdx = 0;
  let positions = [];
  let increment = 0;
  for (let colIdx = 0; colIdx < nbrOfChars; colIdx += 1) {
    positions.push({row: rowIdx, column: colIdx});
    if ((nbrOfRails) > 1 && (rowIdx === 0)) increment = 1;
    if ((nbrOfRails) > 1 && (rowIdx === nbrOfRails - 1)) increment = -1;
    rowIdx += increment;
  }
  return positions;
}
// eslint-disable-next-line max-lines-per-function
function cypher(string, nbrOfRails) {
  let chars = string.toUpperCase().replace(/ /g,'').split('');
  let nbrOfChars = chars.length;

  if (nbrOfChars === 0) return chars.join('');

  let emptyRail = (new Array(nbrOfChars)).fill('');
  let rails = [];
  for (let idx = 0; idx < nbrOfRails; idx += 1) {
    rails.push(emptyRail.slice());
  }

  let positions = zigzagPositions(nbrOfChars, nbrOfRails);
  chars.forEach((char, idx) => {
    let row = positions[idx].row;
    let column = positions[idx].column;
    rails[row][column] = char;
  });

  return rails.flat().join('');
}

function decypher(string, nbrOfRails) {
  let chars = string.split('');
  let nbrOfChars = chars.length;
  if (nbrOfChars === 0) return chars.join('');

  let emptyRail = (new Array(nbrOfChars)).fill('');
  let rails = [];
  for (let idx = 0; idx < nbrOfRails; idx += 1) {
    rails.push(emptyRail.slice());
  }

  let positions = zigzagPositions(nbrOfChars, nbrOfRails);
  let positionsSortedByRow = positions.slice().sort((a,b) => {
    return a.row - b.row;
  });

  chars.forEach((char, idx) => {
    let row = positionsSortedByRow[idx].row;
    let column = positionsSortedByRow[idx].column;
    rails[row][column] = char;
  });

  let decypherChars = chars.map((char, idx) => {
    let row = positions[idx].row;
    let column = positions[idx].column;
    return rails[row][column];
  });
  // console.log(decypherChars);
  return decypherChars.join('');
}

// decypher('WECRLTEERDSOEEFEAOCAIVDEN',3);

// TEST CASES
// cypher, 1 < number of rails < number of chars
testEqual(cypher('WE ARE DISCOVERED FLEE AT ONCE', 3),'WECRLTEERDSOEEFEAOCAIVDEN');
testEqual(cypher('WEAREDISCOVEREDFLEEATONCE', 3),'WECRLTEERDSOEEFEAOCAIVDEN');
// // cypher, 1 < number of rails < number of chars
testEqual(decypher('WECRLTEERDSOEEFEAOCAIVDEN', 3),'WEAREDISCOVEREDFLEEATONCE');
// // cypher, capitalization of lowercase letters
testEqual(cypher('wearediscoveredfleeatonce', 3),'WECRLTEERDSOEEFEAOCAIVDEN');
// // cypher, 1 === number of rails
testEqual(cypher('WEAREDISCOVEREDFLEEATONCE', 1),'WEAREDISCOVEREDFLEEATONCE');
// // cypher, 1 === number of rails
testEqual(decypher('WEAREDISCOVEREDFLEEATONCE', 1),'WEAREDISCOVEREDFLEEATONCE');
// // cypher, number of rails >= number of chars
testEqual(cypher('HELLO',5),'HELLO');
testEqual(cypher('HELLO',5),'HELLO');
// // cypher, empty string
testEqual(cypher('', 5),'');
// // decypher, empty string
testEqual(decypher('', 5),'');
// // cypher, 1 char, 99 rails
testEqual(cypher('A', 99),'A');
// // decypher, 1 char, 99 rails
testEqual(decypher('A', 99),'A');
