/*
INPUT: text, key
 text:
  - string
  - lower and uppercase letters
  - other characters (numbers, punctuation, special chars)
 key:
  - number (integer >= 0)
  - it represents the shift value
OUTPUT: encrypted text
  - string format
RULES:
  letters:
  - each letter is right-shifted as many positions as indicated by the key
  - if the shifting exceeds the length of the alphabet -> it continues from
    the beggining
  - it keeps letter case
  other characters:
  - they are ignored (unchanged)
  empty string: return empty string
  text: assume is always a string
  key: assume they are always integers >= 0
EXAMPLE:
A, 3: B, C, D -> D
A-B, 3: D-E
a: d
'' -> ''
y, 5: z, a, b, c, d -> d
DATA STRUCTURE:
text: string
ALGORITHM:
 - check if text is an empty string. YES -> return ''
 - split the text into an array of chars
 - map the array of chars. for each char
  - if the char is not a letter -> add as is
  - if the char is a letter:
    - find its encrypted form **function encryptLetter(letter, key)
    - add the encrypted leter to the array
 - join all the chars together and return the array
============
encryptLetter
INPUT: letter, key
OUTPUT: letter encrypted
DATA STRUCTURE: alphabet: string
ALGORITHM:
  - determine if the letter is lower or uppercase
  - if letterIdx + key < number of letters in the alphabet
    - encryptedLetterIndex = letterIdx + key
  - otherwise:
    - encryptedLetterIndex = (letterIdx + key) - number of letters in the alphabet
  - return the letter at the given index based on the case of the input letter
EXAMPLE:
y[24], 5: 24 + 5 = 29 > 26 -> encryptedLetterIdx = 29 - 26 = 3 -> d 
*/

function letterEcrypt(letter, key) {
  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  let isLowercase = (letter === letter.toLowerCase());
  let letterIdx = ALPHABET.findIndex(alphabetLetter => alphabetLetter === letter.toUpperCase());
  let numberOfRounds = Number.parseInt((letterIdx + key) / ALPHABET.length);
  let encryptedLetterIdx = (letterIdx + key) - (numberOfRounds * ALPHABET.length);
  if (isLowercase) {
    return ALPHABET[encryptedLetterIdx].toLowerCase();
  } else {
    return ALPHABET[encryptedLetterIdx];
  }
}

function caesarEncrypt(text, key) {
  if (text === '') return '';
  return text
    .split('')
    .map(char => {
      if (char.match(/[a-z]/i)) return letterEcrypt(char, key);
      return char;
    })
    .join('');
}
// ALGORITHM:
// - Iterate over the letters of the alphabet capitalized
// - Find the encrypted key for each letter.
// - Replace all the letters of the text with that encrypted letter
// - repeat with lowercase
// - return new string
function caesarEncrypt2(text, key) {
  const upperAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerAlphabet = 'abcdefghijklmnopqrstuvwxyz';
  if (text === '') return '';
  let encryptedText = text;

  upperAlphabet.split('').forEach(letter => {
    let regex = new RegExp(letter,'g');
    let encryptedLetter = letterEcrypt(letter, key);
    encryptedText = encryptedText.replace(regex, encryptedLetter);
  });

  lowerAlphabet.split('').forEach(letter => {
    let regex = new RegExp(letter,'g');
    let encryptedLetter = letterEcrypt(letter, key);
    encryptedText = encryptedText.replace(regex, encryptedLetter);
  });

  return encryptedText;
}

// TEST CASES
// empty string
console.log(caesarEncrypt('', 0));       // ""
console.log(caesarEncrypt('', 12));       // ""
// simple shift
console.log(caesarEncrypt('A', 0));       // "A"
console.log(caesarEncrypt('A', 3));       // "D"
console.log(caesarEncrypt('a',0)); // a
console.log(caesarEncrypt('a',3)); // d
// wrap around
console.log(caesarEncrypt('y', 5));       // "d"
console.log(caesarEncrypt('a', 47));      // "v"
console.log(caesarEncrypt('a', 52));      // "a"
console.log(caesarEncrypt('a', 78));      // "a"
console.log(caesarEncrypt('Y', 5));       // "D"
console.log(caesarEncrypt('A', 47));      // "V"
// no letters
console.log(caesarEncrypt('!_.', 12));       // "!_."
// all letters
console.log(caesarEncrypt('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 25));
// "ZABCDEFGHIJKLMNOPQRSTUVWXY"
console.log(caesarEncrypt('The quick brown fox jumps over the lazy dog!', 5));
// "Ymj vznhp gwtbs ktc ozrux tajw ymj qfed itl!"

// many non-letters
console.log(caesarEncrypt('There are, as you can see, many punctuations. Right?; Wrong?', 2));
// "Vjgtg ctg, cu aqw ecp ugg, ocpa rwpevwcvkqpu. Tkijv?; Ytqpi?"
