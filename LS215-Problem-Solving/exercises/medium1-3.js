// Take the number 735291 and rotate it by one digit to the left, getting 352917. 
// Next, keep the first digit fixed in place and rotate the remaining digits to get
//  329175. Keep the first two digits fixed in place and rotate again to get 321759.
//   Keep the first three digits fixed in place and rotate again to get 321597. 
//   Finally, keep the first four digits fixed in place and rotate the final two 
//   digits to get 321579. The resulting number is called the maximum rotation of 
//   the original number.

// Write a function that takes an integer as an argument and returns the maximum 
// rotation of that integer.

/*
INPUT: integer
  - greater or equal than 0
  - data type: number
OUTPUT: maximum rotation of the number
  - data type: number
RULES:
  - max rotation is achieved after n rounds (n is the number of digits)
    - 1st round: rotate full number
    - 2nd round: fix 1st digt, rotate n-1
    - i round: fix 1st to i-1st digit, rotate n-1-i
    - n round: fix 1st to n-1 digit, rotate n
  - rotation: move the left side digit to the right side
  - leading zeros: 0123? -> assume this is not possible input

EXAMPLE:
735291: -> 321579
1) 735291 -> 35291 7 -> 352917
2) 3 52917 -> 3 2917 5 -> 329175
3) 32 9175 -> 321759
4) 321 759 -> 321597
5) 3215 97 -> 321579
6) 32157 9 -> 321579

DATA STRUCTURE:
number digits: [digit0, digit1...] digit (number)
ALGORITHM:
  - coerce the number into a string and split into an array of digits in number
    format
  
  - numberOfRotations = number of digits (length of the array of digits)
  - iterate as many times as indicated by numberOfRotations - 1 (starting at 0). 
    For an iteration i: 
    - numberOfDigitsToRotate = n - i;
    - rotateRightDigits(arrayOfDigits, numberOfDigitsToRotate)
  - join the digits together into a string
  - return the string coerced into a number
==================
rotateRightDigits(arrayOfDigits, numberOfDigitsToRotate)
INPUT: arrzy of numbers, number
OUTPUT: undefined (array is mutated)
ALGORITHM:
    - fixedDigits: slice from idx 0 to array.length - numberOfDigitsToRotate
    - digitsToRotate: slice from array.length - numberOfDigitsToRotate
    - drop the first digit of digitsToRotate and add it to the end
    - assign the array passed as argument to the new array
*/

function testEqual(actual, expected) {
  console.log(`${actual === expected}, actual: ${actual}, expected: ${expected}`);
}

function rotateRightDigits(digits, nbrOfDigitsToRotate) {
  let divisorIdx = digits.length - nbrOfDigitsToRotate;
  let fixedDigits = digits.slice(0, divisorIdx);
  let rotatedDigits = digits.slice(divisorIdx);

  if (rotatedDigits.length > 0) rotatedDigits.push(rotatedDigits.shift());
  return [].concat(fixedDigits,rotatedDigits);
}

// TEST CASES (helper functions)
// let arr = [7,3,5,2,9,1];
// let arr2 = [7,3,5,2,9,1];
// console.log(rotateRightDigits(arr, 0));
// console.log(rotateRightDigits(arr2, 4));
 // [7,3,5,2,9,1]
 // [7,3,2,9,1,5]


//  ALGORITHM:
//   - coerce the number into a string and split into an array of digits in number
//     format
  
//   - numberOfRotations = number of digits (length of the array of digits)
//   - iterate as many times as indicated by numberOfRotations - 1 (starting at 0). 
//     For an iteration i: 
//     - numberOfDigitsToRotate = n - i;
//     - rotateRightDigits(arrayOfDigits, numberOfDigitsToRotate)
//   - join the digits together into a string
//   - return the string coerced into a number
function maxRotation(number) {
  let digits = String(number).split('');
  let numberOfRotations = digits.length;
  let rotatedDigits = digits.slice();
  for (let round = 0; round < numberOfRotations; round += 1) {
    let numberOfDigitsToRotate = digits.length - round;
    rotatedDigits = rotateRightDigits(rotatedDigits, numberOfDigitsToRotate);
  }

  return +rotatedDigits.join('');
}

// TEST CASES
// 0
testEqual(maxRotation(0),0);
testEqual(maxRotation(00),0);
// 1 digit
testEqual(maxRotation(7),7);
// 2 digits
testEqual(maxRotation(37),73);
// 2 digits, leading 0 dropped
testEqual(maxRotation(20),2);
// more digits
testEqual(maxRotation(735291), 321579);