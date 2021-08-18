// // You are given a table, in which every key is a stringified number, and each 
// // corresponding value is an array of characters, e.g.
// // {
// //   "1": ["A", "B", "C"],
// //   "2": ["A", "B", "D", "A"],
// // }
// // Create a function that returns a table with the same keys, but each 
// // character should appear only once among the value-arrays, e.g.
// // {
// //   "1": ["C"],
// //   "2": ["A", "B", "D"],
// // }
// Understand The Problem
// Input: object represents a table
//         - each key is a stringified numbers 
//           numbers : any number (decimal /integers/ octal/..). RdH: Unlikely
//         - each value is an array of single characters / empty array
//           characters : are letters only (lowecase - upperCase) (case-insensitive)
// Output: an object represents the input table object 
//         but without any characters duplication over the keys values
//         - each character appear just once 
// Rules: - each key's value array => has no duplicate characters
//        - each character appears just once over the object 
//        - if two keys have the same character in their array 
//           -> compare key numerically 
//             -> the largest key keep the character in its array
//             -> the lowest key remove the character from its array
//        - if the input is an empty object => return empty object
//        - if the input is undefined => consider it as empty object => return empty object
//        - the order of the array characters in the output object => should be the same as in the input object
// Examples/Test Cases
// input object is undefined
console.log(getTable()); // {}
// input object is empty 
console.log(getTable({})); // {}
// if one or more of the input object values are empty arrays
console.log(getTable({"1":["a"], "2": []}));//{"1":["a"], "2": []} 
// if two keys has exactly the same array characters
console.log(getTable({"1":["a"], "2": ["a"]}));//{"1":[], "2": ["a"]}
// case-insensitive
console.log(getTable({"1":["a", "A", "c"], "2": ["A", "d"]}));//{"1":["c"], "2": ["A", "d"]}
// repeated characters in the same array
console.log(getTable({"1":["a", "A", "c", "c"], "2": ["f", "d"]}));//{"1":["a", "c"], "2": ["f", "d"]}
// keys order
console.log(getTable({"2":["a", "A", "c", "c"], "1": ["f", "d"]}));//{"2":["a", "c"], "1": ["f", "d"]}
// Data Structre
// - object  
// Algorithm
// - declare result as empty object
// - get the keys of the input object and save them in keys array 
// - check if keys array is empty => return result object
// - if keys is not empty 
//  - fill the result object with the input object keys with their values filtered from any dupliaction
//    - loop over the keys array 
//      - for each key 
//        - get its value (array) 
//        - filter its array from any duplicate characters and save the result in noDuplicateChars ##filter(array)##
//        - filter noDuplicateChars where its characters are unique over the whole result object
//        using get uniqueCharsArray helper function and called uniqueChars 
//       - append current key with uniqueChars to result 
// - return result

// ------------------------------------------
// uniqueCharsArray:
// input : array, key,  object
// output: array
// - define result as empty array
// - loop over the input array 
//  - for each character
//    - get all keys from input object where 
//      the current char (in lowerCase or in upperCase) exists in their values
//        and object key !== input key  save the result in keys
//    - if keys is not empty 
//      - compare the current key with each keys
//       - if any of the keys > current key 
//        - ignore this character 
//       - else if  current key > any other key in keys 
//        - add current character to result
// - return result 
// Code
function filter(array) {
  let filteredArr = [];
  for(let index = 0; index < array.length; index++) {
    let lowerCaseChar = array[index].toLowerCase();
    let upperCaseChar = array[index].toUpperCase();
    if(!(filteredArr.includes(lowerCaseChar) || filteredArr.includes(upperCaseChar))) {
      filteredArr.push(array[index]);
    }
  }
  return filteredArr;
}
function getKeysThatHave(char, inputKey, object) {
  let keys = [];
  Object.entries(object).forEach(([key, value]) => {
    let lowerCaseChar = char.toLowerCase();
    let upperCaseChar = char.toUpperCase();
    if(key !== inputKey && (value.includes(lowerCaseChar) || value.includes(upperCaseChar))) {
       keys.push(key);
    }
  })
  return keys;
}
function isGreaterThan(key, arrayOfKeys) {
  return arrayOfKeys.every(k => Number(key) > Number(k));
}
function uniqueCharsArray(array, key, object) {
  let result = [];
  for(let index = 0; index < array.length; index++) {
    let char = array[index];
    let keys = getKeysThatHave(char, key, object);
    if(isGreaterThan(key, keys)) {
      result.push(char);
    }
  }
  return result;
}
function getTable(table = {}) {
  let result = {};
  let keys = Object.keys(table);
  if(keys.length === 0) return result;
  keys.forEach(key => {
    let value = table[key];
    let noDuplicateChars = filter(value);
    let uniqueChars = uniqueCharsArray(noDuplicateChars, key, table);
    result[key] = uniqueChars;
  });
  return result;
}