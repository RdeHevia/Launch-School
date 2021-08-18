/*
Given an array of strings, return an array of
all characters that show up in all strings within the given array
(including duplicates). For example, if a character occurs 3 times in all
strings but not 4 times, you need to include that character 3 times in the final
answer.
*/

/*
INPUT: array of strings
OUTPUT: array of characters that appear in all the strings
  - the character should be repeated as many times it appears in EVERY
    string
RULES:
  - INPUT:
    - elements
      - alphanumeric (lower and uppercase)
      - is 'a' === 'A' -> YES
      - always strings (empty strings ok)
    - no character is present in all the arrays -> return []
    - wrong data type: assume not
    - no argument passed -> return null
    - ['a',,,'b'] -> assume not (but explore)
    - [] -> []
  OUTPUT:
    - chars should be alphabetically ordered

  
EXAMPLE:
['ab', 'ac', 'da'] -> ['a']
['aaab', 'aac', 'ada'] -> ['a', 'a']
['a','b'] -> []
['a',,,'b'] ??
['aabc'] -> ['a', 'a', 'b', 'c']
*/

/*
DATA STRUCTURE:
  - lowerCaseStrings: [str1, str2...]
  - usedUniqueChars: [char1, char...]
ALGORITHM:
  - empty array or no argument passed -> return []
  - lowerCaseStrings: map arrayOfStrings with each string maded lowercase
  * usedUniqueChars: get all the unique chars used in the input array
  - appearances = []
  - iterate over usedUniqueChars. For each char:
    - minimuNumberOfApperances(char, lowerCaseStrings)
    - add the char to arr as many times as indicated by minNumberOApperances
*/
/*
['aaab', 'aac', 'ada'] -> [[a, a, a], [a, a], [a, a]]
*/
function repeatedChars(arrayOfStrings) {
  if (arrayOfStrings === undefined || arrayOfStrings === []) return [];

  let lowerCaseStrings = arrayOfStrings.map(string => string.toLowerCase());

  let uniqueChars = getUniqueChars(lowerCaseStrings);

  let appearances = [];

  uniqueChars.forEach(char => {
    let charApperance = minimuNumberOfApperances(char, lowerCaseStrings);
    appearances.push(...(new Array(charApperance).fill(char)));
  });

  return appearances.sort();
}
/*
DS: array
ALGO:
  - uniqueChars: []
  - iterate over the strings of the array. for each one
    - split the string into chars. iterate over them. for each one:
      - if uniqueChars doesnt include the char -> add it to uniqueChars
  - return  uniqueChars
*/
function getUniqueChars (arrayOfStrings) {
  let uniqueChars = [];

  arrayOfStrings.forEach(string => {
    string.split('').forEach(char => {
      if (!uniqueChars.includes(char)) uniqueChars.push(char);
    });
  });

  return uniqueChars;
}
/*
ALGO:
  - map the array of strings with the count for the char
  - return the minimum count
*/
function minimuNumberOfApperances(char, arrayOfStrings) {
  return Math.min(...arrayOfStrings.map(string => (string.match(new RegExp(char,'g')) || []).length));
}

// console.log(minimuNumberOfApperances('a', ['','aa','aaa']));

// // TEST CASES
// []
console.log(repeatedChars([])); //[]
// // no argument passed
console.log(repeatedChars()); //[]
// // empty strings
console.log(repeatedChars([''])); //[]
console.log(repeatedChars(['','',''])); //[]
// // 1 single string
console.log(repeatedChars(['ab1a1'])); //[1, 1, a, a, b]
console.log(repeatedChars(['ab1A1'])); //[1, 1, a, a, b]
// // no character is present in all the strings -> return []
console.log(repeatedChars(['a', 'B', '1'])); //[]
// // 1 char present
console.log(repeatedChars(['a', 'ab', '1a'])); //['a']
console.log(repeatedChars(['a', 'Ab', '1A'])); //['a']
// // multiple chars
console.log(repeatedChars(['BaaB1a', '1ba2AAb', 'aqA1a9Bb'])); //['1', 'a', 'a', 'b', 'b']