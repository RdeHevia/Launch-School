/*
INPUT: number
OUTPUT: maximum rotation number
EXAMPLE:
735291 -> 3 52917 -> 3 2 9175 -> 32 1 759 -> 321 5 97 -> 3215 7 9
6 digits, 6 rotations
iteration 0: number of digits fixed: 0, digits to rotate 6
iteration i: number of digits fixed: i, digits to rotate 6 - i
ALGORITHM:
1. Determine the number of digits.
2. Iterate FROM idx= number of digits TO idx = 1, idx--
  - Call the function rotateRightmostDigits
4. Return the rotated number
*/

function rotateArray(array) {
  if (!Array.isArray(array)) {
    return undefined;
  }

  let rotatedArray = array.slice();
  rotatedArray.push(rotatedArray.shift());
  return rotatedArray;
}

function rotateRightmostDigits(number, count) {
  let digits = String(number);
  let numberOfDigitsThatRemain = digits.length - count;
  let digitsThatRemain = digits.slice(0, numberOfDigitsThatRemain);
  let digitsToRotate = digits.slice(numberOfDigitsThatRemain);
  let digitsRotated = rotateArray(digitsToRotate.split('')).join('');
  return Number(digitsThatRemain + digitsRotated);
}

function maxRotation(number) {
  let numberOfDigits = String(number).length;
  let rotatedNumber = number;
  for (let count = numberOfDigits; count >= 1; count -= 1) {
    rotatedNumber = rotateRightmostDigits(rotatedNumber, count);
  }
  console.log(rotatedNumber);
  return rotatedNumber;
}

maxRotation(735291);          // 321579
maxRotation(3);               // 3
maxRotation(35);              // 53
maxRotation(105);             // 15 -- the leading zero gets dropped
maxRotation(8703529146);      // 7321609845