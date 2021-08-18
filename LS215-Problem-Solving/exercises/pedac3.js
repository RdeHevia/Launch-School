/*
INPUT: word
  - data type: string
  - letters can be lower or uppercase
  - other characters: 1234,#($) -> if special chars are present -> return false
  - spaces: '    hello  ' -> hello is a valid word -> remove space
  - other separation chars: \n \t -> same, remove
  - '' -> true
  - no input -> null
  - other data types -> return null
OUTPUT: boolean
  - if all letters can spelled with spelling block -> true
  - otherwise -> false
RULES:
 - assume input is always   1 word
 - word can preceed and followed by spaces or \n, \t...
 - spelling blocks:
  - case insensitive
  - if a block is used, it can't be used again
EXAMPLE:
BUTCH:
B -> B:O
U -> H:U
T -> G:T
C -> C:P
H -> H:U -> previously used -> return false
DATA STRUCTURE:
  - spellingBlocks: array [block1, block2, block3...]; block: string. e.g. B:O -> 'BO'
ALGORITHM:
  - check input is string. NO -> return null
  - remove all the separator characters and make the string uppercase -> assign to
    variable cleanedWord
  - split cleaned word into an array.
  - iterate over the characters of splitted array. for each character:
    * find the block that can be used for that character **getBlock(char, spellingBlock)
    - if the block is not found (return is null) -> return false
    - remove the block from spellingBlocks array (splice, filter)
      - no -> return false
  - return true
==========
  function spellingBlock (char, spellingBlock)
  ALGORITHM:
    - iterate over the blocks. For each block:
      - check if the block includes the char
        - yes -> return the block
        - false -> return null
*/

function getBlock(char, spellingBlocks) {
  for (let idx = 0; idx < spellingBlocks.length; idx += 1) {
    if (spellingBlocks[idx].includes(char)) return spellingBlocks[idx];
  }

  return null;
}

// console.log(getBlock('Q', ['XB', 'AC']));

function isBlockWord(word) {
  if (!(typeof word === 'string')) return null;
  let cleanedWord = word.replace(/\s/g, '').toUpperCase();
  if (cleanedWord === '') return true;

  let spellingBlocks = [
    'BO', 'GT', 'VI', 'XK', 'RE', 'DQ', 'FS', 'ZM', 'CP', 'JW', 'NA', 'HU'
  ];
  let chars = cleanedWord.split('');

  for (let idx = 0; idx < chars.length; idx += 1) {
    let char = chars[idx];
    let block = getBlock(char, spellingBlocks);
    if (!block) return false;
    spellingBlocks =
      spellingBlocks.filter(spellingBlock => block !== spellingBlock);
  }

  return true;
}

// TEST CASES
// empty string
console.log(isBlockWord(''));      // true
// no string input
console.log(isBlockWord(123));      // null
console.log(isBlockWord({}));      // null
console.log(isBlockWord([]));      // null
console.log(isBlockWord(true));      // null
console.log(isBlockWord(/abc/gi));      // null
// no input or undefined
console.log(isBlockWord());      // null
console.log(isBlockWord(undefined));      // null
// // word can be spelled (lower and uppercase tests)
console.log(isBlockWord('BATCH'));      // true
console.log(isBlockWord('batch'));      // true
console.log(isBlockWord('jest'));       // true
// // word can't be spelled (lower and uppercase tests)
console.log(isBlockWord('BUTCH'));      // false
console.log(isBlockWord('butch'));      // false
console.log(isBlockWord('butcH'));      // false
// // word with special chars
console.log(isBlockWord('BATCH!'));      // false
console.log(isBlockWord('BATCH.'));      // false
// spaces
console.log(isBlockWord('  BATCH   '));      // true
// other separators (\n, \t)
console.log(isBlockWord(' \n \t BATCH \t\t \n '));      // true
console.log(isBlockWord(' \n \t butch \t\t \n '));      // false
// only spaces and separators
console.log(isBlockWord(' \n \t     \t\t \n '));      // true
