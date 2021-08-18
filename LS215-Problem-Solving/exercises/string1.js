/*
Write a function that takes a string argument and returns true if all of the 
alphabetic characters inside the string are uppercase; otherwise, return false. 
Ignore characters that are not alphabetic.

I: string
O: boolean
REQUIREMENTS:
  - all letters are uppercase -> true
  - otherwise -> false
  - no alphabetic chars should be ignored
EXAMPLES:
  'ABCDE' -> true
  'AbCDE' -> false
  'ABC-DE' -> true
  '' -> false
DATA STRUCTURE:
  string
ALGORITHM:
  - Check if the string is empty. YES -> false
  - Check if there is one or more lower case letters. YES -> false. NO -> true
*/

function validateIsEqual(actual, expected) {
  console.log(`${actual === expected}, actual: ${actual}, expected: ${expected}`);
}

function isUpperCase(string) {
  if (!string.length) return false;

  return !string.match(/[a-z]/);
}

// TEST CASES
// all letters are uppercased
validateIsEqual(isUpperCase('ABCDE'),true);
// some letters are not uppercased
validateIsEqual(isUpperCase('AbCDE'), false);
// all letters are uppercased, with special chars
validateIsEqual(isUpperCase('AB-CD ED?123'), true);
// some letters are not uppercased, with special chars
validateIsEqual(isUpperCase('AB-Cd ED?123'), false);
// empty string
validateIsEqual(isUpperCase(''), false);
