/*
INPUT: n
  - n is the nbr of characters per line AND nbr of lines (grid nxn)
  - odd integer >= 7
OUTPUT: undefined
  - logs 8-pointed star with n lines and n chars per line
RULES:
  - lines: made of * and ' '
  - symetry along the central line
  - central line: n stars
  - rest of the lines: 3 stars, n - 3 spaces
  - nbrOfStars + nbrOfSpaces = n

  - number: not odd >= 7 -> log wrong input
  - no argument passed -> log wrong input
  - '7' -> valid input
  - other data types: assume not
  - upper bound for n: no
EXAMPLE:
n = 7:
*  *  * : 1 *, 2 ' ', 1 *, 2 ' ' 1 *; 3 stars, 4 ' '
 * * *  : 1 ' ', 1 *, 1 ' ', 1 *, 1 ' ', 1 *, 1 ' ': 3 stars, 4 ' '
  ***   : 2 ' ', 3 *, 2 ' '
******* : 7 *
  ***
 * * *
*  *  *
*/

/*
DATA STRUCTURE:
  bottomRows: [row1, row2...]; row: string that contains 3 * and n - 3 spaces
  centralRow: [centralRow]; string of n *
  topRows: bottomRows.reverse()
ALGORITHM:
  - no argument passed -> log 'wrong input' (return null)
  - number not odd > 7 -> log 'wrong input' return null
  - generate the central row **generateCentralRow(n)**
  - generate the bottom rows **generateBottomRows(n)**
  - generate the top rows **generateTopRows(n)**
  - concat all rows together
  - iterate over each row:
    - join the row (array) into a string
    - log it
*/

function validInput(n) {
  if (!((typeof n === 'number') || (typeof n === 'string'))) return false;
  n = +n;
  if (Number.parseInt(n, 10) !== n) return false;
  if (n < 7) return false;
  if (n % 2 === 0) return false;
  return true;
}

function star(n) {
  if (!validInput(n)) {
    console.log('Invalid input');
    return null;
  }
  n = +n;

  let starRows = [
    ...generateTopRows(n),
    ...generateCentralRow(n),
    ...generateBottomRows(n)
  ];
  starRows.forEach(row => console.log(row));
}

/*
generateBottomRows(n)
ALGORITHM:
  - rows = []
  - nbrOfStars = 3
  - nbrOfSideSpaces = (n - nbrOfStars) / 2
  - nbrOfCentralSpaces = 0;
  - iterate from idx = 0 to idx < (n-1) / 2. For at iteration at index idx:
    - row: concatenate sideSpaces - star - centralSpaces - star - centralSpaces - star - sideSpaces
          as indicated by their numbers
    - add the row to rows
    - decrement sideSpaces by 1
    - increment centralSpaces by 1
*/

function generateBottomRows(n) {
  let rows = [];
  const NBR_OF_STARS = 3;
  let nbrOfSideSpaces = (n - NBR_OF_STARS) / 2;
  let nbrOfCentralSpaces = 0;

  for (let idx = 0; idx < (n - 1) / 2; idx += 1) {
    let row = ''.concat(
      ' '.repeat(nbrOfSideSpaces), '*',
      ' '.repeat(nbrOfCentralSpaces), '*',
      ' '.repeat(nbrOfCentralSpaces), '*',
      ' '.repeat(nbrOfSideSpaces)
    );

    rows.push(row);
    nbrOfSideSpaces -= 1;
    nbrOfCentralSpaces += 1;
  }

  return rows;
}

function generateTopRows(n) {
  return generateBottomRows(n).reverse();
}

// console.log(generateBottomRows(9));
// console.log(generateTopRows(9));

/*
generateCentralRows
ALGO:
  - return * repeated n times
*/

function generateCentralRow(n) {
  return ['*'.repeat(n)];
}

// TEST CASES
// - no argument passed -> log wrong input
star();
// - number: not odd >= 7 -> log wrong input
star(4);
star(7.37);
star(-3.14);
star(NaN);
star(Infinity);
// - '7' -> valid input
star(7);
star('7');
star(9);
star('9');
