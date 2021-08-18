/*
class Diamond
  - static makeDiamond(letter)
------------
makeDiamond
EXAMPLE:
A: A
C: (letter nbr 3) number of lines: 2A + 2B + 1C = 5
total number of lines = (letterPosition - 1) * 2 + 1
  A  \n    2 spaces, A, 2 spaces -> total 5 -> 
 B B \n   1 space, B, space, B, space -> total 5
C   C\n    C, 3 spaces, C -> total 5
 B B \n
  A  \n
DATA STRUCTURE:
  array to save each line of the diamond
ALGORITHM:
  0. Determine the position of the letter in the alphabet
  1. Determine the number of lines : (letterPosition - 1) * 2 + 1
  2. Create three empty strings:
    - central row
    - topRows
    - bottomRows
  3. Add the central row string to centralRow
  4. Add the top rows to topRows
  5. Add bottom rows to bottomRows
  6. Join all the elements of the arrays together separated by \n
  7. return the resultant string
--------------
generateTopRows
  1. start with:
    nbrOfLetterChars = 1
    numberOfLeftOrRightSpaces = (nbrOfCharsPerLine - nbrOfLetterChars) / 2
    numberOfIntermediateSpaces = 0
    1.1. add to array:
      numberOfLeftOrRightSpaces + A + numberOfLeftOrRightSpaces
  2. Make nbrOfLetterChars = 2 for the next iterations
  3. Next step:
    numberOfLeftOrRightSpaces -= 1
    numberOfIntermediateSpaces += 1
    3.1 add to array:
    numberOfLeftOrRightSpaces + B + numberOfIntermediateSpaces + B + numberOfLeftOrRightSpaces
*/


class Line {
  constructor (letter, nbrOfSideSpaces, nbrOfIntermediateSpaces) {
    let sideSpaces = ' '.repeat(nbrOfSideSpaces);
    let intermediateSpaces = ' '.repeat(nbrOfIntermediateSpaces);
    if (nbrOfIntermediateSpaces === 0) {
      this.string = sideSpaces + letter + sideSpaces;
    } else {
      this.string = sideSpaces + letter + intermediateSpaces + letter + sideSpaces;
    }
  }

  return() {
    return this.string;
  }
}

class Diamond {

  static ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  static makeDiamond(lastLetter) {

    if (lastLetter === 'A') {
      return this.generateRow('A',0,0) + '\n';
    }

    let centralRow = this.generateCentralRow(lastLetter);
    let topRows = this.generateTopRows(lastLetter);
    let bottomRows = this.generateBottomRows(lastLetter);
    return this.assemble(topRows, centralRow, bottomRows);
  }

  static findPositionInAlphabet(letter) {
    return this.ALPHABET.match(letter).index;
  }

  static generateCentralRow(lastLetter) {
    let nbrOfCharsPerLine = this.charsPerLine (lastLetter);
    let nbrOfIntermediateSpaces = nbrOfCharsPerLine - 2;
    let nbrOfSideSpaces = 0;
    let lastRow = this.generateRow(lastLetter,nbrOfSideSpaces,nbrOfIntermediateSpaces);

    return [lastRow];
  }

  // eslint-disable-next-line max-statements
  static generateTopRows (lastLetter) {
    let rows = [];
    let indexOfLastLetter = this.findPositionInAlphabet(lastLetter);
    let nbrOfCharsPerLine = this.charsPerLine(lastLetter);

    let nbrOfSideSpaces = (nbrOfCharsPerLine - 1) / 2;
    let nbrOfIntermediateSpaces = 0;
    let firstRow = this.generateRow('A',nbrOfSideSpaces,nbrOfIntermediateSpaces);
    rows.push(firstRow);
    nbrOfSideSpaces -= 1;
    nbrOfIntermediateSpaces += 1;

    for (let idx = 1; idx < indexOfLastLetter; idx += 1) {
      let letter = this.ALPHABET[idx];
      let row = (new Line (letter,nbrOfSideSpaces,nbrOfIntermediateSpaces).return());
      rows.push(row);
      nbrOfSideSpaces -= 1;
      nbrOfIntermediateSpaces += 2;
    }

    return rows;
  }

  static generateBottomRows (lastLetter) {
    return this.generateTopRows(lastLetter).reverse();
  }

  static generateRow(letter,nbrOfSideSpaces,nbrOfIntermediateSpaces) {
    return (new Line(letter,nbrOfSideSpaces,nbrOfIntermediateSpaces)).return();
  }
  static assemble(topRows, centralRow, bottomRows) {
    return topRows.join('\n') + '\n' +
          centralRow.join('\n') + '\n' +
          bottomRows.join('\n') + '\n';
  }

  static charsPerLine (lastLetter) {
    let letterIndex = this.findPositionInAlphabet(lastLetter);
    return ((letterIndex) * 2) + 1;
  }
}


// let row = new Line('A', 3, 0);
// console.log(row.return());
// let topRows = Diamond.generateTopRows('C').join('\n');
// console.log(topRows);
console.log(Diamond.makeDiamond('Z'));
// console.log(Diamond.generateCentralRow('C'));
// console.log(Diamond.findPositionInAlphabet('C'));
// console.log(Diamond.generateCentralRow('C'));
// console.log(Diamond.makeDiamond('C'));

// let actual = Diamond.makeDiamond('C');
// let expected = "  A  \n" +
//                    " B B \n" +
//                    "C   C\n" +
//                    " B B \n" +
//                    "  A  \n";
// console.log(actual.length);
// console.log(expected.length);
// console.log(actual === expected);
module.exports = Diamond;