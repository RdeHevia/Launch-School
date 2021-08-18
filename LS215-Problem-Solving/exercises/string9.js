// Write a function that takes two arguments, a word and a string of text, and 
// returns an integer representing the number of times the word appears in the text.

// You may assume that the word and text inputs will always be provided, and that
//  all word breaks are spaces. Thus, some words will include punctuation such 
//  as periods and commas.

/*
INPUT: word, text
  - string
  - composed of words
OUTPUT: number of appearances
  - number (integer)
RULES:
  - word: series of characters separated by spaces
    - hello! Raul., word1: hello1, word2: Raul.
  - matching word: case insensitive
  - empty word -> 0
  - empty text -> 0
  - wrong data types (assume not)
EXAMPLES:
 'hello, Raul!. Hello again'
  - hello, -> 1
  - hello -> 1
  - Hello -> 1
DATA STRUCTURE:
  - string
ALGORITHM:
  - if matching word is an empty string -> return 0
  - lowercase the matching word
  - lowercase the text
  - add to an array all the matching words in the text
  - if no match -> return 0
  - count the number of elements. return the number of elements (number of appearances)
*/

function searchWord(word, text) {
  if (word === '') return 0;
  let searchRegex = new RegExp(`${word}(\\s|$)`,'gi');
  return (text.match(searchRegex) || []).length;
}

// TEST CASES
const text = 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Sed quis autem vel est, iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?';
// empty word
console.log(searchWord('','hello, Raul!. Hello again. hello')); // 0
// empty text
console.log(searchWord('hello','')); // 0
// case insensitive
console.log(searchWord('hello','hello Hello HELLO heLlO')); // 4
console.log(searchWord('HELLO','hello Hello HELLO heLlO')); // 4
console.log(searchWord('hEllO','hello Hello HELLO heLlO')); // 4
// words include special characters (e.g. hello, is a word)
console.log(searchWord('hello,','hello, Raul!. Hello again. hello')); // 1
console.log(searchWord('hello','hello, Raul!. Hello again. hello')); // 2
console.log(searchWord('hello', 'hello!')); // 0
// long text
console.log(searchWord('sed', text));      // 3