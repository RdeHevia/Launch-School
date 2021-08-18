/*
I: octal string
O: decimal number
RULES
- Invalid inputs <> 0
- Don't use JS built-in methods. Implent the conversion yourself
- Valid digits: 0 to 7
EXAMPLE:
octal 10 = 1 * 8^1 + 0 * 8^0 = 8
octal 17 = 1*8^1 + 7*8^0 = 8 + 7 = 15
octal 8 = 8*8^0 = 8 -> INVALID
octal 9 = 1*8^1 + 1^8^0 = 9 -> INVALID
octal 18 = 1*8^1 + 8*8^0 = 18 -> INVALID
---------
TYPE Octal
- number
- toDecimal()
-------------
toDecimal()
I: this.octalNumber
O: number in base 10
EXAMPLE: 233
2(idx0) * 8^2 + 3(idx1)*8^1 + 3(idx2)*8^0 = 155
digit at index i: digit*8^(numberOfDigits - 1 - i)
ALGORITHM:
1. Check if the number is valid. If invalid -> return 0
2. Convert the number to string format. Separate the digits (characters)
3. Multiply each digit at index i by 8^(numberOfDigits - 1 - i)
4. Sum all together and return
----------------
validOctalNumber()
1. Check is a number
2. Check digits are 0 to 7
*/

class Octal {
  constructor(octalNumber) {
    this.octalNumber = octalNumber;
    if (!this.validOctalNumber()) {
      this.octalNumber = 0;
    }
  }

  toDecimal() {
    let digits = this.splitDigits();
    let decimalNumber = digits.reduce((total, digit, idx) => {
      let exponent = digits.length - 1 - idx;
      let base = 8;
      return total + (digit * (base ** exponent));
    },0);

    return decimalNumber;
  }

  splitDigits(format = 'number') {
    let digitsInStringFormat = String(this.octalNumber).split('');

    if (format === 'string') {
      return digitsInStringFormat;
    } else {
      return digitsInStringFormat.map(digit => Number(digit));
    }

  }

  validOctalNumber() {
    let digits = this.splitDigits('string');

    if (digits.length === 0) {
      return false;
    }

    let digitsNotBetween0And7 = digits.filter(digit => {
      return !digit.match(/[0-7]/);
    });

    return digitsNotBetween0And7.length === 0;
  }
}

module.exports = Octal;