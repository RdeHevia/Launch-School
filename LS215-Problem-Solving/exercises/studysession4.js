// 29min. good

//Find the length of the longest substring in the given string that is the same in reverse.

//As an example, if the input was “I like racecars that go fast”, the substring (racecar) length would be 7.

//If the length of the input string is 0, return value must be 0.

/*
INPUT: text
  - string
  - assume no other data types as arugments
  OUTPUT: length of substring that is the same in reverse.
  - number (integer)
  - palindromes can contain any type of character
  RULES:
  - no input -> 0
  - palindrome: substring that is the same in reverse
  - palindrome minimum length: 1 (1 char)
  - string empty -> return 0
  - palindromes are case sensitive: racECAR !== CAREcar
EXAMPLES:
e.g. palindrom: racecar -> reversed -> racecar
'a b-c_d' -> 1
e.g. racECAR -> palindrome? NO
DATA STRUCTURE:
  substrings: array of strings [substr1, substr2...]
ALGORITHM:
  - if input is empty string or no input provided -> return 0
  - SET substrings = findSubstrings(string)
  - SET palindromes: filter substrings that are palindromes
    **isPalindrome(string)**
  - Map the length of the palindromes into an array. Return the maximum number
============
findSubstrings(string)
I: string
O: array substrings: array of strings [substr1, substr2...]
EXAMPLE:
'abcd':
a, ab, abc, abcd
b, bc, bcd
c, cd
d
DATA STRUCTURE:
string -> split into array
ALGORITHM:
  - split string into array of characters
  - SET substrings -> map the array of characters. For a char at index idxI:
    - slice from idxI to end of array
    let leadingSubStrings = []
    - loop from 0 to end of subarray. for at char at idxJ:
      - slice and join into a string from idxI to idxJ+1
      - add to leadingSubstrings;
  - flatten substrings
  - return substrings
===============
isPalindrome:
ALGORITHM:
  - check if the string after reversing it is the same. YES -> true. NO -> false
*/

function findSubstrings2(string) {
  let chars = string.split('');
  let substrings = chars.map((_, idxI) => {
    let substringsThatStartAtIdxI = [];
    let subArrayOfChars = chars.slice(idxI);
    subArrayOfChars.forEach((_,idxJ) => {
      let substring = subArrayOfChars.slice(0, idxJ + 1).join('');
      substringsThatStartAtIdxI.push(substring);
    });
    return substringsThatStartAtIdxI;
  }).flat();

  return substrings;
}
// []
// [], a -> return [a]
// [a], b -> return [a, ab]
function findSubstringsStartingWithFirstChar(string) {
  let chars = string.split('');
  return chars.reduce((substrings, char) => {
    let substring = substrings[substrings.length - 1] || '';
    substrings.push(substring + char);
    return substrings;
  }, []);
}

console.log(findSubstringsStartingWithFirstChar('abcd'));

function findSubstrings(string) {
  let chars = string.split('');
  let substrings = chars.map((_, idxI) => {
    let substring = chars.slice(idxI).join('');
    return findSubstringsStartingWithFirstChar(substring);
  }).map();

  return substrings;
}

function isPalindrome(string) {
  return string === string.split('').reverse().join('');
}

// console.log(findSubstrings('abcd'));

function lengthOfLongestPalindrome(string) {
  if (string === '' || string === undefined) return 0;
  let substrings = findSubstrings(string);
  let palindromes = substrings.filter(isPalindrome);
  return Math.max(...palindromes.map(palindrome => palindrome.length));
}

// // TEST CASES
// // ''
// console.log(lengthOfLongestPalindrome('')); // 0
// // no input
// console.log(lengthOfLongestPalindrome()); // 0
// // // palindrome 1 char
// console.log(lengthOfLongestPalindrome('a b-c_d')); // 1
// // // 1 palindrome
// console.log(lengthOfLongestPalindrome('racecar')); // 7
// console.log(lengthOfLongestPalindrome('aa')); // 2
// // case sensitive
// console.log(lengthOfLongestPalindrome('raceCAR')); // 1
// console.log(lengthOfLongestPalindrome('abBA')); // 1
// console.log(lengthOfLongestPalindrome('abbA')); // 2
// // multiple palindromes
// console.log(lengthOfLongestPalindrome('abba')); // 4
// console.log(lengthOfLongestPalindrome(' *abba* ')); // 8
// console.log(lengthOfLongestPalindrome('abba !ccdddcc! efe ')); // 11
// //
// console.log(lengthOfLongestPalindrome('I like racecars that go fast')); // 7