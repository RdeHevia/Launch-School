/*
Write a function that generates and returns an acronym from a string of words. 
For example, the function should return "PNG" for the string 
"Portable Network Graphics". Count compound words (words connected with a dash) 
as separate words.
*/

/*
INPUT: string of words
  -   any character
OUTPUT: acronym
  - data type: string
RULES:
  - acronym:
    - first letter can be upper or lowercase
    - takes the first letter of each word
  - words:
    - separated by spaces, \n, \t...
      - undefined number of them
    - they can be separated by 1 single '-'
    - can be lower or uppercase
  - empty string: return ''
  - no argument: return null
  - wrong data type: assume not
  - one single word? no acronym
  - word in all capital letters: assume is an acronym -> return it
  - multiple words with all capital letters? assume not
  - no letter characters and spaces should be ignored when creating the acronym
  - assume words always start with a letter
EXAMPLE:
Portable Network Graphics -> PNG
portable network graphics -> PNG

*/

function testEqual(actual, expected) {
  console.log(actual === expected);
  if (actual !== expected) {
    console.log(`A: ${actual}`);
    console.log(`E: ${expected}`);
  }
}

/*
DATA STRUCTURE:
  words: array[word1, word2...] words: alphabetic strings
ALGORITHM:
  - replace the '-' character by spaces
  - split the text into words. Use regex
    - word boundaries
    - [a-z] case insensitive
  - check if there is a word with all capital letters (acronym). YES -> return
    that words
    -filter the words that are acronmys
    - if the resultant array is not empty -> return the first element
  - otherwise, reduce the array of words to a string with the first letter of
    each word
  - return the resultant string
==========
isAcronym:
ALGORITHM:
  - if the string is uppercase -> return true
*/

function acronym (text) {
  if (text === undefined) return '';

  let words = (text.replace(/-/g,' ').match(/\b[a-z]+\b/gi) || []);
  let acronymsInText = words.filter(word => word === word.toUpperCase());
  if (acronymsInText.length > 0) return acronymsInText[0];
  if (words.length === 1) return '';

  return words.reduce((initials, word) => {
    return ''.concat(initials, word[0].toUpperCase());
  }, '');
}

// TEST CASES

// empty string
testEqual(acronym(''), '');
// no argument
testEqual(acronym(), '');
// one word
testEqual(acronym('Portable'), '');
// case insensitive
testEqual(acronym('Portable Network Graphics'), 'PNG');
testEqual(acronym('portable network graphics'), 'PNG');
// many spaces
testEqual(acronym('   \t Portable        \n Network   \t\n Graphics    \t\t\n'), 'PNG');
testEqual(acronym('     \n    \t      '), '');
// dashes
testEqual(acronym('Portable-Network-Graphics'), 'PNG');
testEqual(acronym('Complementary metal-oxide semiconductor'), 'CMOS');    // "CMOS"
testEqual(acronym('Hyper-text Markup Language'), 'HTML');                 // "HTML"
// acronym in text
testEqual(acronym('PHP: HyperText Preprocessor'), 'PHP');                // "PHP"
// other characters
testEqual(acronym('First In, First Out'), 'FIFO');                        // "FIFO"