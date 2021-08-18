/*
Write a function that takes a string argument containing one or more words and 
returns a new string containing the words from the string argument. All 
five-or-more letter words should have their letters in reverse order. The 
string argument will consist of only letters and spaces.
*/
/*
INPUT: sentence
  - data type: string
  - it contains 1 or more words
  - chars: letters (lower or uppercase) and spaces only
OUTPUT: sentence with some words reversed
  - nbr of letters >= 5 -> word is reversed
  - nbr of letters < 5 -> remain as is
RULES:
  - \n \t -> assume not
  - wrong data types: assume not

  - words can be separated by multiple spaces. the number of spaces
    should be kept in the returned string
  - leading or trailing spaces: '  ab cdegh   ' -> '  ab hgedc   '
  - 1 single word (no spaces): 'cdefg' -> 'gfedc'
  - '' -> ''
  - argument not passed -> return ''
EXAMPLE:
'ab cdefg hijklmnop' -> 'ab gfedc ponmlkjih'
'ab    cdefg' -> 'ab    gfedc'
*/

function testEqual(actual, expected) {
  console.log(actual === expected);
  console.log(`A: ${actual}`);
  console.log(`E: ${expected}`);
}

/*
DATA STRUCTURE:
  - sentenceWithReversedWords: string
ALGORITHM:
  - if no argument passed or is '' -> return ''
  - sentenceWithReversedWords: match the words of the sentence. For each word
    - if the nbr of letters >= 5 -> reverse and replace the word
    - otherwise: leave it as (replace it with the same string)
  - return the resultant string
*/

// 'ab cDEfg hIJklMNop'.match(/\b[a-z]+\b/gi);

function reverseLongWords(sentence = '') {
  if (sentence === '') return '';
  let sentenceWithReversedWords = sentence.replace(/\b[a-z]+\b/gi, word => {
    if (word.length >= 5) return word.split('').reverse().join('');
    return word;
  });

  return sentenceWithReversedWords;
}

// TEST CASES
// - argument not passed -> return ''
testEqual(reverseLongWords(), '');
// - '' -> ''
testEqual(reverseLongWords(''), '');
// // - 1 single word (no spaces): 'cdefg' -> 'gfedc'
testEqual(reverseLongWords('cdefg'), 'gfedc');
// // - multiple words, some words reversed
console.log('===========================');
testEqual(reverseLongWords('ab cdefg hijklmnop'), 'ab gfedc ponmlkjih');
testEqual(reverseLongWords('ab cDEfg hIJklMNop'), 'ab gfEDc poNMlkJIh');
// // - multiple words, words not reversed
testEqual(reverseLongWords('ab cde fghi'), 'ab cde fghi');
// // - words can be separated by multiple spaces. the number of spaces
// //   should be kept in the returned string
console.log('===========================');
testEqual(reverseLongWords('ab   cdefg    hijklmnop'), 'ab   gfedc    ponmlkjih');
testEqual(reverseLongWords('ab  cde    fghi'), 'ab  cde    fghi');
// // - leading or trailing spaces: '  ab cdegh   ' -> '  ab hgedc   '
testEqual(reverseLongWords('  ab cdegh   '), '  ab hgedc   ');