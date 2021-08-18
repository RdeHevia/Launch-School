// 'Bubble Sort' is one of the simplest sorting algorithms available. Although 
// it is not an efficient algorithm, it is an excellent exercise for student 
// developers. In this exercise, you will write a function that sorts an array 
// using the bubble sort algorithm.

// A bubble sort works by making multiple passes (iterations) through an array. 
// On each pass, the two values of each pair of consecutive elements are compared. 
// If the first value is greater than the second, the two elements are swapped. 
// This process is repeated until a complete pass is made without performing any 
// swaps — at which point the array is completely sorted.

// We can stop iterating the first time we make a pass through the array without 
// making any swaps because this means that the entire array is sorted.

// For further information — including pseudo-code that demonstrates the 
// algorithm, as well as a minor optimization technique — see the Bubble 
// Sort Wikipedia page.

// Write a function that takes an array as an argument and sorts that array using
//  the bubble sort algorithm described above. The sorting should be done 
//  "in-place" — that is, the function should mutate the array. You may assume 
//  that the array contains at least two elements.


/*
INPUT: array [element1, element2...]
  - element: number, strings with letters
OUTPUT: undefined
  - array is mutated in place
RULES:
   - assume elements are of the same type
   - string sorting:
    AaBbCc...Zz
    - use bubble algorithm
    - don't use sort method
EXAMPLE:
[3,1,4,2]
3 > 1 -> [1, 3, 4, 2]
1 < 3
3 < 4
4 > 2 -> [1, 3, 2, 4]
1 < 3
3 > 2 -> [1, 2, 3, 4]
1 < 2 < 3 < 4 -> end sorting
ALGORITHM:
 - WHILE true
  - loop from 0 to idx = length - 2
    SET count = 0;
    run comparing callback
    if >= 0 -> continue
    if -1
      - swap elements
      - count += 1
      - break the loop
  - if count === 0 -> break the while loop
*/

function swap (array, idx1, idx2) {
  [array[idx1], array[idx2]] = [array[idx2], array[idx1]];
}

function bubbleSort(array, sortingCallback) {
  while (true) {
    let count;
    for (let idx = 0; idx < array.length - 1; idx +=1) {
      count = 0;
      let a = array[idx];
      let b = array[idx + 1];
      if (sortingCallback(a,b) > 0) {
        swap(array, idx, idx + 1);
        count += 1;
        break;
      }
    }
    
    if (count === 0) break;
  }
}

const sortNumbersAscendent = (a,b) => a - b;
const sortNumbersDescendent = (a,b) => b - a;

const isLowerCase = letter => letter === letter.toLowerCase();

function sortLetters(a, b) {
  if (isLowerCase(a) && isLowerCase(b)) {
    return a.charCodeAt(0) - b.charCodeAt(0);
  } else if (isLowerCase(a) && !isLowerCase(b)) {
    return a.charCodeAt(0) - b.toLowerCase().charCodeAt(0);
  } else if (!isLowerCase(a) && isLowerCase(b)) {
    return a.toLowerCase().charCodeAt(0) - b.charCodeAt(0);
  } else {
    return a.charCodeAt(0) - b.charCodeAt(0);
  }
}

// TEST CASES
// positive numbers
let arr1 = [3,1,4,2];
bubbleSort(arr1, sortNumbersAscendent); 
console.log(arr1); // [1, 2, 3, 4]
bubbleSort(arr1, sortNumbersDescendent); 
console.log(arr1); // [4, 3, 2, 1]
// mix positive and negative
// console.log(bubbleSort([3.14,-1,4,-2, 0])); // [-2, -1, 0, 3.14, 4]
// // repeated numbers
// console.log(bubbleSort([-1, 3.14,-1,4,0, -2, 0, 3.14])); // [-2, -1, -1, 0, 0, 3.14, 3.14, 4]
// // lowercase
// console.log(bubbleSort(['c','b','d','a'])); // ['a','b','c','d']
// // uppercase
// console.log(bubbleSort(['C','B','D','A'])); // ['A','B','C','D']
// // mix
// console.log(bubbleSort(['a', 'C','B', 'c', 'D', 'd', 'A', 'b'])); // ['A', 'a', 'B', 'b','C', 'c','D', 'd']
// // words
// // words mix