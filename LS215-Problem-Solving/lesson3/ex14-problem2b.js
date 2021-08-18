// 47 min
/*
INPUT: number in string format
  - it contain: digits and other characters
  - all non-numeric characters should be ignored
OUTPUT: boolean
  - if the checksum is multiple of 10 -> true
  - otherwise -> false
REQUIREMENTS:
  - empty string -> not valid number
  - integer? -> coerce to string
  - other datatypes -> assume input either string or number

 - right to left, double every second number
 - any resultant number greater or equal than 10: subtract 9 from it
 - sum all the digits together to get the checksum
 - if checksum is multiple of 10 -> valid number -> true. otherwise -> false
DATA STRUCTURE:
operations: array of digits (number format)
ALGORITHM:
  - Coerce the input into a string
  - Remove no digit characters
  - Check if the string is empty. YES -> return false
  - Split the number into an array of digits. Digits should be in number format
  - Reverse the array
  - Iterate over the elements of the array. For every second digit
    - multiply it by 2
    - if the result is >= 10 -> substruct 9
  - Sum all the digits of the resultant array to get the checksum
  - Check if the checksum is multiple of 10. YES -> true. NO -> false
-----------
formatNumber
  - Coerce the input into a string
  - Remove no digit characters
*/
/*
============================
Part 2:
Write a function that can add a check digit to make the number valid per the
Luhn formula and return the original number plus that digit. This should give
"2323 2005 7766 3554" in response to "2323 2005 7766 355"
INPUT: number
  * string format
  * same format and characterisctics as the input for validLuhnNumber
OUTPUT: a valid Luhn number
  * string format
  * valid Luhn number:
    * if input is already a valid Luhn number -> return the same number
    * if the input is not a valid Luhn number -> add 1 more digit to make it
      valid
    * just in case: return null if no number is found
  * keep special characters in place
EXAMPLE:
"2323 2005 7766 355" -> "2323 2005 7766 3555"
  ...1 -> false
  ...2 -> false
  ...
  ...4 -> true -> return "2323 2005 7766 3554"
ALGORITHM:
  - check if the input number is Luhn valid. YES -> return that number.
    NO -> continue
  - Loop from 1 to 9. For each digit:
    - Add the digit to the input number
    - Check if the new number is valid Luhn.
      YES -> return that number
      NO -> continue the loop
  - Saveguard: If the loop ends without returning anything, that would mean
    the function couldn't find a valid number -> return null
*/

// testEqual(validLuhnNumber("2323 2005 7766 355"), false);
// testEqual(validLuhnNumber("2323 2005 7766 3554"), true);

function makeNumberLuhnValid(number) {
  let numberInStringFormat = String(number);
  if (validLuhnNumber(numberInStringFormat)) return numberInStringFormat;

  for (let digit = 1; digit <= 9; digit += 1) {
    let testNumber = ''.concat(numberInStringFormat, digit);
    if (validLuhnNumber(testNumber)) return testNumber;
  }

  return null;
}

function testEqual(actual, expected) {
  console.log(`${actual === expected}, actual: ${actual}, expected: ${expected}`);
}

function formatNumber(number) {
  let numberInStringFormat = String(number);
  return numberInStringFormat.replace(/\D/g,'');
}

// testEqual(formatNumber(123), '123');
// testEqual(formatNumber('12  3...$#RFE'), '123');

function luhnTransformation(number) {
  let transformedNumber = number * 2;

  return transformedNumber >= 10 ? (transformedNumber - 9) : transformedNumber;
}

// testEqual(luhnTransformation(1), 2);
// testEqual(luhnTransformation(6), 3);

function isMultipleOf10(number) {
  return number % 10 === 0;
}

function validLuhnNumber (number) {
  let formatedNumber = formatNumber(number);

  if (formatedNumber.length === 0 || formatedNumber === '0') return false;

  let digitsReversed = formatedNumber
    .split('')
    .map(digit => +digit)
    .reverse();

  let checksum = digitsReversed
    .map((digit, idx) => {
      if (idx % 2 !== 0) {
        return luhnTransformation(digit);
      } else {
        return digit;
      }
    })
    .reduce((sum, number) => sum + number);

  if (isMultipleOf10(checksum)) return true;
  return false;
}

// TEST CASES (makeNumberLuhnValid)
// number is not valid, string format
testEqual(makeNumberLuhnValid('232320057766355'),'2323200577663554');
// number is not valid, string format with special chars
testEqual(makeNumberLuhnValid('2323 2005 7766 355'),'2323 2005 7766 3554');
testEqual(makeNumberLuhnValid('2323 2005-7766?355'),'2323 2005-7766?3554');
// number is not valid, number format
testEqual(makeNumberLuhnValid(232320057766355),'2323200577663554');
// number is valid, string format
testEqual(makeNumberLuhnValid('2323200577663554'),'2323200577663554');
// number isvalid, number format
testEqual(makeNumberLuhnValid(2323200577663554),'2323200577663554');
// number is  valid, string format with special chars
testEqual(makeNumberLuhnValid('2323 2005 7766 3554'),'2323 2005 7766 3554');
testEqual(makeNumberLuhnValid('2323 2005-7766?3554'),'2323 2005-7766?3554');
// // TEST CASES
// // valid number, no spaces
// testEqual(validLuhnNumber('8763'), true);
// // valid number, number data type
// testEqual(validLuhnNumber(8763), true);
// // valid number, special characters
// testEqual(validLuhnNumber('8?7 6X-3A'), true);
// testEqual(validLuhnNumber('2323 2005 7766 3554'), true);
// // invalid number, no spaces
// testEqual(validLuhnNumber('1111'), false);
// // invalid number, number data type
// testEqual(validLuhnNumber(1111), false);
// // invalid number, special characters
// testEqual(validLuhnNumber('1?1 1X-ABC1...'), false);
// // empty string
// testEqual(validLuhnNumber(''), false);
// // number 0
// testEqual(validLuhnNumber('0'), false);


