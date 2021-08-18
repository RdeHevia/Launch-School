// 1000 Lights

// You have a bank of switches before you, numbered from 1 to n. Every switch is connected to exactly one light that is initially off. You walk down the row of switches and toggle every one of them. You walk back to the beginning of the row and start another pass. On this second pass, you toggle switches 2, 4, 6, and so on. On the third pass, you go back to the beginning again, this time toggling switches 3, 6, 9, and so on. You continue to repeat this process until you have gone through n repetitions.

// Write a program that takes one argument—the total number of switches—and returns an array of the lights that are on after n repetitions.

/*
INPUT: nbrOfSwitches
  - number (integer)
OUTPUT: array with the lights that are on
  - array[lightA, lightB...]; light: integer (number) that represents its position (from 1 to n)
RULES:
  - lights start off
  - number of iterations = nbrOfSwitches
  - iteration 1: toogle 1, 2, 3,...
  - iteration 2: toogle 2, 4, 6...
  - iteration 3: toogle 3, 6, 9...
  - iteration i: toogle i, 2i, 3i... (i, 2i, 3i...<=nbrOfSwitches)
  
  - other number types -> assume not
  - other data types (no string or number) -> assume not
  - 'abc' -> assume not
  - NOTE: lights [1, 2, 3] and idx [0, 1, 2]
  
  - 0 -> return []
  - string that represents an integer -> valid number
  - no argument passed -> treat as a 0
  
EXAMPLE:

nbrOfSwitches = 5: -> [1, 4]
0) 1, 2, 3, 4, 5 (all off)
1) !1!, !2!, !3!, !4!, !5!
2) !1!,  2 , !3!,  4 , !5!
3) !1!,  2 ,  3 ,  4 , !5!
4) !1!,  2 ,  3 ,  !4! , !5!
5) !1!,  2 ,  3 ,  !4! , 5

nbrOfSwitches = 1: -> [1]
0) 1
1) !1!
*/


/*
DATA STRUCTURE:
  - ligths: [light1, light2...]; light: boolean (off -> false, on -> true)
ALGORITHM:
  - make 0 the default input argument
  - coerce the input into a number
  - if number === 0 -> return []
  - build the array of lights
  - iterate from 1 to nbrOfLights. For an iteration 'round':
    - toogle the lights at indexes round-1, 2round-1, 3round-1... WHILE <= nbrOfLights - 1
    **toggle(lights, startingIdx)
  - map lights with the index + 1 of the lights that true
  - filter the light elements that are not false
  - return the resultant array
*/

function lightsOn(nbrOfLights = 0) {
  nbrOfLights = +nbrOfLights;
  if (nbrOfLights === 0) return [];
  
  let lights = (new Array(nbrOfLights)).fill(false);
  
  for (let round = 1; round <= nbrOfLights; round += 1) {
    let startingToogleIdx = round - 1;
    lights = toogle(lights, startingToogleIdx);
  }
  
  let idOfLightsOn = lights.map((light, idx) => {
    if (light === true) {
      let lightId = idx + 1;
      return lightId;
    } else {
      return light;
    }
  }).filter(id => id);
  
  return idOfLightsOn;
}


/*
toogle
ALGO:
  - let toogeIdx = startingIdx
  - let increment = startingIdx + 1
  - toogledArray: create a copy of the input array
  - WHILE toogleIdx < length of the array - 1
    - toogle the element at toogleIdx
    - toogleIdx += increment
  - return the array
*/

function toogle(array, startingIdx) {
  let toogleIdx = startingIdx;
  let increment = startingIdx + 1;
  
  let toogledArray = array.slice();
  
  while (toogleIdx < array.length) {
    toogledArray[toogleIdx] = !toogledArray[toogleIdx];
    toogleIdx += increment;
  }
  
  return toogledArray;
}


// TEST CASES
// - 0 -> return []
console.log(lightsOn(0)); // []
console.log(lightsOn('0')); // []
// - no argument passed -> treat as a 0
console.log(lightsOn()); // []
// n = 1 (number or string)
console.log(lightsOn(1)); // [1]
console.log(lightsOn('1')); // [1]
// n > 1 (number or string)
console.log(lightsOn(3)); // [1]
console.log(lightsOn(4)); // [1, 4]
console.log(lightsOn(5)); // [1, 4]
console.log(lightsOn('5')); // [1, 4]


