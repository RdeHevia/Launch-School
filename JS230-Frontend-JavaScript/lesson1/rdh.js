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
/*
INPUT: object
  - {
    "1": chars1,
    "2": chars2,
    ...
  }

  - chars: [char1, char2...]; char: string
OUTPUT:
  - shape: same as the input
  - chars can't be repeated
RULES:
  - keys: assume always integers in string format
  - other data types: assume not

  - {} -> return {}
  - no argument passed -> return {}
  - number of key values: 0 to n
  - object keys:
    - order doesn't matter
  - object values:
    - array can be empty []
    - chars can be repeated in the same array
    - chars can be repeated in multiples array
    - chars can be lower or upper case
    - chars should be alphabetically ordered
EXAMPLE:
0)  1: A, B, C, B
    2: A, B, D, A
1)  1: A, C
    2: A, B, D (removed duplicates)
2)  1: C
    2: A, B, D
*/

/*
DATA STRUCTURE:
  - objArraysWithUniqueChars: same shape as the input and output
ALGORITHM:
  - if no argument passed or {} -> {}
  - remove the duplicated chars of all the arrays -> objArraysWithUniqueChars
    - iterate over the keys of the object. For each key:
      - ##removeDuplicatedChars(object[key])##
  - remove the duplicated chars comparing all the arrays
  - return the resultant array
*/

function getTable() {}

/*
##removeDuplicatedChars(array)##
DATA STRUCTURE:
  - usedChars: [char1, char2...]; char: string (uppercase letter)
  - uniqueChars: same shape as the input array
ALGORITHM:
  - usedChars = []
  - filter the elements of the input array that are unique. For each letter: -> uniqueChars
    - make the letter uppercase
    - check if usedChars includes the uppercase letter
      - no:
        - add the uppercase letter to usedChars
        - return true (the letter is added to the filtered array)
  - return uniqueChars

// TEST CASES
// - {} -> return {}

// - no argument passed -> return {}

// - 1 key-value

// - 2 key-value

// - >2 key-value

// - object keys: order doesn't matter

// - object values:
//   - array can be empty []

//   - chars can be repeated in the same array

//   - chars can be repeated in multiples array

//   - chars can be lower or upper case

//   - chars should be alphabetically ordered
