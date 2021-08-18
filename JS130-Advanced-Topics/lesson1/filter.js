/*
INPUT: array, callback
OUTPUT: new array
RULES:
  - new array based on thruthiness of callback for each element
ALGORITHM:
  1. Iterate over the elements of the array. For each element:
    - Call the callback with the element passed as argument
    - If the callback returns a truthy value -> add the element to the array
    - else -> continue with next element
*/

function filter(array, callback) {
  let filteredElements = [];

  for (let idx = 0; idx < array.length; idx += 1) {
    let element = array[idx];
    if (callback(element)) {
      filteredElements.push(element);
    }
  }

  return filteredElements;
}

let numbers = [1, 2, 3, 4, 5];
console.log(filter(numbers, number => number > 3)); // => [ 4, 5 ]
console.log(filter(numbers, number => number < 0)); // => []
console.log(filter(numbers, () => true));           // => [ 1, 2, 3, 4, 5 ]

let values = [1, "abc", null, true, undefined, "xyz"];
console.log(filter(values, value => typeof value === "string"));
// => [ 'abc', 'xyz' ]