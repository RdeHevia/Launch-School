/*
INPUT: 2 objects
OUTPUT: true or false
  - objects have same key/value pairs -> true
  - else -> false
EXAMPLE:
  {a: foo, b: bar}, {b:bar, a: foo} -> true
ALGORITHM:
  1. For each property of the first object
    1.1 Check if the second object has the same property:
      - no -> return false
      - yes -> go to step 1.2.
    1.2. Check if the values associated to the keys are objects/arrays
      - yes -> call the function again (recursion)
      - no -> go to step 1.3.
    1.3. Check if the values associated to the keys are the same
      - yes -> continue the loop (go to step 1)
      - no -> return false
  2. If the loop ends, return true
*/

function objectsEqual(obj1, obj2) {
  for (let key in obj1) {
    if (!obj2.hasOwnProperty(key)) {
      return false;
    } else if ((typeof obj1[key] === 'object')) {
      return objectsEqual(obj1[key], obj2[key]);
    } else if ((typeof obj1[key] === 'function')) {
      return obj1[key].name === obj2[key].name;
    } else if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}


// console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
// console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
// console.log(objectsEqual({}, {}));                                      // true
// console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false
// console.log(objectsEqual({a: [1,2]}, {a: [1,2]}));
let objA = {a:[1,2], b: [3,4]};
let objB = {a:[1,2], b: [3,4]};
let objC = {a:[2,1], b: [3,4]};

let objD = {a: function foo() {}};
let objE = {a: function foo() {}};
let objF = {a: function bar() {}};

console.log(objectsEqual(objA, objB)); // true
console.log(objectsEqual(objA, objC)); // false

console.log(objectsEqual(objD, objE)); // true
console.log(objectsEqual(objD, objF)); // false