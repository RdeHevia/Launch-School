/*
function that rotates an array
INPUT: array
OUTPUT: NEW rotated array
EXAMPLE:
a, b, c -> (a), b, c + a -> b, c, a
ALGORITHM:
1. Create a copy of the input array
2. Remove the first element of the array
3. Add it to the end of the array
4. Return the new array
*/

function rotateArray(array) {
  if (!Array.isArray(array)) {
    return undefined;
  }

  let rotatedArray = array.slice();
  rotatedArray.push(rotatedArray.shift());
  return rotatedArray;
}

console.log(rotateArray([7, 3, 5, 2, 9, 1]));       // [3, 5, 2, 9, 1, 7]
console.log(rotateArray(['a', 'b', 'c']));          // ["b", "c", "a"]
console.log(rotateArray(['a']));                    // ["a"]
console.log(rotateArray([1, 'a', 3, 'c']));         // ["a", 3, "c", 1]
console.log(rotateArray([{ a: 2 }, [1, 2], 3]));    // [[1, 2], 3, { a: 2 }]
console.log(rotateArray([]));                       // []

// return `undefined` if the argument is not an array
console.log(rotateArray());                         // undefined
console.log(rotateArray(1));                        // undefined


// the input array is not mutated
let array = [1, 2, 3, 4];
console.log(rotateArray(array));                    // [2, 3, 4, 1]
console.log(array);                                 // [1, 2, 3, 4]