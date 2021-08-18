/*
INPUT: array, callback(accumulator,currentValue),initialValue
OUTPUT: element of some type
ALGORITHM:
  1. If initialValue is provided: make accumulator = initialValue.
    Else: accumulator = 0st element of the array
  2. For each element of the array
    currentValue = element of the array
    accumulator = callback(accumulator, currentValue)
  3. return accumulator
*/

function reduce(array, callback, initialValue) {
  let accumulator;
  let initialIndex;

  if (initialValue !== undefined) {
    accumulator = initialValue;
    initialIndex = 0;
  } else {
    accumulator = array[0];
    initialIndex = 1;
  }

  for (let idx = initialIndex; idx < array.length; idx += 1) {
    let currentValue = array[idx];
    accumulator = callback (accumulator, currentValue);
  }

  return accumulator;
}

let numbers = [1, 2, 3, 4, 5];
console.log(reduce(numbers, (accum, number) => accum + number));   // => 15
console.log(reduce(numbers, (prod, number) => prod * number));     // => 120
console.log(reduce(numbers, (prod, number) => prod * number, 3));  // => 360
console.log(reduce([], (accum, number) => accum + number, 10));    // => 10
console.log(reduce([], (accum, number) => accum + number));
// => undefined

let stooges = ["Mo", "Larry", "Curly"];
console.log(reduce(stooges, (reversedStooges, stooge) => {
  reversedStooges.unshift(stooge);
  return reversedStooges;
}, []));
// => ["Curly", "Larry", "Mo"]