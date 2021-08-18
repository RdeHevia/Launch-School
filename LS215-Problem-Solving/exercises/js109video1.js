"use strict";
/*
/* You have to create a function that takes a positive integer number and
returns the next bigger number formed by the same digits:
*/

/*
INPUT: positive integer
  - data type: number
OUTPUT: next bigger number formed by the same digits
  - data type: number
RULES:
  - NaN, Inifinity, negative numbers, floating point -> assume not
  - other data types: assume not

  - no bigger number formed by the same digits -> return null
  - input: number in string format: valid input
    -string: '0002' yes
EXAMPLE:
12 -> 21
7 -> null
123 -> 132
132 -> 213
213 -> 312
312 -> 321
321 -> null

123:
  1: 1 23, 1 32
  2: 213, 231
  3: 312, 321
DATA STRUCTURE:
  maxNumber: number
ALGORITHM:
  - coerce number into a number
  * maxNumber: find the maximum number that can be formed with the digits
      findMaxNumber(number)
  - nextNumber = number + 1
  - WHILE nextNumber < number
    - if sameDigits(number, nextNumber): return nextNumber
  - return null
*/

function nextBiggerNumber2(number) {
  number = +number;
  let maxNumber = findMaxNumber(number);
  let nextNumber = number + 1;

  while (nextNumber <= maxNumber) {
    if (haveSameDigits(number, nextNumber)) return nextNumber;
    nextNumber += 1;
  }

  return null;
}

function nextBiggerNumber(number) {
  number = +number;
  let numbersWithSameDigits = findAllNumbersWithSameDigits(number);
  return (numbersWithSameDigits.sort((a,b) => a - b).filter(num => num > number)[0] || null);
}

function findAllNumbersWithSameDigits(number) {
  let maxNumber = findMaxNumber(number);
  let nextNumber = number + 1;
  let numbersWithSameDigits = [];
  while (nextNumber <= maxNumber) {
    if (haveSameDigits(number, nextNumber)) numbersWithSameDigits.push(nextNumber);
    nextNumber += 1;
  }

  return numbersWithSameDigits;
}

/*
I: array of digits in number format
O: all number combination
ALGORITHM:
  - iterate over each digit of the array. for each digit:
*/
/*
maxNumber
I: number (integer)
O: number (integer)
ALGORITHM:
  - coerce number into a string
  - sort by char code in descending order
  - coerce the resultant string into a number, return it
*/

function findMaxNumber(integer) {
  return +String(integer)
    .split('')
    .sort((digitA,digitB) => {
      return digitB.charCodeAt() - digitA.charCodeAt();
    })
    .join('');
}

// console.log(maxNumber(1));

/*
sameDigits(number1, number2)
ALGORITHM:
  - coerce both number and number2 into strings
  - split into an array of chars
  - sort the string numbers
  - if the sorted strings match. teturn true, otherwise: return false
*/

function haveSameDigits(number1, number2) {
  let [digits1, digits2] = [String(number1), String(number2)];
  return digits1.split('').sort().join('') === digits2.split('').sort().join('');
}

// // TEST CASES
// // - no bigger number formed by the same digits -> return null
console.log(nextBiggerNumber(7)); //null
console.log(nextBiggerNumber(111)); //null
console.log(nextBiggerNumber(321)); //null
// // number found
console.log(nextBiggerNumber(123)); //132
console.log(nextBiggerNumber(132)); // 213
console.log(nextBiggerNumber(213)); //231
console.log(nextBiggerNumber(231)); //312
console.log(nextBiggerNumber(312)); //321


// // - input: number in string format: valid input
console.log(nextBiggerNumber('123')); //132
console.log(nextBiggerNumber('000123')); //132
