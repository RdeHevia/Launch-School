/*
INPUT: number, number of digits to rotate
OUTPUT: number
EXAMPLE:
  735291, 1: 735291
  735291, 2: 7352 91 -> 7352 (1)91 -> 7352 19 ->  735219
  735291, 3: 735 291 -> 735 291 -> 735 (2)91 2 -> 735 912
ALGORITHM:
  1. Separate the digits that are going to be rotated from the ones that remain
    the same
  2. Rotate the digits
  3. Join the non-rotated with rotated digits
  4. Return new number
rotateDigits()
  1. Drop the first digit and append it to the last of the number
*/

function rotateRightmostDigits(number, count) {
  let digits = String(number);
  let sliceLimit = digits.length - count;
  let noRotatedDigits = digits.slice(0,sliceLimit);
  let digitsToRotate = digits.slice(sliceLimit);

  let rotatedDigits = rotateDigits(digitsToRotate);
  return Number(noRotatedDigits + rotatedDigits);
}

function rotateDigits(digits) {
  let arrayOfDigits = digits.split('');
  arrayOfDigits.push(arrayOfDigits.shift());
  return arrayOfDigits.join('');

}

console.log(rotateRightmostDigits(735291, 1));      // 735291
console.log(rotateRightmostDigits(735291, 2));      // 735219
console.log(rotateRightmostDigits(735291, 3));      // 735912
console.log(rotateRightmostDigits(735291, 4));      // 732915
console.log(rotateRightmostDigits(735291, 5));      // 752913
console.log(rotateRightmostDigits(735291, 6));      // 352917