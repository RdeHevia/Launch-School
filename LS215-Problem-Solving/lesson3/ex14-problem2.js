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

// TEST CASES
// valid number, no spaces
testEqual(validLuhnNumber('8763'), true);
// valid number, number data type
testEqual(validLuhnNumber(8763), true);
// valid number, special characters
testEqual(validLuhnNumber('8?7 6X-3A'), true);
testEqual(validLuhnNumber('2323 2005 7766 3554'), true);
// invalid number, no spaces
testEqual(validLuhnNumber('1111'), false);
// invalid number, number data type
testEqual(validLuhnNumber(1111), false);
// invalid number, special characters
testEqual(validLuhnNumber('1?1 1X-ABC1...'), false);
// empty string
testEqual(validLuhnNumber(''), false);
// number 0
testEqual(validLuhnNumber('0'), false);
