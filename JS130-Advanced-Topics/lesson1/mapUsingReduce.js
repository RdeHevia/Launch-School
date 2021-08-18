/*
INPUT: array, callback function
OUTPUT: new array
RULES:
  - Return a new array with the elements of the input array transformed by the
    callback function
ALGORITHM:
  1. For each element of the array:
    - Call the callback with the element passed as argument
    - Add the return value of the callback to a new array
  2. Return the new array
*/

function map2(array, callback) {
  let transformedElements = [];

  for (let idx = 0; idx < array.length; idx += 1) {
    let element = array[idx];
    transformedElements.push(callback(element));
  }

  return transformedElements;
}

function map(array, callback) {
  let transformedElements = array.reduce((accumulator, currentValue) => {
    return [...accumulator, callback(currentValue)];
  },[]);

  return transformedElements;
}
let numbers = [1, 2, 3, 4, 5];
console.log(map(numbers, number => number * 3));  // => [ 3, 6, 9, 12, 15 ]
console.log(map(numbers, number => number + 1));  // => [ 2, 3, 4, 5, 6 ]
console.log(map(numbers, () => false));
// => [ false, false, false, false, false ]

let values = [1, "abc", null, true, undefined, "xyz"];
console.log(map(values, value => String(value)));
// => [ '1', 'abc', 'null', 'true', 'undefined', 'xyz' ]