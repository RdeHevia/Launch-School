/*
INPUT: text
  - string
OUTPUT: undefined
  - logs the string with a box
RULES
  - box chars:
    - corners: +
    - horizontal sides: -
    - vertical sides: |
  - box lines:
    - 1st, 5th line: +-(- repeated n times)-+
    - 2nd, 4th line: |' '(' ' repeated n times)' '|
    - 3rd line: |' '(text)' '|
ALGORITHM:
  - build the lines
  - join everything together
  - log it
*/

function logInBox(string) {
  let nbrOfChars = string.length;
  let line1 = ''.concat('+','-','-'.repeat(nbrOfChars),'-','+');
  let line2 = ''.concat('|',' ',' '.repeat(nbrOfChars),' ','|');
  let line3 = ''.concat('|',' ',string,' ','|');

  let banner = ''.concat(
    line1, '\n',
    line2, '\n',
    line3, '\n',
    line2, '\n',
    line1, '\n');
  console.log(banner);
}

logInBox('To boldly go where no one has gone before.');