// Rewrite your recursive fibonacci function so that it computes its results 
// without using recursion.
/*
EXAMPLE:
n = 4:
1) F(1) = 1
  1 < 4 -> n = 2
2) F(2) = 1
  2 < 4 -> n = 3
3) F(3) = 1 + 1 = 2
  3 < 4 -> n = 4
4) F(4) = 2 + 1 = 3
 4 = 4 -> return 3
ALGORITHM:
  - if n <= 2 -> return 1
  - make i = 3
  - WHILE i <= n
    - F(i) = F(i-2) + F(i-1)
    - i += 1
  return F(n) (= F(i))
*/

function fibonacci(n) {
  if (n <= 2) return 1;
  let fiboN_2 = 1;
  let fiboN_1 = 1;
  let fiboN;
  let i = 3;
  while (i <= n) {
    fiboN = fiboN_1 + fiboN_2;
    [fiboN_2, fiboN_1] = [fiboN_1, fiboN];
    i += 1;
  }

  return fiboN;
}

console.log(fibonacci(20));       // 6765
console.log(fibonacci(50));       // 12586269025
console.log(fibonacci(75));       // 2111485077978050

// // Note that JavaScript can accurately compute integers up to 16 digits long; 
// this means that fibbonacci(78) is the largest Fibbonacci number that you can 
// accurately compute with simple operations in JavaScript.