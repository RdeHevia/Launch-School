/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
// Problem Description

// You are given a list of numbers in a "short-hand" range where only the 
// significant part of the next number is written because we know the numbers 
// are always increasing (ex. "1, 3, 7, 2, 4, 1" represents [1, 3, 7, 12, 14, 21]). 
// Some people use different separators for their ranges
//  (ex. "1-3, 1-2", "1:3, 1:2", "1..3, 1..2" represent the same numbers 
// [1, 2, 3, 11, 12]). Range limits are always inclusive.

// Your job is to return a list of complete numbers.

// The possible separators are: ["-", ":", ".."]

// "1, 3, 7, 2, 4, 1" --> 1, 3, 7, 12, 14, 21
// "1-3, 1-2" --> 1, 2, 3, 11, 12
// "1:5:2" --> 1, 2, 3, 4, 5, 6, ... 12
// "104-2" --> 104, 105, ... 112
// "104-02" --> 104, 105, ... 202
// "545, 64:11" --> 545, 564, 565, .. 611

/*
INPUT: list
  - string
  - items of the list are separated by either ', ' or ','
  - 
OUTPUT: array of numbers
REQUIREMENTS:
 - assume input is always a string
 - assume no negative numbers
 - assume no decimal numbers (always positive integers)
 - range separators: -, :, ..
 - we can either lists or ranges or a combination of both
 - lists:
  - the first SH number goes as is on the new list
  - for the rest of SH numbers:
    - if SH number > the previous list number -> add to the list as is
    - if SH number <= the previous list number -> numberOfDecimals = ...
 - ranges:
  - the first SH number goes as is on the new list
  - the last SH is calcualted with the same numberOfDecimals = ...
  - the SH numbers in between are in increments of one, and follow the same rules
    that the SH numbers of the lists do.
 - concatenated ranges:
  - all rules of ranges apply
  - e.g. limit1:limit2:limit3 = limit1SH:limit2SH limit2:limit3SH
  - empty list input -> return null
EXAMPLES:
1, 3, 7, 2, 4, 1 -> 1, 3, 7, 12, 14, 21
1: first characters -> 1 
3: 3 > 1 -> 3
7: 7 > 3 -> 7
2: 2 < 7 -> numberOfDecimals = 
4: 4 < 12 -> 14 -> (12 - 4) / 10 + 1 = 1
1: 1 < 14 -> numberOfDecimals = (14 - 1) / 10 + 1 = 2

1-3, 1-2: 1, 2, 3, 11, 12
1:5:2 -> 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
1
5 -> 5 > 1 -> 5
2 -> 2 < 5 -> 12

104-2 -> 104, 105,...112
10+4 -> 10+2
104-02 -> 104, 105, ... 202
104
02 < 104 -> numberOfDecimals = (104 - 2) / 10 + 1 = 10 + 1 = 11 -> 112
DATA STRUCTURE:
  - array
ALGORITHM:
 - check if empty string -> YES -> return null
 - map the elements of the list into an array of numbers in string format
  - remove empty spaces
  - split by comma
 - declare an empty array to store the results
 - iterate over the elements of the array. for each element:
  - if the element doesn't have range separators: getFullNumber(previousFullNumber, shortHandNumber)
    - the first SH number goes as is on the new list
    - for the rest of SH numbers:
      - if SH number > the previous list number -> add to the list as is
      - if SH number <= the previous list number -> numberOfDecimals = ...
    - add resultant full number into the new array
  - if the element is a range:
    - determine the limits of the range (there might be more than 2 limits) getLimits(previousFullNumber,...limits)
    - while the number is < than the upper limit:
      - increment in 1 the SH number.
      - convert the SH into full number
      - add to the resultant array
  - return the array the the full numbers
--------------------------------------
getFullNumber(previousFullNumber, shortHandNumber)
I, O: number format
ALGORITHM:
  - SHnumber > previousFullNumber -> return SHnumber
  - SHnumber <= previousFullNumber:
    - leftDigits = Integer((previousFullNumber - SHnumber) / 10) + 1
  - concatenate left digits with the digits of the SHnumber
  - we return the resultant number in number format
--------------------------------------
getLimits(previousFullNumber,limits)
  - calculate the full number of the first limit: getFullNumber(pvFNumber, limit1)
  - getFullNumber (limit1, limit2)
  - repeat until we make it for all the limits (limit1-N, limitN)
return the limits as an array
*/

function getFullNumber(previousFullNumber, shortHandNumber) {
  if (previousFullNumber === null) return shortHandNumber;
  if (shortHandNumber > previousFullNumber) return shortHandNumber;
  let leftDigits =
    Number.parseInt((previousFullNumber - shortHandNumber) / 10, 10) + 1;
  return Number(''.concat(leftDigits, String(shortHandNumber)));
}


function getLimits(previousFullNumber, limits) {
  let fullLimits = [];
  let fullLimit0 = getFullNumber(previousFullNumber,+limits[0]);
  fullLimits.push(fullLimit0);
  let previousFullLimit = fullLimit0;

  for (let idx = 1; idx < limits.length; idx += 1) {
    let limit = limits[idx];
    let fullLimit = getFullNumber(previousFullLimit, +limit);
    fullLimits.push(fullLimit);
    previousFullLimit = fullLimit;
  }

  return fullLimits;
}

console.log(getLimits(null, ['104','02'])); // PROBLEM: 02 is coerced into 2


function completeList(listOfNumbers) {
  if (listOfNumbers === '') return null;
  let elements = listOfNumbers.replace(' ', '').split(',');
  let fullList = [];

  let previousFullNumber = null;
  elements.forEach((element) => {
    if (!element.match(/[\-:..]/)) {
      let fullNumber = getFullNumber(previousFullNumber, +element);
      fullList.push(fullNumber);
      previousFullNumber = fullNumber;
    } else {
      let shortHandLimits = element
        .replace(/\.\./g,'-')
        .replace(/:/g,'-')
        .split('-');
      // console.log(shortHandLimits);
      let limits = getLimits(previousFullNumber, shortHandLimits);
      // console.log(previousFullNumber,shortHandLimits);
      // console.log(limits);
      let numberOfRanges = limits.length - 1;
      for (let idx = 0; idx < numberOfRanges; idx += 1) {
        let limit1 = limits[idx];
        let limit2 = limits[idx + 1];
        previousFullNumber = limit1;
        fullList.push(previousFullNumber);
        // console.log(typeof previousFullNumber);
        // console.log(typeof limit2);
        while (previousFullNumber < limit2) {
          let shortHandNumber = previousFullNumber + 1;
          // console.log(shortHandNumber);
          let fullNumber = getFullNumber(previousFullNumber, shortHandNumber);
          // console.log(fullNumber);
          fullList.push(fullNumber);
          previousFullNumber = fullNumber;
        }
      }
    }
  });

  return fullList;
}


// TEST CASES
// list (', ', ',')
// console.log(completeList('1, 3, 7, 2, 4, 1'));
// console.log(completeList('1,3,7,2,4,1'));
// // list (starting with 0)
// console.log(completeList('0, 1, 3, 7, 2, 4, 1')); // [0, 1, 3, 7, 12, 14, 21]
// // list ending with 0
// console.log(completeList('1, 3, 7, 2, 4, 1, 0')); // [ 1, 3, 7, 12, 14, 21, 30]
// // list starting and ending with 0
// console.log(completeList('0, 1, 3, 7, 2, 4, 1, 0')); // [1, 3, 7, 12, 14, 21, 30]
// range (-, :, ..)
// console.log(completeList('1-1')); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
// console.log(completeList('1:1')); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
// console.log(completeList('1..1')); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
// console.log(completeList('1-11')); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
// console.log(completeList('104-2')); // [104, 105, ... 112]
// console.log(completeList('104-02')); // [104, 105, ... 202]
// // multiple ranges concatenated
// console.log(completeList('1:5:2')); // [ 1, 2, 3, 4, 5, 6, ... 12]
// // list and range combo
// console.log(completeList('545, 64:11')); // 545, 564, 565, .. 611
// // one element
// console.log(completeList('1234')); // [1234]
// empty list
// console.log(completeList('')); // null