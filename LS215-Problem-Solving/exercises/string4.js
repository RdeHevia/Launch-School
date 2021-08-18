// Write a function that takes a string as an argument and returns that string 
// with the first character of every word capitalized and all subsequent 
// characters in lowercase.

// You may assume that a word is any sequence of non-whitespace characters.

/*
INPUT: string
OUTPUT: return string
  - first char of every word -> make it uppercase (if possible)
  - rest -> make it lowercase (if possible)
REQUIREMENTS:
  - word: any char but spaces, separated by spaces
  - assume input is always a string
EXAMPLES:
hi there, raul! -> Hi There, Raul!
hi -> Hi
tHERE -> There
!hi -> !hi
'' -> ''
' hi there,   raul ' -> ' Hi There,   Raul '
ALGORITHM:
 - match the words. For each word:
    -split the word into two
      - First character -> capitalize it (regardless of is letter or not)
      - Rest of characters -> make them lower case
    - join both parts together into a new word
    - replace the old word with the new one
  - return the new string
*/

function testEqual(actual, expected) {
  console.log(`${actual === expected}, actual: ${actual}, expected: ${expected}`);
}

function capitalizeWords(text) {
  const WORD_REGEX = /\S+/g;
  return text.replace(WORD_REGEX, (word) => {
    let newWord = word[0].toUpperCase() + word.slice(1).toLowerCase();
    return newWord;
  });
}
// TEST CASES
// one word, lowercase and special chars
testEqual(capitalizeWords('there,'), 'There,');
// one word, all capital letters
testEqual(capitalizeWords('THERE,'), 'There,');
// one word, mix lower/upper-case, and special chars
testEqual(capitalizeWords('tHErE,'), 'There,');
// several words, lowercase and special chars
testEqual(capitalizeWords('hi there, raul!'), 'Hi There, Raul!');
// several words, mix l/u
testEqual(capitalizeWords('HI tHErE, rAul!'), 'Hi There, Raul!');
// several words, leading, trailing spaces, more than 1 spaces
testEqual(capitalizeWords('  HI tHErE,   rAul!   '), '  Hi There,   Raul!   ');
// empty string
testEqual(capitalizeWords(''),'');