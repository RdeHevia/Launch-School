/*
CALLBACK SHAPE:
(accumulator, currentVal)
ALGORITHM:
1. If initialVal is not provided, set it to the first element.
2. Set the accumulator equal to initialVal
3. For each element of the array: accumulator = callback(accumulator, currentVal)
4. Return accumulator
*/

function myReduce(array, callback, initialVal) {
  let iterable; 
  let accumulator;
  if (!initialVal) {
    accumulator = array[0];
    iterable = array.slice(1);
  } else {
    accumulator = initialVal;
    iterable = array;
  }

  iterable.forEach(element => {
    accumulator = callback(accumulator, element);
  });

  return accumulator;
}

function add(previousValue, element) {
  let sum = previousValue + element;
  console.log(previousValue, element, sum);
  return sum;
}

let smallest = (result, value) => (result <= value ? result : value);
let sum = (result, value) => result + value;

console.log(myReduce([5, 12, 15, 1, 6], smallest));           // 1
console.log(myReduce([5, 12, 15, 1, 6], sum, 10));            // 49

let count = [1, 2, 3, 4, 5];
console.log(myReduce(count, add));