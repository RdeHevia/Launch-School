// Write a function that takes two array arguments, each containing a list of 
// numbers, and returns a new array containing the products of all combinations 
// of number pairs that exist between the two arrays. The returned array should be 
// sorted in ascending numerical order.

// You may assume that neither argument will be an empty array.
/*
INPUT: 2 arrays of numbers
OUTPUT: array of numbers
  - products of all combinations of number pairs that exist btw the two arrays
  - the array should be sorted in ascending numeric order
  - real numbers
REQUIREMENTS:
  - assume arrays are not empty
EXAMPLE:
  [1,2],[3,4] -> [1*3, 1*4, 2*3, 2*4] -> [3,4,6,8]
  [2,1],[3,4] -> .... -> [3,4,6,8]
  [3,4],[1,2] -> ... ->  [3,4,6,8]
  [2], [3,4] -> [6, 8]
  [3,4], [2] -> [6, 8]
ALGORITHM:
  - declare an empty array to store the products
  - iterate over the elements of the first array. for each element:
    - multiply that number by all the elements of the second array
    - add all the products to the result array
  - return the resultant array
*/

function allProducts3(array1, array2) {
  let products = [];

  array1.forEach(number1 => {
    products.push(...array2.map(number2 => number1 * number2));
  });

  return products.sort((a,b) => a - b);
}

function allProducts(array1, array2) {
  let products = array1
    .map(number1 => array2.map(number2 => number1 * number2))
    .flat();
  return products;
}

// TEST CASES
// arrays of same length
console.log(allProducts([3,4],[1,2])); // [3,4,6,8]
// arrays have different number of elements
console.log(allProducts([3,4],[1,2,1])); // [1,3,4,4,6,8]
// order doesn't matter
console.log(allProducts([3,4],[1,2])); // [3,4,6,8]
console.log(allProducts([1,2],[3,4])); // [3,4,6,8]
console.log(allProducts([2,1],[3,4])); // [3,4,6,8]
console.log(allProducts([1,2],[4,3])); // [3,4,6,8]
// real numbers
console.log(allProducts([-1,0,2.5],[2,3])); //[-3, -2, 0, 0, 5, 7.5]
// 1 element * many
console.log(allProducts([2],[3,4])); // [6,8]
// 1 element * 1 element
console.log(allProducts([2],[3])); // [6]