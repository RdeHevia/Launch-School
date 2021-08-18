// Write a function that takes a string as an argument and returns that string
//  with a staggered capitalization scheme. Every other character, starting from
//  the first, should be capitalized and should be followed by a lowercase or
//  non-alphabetic character.

// Modify the function from the previous exercise so that it ignores non-alphabetic
//  characters when determining whether a letter should be upper or lower case. 
//  Non-alphabetic characters should still be included in the output string, but 
//  should not be counted when determining the appropriate case.

/*
INPUT: string
OUTPUT: string with staggered capitaliation scheme
REQUIREMENTS:
  - 0, 2, 4... -> capitalized
  - 1, 3, 5... -> lowercase
  - if a character is not a letter -> should be ignored for the count
  - empty string -> empty string
  - other data types -> assume always a string
  - assume an argument (string) is always passed
EXAMPLE:
hello -> HeLlO
h-ell-o -> H-eLl-o
DATA STRUCTURE:
 - array
ALGORITHM:
  - declare a variable letterPosition = 0
  - split the string into an array of chars
  - map the characters of the array. For each character:
    - if the character is a letter:
      - if letterPosition is even (or 0) -> make letter uppercase
      - if odd -> make letter lowercase
      - add modified char to the new array
      - increment letterPosition by 1
    - if it's not a letter -> add character as is
  - join the characters of the new array into a string and return it
*/

// TEST FUNCTION
function testEqual (actual, expected) {
  console.log(`${actual === expected}, actual: ${actual}, expected: ${expected}`);
}

function staggeredCase(string) {
  let letterPosition = 0;

  return string
    .split('')
    .map(char => {
      if (!char.match(/[a-z]/gi)) return char;
      let modifiedChar;
      if (letterPosition % 2 === 0) {
        modifiedChar = char.toUpperCase();
      } else {
        modifiedChar = char.toLowerCase();
      }
      letterPosition += 1;
      return modifiedChar;
    })
    .join('');
}

// TEST CASES
// only alphabetic chars
testEqual(staggeredCase('hello'), 'HeLlO');
// alphabetic and no-alphabetic chars
testEqual(staggeredCase('1h-el!l o'), '1H-eL!l O');
// only no-alphabetic
testEqual(staggeredCase('1#$'),'1#$');
// empty string
testEqual(staggeredCase(''),'');