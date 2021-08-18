// Write a function that takes a string as an argument and returns that string
//  with a staggered capitalization scheme. Every other character, starting from
//  the first, should be capitalized and should be followed by a lowercase or
//  non-alphabetic character. Non-alphabetic characters should not be changed,
//  but should be counted as characters for determining when to switch between
//  upper and lower case.

/*
INPUT: string
  - any character
OUTPUT: string with a staggered capitalization scheme
  - 1, 3, 5,... -> capitalized
  - 2, 4, 6.... -> lowercase or non-alphabetic char
REQUIREMENTS:
  - non-alphabetic chars:
    - shouldn't be changed
    - they count to determine when to switch upper to lower case
  - assume input always a string
EXAMPLE:
  'Hi there, Raul!' -> Hi tHeRe, RaUl!
  'hello' -> HeLlO
DATA STRUCTURE:
  - input -> array
ALGORITHM:
  - Map the characters of the input string into an array e.g. [!, t, h, e, r, e]
  - Map the characters of the array. For each character: e.g. [!, t, H, e, R, e]
    - If the index is 0 or even -> make it uppercase 
    - If the index is odd -> make it lowercase 
  - Join the resultant array together into a string
  - return the new string
*/

function testEqual(actual, expected) {
  console.log(`${actual === expected}, actual: ${actual}, expected: ${expected}`);
}

function capitalizeStaggered(string) {
  return string
    .split('')
    .map((char, idx) => {
      return idx % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
    })
    .join('');
}

// TEST CASES
// input: lowercase letters
testEqual(capitalizeStaggered('there'), 'ThErE');
// input: uppercase letters
testEqual(capitalizeStaggered('THERE'), 'ThErE');
// input: lower and uppercase mixed, with special characters
testEqual(capitalizeStaggered('hI TherE, RAUl!'), 'Hi tHeRe, RaUl!');
// input: empty string
testEqual((''), '');

testEqual(capitalizeStaggered('I Love Launch School!'), "I LoVe lAuNcH ScHoOl!");
testEqual(capitalizeStaggered('ignore 77 the 4444 numbers'), "IgNoRe 77 ThE 4444 nUmBeRs");