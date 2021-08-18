// Write a function that takes a sentence string as an argument and returns that 
// string with every occurrence of a "number word" — 'zero', 'one', 'two', 'three',
//  'four', 'five', 'six', 'seven', 'eight', 'nine' — converted to its 
//  corresponding digit character.

/*
INPUT: sentence
  - data type: string
  - any type of character
  - empty string ok
  - string with no numbers ok
  - assume input is always a string
OUTPUT: sentence
- number words are replaced by their corresponding digits
RULES:
  - words: separated by spaces or dots
  - word numbers: assume lower case always
EXAMPLE:
  Hi! My number is one two three four five six seven eigth nine zero. Call me tomorrow.
  return : Hi! My number is 1 2 3 4 5 6 7 8 9. Call me tomorrow.
  Hi! You already have my number. Call me tomorrow.
  return: same
  '' -> ''
DATA STRUCTURE:
 object: equivalnce word -> number
  {one: 1, two: 2,...} {string: string}
ALGORITHM:
 - Declare the dictionary
 - Iterate over the key-value pairs of the dictionary. For each key-value pair:
  - Create a matching regex for the key
  - Check if there are matches of the key in the input text. YES -> replace with the value
    of the key value pair
 - return the modified text
*/

function testEqual (actual, expected) {
  console.log(`${actual === expected}, actual: ${actual}, expected: ${expected}`);
}

function numberWordsToDigits(text) {
  const EQUIVALENCE = {
    zero: '0', one: '1', two: '2', three: '3', four: '4', five: '5',
    six: '6', seven: '7', eight: '8', nine: '9'
  };

  let modifiedText = text;

  for (let numberWord in EQUIVALENCE) {
    let regex = new RegExp(`\\b${numberWord}\\b`,'gi');
    modifiedText = modifiedText.replace(regex, EQUIVALENCE[numberWord]);
  }

  return modifiedText;
}

// const REGEX = /\bthree(\b)/gi;
// console.log('three three three! three'.match(REGEX));

// // TEST CASES
// // number words, no repeated
testEqual(numberWordsToDigits(
  'Hi! My number is one two three four five six seven eight nine zero. Call me tomorrow.',
), 'Hi! My number is 1 2 3 4 5 6 7 8 9 0. Call me tomorrow.');
testEqual(numberWordsToDigits(
  'Hi! My number is ONE TWO THREE FOUR FIVE SIX SEVEN EIGHT NINE ZERO. Call me tomorrow.',
), 'Hi! My number is 1 2 3 4 5 6 7 8 9 0. Call me tomorrow.');
// // number words, repeated
testEqual(numberWordsToDigits(
  'one two three four five six seven eight nine zero. one two three four five six seven eight nine zero.',
), '1 2 3 4 5 6 7 8 9 0. 1 2 3 4 5 6 7 8 9 0.');
// // no number words
testEqual(numberWordsToDigits(
  'hi',
), 'hi');
// // empty string
testEqual(numberWordsToDigits(
  '',
), '');