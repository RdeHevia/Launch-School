/*
Write a Function named anagram that takes two arguments: a word and an array 
of words. Your function should return an array that contains all the words 
from the array argument that are anagrams of the word argument. For example, 
given the word "listen" and an array of candidate words like "enlist", 
"google", "inlets", and "banana", the program should return an array that 
contains "enlist" and "inlets".*/

/*
INPUT: word, array of words
  - word: string
  - array of words [string1, string2...]
OUTPUT: array with the words that are anagrams of the word argument
  - array of words
  - words should keep the case
  - order: not important
RULES:
  - word: alhabetic characters (lower and uppercase)
  - anagrams: 2 words that are written using the same letters
    - comparison is case insensitive
  - ' \n  listen  \t ' -> trim leading and trailing spaces
  - same word -> is anagram too
  - 'listen!' -> assume input can only  contain letters and separator chars (/s)
  - word = '', [words no empty] -> return empty array []
  - word = '', [..., '', '',...] -> return empty array
  - word = '     ', [..., ' \n   ', '  \t  ',...] -> return empty array []
  - wrong data types? assume not
  - one or two of the inputs is not provided -> assume not
EXAMPLES:
listen, enlist -> anagrams
listen, ENLIST -> anagrams
DATA STRUCTURE:
  anagrams: array of words [word1, word2...] word: string
ALGORITHM:
  - remove \s chars from both inputs *removeSeparatorChars*
  - if input word after cleaning is === '' -> return []
  - filter the elements of the list that **are anagrams** of the word. save the
    results in the array anagrams
  - return anagrams
=================
isAnagram(comparingWord, word)
ALGORITHM:
  - make both words lowercase
  - sort them alphabetically
  - if they are equal -> return true
  - otherwise -> return false
}
=======
removeSeparatorChars: replace matching regex
*/

function removeSeparators(word) {
  return word.replace(/\s/g, '');
}

// console.log(removeSeparatorChars('   \n   hi! \t    '));

function isAnagram(comparingWord, word) {
  let lowercaseComparingWordChars = comparingWord
    .toLowerCase()
    .split('').sort().join('');
  let lowercaseWordChars = word
    .toLowerCase()
    .split('').sort().join('');

  return lowercaseComparingWordChars === lowercaseWordChars;
}

// console.log(isAnagram('listen', 'inlets'));
// console.log(isAnagram('listen', 'INLETS'));
// console.log(isAnagram('listen', 'inletsX'));
function anagrams(word, arrayOfWords) {
  let cleanedWord = removeSeparators(word);
  if (cleanedWord === '') return [];

  let cleanedArrayOfWords = arrayOfWords.map(removeSeparators);
  // return cleanedArrayOfWords;
  return cleanedArrayOfWords.filter(candidate => isAnagram(word, candidate));
}

function testEqual(actual, expected) {
  console.log(String(actual) === String(expected));
  console.log(actual);
  console.log(expected);
}

// // TEST CASES
// // word = '', [words no empty] -> return empty array []
// console.log(anagrams('', ['listen'])); // []
// console.log(anagrams('', ['listen', 'enlist'])); // []
// // word = '', [..., '', '',...] -> return empty array
// console.log(anagrams('', ['listen', '', 'enlist', ''])); // []
console.log(anagrams('hi', ['listen', '', 'enlist', ''])); // []
// word = '     ', [..., ' \n   ', '  \t  ',...] -> return empty array []
console.log(anagrams('    ', ['listen', '  \n  ', 'enlist', '\t'])); // []
console.log(anagrams('', ['listen', '  \n  ', 'enlist', '\t'])); // []
console.log(anagrams('  \n   \t', ['listen', '', 'enlist', ''])); // []
// array of 1 element
console.log(anagrams('listen', ['enlist'])); // ['enlist']
// case insensitve
console.log(anagrams('listen', ['ENliST'])); // ['ENliST']
testEqual(anagrams('LISTEN', ['enlist']), ['enlist']); // ['enlist']
// multiple elements matching and no matching
testEqual(anagrams('listen', ['ENliST', 'banana', 'inlets', 'google']), ['ENliST', 'inlets']); // ['ENliST', 'inlets']
