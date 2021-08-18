/*
P: octal to decimal conversion
I: octal number (String)
O: decimal number (Number)
Example:
233: 2*8^2 + 2*8^1 + 3*8^0 = 2*64 + 2*8 + 3*1 = 128 + 24 + 3 = 155
1: 1*8^0 = 1
10: 1*8^1 + 0*8^0 = 8
011: 0*8^2 + 1*8^1 + 1*8^0 = 9
ALGORITHM:
1. Count the number of digits
2. Split the string into digits.
3. Multiply each digit by 8^n.
  - idx 0: digit * 8 ^ (numberOfDigits - 1)
  - last index: digit * 8 ^ 0 = digit * 8 ^ (numberOfDigits - 1 - index)
  - index idx: digit * 8 ^ (numberOfDigits - 1 - index)
4. Sum all the multiplications together and return it
*/

function octalToDecimal(numberString) {
  let maxExponent = numberString.length - 1;
  let decimalNumber = numberString
    .split('')
    .map((digitChar, idx) => +digitChar * (8 ** (maxExponent - idx)))
    .reduce((sum, currentVal) => sum + currentVal);

  return decimalNumber;

}

octalToDecimal('1');           // 1
octalToDecimal('10');          // 8
octalToDecimal('130');         // 88
octalToDecimal('17');          // 15
octalToDecimal('2047');        // 1063
octalToDecimal('011');         // 9