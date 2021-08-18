"use strict";
/*
I: array, callback(element, index, array)
O: boolean
RULES:
  callback doesn't return any falsy value -> return true
  else -> return false
ALGORITHM:
  1. Iterate over the elements of the array.
  2. If in one of the iterations the callback returns falsy, stop the iteration
    and return false. If all the iterations are completed -> return true
*/


function myOwnEvery(array, callback) {
  for (let idx = 0; idx < array.length; idx += 1) {
    if (!callback(array[idx], idx, array)) {
      return false;
    }
  }

  return true;
}

let isAString = value => typeof value === 'string';
console.log(myOwnEvery(['a', 'a234', '1abc'], isAString));       // true