/*
Write a function that takes a year as input and returns the century. 
The return value should be a string that begins with the century number, 
and ends with 'st', 'nd', 'rd', or 'th' as appropriate for that number.

New centuries begin in years that end with 01. So, the years 1901 - 2000 
comprise the 20th century.
*/

/*
INPUT: year
  - data type: number or string
  - year 0-infinity
OUTPUT: century
  - string
  - centuryNumber + 'st' || 'nd' || 'rd' || 'th'
RULES:
  - centuries start at year that ends in 01 (e.g. 1901 -> 20th century)
  - centures in years that ends in 00 (e.g. 1900 -> 19th century)
EXAMPLES:
2021: 2001 > 2021 > 2099 -> 21st century
  - 2021 / 100 = 20; 20 + 1 = 21
562: 6th 
  562 / 100 = 5; 5 + 1 = 6th
1: 1st
  1 / 10 = 0; 0 + 1 = 1st
0: 'invalid year'

12540: 
  - 12540 / 100 = 125 -> 125 + 1 = 126th

9999:
  - 9999 / 100 = 99 -> 99 + 1 = 100th
2000:
  - 2000 / 100 = 20
ALGORITHM:
  - find the century number **centuryNumber(number)**
  - find the sufix **toOrdinal(number)**
  - concatenate century number and sufix
  - return a string
===========
centurNumber:
I: year (integer >= 0)
O: century (number)
ALGORITHM:
  - Divide the year by 100. Take the integer part and the remainder
  - If the remainder is 0:
    - the century is the integer part -> return the integer part
  - Otherwise:
    - the century is the integer + 1 -> return that
=============
toOrdinal
I: number
O: ordinal number (string)
DATA TYPE:
sufixes = {
  1: 'st',
  2: 'nd',
  3: 'rd',
  rest: 'th'
}
ALGORITHM:
  - coerce the number into a string
  - SET lastDigit: get the last digit of the number
  - return either sufixes[lastDigit] or sufixes[rest]
*/

function centuryNumber(year) {
  let integerPart = Number.parseInt((year / 100), 10);
  let remainder = year % 100;

  if (remainder === 0) return integerPart;
  return integerPart + 1;
}
// console.log(centuryNumber(2001));

function toOrdinal (number) {
  let sufixes = {
    1: 'st',
    2: 'nd',
    3: 'rd',
    rest: 'th'
  };

  let digits = String(number);
  let lastDigit = digits[digits.length - 1];
  let sufix = sufixes[lastDigit] || sufixes['rest'];
  return ''.concat(digits, sufix);
}

// ALGORITHM:
//   - find the century number **centuryNumber(number)**
//   - find the sufix **toOrdinal(number)**
//   - concatenate century number and sufix
//   - return a string

function century(year) {
  return toOrdinal(centuryNumber(year));
}

// TEST CASES
// st, nd, rd, th
console.log(century(10)); // 1st
console.log(century(110)); // 2nd
console.log(century(210)); // 3rd
console.log(century(310)); // 4rd
console.log(century(410)); // 5rd
console.log(century(510)); // 6th
console.log(century(610)); // 7th
console.log(century(710)); // 8th
console.log(century(810)); // 9th
console.log(century(910)); // 10th
// lower limit
console.log(century(1)); // 1st
console.log(century(1001)); // 11st
console.log(century(2501)); // 26th
// in the middle
console.log(century(58)); // 1st
console.log(century(183)); // 11st
console.log(century(2524)); // 26th
// upper limit
console.log(century(100)); // 1st
console.log(century(1100)); // 11st
console.log(century(2600)); // 26th