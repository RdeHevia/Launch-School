// Write a function that takes a string argument and returns a list of substrings 
// of that string. Each substring should begin with the first letter of the word, 
// and the list should be ordered from shortest to longest.
/*
INPUT: string
  - letters (lower or uppercase)
OUTPUT: array
  - all possible substrings that start with the 1st letter of the string
  - sorted from shortest to longest
REQUIREMENTS:
  - empty string -> 1 letter
EXAMPLE:
  hello:
  h
  he
  hel
  hell
  hello
  'h' -> ['h']
  '' -> []
DATA STRUCTURE:
  input -> array of characters
ALGORITHM:
 - check string is empty. YES -> return []
 - split the string into an array formed with its characters
 - map the elements (characters) of the array. for each element:
  - slice a new array btw the char at index 0 and the char of the iteration
  - join all the chars together into a string
  - add that string into the new array
- return the new array
*/

function leadingSubstring(string) {
  if (string === '') return [];

  let arrayOfChars = string.split('');

  return arrayOfChars.map((_, idx) => arrayOfChars.slice(0,idx + 1).join(''));
}

// TEST CASES
// empty string
console.log(leadingSubstring('')); // []
// 1 character
console.log(leadingSubstring('a')); // ['a']
// multiple characters, lowercase
console.log(leadingSubstring('hello')); // ['h','he','hel','hell','hello']
// mmultiple characters, uppercase
console.log(leadingSubstring('HELLO')); // same as above in uppercase
// multiple chracters, mix
console.log(leadingSubstring('hEllO')); // same as above with the corresponding case