// The Fibonacci series is a sequence of numbers in which each number is the sum 
// of the previous two numbers. The first two Fibonacci numbers are 1 and 1. The 
// third number is 1 + 1 = 2, the fourth is 1 + 2 = 3, the fifth is 2 + 3 = 5, and 
// so on. In mathematical terms, this can be represented as:

// Copy Code
// F(1) = 1
// F(2) = 1
// F(n) = F(n - 1) + F(n - 2) where n > 2

// Write a recursive function that computes the nth Fibonacci number, where nth is 
// an argument passed to the function.

// NOTE: This exercise verges on the Advanced level of exercises, so do not be 
// discouraged if you are not able to solve it on your own; recursion is tricky, 
// and even experienced developers can have difficulty dealing with it.

/*
INPUT: nth fibo number
  - integer >= 1
  - negative, decimals, javascript number limits -> don't handle
  - other data types -> don't handle
OUTPUT: integer
  - data type: number
RULES:
  - implementation: use recursion
EXAMPLE:
  n = 7:
  F(1) = 1
  F(2) = 1
  F(3) = F(2) + F(1) = 1 + 1 = 2
  F(4) = 2 + 1 = 3
  F(5) = 3 + 2 = 5
  F(6) = 5 + 3 = 8
  F(7) = 8 + 5 = 13
 n = 4:
  F(1) = 1
  F(2) = 1
  F(3) = F(2) + F(1) = 1 + 1 = 2
  F(4) = 2 + 1 = 3
  ---
  F(4):
  F(4) = F(3) + F(2)
  F(3) = F(2) + F(1) = 1 + 1
DATA STRUCTURE:
ALGORITHM:
  - if n <= 2 -> return 1
  - if n > 2:
    return F(n) = F(n-1) + F(n-2)
  
*/


function fibonacci(n) {
  if (n <= 2) return 1;

  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Examples:

console.log(fibonacci(1));       // 1
console.log(fibonacci(2));       // 1
console.log(fibonacci(3));       // 2
console.log(fibonacci(4));       // 3
console.log(fibonacci(5));       // 5
console.log(fibonacci(6));       // 8
console.log(fibonacci(7));       // 13
console.log(fibonacci(12));      // 144
console.log(fibonacci(20));      // 6765