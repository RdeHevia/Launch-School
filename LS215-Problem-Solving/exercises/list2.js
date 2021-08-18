// Write a function that takes an array of integers between 0 and 19 and returns an
// array of those integers sorted based on the English word for each number:

// zero, one, two, three, four, five, six, seven, eight, nine, ten, eleven,
// twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen

// Do not mutate the argument.

/*
INPUT: array of integers between 0 and 19 (number)
OUTPUT: array composed of the same numbers
  - the numbers are alphabetically sorted based on their English word
REQUIREMENTS:
  - assume integers are always in number format
  - assume numbers are always between 0 and 19
  - assume input is always array
  - array:
    - 1 or more numbers
    - numbers can be repeated
  - don't mutate the argument
EXAMPLE:

[1,2,3] -> [1, 3, 2]
['one','two','three']
[1, 15, 8] -> [8, 15, 1]
['one', 'fifteen', 'eight']
[1] -> [1]
[1,2,3,2, 3] -> [1, 3, 3, 2, 2]

DATA STRUCTURE:
input: a new copy of the array
number words: object
  {
    1: one,
    2: two,
    ...
  }
ALGORITHM:
 - map the numbers of the input array into their english word
 - sort the array with the word numbers
 - map the sorted array back to numbers ***keyFromValue***
 - return the new array
--------------------
function keyFromValue
INPUT: value, object
OUTPUT: key
ALGORITHM:
  - Iterate over all the key-value pairs of the object
  - Once the value is found, return the key
  - If the value is not found, return null
*/

function keyFromValue(value, object) {
  for (let key in object) {
    if (value === object[key]) return key;
  }
  return null;
}

// const NUMBER_WORD = {
//   0: 'zero', 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six',
//   7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten'
// };

// console.log(keyFromValue('nine', NUMBER_WORD));

function sortByWord (numbers) {
  const NUMBER_WORD = {
    0: 'zero', 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six',
    7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten', 11: 'eleven', 12: 'twelve',
    13: 'thirteen', 14: 'fourteen', 15: 'fifteen', 16: 'sixteen',
    17: 'seventeen', 18: 'eighteen', 19: 'nineteen'
  };

  let wordNumbersSorted = numbers.map(number => NUMBER_WORD[number]).sort();
  return wordNumbersSorted
    .map(wordNumber => +keyFromValue(wordNumber, NUMBER_WORD));
}

// TEST CASES
// empty array
console.log(sortByWord([])); // []
// one number
console.log(sortByWord([19])); // [19]
// multiple numbers
console.log(sortByWord([1, 2, 3])); // [1, 3, 2]
console.log(sortByWord([1, 15, 8])); // [8, 15, 1]
// multiple numbers repeated
console.log(sortByWord([1, 2, 3, 2, 3])); // [1, 3, 3, 2, 2]
// input array is not mutated
let arr = [1, 2, 3];
let arrResult = sortByWord(arr);
console.log(arr); // [1, 2, 3]
console.log(arrResult); // [1, 3, 2]