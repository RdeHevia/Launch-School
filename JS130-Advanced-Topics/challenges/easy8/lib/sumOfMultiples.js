/*
EXAMPLE:
10 (3,5):
  3: 3, 6, 9
  5: 5
  sum: 3 + 6 + 9 + 5 = 23
1 (3,5):
  3: 0
  5: 0
  sum: 0
20 (7, 13, 17):
  7: 7, 14
  13: 13
  17: 17
  sum: 51
class SumOfMultiples
  - static to(limit)
  -static defaultBase = [3, 5]
  - to(limit)
  - constructor(...bases)
--------------
static to():
I: limit, this.bases
O: sum of all multiples of the bases (with special format
ALGORITHM:
  1. Create an array with the sum of multiples for each base. For each base:
    1.1. Calculate all its multiples that are < limit
  2. Remove the multiples that are repeated
  3. Sum all multiples
  3. Return the total sum with special format:
    - numbers < 1000 -> return as number
    - numbers >= 1000 -> return as a string with a '-' in increments of 1000
-------------
multiplesOfTo(base, limit):
  0. Initialize an empty array
  1. LOOP in increments of base WHILE < limit:
    - add the increment to the array
  2. Return the array
-------------
formatNumber(number):
EXAMPLE:
1234: 1_234
12345: 12_345
1234567: 1_234_567
  7654321:
    765, 4321
    432 1
  765_432_1
ALGORITHM:
  1. Transform the number into a string
  2. Reverse the string
  3. Create an array with the string characters splitted every 3 chars
  4. Join the string with '_'
  5. Reverse the string again
  6. Return the string
----------------
splitEvery3Chars(string)
ALGORITHM:
  1. splittedChars = [], remainderChars = string
  2. WHILE the length of remainderChars > 3:
    2.1. splice between idx 0 and idx2, both included. Add the spliced chars to
          splittedChars
  3. Return splittedChars
----------------------
removeRepeatedElements
ALGORITHM:
  0. Create an empty array
  1. Iterate over the elements of the array
    1.1. If the element is not included in the new array. push
  2. Return new array

*/

class SumOfMultiples {
  static DEFAULT_BASES = [3, 5];

  static to(limit) {
    const DEFAULT_BASES = SumOfMultiples.DEFAULT_BASES;

    return (new SumOfMultiples(...DEFAULT_BASES)).to(limit);
  }

  constructor (...bases) {
    this.bases = bases;
  }

  to(limit) {
    let multiples = this.bases.map(base => {
      return this.multiplesOfTo(base,limit);
    }).flat();
    let notRepeatedMultiples = this.removeRepeatedElements(multiples);
    return this.sum(notRepeatedMultiples);
  }

  multiplesOfTo(base, limit) {
    let multiples = [];

    for (let multiple = base; multiple < limit; multiple += base) {
      multiples.push(multiple);
    }
    return multiples;
  }

  removeRepeatedElements(elements) {
    let noRepeatedElements = [];

    elements.forEach(element => {
      if (!noRepeatedElements.includes(element)) {
        noRepeatedElements.push(element);
      }
    });

    return noRepeatedElements;
  }

  sum(numbers) {
    return numbers.reduce((sum, number) => sum + number, 0);
  }
}

module.exports = SumOfMultiples;