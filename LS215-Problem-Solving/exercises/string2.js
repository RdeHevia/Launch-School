// Write a function that takes an array of strings and returns an array of the 
// same string values, but with all vowels (a, e, i, o, u) removed.
/*
INPUT: array of strings
OUTPUT: array of strings
  * with all the vowels removed
REQUIREMENTS:
  - remove vowels from the strings of the array.
  - vowels: both lower and uppercase
  - assume the array is not empty
  - assume the input is always an array of strings
  - strings can be empty
EXAMPLES:
['abadefee','AbcaAx', 'a-?e*#'] -> ['bdf', 'bcx', '-?*#']
['aeiou'] -> ['']
[''] -> ['']
ALGORITHM:
  - Map every string of the array into a new array. For each string:
    - match the vowels (case insensitive)
    - remove them from the string
    - the new string is added to the new array
  - return the new array

*/

function removeVowels (arrayOfStrings) {
  return arrayOfStrings.map(string => string.replace(/[aeiou]/gi, ''));
}

// both lower and uppercase, 1 string
console.log(removeVowels(['aAeEiIoOuU'])); // ''
console.log(removeVowels(['a!A-e!E-i!I-o!O-u!U'])) // !-!-!-!-!
// both lower and uppercase, several strings
console.log(removeVowels(['aAeEiIoOuU', 'a!A-e!E-i!I-o!O-u!U'])); // ['', '!-!-!-!-!']
// string with no vowels, 1 string
console.log(removeVowels(['QWrTyP!@'])) // QWrTyP!@'
// empty string
console.log(removeVowels([''])) // ''
// combination with, without vowels, empty string
console.log(removeVowels(['', 'aAeEiIoOuU', 'QWrTyP!@'])) // ['', '', 'QWrTyP!@']

