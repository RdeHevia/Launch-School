// Write a function that takes a string as an argument and returns that string 
// with every lowercase letter changed to uppercase and every uppercase letter 
// changed to lowercase. Leave all other characters unchanged.

/*
INPUT: string
OUTPUT: string
  - lowercase letters -> uppercase
  - uppercase letters -> lowercase
  - other characters -> remain unchanged
REQUIREMENTS:
  - OK to use upperCase ands lowerCase methods on no-letter chars too
  - assume input is always a string
EXAMPLE:
Hi There, Raul! -> hI tHERE, rAUL!
'' -> ''
ALGORITHM:
 - match all the letters. For each letter:
  - if lowercase => make it uppercase
  - if uppercase => make it lowercase
 - return the modified string
*/

function testEqual(actual, expected) {
  console.log(`${actual === expected}, actual: ${actual}, expected: ${expected}`);
}

function swapCases(string) {
  const LETTER_REGEX = /[a-z]/gi;
  return string
    .replace(LETTER_REGEX, (match) => {
      if (match.toLowerCase() === match) {
        return match.toUpperCase();
      } else {
        return match.toLowerCase();
      }
    });
}

// TEST CASES
// lowercase, special chars -> uppercase, special chars
testEqual(swapCases('hi there, raul!'), 'HI THERE, RAUL!');
// uppercase, special chars -> lowercase, special chars
testEqual(swapCases('HI THERE, RAUL!'),'hi there, raul!');
// lower&uppercase, special chars
testEqual(swapCases('Hi tHeRe, RaUL!'), 'hI ThErE, rAul!');
// empty string
testEqual(swapCases(''), '');