// Write a function that takes a string and returns an object containing three 
// properties: one representing the number of characters in the string that are 
// lowercase letters, one representing the number of characters that are uppercase 
// letters, and one representing the number of characters that are neither.

/*
INPUT: string
OUTPUT: object
  - lowerCase: number of lowercase letters
  - upperCase: number of uppercase letters
  - neither: the rest of the characters
    - numbers
    - special characters(@$*($))
    - spaces
REQUIREMENTS
  - count the characters by type
  - object: values: numbers
EXAMPLE:
'Hi there, Raul!':
  lower case: 9
  upper case: 2
  otherChars: 4
''
  everything: 0
ALGORITHM:
 - count the total number of characters
 - match lowercase letters, and count the number of matches
 - match uppercase letters, count the number of matches
 - number of no letter chars = total - lowercase - uppercase
 - add the result as properties to the object
 - return object
*/

function countChars(string) {
  let total = string.length;
  let lowerCase = (string.match(/[a-z]/g) || []).length;
  let upperCase = (string.match(/[A-Z]/g) || []).length;
  let others = total - lowerCase - upperCase;

  return {lowerCase, upperCase, others};
}

// all lower case letters
console.log(countChars('abcde')); // {l: 5, u: 0, o: 0}
// all upper case letters
console.log(countChars('ABCDE')); // {l: 0, u: 5, o: 0}
// all no alphabetic characters
console.log(countChars('12@#$')); // {l: 0, u: 0, o: 5}
// mix
console.log(countChars('aA b1B!')); // {l: 2, u: 2, o: 3}
// empty string
console.log(countChars('')) // {l: 0, u: 0, o: 0}