/*
myForEach
INPUT: (array, callback)
OUTPUT: undefined
RULES: it can mutate variables in the outer scope
ALGORITHM:
  1. For each element of the array, call the callback with the element passed
    as argument
*/


function myForEach(array, callback) {
  for (let idx = 0; idx < array.length; idx += 1) {
    callback(array[idx], idx, array);
  }
}

let min = Infinity;
let getMin = value => (min = value <= min ? value : min);
myForEach([4, 5, 12, 23, 3], getMin);
console.log(min);                        // 3
