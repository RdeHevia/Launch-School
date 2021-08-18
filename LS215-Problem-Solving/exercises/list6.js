// Write a function that returns a list of all substrings of a string. Order 
// the returned list by where in the string the substring begins. This means that 
// all substrings that start at index position 0 should come first, then all 
// substrings that start at index position 1, and so on. Since multiple substrings 
// will occur at each position, return the substrings at a given index from shortest 
// to longest.

// You may (and should) use the leadingSubstrings function you wrote in the 
// previous exercise:

/*
input: string
OUTPUT: array of substrings
  - contains ALL possible substrings of an string
EXAMPLE:
hello:
[h, he, hel, hell, hello]
[e, el, ell, ello]
[l, ll, llo]
[l, lo]
[o]
DATA STRUCTURE:
  - input -> array
ALGORITHM:
  - convert the string into an array
 - map the characters of the string. for each character:
  - slice an array from that character to the end
  - convert the array into a string
  - find all the substrings of that substring (leadingSubString).
    They should be sorted from shortest to longest.
  - add the resultant array to the new array
 - flat the array
 - return it
-----------------
leadingSubString:
INPUT: string
OUTPUT: array of substrings that start with the first character
EXAMPLE:
hello: [h, he, hel, hell, hello]
ello: [e, el, ell, ello]
...
DATA STRUCTURE:
  input -> array
ALGORITHM:
  - conver the string into an array
  - map the chars of the string. for each character:
    - slice a subarray from index 0 to that character
    - join the characters together into a string
    - add the resultant string as an element of the array
  - return the new array
*/

function leadingSubstrings(string) {
  let chars = string.split('');

  return chars.map((_,idx) => chars.slice(0, idx + 1).join(''));
}

function substrings(string) {
  let chars = string.split('');
  return chars
    .map((_,idx) => {
      let substring = chars.slice(idx).join('');
      return leadingSubstrings(substring);
    }).flat();
}

console.log(substrings('abcde'));

// returns
// [ "a", "ab", "abc", "abcd", "abcde",
//   "b", "bc", "bcd", "bcde",
//   "c", "cd", "cde",
//   "d", "de",
//   "e" ]