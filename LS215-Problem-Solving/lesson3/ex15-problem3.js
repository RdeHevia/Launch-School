/*
INPUT: word string
OUTPUT: boolean
  - true: blocks are not repeated
  - false: otherwise
REQUIREMENTS:
 - assume a word is composed of letters
 - empty string -> null
 - case insentive

 - block: it's composed of two letters
 - only 1 letter of a block can be used when the block is used
 - each block can only be used once
EXAMPLES:
BATCH: true
  B:O
  N:A
  G:T
  C:P
  H:U
BUTCH: false
  B:O
  H:U <-
  G:T
  C:P
  H:U <-
BATCH.: false (. is not part of any block)

DATA STRUCTURE:
  - input -> array of characters (letters)
  - blocks: array of arrays
    [block1, block2...]; block: [B, O]
ALGORITHM:
 - Check if string is empty -> YES -> return null
  - Declare the blocks array (array of arrays)
 - make all the letters uppercase
 - split the string into an array of characters (letters)
 - Loop over the letters of the string. For each letter
  - find the index of the block that contains that letter. 
    - If no index is found -> return false
  - remove the block at the index returned -> splice
 - if the loop ends -> we can write the word with the blocks without repeating them
    -> return true
--------------------

*/

function testEqual(actual, expected) {
  console.log(`${actual === expected}, actual: ${actual}, expected: ${expected}`);
}

function isBlockWord(word) {
  if (word === '') return null;

  let blocks = [
    ['B','O'], ['X','K'], ['D', 'Q'], ['C','P'], ['N','A'],
    ['G','T'], ['R','E'], ['F','S'], ['J','W'], ['H','U'],
    ['V', 'I'], ['L', 'Y'], ['Z', 'M']
  ];

  let characters = word.toUpperCase().split('');

  for (let idx = 0; idx < characters.length; idx += 1) {
    let character = characters[idx];
    let blockIndex = blocks.findIndex(block => block.includes(character));
    if (blockIndex === -1) return false;
    blocks.splice(blockIndex,1);
  }

  return true;
}

// TEST CASES
// empty string, null
testEqual(isBlockWord(''), null);
// lowercase, true
testEqual(isBlockWord('batch'), true);
testEqual(isBlockWord('jest'), true);
// uppercase, true
testEqual(isBlockWord('BATCH'), true);
// mix lower and uppercase, true
testEqual(isBlockWord('BaTcH'), true);
// mix lower and uppercase, false
testEqual(isBlockWord('bUtCh'), false);