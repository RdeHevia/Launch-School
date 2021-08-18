/*
INPUT: number of switches
  - number (integer)
  - 0 -> empty array []

OUTPUT: array with the lights that are on
  - array of numbers (integers). e.g. light 1 and 4 are on -> return [1, 4]
REQUIREMENTS:
  - assume input is always 0 or positive integers
    - no negative numbers
    - no float numbers
    - no numbers in string format
    - no other data types
  - switches are numbered from 1 to n (n is the number of switches)
  - there are n rounds
  - for a round i: toogle starting at light i, in increments of i:
    - i, 2*i, 3*i,...
  - light i is at index i-1
EXAMPLES:
n = 5: 
0) all lights are off
1) toogle starting at 1, increments of 1: 1 on, 2 on, 3 on, 4 on, 5 on
2) toogle starting at 2, increments of 2: 1 on, 2off, 3on, 4off, 5on
3) toogle starting at 3, increments of 3: 1 on, 2off, 3off, 4of, 5on
4) 4, 4,: ..., 4on, 5on
5) 5, 5: ...., 5off -> [1, 4]
n = 0:
[]
n = 1: [1]
DATA STRUCTURE:
 - array of boolean values: light on -> true, light off -> false
ALGORITHM:
  - check if n === 0 -> return []
  - create an array with n elements with boolean false values:
  - Loop n times. For round i:
    - lightStartingIdx = i - 1
    - Toogle the lights at that are multiples of lightStartingIdx (in increments
      of lightStartingIdx toogleAtIndexesMultiplesOf(array, lightStartingIdx)
  - Map the indexes of the array elements that are true. Map the light numbers
    from the indexes (lightNumber = lightIndex + 1)
  - return the resultant array
------
function toogle(array, startingIdx)
INPUT: arra
OUTPUT: mutates array
ALGORITHM:
  - iterate from startingIdx, to last index, startingIdx += startingIndx + 1
  
*/

function toogleAtIndexesMultiplesOf(array, startingIndex) {
  for (let idx = startingIndex; idx < array.length; idx += (startingIndex + 1)) {
    array[idx] = !array[idx];
  }
}
let arr1 = [true, true, false, false, true];
let arr2 = arr1.slice();
let arr3 = arr1.slice();
// toogleAtIndexesMultiplesOf(arr1,0); // [f, f, t, t, f]
// toogleAtIndexesMultiplesOf(arr2,1); // [t, f, f, t, t]
// toogleAtIndexesMultiplesOf(arr3,2); // [t, t, t, f, t]
// console.log(arr1);
// console.log(arr2);
// console.log(arr3);

function lightsOn(numberOfLights) {
  if (numberOfLights === 0 ) return [];
  let lights = (new Array(numberOfLights)).fill(false);

  for (let round = 1; round <= numberOfLights; round += 1) {
    let lightStartingIdx = round - 1;
    toogleAtIndexesMultiplesOf(lights, lightStartingIdx);
  }

  return lights
    .map((light, idx) => {
      if (light) return idx + 1;
    })
    .filter(lightPosition => lightPosition);
}

// TEST CASES
// n = 0
console.log(lightsOn(0)); // [0]
// n small
console.log(lightsOn(1)); // [1]
console.log(lightsOn(2)); // [1]
console.log(lightsOn(5)); // [1, 4]
// n big
console.log(lightsOn(100)); // [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
