/*
INPUT: 2 version numbers
  * string composed of numbers and dots: number.number.number....
  * we can also have just a number: e.g. 2
OUTPUT: it tell us which version is greater
  * happy path: number
    * v1 > v2 -> return 1
    * v1 < v2 -> return -1
    * v1 === v2 -> return 0
  * invalid input: null
    * input contains characters different from digits and dots -> return null
    * if the data type is not either a number or a string

REQUIREMENTS:
  * empty string -> version 0
  * number is ok -> 1 -> '1'
  * if invalid input -> return null
    * invalid characters: anything different from digits and '.'
    * invalid data types: anything different from string and number
  * To compare the versions, both versions need to have the same number of levels.
    Add 0's as needed to the shortest version so they are of the same length.
  * Comparions
    * The comparison is done level by level. If the numbers at the first level
      are different -> return 1 or -1 (stop the comparison). If they are the same, continue with the
      next level.
    * Perform the same comparison for each level until either 1 or -1 is returned
      or all the levels have been compared
    * If all the levels have been compared without return anything, it means
      the versions are the same. Return 0;
EXAMPLE:
  * 0.1 < 1 -> return 1
    a) 0 < 1 -> return 1
    b) 1, 0 (it never evaluates)
  * 1.2 === 1.2.0.0 -> return 0
    [1, 2, 0, 0] and [1, 2, 0, 0]
    a) 1 === 1
    b) 2 === 2
    c) 0 === 0
    d) 0 === 0
  * 1.2 < 1.18.2 -> return 1
    a) 1 === 1
    b) 2 < 18 -> return 1
    c) 0, 2 (it never evaluates)
DATA STRUCTURE:
input: array -> [level1, level,...]
ALGORITHM:
  1. Check the input is valid. NO -> return null
  1/2. Check if the input is a number -> coerce it to string
  1/3. Check if the input is an empty string -> '0'
  2. Split the versions into arrays. Coerce all the strings that represent
     numbers into numbers.
  3. Check if the arrays are of the same length. NO -> add 0's to the shortest
    array until they are of the same length
  4. Loop over the elements of the array. For each pair of elements:
    - if the elements are different -> return 1 or -1 based on which one is smaller
    - if they are the same -> continue the loop
  5. If the loop ends without returning anything, return 0.
-------------------
versionsToArrays (version1, version2)
I: 2 strings
O: 2 arrays with numbers. arrays are of the same length
ALGORITHM:
  1. Split the strings into arrays separating them by '.'
  2. Coerce all the string numbers into numbers
  3. Add as many 0's as needed to one of the arrays so they are of the same length
*/

function makeArraysOfTheSameLengthWithZeros(version1Array, version2Array) {
  let length1 = version1Array.length;
  let length2 = version2Array.length;

  if(length1 > length2) {
    let numberOfZeros = length1 - length2;
    version2Array.push(...(new Array(numberOfZeros).fill(0)));
  } else if (length1 < length2) {
    let numberOfZeros = length2 - length1;
    version1Array.push(...(new Array(numberOfZeros).fill(0)));
  }

  return [version1Array, version2Array]
}

function versionsToArrays (version1, version2) {
  let version1Array = version1.split('.').map(digits => +digits);
  let version2Array = version2.split('.').map(digits => +digits);

  makeArraysOfTheSameLengthWithZeros(version1Array, version2Array);

  return [version1Array, version2Array];
}

function areCharactersValid(version) {
  const REGEX = /^(\d+\.)*\d*$/g;
  return !!version.match(REGEX);
}

function isVersionValid(version) {
  if (typeof version === 'number') return true;
  if (typeof version === 'string') return areCharactersValid(version);

  return false;
}

function formatVersion(version) {
  return String(version);
}

function compareVersions(version1, version2) {
  if (!(isVersionValid(version1) && isVersionValid(version2))) return null;
  version1 = formatVersion(version1);
  version2 = formatVersion(version2);

  let [versionNumbers1, versionNumbers2] = versionsToArrays (version1, version2);

  for (let idx = 0; idx < versionNumbers1.length; idx += 1) {
    let number1 = versionNumbers1[idx];
    let number2 = versionNumbers2[idx];

    if (number1 < number2) {
      return -1;
    } else if (number1 > number2) {
      return 1;
    }
  }

  return 0;

}

function validateEqual(actual, expected) {
  console.log(`${actual === expected}: actual: ${actual}, expected: ${expected}`);
}

function validateEqual2(func, args, expectedVal) {
  let actualVal = func(...args);
  let testPassed = (actualVal === expectedVal);
  console.log(testPassed || `FAILED. args: ${args}, actual: ${actualVal}, expected: ${expectedVal}`);
}

// GENERIC TEST CASES
// Same versions, one without dot
validateEqual(compareVersions('1','1.0'),0);
// Same versions, one with less 0's:
validateEqual(compareVersions('1.2','1.2.0.0.0.0'),0);
// Left version is greater
validateEqual(compareVersions('1.2.3','1.2'), 1);
// Right version is greater
validateEqual(compareVersions('1.2','1.2.3'), -1);

// EDGE TEST CASES
// Empty string is equal to 0
validateEqual(compareVersions('','0.0'),0);
// 0 or positive numbers are coerced to strings
validateEqual(compareVersions(0,'0.0'),0);
validateEqual(compareVersions(4,'4'),0);
validateEqual(compareVersions(1.23,'1.23.0'),0);
// Characters different from numbers and dots return null
validateEqual(compareVersions('1.a','1.1'),null);
validateEqual(compareVersions('1.1','1.a'),null);
// If input is not a number or string -> null
validateEqual(compareVersions(true,1), null);
validateEqual(compareVersions(1,[1,2]),null);
validateEqual(compareVersions({},1), null);
validateEqual(compareVersions(null, 1), null);
// version must begin and end with a number
validateEqual(compareVersions('.1','1'),null);
validateEqual(compareVersions('1','1.'), null);
// dots can't be repeated
validateEqual(compareVersions('1..1','1'), null);