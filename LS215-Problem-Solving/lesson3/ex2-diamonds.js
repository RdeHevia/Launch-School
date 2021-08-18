/*
INPUT:
  - n: odd integer (1, 3, 5...)
OUTPUT:
  - logs a diamond n x n stars (*)
RULES:
  - Assume n is always an odd integer
  - stars + spaces = n in each row
  - From row 1 to middle row:
    - stars series: 1, 3, 5, 7....n
    - spaces (total): (n-1), n-3, n-5, n-7...0
  - at row i (1 to middle row):
    - stars: 2i - 1
    - spaces(total): n - (2i - 1) = n - 2i + 1
  - From middle row to row n: symetrical 
  - Middle array at: (n - 1) / 2
EXAMPLES:
n = 5: 5 stars horizontal diagonal, 5 stars vertical diagonal

  *   : ROW 1, 2 spaces - 1 star - 2 spaces
 ***  : ROW 2, 1 space - 3 stars - 1 space
***** : ROW 3, 5 stars
 ***  : ROW 4, symetrical
  *   : ROW 5, symetrical

  stars series:              1, 3, 5, 3, 1
  spaces series (each side): 2, 1, 0, 1, 2
  stars + spaces = n in each row

n = 1: 1 star horizontal diagonal, 1 star vertical diagonal
* : ROW 1, 0 spaces, 1 star
  n=1, i=1:
    stars = 2*1 - 1 = 1
    spaces = 1 - 2 + 1 = 0
ALGORITHM/ DATA STRUCTURE:
  1. Generate the top rows (array)
  2. Generate the middle rows(array)
  3. Generete the bottom rows as the symetrical of the top rows. (array)
  4. Assemble all rows together. (array)
  5. Log it to the console.

--------------------
generateTopRows(n):
INPUT: n
OUTPUT: array of rows with stars and spaces
EXAMPLE:
n = 5:
[  *  , *** ]
ALGORITHM:
0. If n = 1: return an empty array
1. Declare an empty array to store the rows
2. Iterate from 1 to middle row ((n-1)/2). For each iteration:
  - Get the number of stars:  2*idx - 1
  - Get the number of spaces: (n - numberOfStars) / 2
  - Concat everything together: leftSpaces + stars + rightSpaces
  - Add to the array that stores the rows
3. Return the resultant array
*/

function generateTopRows(n) {
  let rows = [];
  let middleRowPosition = ((n - 1) / 2) + 1;

  for (let idx = 1; idx < middleRowPosition; idx += 1) {
    let numberOfStars = (2 * idx) - 1;
    let numberOfSpacesEachSide = (n - numberOfStars) / 2;

    let stars = '*'.repeat(numberOfStars);
    let spacesEachSide = ' '.repeat(numberOfSpacesEachSide);

    let row = ''.concat(spacesEachSide, stars, spacesEachSide);
    rows.push(row);
  }

  return rows;
}

function generateBottomRows(n) {
  return generateTopRows(n).reverse();
}

function generateMiddleRow(n) {
  return ['*'.repeat(n)];
}

function logDiamond(rows) {
  rows.forEach(row => console.log(row));
}

function diamond(n) {
  let topRows = generateTopRows(n);
  let middleRow = generateMiddleRow(n);
  let bottomRows = generateBottomRows(n);
  logDiamond([...topRows,...middleRow,...bottomRows]);
}

diamond(1);
diamond(3);
diamond(5);
diamond(9);