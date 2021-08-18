function myOwnEvery(array, callback) {
  for (let idx = 0; idx < array.length; idx += 1) {
    if (!callback(array[idx], idx, array)) {
      return false;
    }
  }

  return true;
}

function areAllNumbers(array) {
  return myOwnEvery(array, isANumber);
}

function isANumber(value) {
  return typeof value === 'number' && !Number.isNaN(value);
}

console.log(areAllNumbers([1, 5, 6, 7, '1']));             // false
console.log(areAllNumbers([1, 5, 6, 7, 1]));               // true
console.log(areAllNumbers([1, 5, 6, 7, NaN]));             // false