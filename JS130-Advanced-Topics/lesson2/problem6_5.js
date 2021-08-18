/*
Function 1. makeMultipleLister
  INPUT: number
  OUTPUT: function 1.1.
Function 1.1.
  INPUT: N/A
  OUTPUT: logs every positive integer multiple of the number of Function 1. btw
          that number and 100
  ALGORITHM:
    1. While the number is less than 100:
      1.1. Log the number
      1.2. Multiply the number by a counter
      1.3. Increment the counter by 1
*/

function makeMultipleLister(integer) {
  return function () {

    let multiple = integer;
    while (multiple < 100) {
      console.log(multiple);
      multiple += integer;
    }
  };
}

let lister = makeMultipleLister(17);
lister();