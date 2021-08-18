/*
INPUT: sentence (string)
OUTPUT: string with numbers in words converted to digits
RULES:
  - words separated by 1) spaces 2) '.'
EXAMPLE:
  - Hi five four.
    * Hi
    * five ->5
    * four.
      * four -> 4
      * .
    Hi 5 4.
ALGORITHM:
  1. Separate words by spaces.
  2. Convert the word to digit. Deal with punctuation.
  3. Join all the words. Return the sentence
*/

function numberWordToDigit(wordWithPunctuation) {
  const DIGITS = {
    zero: '0',
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
  };

  let [wordWithNoPunctuation, punctuation] = separateWordFromPunctuation(wordWithPunctuation);
  if (DIGITS.hasOwnProperty(wordWithNoPunctuation)) {
    return DIGITS[wordWithNoPunctuation] + punctuation;
  } else {
    return wordWithPunctuation;
  }
}

function separateWordFromPunctuation(wordWithPunctuation) {
  let wordWithNoPunctuation =  wordWithPunctuation;
  let punctuation = '';
  if (wordWithPunctuation.includes('.')) {
    wordWithNoPunctuation = wordWithPunctuation.slice(0, wordWithPunctuation.length - 1);
    punctuation = wordWithPunctuation[wordWithPunctuation.length - 1];
  }
  return [wordWithNoPunctuation, punctuation];
}

function wordToDigit(sentence) {
  let words = sentence.split(' ');
  let newSentence = words.map(numberWordToDigit).join(' ');
  return newSentence;
}

console.log(wordToDigit('Please call me at five five five one two three four. Thanks.'));
// "Please call me at 5 5 5 1 2 3 4. Thanks."