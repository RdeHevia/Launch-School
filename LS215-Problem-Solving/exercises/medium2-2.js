// A triangle is classified as follows:

// Equilateral: All three sides are of equal length.
// Isosceles: Two sides are of equal length, while the third is different.
// Scalene: All three sides are of different lengths.
// To be a valid triangle, the sum of the lengths of the two shortest sides must 
// be greater than the length of the longest side, and every side must have a 
// length greater than 0. If either of these conditions is not satisfied, the 
// triangle is invalid.

// Write a function that takes the lengths of the three sides of a triangle as 
// arguments and returns one of the following four strings representing the 
// triangle's classification: 'equilateral', 'isosceles', 'scalene', or 'invalid'.

/*
INPUT: (side1, side2, side3)
  - numbers (real numbers)
  - don't handle strings that represent numbers
  - assume input is always numbers
OUTPUT: type of triangle
  - data type: string
  - equilateral
    - if all sides are of equal length
  - isosceles
    - 2 sides are equal, 1 different
  - scalene
    - all sides are different
  - invalid. If it does NOT fullfil these requirements:
    - sum of lengths of 2 shortest sides > length of the longest side
    - for every side, length > 0
RULES:
  - check order is important:
    invalid -> equilateral -> isosceles -> scalene
EXAMPLES:
(4, 4, 4) -> equilateral
(4, 4, 2) -> isosceles
(2, 3, 4) -> scalene 
(0, 1, 1) -> invalid
(1, 2, 3) -> invalid: 1+2 = 3
DATA STRUCTURE:
  - sides: [side1, side2, side3] 
      - sides: numbers
ALGORITHM:
  - sides: store the sides into an array and sort the array.
  * check if the triangle is valid. NO -> return 'invalid'. **isValid
  * check if triangle is equilateral. YES -> return 'equilateral;
    - side1 === side2 === side3
  * same for isosceles
    - side1 === side2 || side1 === side3 || side2 === side3
  - if we make it to the end without returning anything -> return 'scalene'
------------------
function isValid
I: (side1, side2, side3)
  - sides are ordered already
O: boolean
ALGORITHM:
  - check all sides are > 0. no -> return false
  - check side1 + side2 > side3. no -> return false
  - otherwise, return true
*/

function isTriangleValid(...sides) {
  if (sides.some(side => side <= 0)) {
    return false;
  } else if (sides[0] + sides[1] <= sides[2]) {
    return false;
  } else {
    return true;
  }
}

// console.log(isTriangleValid(4,4,4));

function isEquilateral(...sides) {
  let side1 = sides[0];
  return sides.every(side => side === side1);
}

function isIsosceles(...sides) {
  return sides[0] === sides[1] ||
    sides[0] === sides[2] ||
    sides[1] === sides[2];
}

function triangleType(side1, side2, side3) {
  let sides = [side1, side2, side3].sort((a,b) => a - b);

  if (!isTriangleValid(...sides)) return 'invalid';
  if (isEquilateral(...sides)) return 'equilateral';
  if (isIsosceles(...sides)) return 'isosceles';
  return 'scalene';

}

// TEST CASES
// invalid (side <= 0)
console.log(triangleType(0, 1, 1)); // 'invalid'
console.log(triangleType(1, 0, 1)); // 'invalid'
console.log(triangleType(1, 1, 0)); // 'invalid'
console.log(triangleType(0, 0, 0)); // 'invalid'
// invalid (sum 2 smaller sides <= other side)
console.log(triangleType(1, 2, 3)); // 'invalid'
console.log(triangleType(3, 2, 1)); // 'invalid'
console.log(triangleType(2, 3, 1)); // 'invalid'
console.log(triangleType(3, 1, 2)); // 'invalid'
// equilateral
console.log(triangleType(4, 4, 4)); // 'equilateral'
// // isosceles
console.log(triangleType(4, 4, 2)); // 'isosceles'
console.log(triangleType(4, 2, 4)); // 'isosceles'
console.log(triangleType(2, 4, 4)); // 'isosceles'
// // scalene
console.log(triangleType(2, 3, 4)); // 'scalene'