/*
I: string
O: boolean
  - all characters are unique -> true
  - 1 or more characters are repeated -> false
RULES:
  - ignore spaces
  - case insensitive
ALGORITHM:
  0. Declare an empty string
  1. Remove spaces from the string.
  2. Iterate over all the character of the modified string. For each character
     check if it's repeated:
      - check if the declared string includes the character:
        - yes -> return false;
        - no -> add the character to the declared string. continue
  3. Return true
*/

function isAllUnique(string) {
  let appearances = '';

  let stringWithNoSpacesAndLowerCased = string.replace(' ','').toLowerCase();

  for (let idx = 0; idx < stringWithNoSpacesAndLowerCased.length; idx += 1) {
    let char = stringWithNoSpacesAndLowerCased[idx];
    if (appearances.includes(char)) return false;
    appearances += char;
  }

  return true;
}

console.log(isAllUnique('The quick brown fox jumped over a lazy dog'));  // false
console.log(isAllUnique('123,456,789'));                                 // false
console.log(isAllUnique('The big apple'));                               // false
console.log(isAllUnique('The big apPlE'));                               // false
console.log(isAllUnique('!@#$%^&*()'));                                  // true
console.log(isAllUnique('abcdefghijklmnopqrstuvwxyz'));                  // true