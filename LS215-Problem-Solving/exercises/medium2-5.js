// A featured number (something unique to this exercise) is an odd number that 
// is a multiple of 7, with all of its digits occurring exactly once each. For 
// example, 49 is a featured number, but 98 is not (it is not odd), 97 is not
//  (it is not a multiple of 7), and 133 is not (the digit 3 appears twice).

// Write a function that takes an integer as an argument and returns the next
//  featured number greater than the integer. Issue an error message if there
//   is no next featured number.

// NOTE: The largest possible featured number is 9876543201.

/*
INPUT: integer
  - number
OUTPUT: the next featured number
  - number (integer)
  - if no next featured number -> return error message
    - if no featured number found that is smaller than 9876543201
RULES:
  - featured number. It's a number that:
    - is odd
    - is multiple of 7
    - its digits occur only once
  - input: strings that reprent integers are valid numbers
    - negative number: valid inputs
    - decimal numbers: assume they aren't provided
    - other data types (array, boolean...): return null
    - assume input is less than 9876543201
    - NaN, Infinity: assume they aren't provided
    - JS lower limit for numbers: don't consider
EXAMPLES:
49: _. featured number
  - odd
  - multiple of 7
  - digits are not repeated
98: -> not featured number
  - even
97:
  - odd
  - not multiple of 7
77, 112, 119, 133:
  - odd
  - multiples of 7
  - they have digits repeated -> not featured numbers
DATA STRUCTURE:

ALGORITHM:
- Check if input is valid (number or string). NO -> return null
* Determine if the number is multiple of 7 or find the next one -> assign to nextMultipleOf7
- Loop from nextMultipleOf7 while is <= 9876543201
  * Check if the number is featured. YES -> return that number (stop the loop)
- If the loop ends without returning anything -> return 'Error: no featured number found'
==============
function getEqualOrGreaterMultipleOf7(integer)
ALGORITHM:
- while true
  - if the number is multiple of 7 (number % 7 === 0) -> return the number
  - otherwise -> increse the number by 1
==============
function isFeaturedNumber(integer)
I; integer
O: boolean
ALGORITHM:
 - check if the number is multiple of 7 -> NO return false
 - check if the number is odd -> NO -> return false
 - check if the number has digits repeated. NO -> return false
  - coerce the number into a string
  - loop from 0 to 9. For each iteration
    - match the digits. if there are more than 1 matches -> numbers are reepated -> return false
 - if all the conditons are met -> return true
*/

function nextMultipleOf7(integer) {
  let multipleOf7 = integer + 1;
  while (true) {
    if (multipleOf7 % 7 === 0) return multipleOf7;
    multipleOf7 += 1;
  }
}

function isFeaturedNumber(integer) {
  if (integer % 7 !== 0) return false;
  if (integer % 2 === 0) return false;
  if (!digitsAreUnique(integer)) return false;
  
  return true;
}

function digitsAreUnique(integer) {
  let digits = String(integer);
  for (let digit = 0; digit <= 9; digit += 1) {
    let regex = new RegExp(digit,'g');
    let nbrOfSameDigits = (digits.match(regex) || []).length;
    if (nbrOfSameDigits > 1) return false; 
  }
  return true;
}

// ALGORITHM:
// - Check if input is valid (number or string). NO -> return null
// * Determine if the number is multiple of 7 or find the next one -> assign to nextMultipleOf7
// - Loop from nextMultipleOf7 while is <= 9876543201
//   * Check if the number is featured. YES -> return that number (stop the loop)
// - If the loop ends without returning anything -> return 'Error: no featured number found'

function nextFeaturedNumber(integer) {
  if (!(typeof integer === 'number' || typeof integer === 'string')) return null;
  let multipleOf7 = nextMultipleOf7(+integer);
  
  while (multipleOf7 <= 9876543201) {
    if (isFeaturedNumber(multipleOf7)) return multipleOf7;
    multipleOf7 += 7;
  }
  
  return 'Error: no featured number found';
}


// console.log(digitsAreUnique(123));

// console.log(getEqualOrGreaterMultipleOf7(-13));

// // TEST CASES (check a number is featured)
// true (negative, positive)
console.log(isFeaturedNumber(49)); // true
console.log(isFeaturedNumber(35)); // true
// false (odd)
console.log(isFeaturedNumber(98)); // false
// false (not multiple of 7)
console.log(isFeaturedNumber(97)); // false
// false (digits are repeated)
console.log(isFeaturedNumber(77)); // false
console.log(isFeaturedNumber(119)); // false
console.log(isFeaturedNumber(133)); // false

// // TEST CASES (find next featured number)
// // positive integer or 0 (number & string)
console.log(nextFeaturedNumber(0)); // 7
console.log(nextFeaturedNumber(6)); // 7
console.log(nextFeaturedNumber(7)); // 21
console.log(nextFeaturedNumber(48)); // 49
console.log(nextFeaturedNumber('48')); // 49
console.log(nextFeaturedNumber(42)); // 49
console.log(nextFeaturedNumber(35)); // 49
console.log(nextFeaturedNumber(31)); // 35
console.log(nextFeaturedNumber('31')); // 35
// // negative integer (number & string)
console.log(nextFeaturedNumber(-48)); // -35
console.log(nextFeaturedNumber('-48')); // -35
// // wrong data type
console.log(nextFeaturedNumber(true)); // null
console.log(nextFeaturedNumber([])); // null
console.log(nextFeaturedNumber({})); // null
console.log(nextFeaturedNumber(/12/)); // null
console.log(nextFeaturedNumber(undefined)); // null
console.log(nextFeaturedNumber()); // null
// // maximum featured number
console.log(nextFeaturedNumber(9876543200)); // 9876543201
// no featured number found
console.log(nextFeaturedNumber(9876543201)); // 'Error: no featured number found'
console.log(nextFeaturedNumber(9876543208)); // 'Error: no featured number found'

