/*
Write a function that takes two arrays as arguments and returns an array 
containing the union of the values from the two. There should be no duplication 
of values in the returned array, even if there are duplicates in the original 
arrays. You may assume that both arguments will always be arrays.

Example:

Copy Code
union([1, 3, 5], [3, 6, 9]);    // [1, 3, 5, 6, 9]
*/


/*
INPUT: 2 arrays
  - elements: assume primitive values
OUTPUT: 1 array with the elements of both arrays
  - don't include duplicated elements (even if one has duplicated values)
RULES:
  - element order: it doesn't matter
  - 1 or 2 arguments not provided -> return null
  - NaN or infinity: yes
  - can't mutate input arrays
EXAMPLE:
  [2, 1, 1] [5, 2, 6, 5] -> [2, 1, 5, 2, 6]
  [][1] -> [1]
  [][] -> []
DATA STRUCTURE:
  combinedArrays = []
  combinedArraysWithNoDuplicates = []
ALGORITHM:
  - if 1 or 2 arguments not passed -> return null
  - SET combinedArrays = concatenate both arrays into one
  - SET combinedArraysWithNoDuplicates = removeDuplicates(combinedArrays);
  - return combinedArraysWithNoDuplicates
==================
removeDuplicates
EXAMPLE:
[1,2,1]
DATA STRUCTURE: 
  uniqueElements = []
ALGORITHM:
  - iterate over the elements of the input array
    - check if uniqueElements includes the element
      - no -> add to uniqueElements
      - yes -> don't add
*/

function removeDuplicates(array) {
  let uniqueElements = [];

  array.forEach(element => {
    if (!uniqueElements.includes(element)) uniqueElements.push(element);
  });

  return uniqueElements;
}


function combineArrays(array1, array2) {
  if (array1 === undefined || array2 === undefined) return null;
  let combinedArrays = [...array1, ...array2];
  return removeDuplicates(combinedArrays);
}


// TEST CASES
// 1 or 2 arguments not provided
console.log(combineArrays()); // null
console.log(combineArrays([1])); // null
// // empty arrays
console.log(combineArrays([], [])); // []
// // 1 array empty
console.log(combineArrays([1], [])); // [1]
console.log(combineArrays([], [1])); // [1]
// // no mutation
let arr1 = [1];
let arr2 = [2];
combineArrays(arr1, arr2);
console.log(arr1);
console.log(arr2);
// // no duplication
console.log(combineArrays([6,2, 1, NaN, Infinity], [90, -7, 3.14])); // [6, 2, 1, NaN, Infinity 90, -7, 3.14]
console.log(combineArrays([6, true, 'a'], [undefined, null])); // [6, true, 'a', undefined, /ab/, null]
// // duplication
console.log(combineArrays([6,2, 1, NaN, Infinity, Infinity], [90, -7, 6, NaN, 3.14])); // [6, 2, 1, NaN, Infinity 90, -7, 3.14]
console.log(combineArrays([undefined, 6, true, 'a', true], [undefined, 'a', null, null, true, 'a'])); // [6, true, 'a', undefined, /ab/, null]
