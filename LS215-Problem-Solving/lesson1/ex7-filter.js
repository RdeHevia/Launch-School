/*
INPUT: array, callback
OUTPUT: new array
ALGORITHM:
  0. Create an empty array
  1. Iterate over the elements of the argument array. For each element:
    1.1. Pass the element as argument to the callback
    1.2. If the callback returns truthy -> add to the new array. falsy -> continue
*/

function myFilter(array, callback) {
  let filtered = [];

  for (let idx = 0; idx < array.length; idx += 1) {
    let value = callback(array[idx], idx, array);
    if (value) filtered.push(array[idx]);
  }

  return filtered;
}

let isPythagoreanTriple = function (triple) {
  // eslint-disable-next-line max-len
  return Math.pow(triple.a, 2) + Math.pow(triple.b, 2) === Math.pow(triple.c, 2);
};
console.log(
  myFilter([{ a: 3, b: 4,  c: 5 },
            { a: 5, b: 12, c: 13 },
            { a: 1, b: 2,  c: 3 },], isPythagoreanTriple)
);

// returns [ { a: 3, b: 4, c: 5 }, { a: 5, b: 12, c: 13 } ]