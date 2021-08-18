// Write a function that takes one argument, a positive integer, and returns 
// the sum of its digits. Do this without using for, while, or do...while 
// loops - instead, use a series of method calls to perform the sum.
/*
INPUT: positive integer (number)
OUTPUT: sum of its digits (number)
REQUIREMENTS:
  - assume number is always positive integer
  - string that represents a number ok (e.g. 37 and '37' are equivalent)
  - use js in-built methods
EXAMPLES:
37 -> 3+7 = 10
4 -> 4
DATA STRUCTURE:
input -> array of digits (digits are in number format)
ALGORITHM:
 - coerce the number into a string
 - split the number in string format into digits and save them in an array.
   the digits should be in number format
 - sum all the numbers together (reduce)
*/

function sumDigits(number) {
  let digits = String(number).split('').map(digit => +digit);
  return digits.reduce((sum, digit) => sum + digit);
}

// TEST CASES
// number one digit
console.log(sumDigits(7)); // 7
// number multiple digits
console.log(sumDigits(123)); // 6
// number can be in either number or string format
console.log(sumDigits('123') === sumDigits(123)); // true
