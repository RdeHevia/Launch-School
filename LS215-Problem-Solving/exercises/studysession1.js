/*
TIME: 26min GOOD!
*/

/*The objective is to return all pair of numbers from a given array of numbers that have a difference of 2.
The result array should be sorted in ascending order of values.
Assume there are no duplicate numbers in the array.
The order of the numbers in the input array should not matter.
*/

/*
INPUT: array of numbers
  - consider any real number
  - assume elements of the array are always numbers
  - elements: NaN or Infinity -> don't handle
  - empty array: return empty array
  - retur null if wrong data type
  - assume no duplicated numbers
OUTPUT: array of pairs
  - pair: array of 2 numbers
RULES:
  - order of input array doesn't matter
  - result array should be sorted in ascending order
  - numbers without a pair are not included in the returned array
EXAMPLE:
  [1, 2, 3, 4] -> [[1, 3], [2, 4]]
  1:
    2 -> delta = 1
    3 -> delta = 2 <-
    4 -> delta = 1
  2:
    1 -> delta = 1
    3 -> delta = 1
    4 -> delta = 2 <-
  3:
    1 <- but [1,3] already exist -> so we dont add it
    2
    4
  [1, 2, 3] -> [[1,3]]
DATA STRUCTURE:
  - array
ALGORITHM:
  - check input is an array. no -> return null
  - create a copy of the array and sort it in ascending order
  - declare pairs = []
  - LOOP from 0 until idx < (array.length - 1). For each iteration
    - comparingNumber = array[0]
    - Filter the number that differ in 2 units from comparing number. 
    - if no pair found -> don't add anything
    - add [comparingNumber, number] to the pairs array
    - shift the first element of the array (index 0)
  - return the array
*/

function differenceOfTwo (numbers) {
  if (!Array.isArray(numbers)) return null;
  let sortedNumbers = numbers.slice().sort((a,b) => a - b);
  let pairs = [];

  for (let round = 0; round < numbers.length; round += 1) {
    let firstPair = sortedNumbers[0];
    let secondPair = sortedNumbers.filter(number => (number - firstPair) === 2)[0];
    if (secondPair) pairs.push([firstPair, secondPair]);
    sortedNumbers.shift();
  }

  return pairs;
}

// // TEST CASES
// // 1 number
console.log(differenceOfTwo([1])); // []
// no matching pairs
console.log(differenceOfTwo([1,4])); // []
// all matching pairs and order doesn;t matter
console.log(differenceOfTwo([1, 2, 3, 4]));
console.log(differenceOfTwo([3, 2, 1, 4]));
console.log(differenceOfTwo([3, 4, 1, 2]));
// [[1, 3], [2, 4]]
console.log(differenceOfTwo([2, 4, 6]));
//[[2,4], [4,6]]
// negative numbers
console.log(differenceOfTwo([-111, -113, -109]));
// [[-113, -111], [-111, -109]]
// decimal numbers
console.log(differenceOfTwo([10.5, 12.5, 16.73, 14.73]));
// [[10.5, 12.5], [14.73, 16.73]]
// mixed
console.log(differenceOfTwo([1, 2.3, -1, 4.3]));
// [[-1, 1], [2.3, 4.3]]
// no matching pairs, some not
console.log(differenceOfTwo([1, 2, 3]));
// [1,3]
// empty array
console.log(differenceOfTwo([])); // []
// wrong data types
console.log(differenceOfTwo({})); // null
console.log(differenceOfTwo(true)); // null
console.log(differenceOfTwo('123')); // null
console.log(differenceOfTwo((x) => x)); // null
console.log(differenceOfTwo()); // null
console.log(differenceOfTwo(undefined)); // null
console.log(differenceOfTwo(null)); // null
