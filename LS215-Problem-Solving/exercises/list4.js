// Write a function that takes an array of numbers and returns the sum of the 
// sums of each leading subsequence in that array. Examine the examples to see 
// what we mean. You may assume that the array always contains at least one number.


/*
INPUT: array of numbers
OUTPUT: number
EXAMPLES:
3,5,2 -> 3 + (3 + 5) + (3 + 5 + 2) -> 21
DATA STRUCTURE:
  input: array
ALGORITHM:
 - map the elements of the array. for each element of the array:
  - sum all the elements from index 0 to the selected element
  - add the sum to the new array
 - sum all the elements of the resultant array
 - we return the final sum
 [3,5,2]
 [3]: 3
 [3,5]: 8
 [3,5,2]: 10
 [3, 8, 10] -> 21
-------------------
sum
I: list of numbers
O: number
ALGORITHM:
  - reduce the list with addition of two elements as reduction function
*/
function sum(...numbers) {
  return numbers.reduce((sum, number) => sum + number);
}

function sumOfSums(array) {
  let sums = array.map((_,idx) => sum(...array.slice(0,idx + 1)));
  return sum(...sums);
}

console.log(sumOfSums([3, 5, 2]));        // (3) + (3 + 5) + (3 + 5 + 2) --> 21
console.log(sumOfSums([1, 5, 7, 3]));     // (1) + (1 + 5) + (1 + 5 + 7) + (1 + 5 + 7 + 3) --> 36
console.log(sumOfSums([4]));              // 4
console.log(sumOfSums([1, 2, 3, 4, 5]));  // 35