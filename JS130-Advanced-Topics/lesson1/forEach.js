/*
INPUT: array, function
OUTPUT: undefined
RULES:
  - executes the function for each element of the array, passing the element
    as argument
ALGORITHM:
  1. For each element of the array:
    1.1. Call the function with the element passed to it
    1.2. That's all :)
*/

function logDouble(number) {
  console.log(number * 2);
}

class Foo {
  constructor(prefix) {
    this.prefix = prefix;
  }

  showItem(item) {
    console.log(this.prefix, item);
  }
}


function forEach(array, callback, thisArg) {
  for (let idx = 0; idx < array.length; idx += 1) {
    let element = array[idx];
    callback.call((thisArg || this), element, idx, array);
  }
}

let arr = [1,2,3,4,5,6];

// forEach(arr,logDouble);
// forEach(arr, num => console.log(num ** 2));

// let foo = new Foo("Item: ");
// forEach(arr,foo.showItem,foo);

forEach(["a", "b", "c"], function(value, index, arr) {
  console.log(`After ${value} comes ${arr[index + 1]}`);
});