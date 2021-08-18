/* eslint-disable max-len */
/*
INPUT: list and or range of short-hand numbers
  - string
  - list: numbers are ', ' separated
  - range: - : .. are used as separators
OUTPUT: list of complete numbers
  - array of numbers
RULES:
  - numbers are integers >= 0
  - list separator: assume is always ', '
  - assume input is always a string
  - assume the string input is always in the right format
  - determine complete number:
    - if the previous complete number and the number have the same number of
      digits -> compare them
      no -> add the missing digits to the SH number -> compare them
    - comparison: number > previous number -> that's the number
                  no -> increase by 1 the digits added to the number
    - repeat until number > previous number

EXAMPLES:
lists:
  - 1,  3, 7, 2, 4, 1: 1, 3, 7, 12, 14, 21
  - 200, 1, 0, 5, 4: 200, 201, 210, 215, 224
  - 104, 02 -> 104, 202
    104, 02:
    1) 1
    2) 102
    3) 104 > 102 -> 2
    4)) 202
    5) 104 < 202 -> number is 202
  - 1004, 02 -> 1102
    1) 10
    2) 1002
    3) 1004 > 1002
    4) 10 -> 11
    5) 1004 < 1102 -> number is 1102
  - 7, 2:
    1) nothing
    2) 7 > 2
    3) nothing -> 1
    4) 7 < 12 -> number is 12
ranges:
  - 104-2: 104 to 112: 104, 105...112
  - 104-02: 104 to 202
  - 104-104: 104 to 104: 104
  - 104-202 -> 104 to 202
  - 1:5:2 -> 1 to 5, 5 to 12
list and ranges mixed:
  - 545, 64:11 -> 545, 564 to 611
DATA STRUCTURE:
  array to store the elements: [element1, element2....]
  note: element is a number in SH notation or a range (type string)
  complete number list: array[number1, number2] ... number type number
ALGORITHM:
  - split the list into elements (elements are separated by ', ')
  - complete number list : map the array of elements
    - first element:
      - if number -> coerce to number type and add tto the complete number array
      - if range -> completeNumbersFromRange(range) -> add list to the array
    - rest of elements:
      - if number -> transform it into complete and add to array (completeNumber(previousCompleteNumber, number))
      - if range -> completeNumbersFromRange(range)
  - flat the complete numbers array
  - return the complete numbers array
=========================
completeNumber(number, previousCompleteNumber = null)
INPUT: string, string
OUTPUT: number
ALGORITHM: 104, 02
  - determine complete number:
    - if previousCompleteNumber is null -> return number coerced to number format
    - if the previous complete number has less digits than the number
      return number coerced to number format
    - if they have the same digits:
      greater -> return number
      smaller or equal -> add 1 digit to the left and return it
    - comparison: number > previous number -> that's the number
                  no -> increase by 1 the digits added to the number
    - repeat until number > previous number
===================
completeNumbersFromRange(previousCompleteNumber, range)
I: string, string
OUTPUT: array of numbers
ALGORITHM:
 - split the range into limits
 - findLowerLimit complete number: completeNumber(lowerLimit, previousCNumb)
 - find next limits until last: completeNumber(nextLimit, previousLimit)
 - Store limits into an array
 - iterate from lowerLimit to upperLimit: For each iteration
  - add 1 to the previous element and add to the array
 - return the new array
*/

function completeNumber(shortHandNumber, previousCompletedNumber = null) {
  if (previousCompletedNumber === null) return +shortHandNumber;
  if (previousCompletedNumber.length < shortHandNumber.length) {
    return +shortHandNumber;
  } else if (previousCompletedNumber.length === shortHandNumber.length) {
    if (+shortHandNumber > +previousCompletedNumber) return +shortHandNumber;
    return Number(''.concat('1',shortHandNumber));
  } else {
    let digitDifference = previousCompletedNumber.length - shortHandNumber.length;
    let remainderDigits = previousCompletedNumber.slice(0,digitDifference);
    let completedNumber = ''.concat(remainderDigits, shortHandNumber);
    if (+completedNumber > +previousCompletedNumber) return +completedNumber;
    remainderDigits = String(+remainderDigits + 1);
    completedNumber = ''.concat(remainderDigits, shortHandNumber);

    return completeNumber(completedNumber, previousCompletedNumber);
  }

}


// console.log(completeNumber('102','20'));
// console.log(completeNumber('104','101')); // 104
// console.log(completeNumber('101','101')); // 1101
// console.log(completeNumber('02','1004')); // 1102
// console.log(completeNumber('1102','1004')); // 1104
// console.log(completeNumber('1002','104')); // 1002
console.log(completeNumber('002', '104'));

// ALGORITHM:
//   - split the list into elements (elements are separated by ', ')
//   - complete number list : map the array of elements
//     - first element:
//       - if number -> coerce to number type and add tto the complete number array
//       - if range -> completeNumbersFromRange(range) -> add list to the array
//     - rest of elements:
//       - if number -> transform it into complete and add to array (completeNumber(previousCompleteNumber, number))
//       - if range -> completeNumbersFromRange(range)
//   - flat the complete numbers array
//   - return the complete numbers array

function completeNumbers(list) {
  if (list === '') return [];
  let elements = list.split(', ');
  let listOfCompletedNumbers = [];
  listOfCompletedNumbers.push(completeNumber(elements[0]));

  for (let idx = 1; idx < elements.length; idx += 1) {
    let previousCompletedNumber = String(listOfCompletedNumbers[idx - 1]);
    let element = elements[idx];
    if (!element.match(/:|-|\.\./)) {
      let shortHandNumber = element;
      listOfCompletedNumbers.push(completeNumber(shortHandNumber, previousCompletedNumber));
    }
  }
  return listOfCompletedNumbers;
}

// // TEST CASES
// // // empty list
console.log(completeNumbers('')); // []
// // // 1 number
console.log(completeNumbers('0')); // [0]
console.log(completeNumbers('1')); // [1]
console.log(completeNumbers('102')); // [102]
// // // PURE LIST
// // // 1 digit
console.log(completeNumbers('1, 3, 7, 2, 4, 1')); // [1, 3, 7, 12, 14, 21]
console.log(completeNumbers('0, 1, 3, 7, 2, 4, 1')); // [0, 1, 3, 7, 12, 14, 21]
console.log(completeNumbers('0, 0')); // [0, 10]
console.log(completeNumbers('104, 2')); // [104, 112]
console.log(completeNumbers('104, 1002')); // [104, 1002]
// // // multiple digits
console.log(completeNumbers('104, 02')); // [104, 202]
console.log(completeNumbers('104, 002')); // [104, 1002]
console.log(completeNumbers('1004, 02')); // [1004, 1102]
console.log(completeNumbers('1004, 002')); // [1004, 2002]
console.log(completeNumbers('1004, 502')); // [1004, 1502]
// // PURE RANGES
// // different operators
// console.log(completeNumbers('1-3, 1-2')); // [1, 2, 3, 11, 12]
// console.log(completeNumbers('1:3, 1:2')); // [1, 2, 3, 11, 12]
// console.log(completeNumbers('1..3, 1..2')); // [1, 2, 3, 11, 12]
// console.log(completeNumbers('1-3, 1..2')); // [1, 2, 3, 11, 12]
// console.log(completeNumbers('1:3, 1-2')); // [1, 2, 3, 11, 12]
// // 1 range
// console.log(completeNumbers('104-2')); // [104, 105, ... 112]
// console.log(completeNumbers('104-02')); // [104, 105, ... 202]
// console.log(completeNumbers('1004-02')); // [1004, 1005, ... 1102]
// // multiple ranges
// console.log(completeNumbers('1:5:2')); // [1, 2, 3, 4, 5, 6, ... 12]
// console.log(completeNumbers('104:02:1')); // [104, 104...202,203...211]
// // mix list - ranges
// console.log(completeNumbers('545, 64:11')); // [545, 564, 565, .. 611]
// console.log(completeNumbers('64:11, 0')); // [64, 65... 111, 120]
