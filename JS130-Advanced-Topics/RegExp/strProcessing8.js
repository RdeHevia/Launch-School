/*
INPUT: string
OUTPUT: array
  - ["word1 length1", "word2 length2",...]
EXAMPLE:
  cow sheep -> [cow 3, sheep 5]
  [] -> []
  undefined -> []
ALGORITHM:
  1. Find all the words of the string and store them in an array.
  2. For each word of the array, find its length and concatenate with the word
  3. Return the new array
*/

function wordLengths(sentence) {
  if ((sentence === undefined) || (sentence.length === 0)) {
    return [];
  }

  let words = sentence.split(' ');
  return words.map(word => `${word} ${word.length}`);
}

console.log(wordLengths('cow sheep chicken'));
// ["cow 3", "sheep 5", "chicken 7"]

console.log(wordLengths('baseball hot dogs and apple pie'));
// ["baseball 8", "hot 3", "dogs 4", "and 3", "apple 5", "pie 3"]

console.log(wordLengths("It ain't easy, is it?"));
// ["It 2", "ain't 5", "easy, 5", "is 2", "it? 3"]

console.log(wordLengths('Supercalifragilisticexpialidocious'));
// ["Supercalifragilisticexpialidocious 34"]

console.log(wordLengths(''));      // []
console.log(wordLengths());        // []