// Write a function that computes the difference between the square of the sum
//  of the first n positive integers and the sum of the squares of the first n 
//  positive integers.

/*
INPUT: postive integer (n)
  - number
    - positive int

OUTPUT:
  = number
  - the difference of:
    - square of sum of the first n positive integers
    - sum of squares of the first n positive integers
RULES:
  - input: assume is always a positive integer
    - number strings: valid input (e.g '12')
    - other data types? assume not provided
EXAMPLE:
4: 1, 2, 3, 4
  - square of sum: (1 + 2 + 3 + 4)^2 = 10^2 = 100
  - sum of squares: 1^2 + 2^2 + 3^2 + 4^2 = 2 + 4 + 9 + 16 = 30
  - difference = 100 - 31 = 70
DATA STRUCTURE:
  - integers: [int1, int2...] e.g. n=4 -> [1, 2, 3, 4]
ALGORITHM:
  - coerce the input into a number
  * create the integers array . getPositiveIntegers(n)
  * calculate square of sum. sum(...integers) ** 2
  - squares: map integers squaring each number
  * calculate the sum of squares. sum(...squares) ** 2
  - return the difference between the two
===========
getPositiveIntegers(n)
I: integer
O: array of number [1, 2, 3...n]
ALGORITHM:
- SET integers = []
- loop from 1 to n. add the idx to the integers array
- return integers array
============
sum:
I: (number1, number2...) 
  - we don't how many numbers
O: a number
ALGORITHM:
  - assign all the numbers to an array: numbers
  - reduce the array with an addition function
  - return the resultant array
*/

function sum(...numbers) {
  return numbers.reduce((sum, number) => sum + number);
}

function difference(n) {
  let integers = (new Array(+n)).fill('').map((_, idx) => idx + 1);

  let squareOfSum = sum(...integers) ** 2;

  let squares = integers.map(integer => integer ** 2);
  let sumOfSquares = sum(...squares);

  return squareOfSum - sumOfSquares;
}

// TEST CASES getPositiveIntegers(n)
// console.log(getPositiveIntegers(4)); // [1, 2, 3, 4]
// console.log(getPositiveIntegers(1)); // [1]

// TEST CASES sum(...numbers)
// console.log(sum(1,2,3,4)); // 10
// console.log(sum(4,2,1,3)); // 10
// console.log(sum(1)); // 1

// TEST CASES
// 1 (number and string)
console.log(difference(1)) // 0
console.log(difference('1')) // 0
// int > 1 (number and string)
console.log(difference(4)) // 70
console.log(difference('4')) // 70