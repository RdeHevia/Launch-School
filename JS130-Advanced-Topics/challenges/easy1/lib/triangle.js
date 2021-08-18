/*
RULES:
triangle:
  - 3 sides
  - side length > 0
  - side1 + side2 >= side3 for every side
equilateral: 3 equal sides
isosceles: 2 equal sides
scalene: all sides different
*/

/*
Triangle:
  - sides: [length1, length2, length3] or an object
  - constructor: initialize this.sides
  - kind(): return equilateral, isosceles, scalene. Throw error if illegal
*/

class Triangle {
  constructor (side1, side2, side3) {
    this.sides = [side1, side2, side3];
  }

  kind() {
    this.isTriangle();

    let type;
    if (this.isEquilateral()) {
      type = 'equilateral';
    } else if (this.isScalene()) {
      type = 'scalene';
    } else if (this.isIsosceles()) {
      type = 'isosceles';
    }
    return type;
  }

  isTriangle() {
    this.allSidesAreGreaterThan0();
    this.checkSumOfSides();
  }

  allSidesAreGreaterThan0() {
    if (Math.min(...this.sides) <= 0) {
      throw new Error('All sides need to be greater than 0');
    }
  }

  checkSumOfSides() {
    let [side1, side2, side3] = this.sides;
    if (
      side1 + side2 < side3 ||
      side2 + side3 < side1 ||
      side3 + side1 < side2
    ) {
      throw new Error('Violation of triangle inequality');
    }
  }

  isEquilateral() {
    return this.numberOfEqualSides() === 3;
  }

  isScalene() {
    return this.numberOfEqualSides() === 1;
  }

  isIsosceles() {
    return this.numberOfEqualSides() >= 2;
  }

  numberOfEqualSides() {
    let equalSideCombos = this.sides.map(sideI => {
      return this.sides.filter(sideJ => sideI === sideJ);
    });

    let numberOfEqualSidesForEachCombo = equalSideCombos.map (combo => combo.length);
    return Math.max(...numberOfEqualSidesForEachCombo);
  }
}

let test = new Triangle(1,1,1);
test.checkSumOfSides();
module.exports = Triangle;