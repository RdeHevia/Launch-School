/*
 - Aliquot sum: sum of all divisors of a number (except the number itthis)
 - Aliquot sum = number -> perfect
 - Aliquot sum > number -> abundant
 - Aliquot sum < number -> deficient
EXAMPLES:
  - 15: 1 + 3 + 5 = 9 -> deficient
  - 7: 1 -> deficient
TYPE PerfectNumber:
  - no constructor
  - classify(): return perfect, abundant or deficient
-----------------------
classify():
INPUT: positive integer (expected)
OUTPUT: perfect, deficient, abundant, error (if no possitive integer)
ALGORITHM:
  1. Check if the number is a positive integer. NO -> raise error
  2. Find all the divisors of the number (excluding the number itthis)
  3. Sum the divisors
  4. Return type of number based on the sum of divisors
------------------------
calcDivisors():
I: positive integer
O: array of divisors
A number is divisor of another number if number % potentialDivisor === 0
ALGORITHM:
  1. Create an empty array
  2. LOOP from 1 to number-1 in increments of 1. For each iteration,
    check if the number is a divisor. If YES, add to the array.
*/

class PerfectNumber {
  static classify(number) {
    this.checkIsValidNumber(number);

    let divisors = this.calcDivisors(number);
    let aliquotSum = this.calcAliquotSum(divisors);
    return this.classifyByAliquotSum(number, aliquotSum);
  }

  static checkIsValidNumber(number) {
    this.checkIsNumber(number);
    this.checkIsPositiveInteger(number);
  }

  static checkIsNumber(number) {
    if (typeof number !== 'number') {
      throw new Error(`Input is not a number`);
    }
  }

  static checkIsPositiveInteger(number) {
    if (number <= 0 || !Number.isInteger(number)) {
      throw new Error ('Input number is not a positive integer');
    }
  }

  static calcDivisors(number) {
    let divisors = [];

    for (let potentialDivisor = 1; potentialDivisor < number; potentialDivisor += 1) {
      if (number % potentialDivisor === 0) {
        divisors.push(potentialDivisor);
      }
    }

    return divisors;
  }

  static calcAliquotSum(divisors) {
    return divisors.reduce((aliquotSum, divisor) => aliquotSum + divisor, 0);
  }

  static classifyByAliquotSum(number, aliquotSum) {
    if (aliquotSum === number) {
      return 'perfect';
    } else if (aliquotSum < number) {
      return 'deficient';
    } else {
      return 'abundant';
    }
  }
}

console.log(PerfectNumber.classify(5));
module.exports = PerfectNumber;