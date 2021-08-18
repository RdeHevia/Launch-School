// TIME: 32min. OK. Do again


//The maximum sum subarray problem consists in finding the maximum sum of a contiguous subsequence in an array of integers:

//maxSequence [-2, 1, -3, 4, -1, 2, 1, -5, 4]
//-- should be 6: [4, -1, 2, 1]

/*
INPUT: list of integers
  - data type: array [int1, int2...] ; integer: number
OUTPUT: maximum sum of contiguous subsequence
  - data type: number
RULES:
- input:
  - assume numbers are always within JS limits
  - don't pass any argument -> return 0
  - wrong data types -> don't handle
  - list of numbers (1, 2, 5, 6). assume not
  - empty array -> return 0
  - array elements:
    - numbers in string format: '1', '-1'. Don't handle
    - other data types: Don't handle
    - 2.34, NaN, Infity: Don't handle
    - in sumary: assume always integer numbers
  - observations:
    - all positve -> subarray is the full array
    - all negative -> subarray has only 1 element which is the maximum number
    - all zeros -> sum is zero
EXAMPLES:
[-2, 1, -3, 4, -1, 2, 1, -5, 4] -> [4, -1, 2, 1] -> 6
[-2, 1, 3]:
-2
-2, 1 -> -1
-2, 1, 3 -> 2
1 -> 1
1,3 -> 4 <-
3 -> 3
[-1, 10, -2] -> [10] -> 10
DATA STRUCTURE:
  sequences: all subarrays; [subarray1, subarray2...]; subarray[nbr1, nbr2...]
ALGORITHM:
 - if no argument passed (argument === undefined) -> return 0
 **- if the array is empty -> return 0**
 * sequences = find all the subarrays. **allSubArrays(array)**
 - sums = map the sequences array. for each subarray:
  - sum all its elements
  - add the sum as element of the new array
 - return the maximum number of the array sums
================
allSubArrays(array)
I: array
O: array of arrays
ALGORITHM:
  - SET subarrays = [];
  - loop over the elements of the array. For an element at index idxI:
    - loop from idxI + 1 to then end of the array. At iteration idxJ:
      - SET subarray = []
      - slice the input array from idxI to idxJ and add it to subarrays
    return subarrays
*/

function allSubArrays(array) {
  let subarrays = [];

  for (let idxI = 0; idxI < array.length; idxI += 1) {
    for (let idxJ = idxI + 1; idxJ <= array.length; idxJ += 1) {
      subarrays.push(array.slice(idxI, idxJ));
    }
  }

  return subarrays;
}


// ALGORITHM:
//  - if no argument passed (argument === undefined) -> return 0
//  **- if the array is empty -> return 0**
//  * sequences = find all the subarrays. **allSubArrays(array)**
//  - sums = map the sequences array. for each subarray:
//   - sum all its elements
//   - add the sum as element of the new array
//  - return the maximum number of the array sums

function maxSum(list) {
  if (list === undefined || list.length === 0) return 0;
  let sequences = allSubArrays(list);
  let sums = sequences.map(sequence => sequence.reduce((sum, num) => sum + num));
  return Math.max(...sums);
}

// TEST CASES
// no argument
console.log(maxSum()); // 0
// empty array
console.log(maxSum([])); // 0
// single number
console.log(maxSum([1])); // 1
console.log(maxSum([-2])); // -2
console.log(maxSum([0])); // 0
// positive numbers
console.log(maxSum([3, 1, 2, 5])); // 11
// negative numbers
console.log(maxSum([-3, -1, -2, -5])); // -1
// zeros
console.log(maxSum([0, 0, 0 , 0])); // 0
// all integers
console.log(maxSum([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6
console.log(maxSum([-2, 1, 3])); // 4