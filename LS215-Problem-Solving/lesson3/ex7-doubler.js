/* eslint-disable max-len */

// GENERIC CASES
// - elements that are numbers should be multiplied by 2
doubler([1,2,3]) // [2,4,6]

// - elements that are strings should be repeated twice via concatenation
doubler(['a','aB','aBc', '123']) // ['aa', 'aBaB', 'aBcaBc', '123123']

// - other types of elements should be duplicated in the array
doubler([true, false]);
doubler([null]); //[null ,null]
doubler([undefined]) // [undefined, undefined]
doubler([1], []) // [[1], [1], [], []]
doubler([{foo: 'bar'}]) // [{foo: 'bar'}, {foo: 'bar'}]
doubler([function foo() {}]); // [function foo(), function foo()]
doubler([/abc/]) // [/abc/, /abc/]

// - the input array should not be mutated
let arr = [1,2,3];
let arrCopy = arr.slice();
let arr2 = doubler(arr);
String(arr) === String(arrCopy); //true (values haven't changed)
arr === arr2; // false (they don't point to the same array)

// - elements that are special number values should remain unchanged
doubler([NaN, Infinity, -Infinity]) // [NaN, Infinity, -Infinity]

// - elements that are any other type of number should be treated normally (multiplied by 2)
doubler([0.42, -5, 0, -0]) // [0.84, -10, 0, 0]

// - elements that are empty strings should remain unchanged
doubler(['']) // ['']

// - elements that are any other type of string should be treated normally (repeated twice)
doubler([' '. 'aB', '@', '\n', '1']); // ['  ', 'aBaB, '@@', '\n\n', '11']

// - the input array can contain a mixture of different types of elements
doubler([1, 'a', true, [], {}]) // [2, 'aa', [], [], {}, {}]

// - non-primitive elements should have their reference duplicated, not their value
let doubled = doubler([{a: 'b'}]); // [{a: 'b'}, {a: 'b'}]
doubled[0] === doubled[1]; // true

// - elements that appear more than once should be treated normally (as specified above)
doubler([1,1, true, true, {}, {}, 'a', 'a']) // [2, 2, true, true, true, true, {}, {}, {}, {}, 'aa', 'aa]

// - elements that contain nested arrays or objects should be treated normally (duplicated)
doubler([[1, [2,3], {}]]) // [[1, [2,3], {}], [1, [2,3], {}]]
doubler([{a: [1]}]) // [[{a: [1]}, [{a: [1]}]

// - if the input array contains empty slots (a "sparse array"), they should be removed
doubler([ , 1, , 2, , , 3, ]) // [2, 4, 6]

// - if an inner array (element) contains empty slots, they should remain unchanged
doubler([[,1,,2,,3]]) // [[,1,,2,,3],[,1,,2,,3]]

// - if the input array contains any object properties, they should remain unchanged
let array = [1,2];
array.foo = 'bar';
doubler(array);

// - if an inner array (element) contains any object properties, they should remain unchanged
let array2 = [1, 2];
array2.foo = 'bar';
doubler([array2]); // [[1, 2, foo: "bar"], [1, 2, foo: "bar"]]

// - if the array is empty, return an empty array
doubler([]) // []

// - if multiple arguments are passed, ignore all but the first
doubler(['a'], ['b']) // ['aa']

// - if the argument is a string, treat it as an array of characters
doubler('abc');                        // ["aa", "bb", "cc"]
doubler('123');                        // ["11", "22", "33"]
doubler('');                           // []
// - if the argument is a non-negative integer, treat it as an array of digits
doubler(1234) // [2, 4, 6, 8]
doubler(0) // [0]

// - if the argument is an object, treat it as an array of its property values
doubler({a:1, b:2}) // [2, 4]
doubler({a: 'A', b: []}) // ['AA', [], []]
doubler({}) // []

// - all other kinds of inputs are invalid, and should return the string 'Invalid input'
doubler(-1); 'Invalid input'
doubler(0.42); 'Invalid input'
doubler(Infinity); 'Invalid input'
doubler(NaN); 'Invalid input'
doubler(true); 'Invalid input'
doubler(false); 'Invalid input'
doubler(null); 'Invalid input'
doubler(undefined); 'Invalid input'
doubler(() => {}); 'Invalid input'
doubler(/abc/); 'Invalid input'
doubler(); 'Invalid input'
