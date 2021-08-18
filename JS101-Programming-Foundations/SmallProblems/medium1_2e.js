/*
INPUT: number
OUTPUT: number
RULES:
  rotate the last count digits of a number
EXAMPLE:
735291, 1 -> 725291

735291, 4 -> 73 5291 -> 73 (5)291 + 5 -> 732915
ALGORITHM;
1. Convert the number into a string
2. Separate the digits to rotate from the ones that remain as is
3. Rotate the digits
4. Join together the strings. Convert it to number
5. return new number
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

console.log(rotateRightmostDigits(735291, 1));      // 735291
console.log(rotateRightmostDigits(735291, 2));      // 735219
console.log(rotateRightmostDigits(735291, 3));      // 735912
console.log(rotateRightmostDigits(735291, 4));      // 732915
console.log(rotateRightmostDigits(735291, 5));      // 752913
console.log(rotateRightmostDigits(735291, 6));      // 352917