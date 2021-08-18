/*
Series:
  - digits
  - slices(number of digits)
-----------------
slice(numberOfDigits):
EXAMPLE:
01234, 1: 0 , 1, 2, 3, 4
01234, 2: [0,1], [1,2], [2,3], [3,4]
slice(0,2)
slice(1,3)
slice(2,4)
slice(3,5)
general: slice(N, N+2); 0 <= N <= number of digits - 2
01234, 3: [0,1,2], [1,2,3], [2,3,4]
slice(0,3)
slice(1,4)
slice(2,5)
general: slice(N, N+3); 0 <= N <= number of digits - 3
super general: nbrOfDigits: slice(N, N+nbrOfDigitsToSlice); 0 <= N <= number of digits - nbrOfDigitsToSlice
Invalid slice if: nbrOfDigits to slice > nbrOfDigits

ALGORITHM:
  1. Check if the slice can be performed:
    YES -> continue
    NO -> throw error
  2. Create an array of digits in number format
  3. Create an empty array
  4. Find all the possible slices (LOOP):
    slice(N, N+nbrOfDigitsToSlice); 0 <= N <= number of digits - nbrOfDigitsToSlice
*/

class Series {
  constructor (digits) {
    this.digits = digits;
  }

  slices(nbrOfConsecutiveDigits) {
    this.validSliceCheck(nbrOfConsecutiveDigits);

    let series = [];

    let digits = this.digitsToArrayInNumberFormat();
    let nbrOfDigits = digits.length;
    let loopLimit = nbrOfDigits - nbrOfConsecutiveDigits;

    for (let lowerLimit = 0; lowerLimit <= loopLimit; lowerLimit += 1) {
      let upperLimit = lowerLimit + nbrOfConsecutiveDigits;
      let serie = digits.slice(lowerLimit,upperLimit);
      series.push(serie);
    }

    return series;
  }


  digitsToArrayInNumberFormat() {
    return this.digits.split('').map(digit => Number(digit));
  }
  validSliceCheck(nbrOfConsecutiveDigits) {
    if (nbrOfConsecutiveDigits > this.digits.length) {
      throw new Error(`The series can't be longer than the number of digits`);
    }
  }
}

module.exports = Series;