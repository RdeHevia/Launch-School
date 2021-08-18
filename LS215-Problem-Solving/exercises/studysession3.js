//////////
// 30 min total
// You are given an array of strings and an integer k. Your task is to return the first longest string consisting of k consecutive strings taken in the array.

// #Example: longest_consec(["zone", "abigail", "theta", "form", "libe", "zas", "theta", "abigail"], 2) --> "abigailtheta"
/*
INPUT: (array of strings, k (integer))
OUTPUT: string
  - it's composed of the concatenation of the consecutive strings of the array
  - of all the possible combinations, it's the longest one
RULES:
  - multiple longest strings (strings have the same length) -> return any
  - return '' if:
    - input array is empty []
    - k > number of elements of the array
    - k <= 0
  - k:
    - decimal (3.14): assume not provided as input
    - string '4': assume not provided as input
    - no input provided: return ''
    - k = undefined -> return ''
  array of strings:
    - wrong data: return null
    - elements: strings can contain any character
EXAMPLES:
["zone", "abigail", "theta", "form", "libe", "zas", "theta", "abigail"]
[ 4, 7, 5, 4, 4, 3, 5, 7]
DATA STRUCTURE:
subsequentConcatenations: [string, string...]
ALGORITHM:
  - check the array is in fact an array. NO -> return null
  - check k >= 0 AND k < array.length. NO -> return ''
  * SET subsequentConcatenations = findSubsequentConcatenations(array, k)
  - sort the concatenions in DESC order by nbr of characters -> return the first one

=====================
DS: array
EXAMPLE:
['a','b','c', 'd'], k=3:
a: a, ab, abc
b: b, bc, bcd
loop limits: idx = 0; idx <= 1 = length - k
EXAMPLE:
['a','b','c', 'd', 'e', 'f', 'g'], k=3:
a: a, ab, abc
b: b, bc, bcd
c:
d:
e:
loop limits: idx = 0; idx <= 4 = length - k
ALGORITHM:
  - SET concatenations = []
  - iterate over the elements of the array (idx = 0; idx <= 1 = length - k). for an element at index idxI:
    - slice from idxI to idxI + k + 1 of the array -> subArray
    - iterate over the elements of the subarray. for an element at index idxJ:
      - concatenate all elements from 0 to idxJ
      - add the concatenation to concatenations
  - return concatenations
===============
ALGORITHM:
  - check the array is in fact an array. NO -> return null
  - check k >= 0 AND k < array.length. NO -> return ''
  - map the input array to stringLengths with elements equal to the length of the input array
  - SET concatenationsLengths = []
  - iterate over the elements of stringLengths from idx = 0 to idx <= stringLengths.length - k
    - sum from idx to idx + k
    - add to concatenationsLength
  - find maximum length
  - find index of maximum length
  - concatenate strings from input array from index found to index + k
  - return the string
*/

function longestConcatenation(array, k) {
  if (!Array.isArray(array)) return null;

  if (k <= 0 || k > array.length || k === undefined) return '';

  let stringLengths = array.map(string => string.length);
  let concatenationsLength = [];

  for (let idx = 0; idx <= stringLengths.length - k; idx += 1) {
    let totalLength = stringLengths
      .slice(idx, idx + k)
      .reduce((sum, length) => sum + length);
    concatenationsLength.push(totalLength);
  }

  let maximumLength = Math.max(...concatenationsLength);
  let longestConcatenationIndex = concatenationsLength.indexOf(maximumLength);
  return array
    .slice(longestConcatenationIndex, longestConcatenationIndex + k)
    .reduce ((concat, str) => concat + str);
}

// TEST CASES
// wrong data type
console.log(longestConcatenation({},1)); // null
console.log(longestConcatenation(123,1)); // null
console.log(longestConcatenation('abc',1)); // null
console.log(longestConcatenation(true,1)); // null
console.log(longestConcatenation(undefined,1)); // null
console.log(longestConcatenation(null,1)); // null
console.log(longestConcatenation((x) => x ,1)); // null
// empty array
console.log(longestConcatenation([],1));
console.log(longestConcatenation([],0));
// // k > array.length
console.log(longestConcatenation(['a'],2)); // ''
// // k <= 0
console.log(longestConcatenation(['a'],0)); // ''
console.log(longestConcatenation(['a'],-100)); // ''
// // input missing
console.log(longestConcatenation()); // null
console.log(longestConcatenation(['a'])); // null
// array with empty strings
console.log(longestConcatenation(['', '', '', ''],3)); // ''
// 1 element
console.log(longestConcatenation(['a'],1)); // 'a'
// multiple elements
console.log(longestConcatenation(["zone", "form", "libe", "zas", "theta", "abigail"],1)); // "abigail"
console.log(longestConcatenation(["zone", "form", "libe", "zas", "theta", "abigail"],2)); // "abigailtheta"
console.log(longestConcatenation(["zone", "form", "libe", "zas", "theta", "abigail"],3)); // 'zasthetaabigail'
// // multiple concated substrings with the same number of characters
console.log(longestConcatenation(["zone", "abigail", "theta", "form", "libe", "zas", "theta", "abigail"],2)); // "abigailtheta"
