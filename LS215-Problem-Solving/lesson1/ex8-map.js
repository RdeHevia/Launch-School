function myMap(array, callback) {
  let newArray = [];
  array.forEach(item => newArray.push(item));

  return newArray;
}

let plusOne = n => n + 1;
console.log(myMap([1, 2, 3, 4], plusOne));       // [ 2, 3, 4, 5 ]