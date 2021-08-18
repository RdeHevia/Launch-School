/* eslint-disable max-statements */
/*
RomanNumeral:
  - number (arabic). Number type
  - toRoman(). Convert arabic number to roman
---------------------
toRoman():
INPUT: N/A (reads this.number)
OUTPUT: roman number (string)
RULES:
1: I
(2): II
(3): III
(4): IV
5: V
(9): IX
10: X
(40): XL
50: L
(90): XC
100: C
(400): CD
500: D
(900): CM
1000: M

Min: 1: I
Max: 3000: MMM

EXAMPLES:
2008: MMVIII
  2000: MM
  8: VIII
1990: MCMXC
  1000: M
  900 = 1000 - 100 = M - C = CM
  90 = 100 - 10 = C - X = XC
1999: MCMXCIX
  1000: M
  900: CM
  90: XC
  9: IX
4: IV
  4 = 5 - 1 = V - I = IV
15: XV
  10: X
  5: V
69: LXIX
  69 / 100 = 0, remainder 69 -> 0*100 + 69 
  69 / 50 = 1, remainder 19 -> 1*50 + 19 -> L + 19
  19 / 10 = 1, remainder 9 -> 1*10 + 9 -> X + 9
  9 / 9 = 1, remainder 0 -> 1*9 + 0 -> IX
310: CCCX
  300 / 100
EXAMPLE: 7
  7 / 10 -> 0, 7
  7 / 9 -> 0, 7
  7 / 5 -> 1, 2 <-
ALGORITHM:
1. Store the arabic to roman number equivalency somewhere (object?). Arabic: Roman
1.1. Convert the object to an array and order them from bigger to smaller
2. Define an empty string called romanNumber
3. LOOP while number / numeral !== 1 (integer part) + 0 (remainder part)
  3.1. LOOP until number / numeral === 1
    - If number / numeral === 1:
      * romanNumber += numerals[number]
      * number = number % numeral
      * break the loop
4. Return roman number
*/
"use strict";

class RomanNumeral {
  constructor (number) {
    this.number = number;
  }

  static basicNumerals = {
    1: 'I',
    4: 'IV',
    5: 'V',
    9: 'IX',
    10: 'X',
    40: 'XL',
    50: 'L',
    90: 'XC',
    100: 'C',
    400: 'CD',
    500: 'D',
    900: 'CM',
    1000: 'M',
  }

  static numeralsToArraySortedByKey(option = 'descendant') {
    let sortedNumerals = Object.entries(RomanNumeral.basicNumerals);
    switch (option) {
      case 'descendant':
        sortedNumerals.sort((a,b) => Number(b[0]) - Number(a[0]));
        break;
      case 'ascendant':
        sortedNumerals.sort((a,b) => Number(a[0]) - Number(b[0]));
        break;
    }
    return sortedNumerals;
  }

  divideToGetQuotientAndRemainder(dividend, divisor) {
    let remainder = dividend % divisor;
    let quotient = dividend - remainder;
    return [quotient, remainder];
  }

  // eslint-disable-next-line max-lines-per-function
  toRoman() {
    let number = this.number;
    let romanNumber = '';
    const BASIC_NUMERALS_SORTED =
      RomanNumeral.numeralsToArraySortedByKey('descendant');

    while (true) {
      let remainder;
      for (let idx = 0; idx < BASIC_NUMERALS_SORTED.length; idx += 1) {
        let [numeralKey, numeral] = BASIC_NUMERALS_SORTED[idx];
        let integerPart;
        [integerPart, remainder] = this.divideToGetQuotientAndRemainder(
          number, Number(numeralKey)
        );
        let integerPartMultiplier = integerPart / Number(numeralKey);

        if (integerPartMultiplier > 0) {
          romanNumber += numeral.repeat(integerPartMultiplier);
          number = remainder;
          break;
        }
      }
      if (remainder === 0) break;
    }

    return romanNumber;
  }
}

module.exports = RomanNumeral;