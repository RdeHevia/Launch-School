// Write a function that takes a string as an argument and returns an array that 
// contains every word from the string, with each word followed by a space and the 
// word's length. If the argument is an empty string or if no argument is passed, 
// the function should return an empty array.

// You may assume that every pair of words in the string will be separated by a 
// single space.

/*
INPUT: string
OUTPUT: array that contains every word of the string and its frequency
  - [word1, word2...]; word1: "word frequency"
REQUIREMENTS:
  - argument '' -> []
  - no argument passed -> []
  - don't need to check for other data types
  - word: characters separated by spaces
  - order by appearance
  - case insensitive
EXAMPLES:

'apple banana orange':
  ['apple 1', 'banana 1', 'orange 1']
'apple banana apple banana orange APPLE'
  ['apple 3', 'banana 2', 'orange 1']

DATA STRUCTURE:
  - split words -> array of strings [word1, word2...]
  - wordCount: {
    word1: count,
    word2 count,
    ...
  }; count: number (integer)
ALGORITHM:
 - if empty string -> return []
 - if no argument passed (argument === undefined) -> return []
 - iterate over the words. for each word:
  - if wordCount doesn't have a property with the name of the word:
    - add the word as property and value 1
  - if the word exists already as a property: increment the value by 1
 - iterate over all the key-value pairs of the object. add the string to an array
 - return the array
*/

function countWords(text) {
  if (text === '' || text === undefined) return [];

  let words = text.toLowerCase().split(' ');

  let wordCount = {};

  words.forEach(word => {
    if (!wordCount.hasOwnProperty(word)) wordCount[word] = 0;
    wordCount[word] += 1;
  });

  return Object.keys(wordCount).map(word => `${word} ${wordCount[word]}`);
}


// multiple words, not repeated
console.log(countWords('apple banana orange')); // ['apple 1', 'banana 1', 'orange 1']
// multiple words, repeated
console.log(countWords('apple banana apple banana orange apple')); // ['apple 3', 'banana 2', 'orange 1']
// case insensitive
console.log(countWords('apple banana apple BaNaNa orange APPLE')); // ['apple 3', 'banana 2', 'orange 1']
// 1 word
console.log(countWords('apple')); // ['apple 1']
// 1 word repeated
console.log(countWords('apple apple')); // ['apple 2']
// empty string
console.log(countWords('')); // []
// no argument
console.log(countWords()); // []