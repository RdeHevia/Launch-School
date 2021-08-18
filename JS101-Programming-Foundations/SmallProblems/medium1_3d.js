/*
INPUT: number
OUPUT: number
EXAMPLE:
735291:
  1) (7)35291 7 -> 352917 // count = 6
  2) 3 (5)2917 5 -> 329175 // count = 5
  3) 32 (9)175 9 -> 321759 // count = 4
  4) 321 (7)59 7 -> 321597 // count = 3
  5) 3215 (9)7 9 -> 321579 // count = 2
  6) 32157 (9) 9 -> 321579 // count = 1
ALGORITHM:
  1. Loop from count = number of digits to 1:
  2. Rotate the right side digits per count
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

function maxRotation(number) {
  let rotatedNumber = number;
  for (let count = String(number).length; count >= 1; count -= 1) {
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