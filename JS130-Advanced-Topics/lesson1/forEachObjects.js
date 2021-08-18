/*
INPUT: object, callback
OUTPUT: undefined
RULES: for each key-value, call the callback and pass the value as argument
*/

function logDouble(number) {
  console.log(number * 2);
}


function forEachObj (obj, callback) {
  for (let key in obj) {
    let value = obj[key];
    callback(value);
  }
}

let stuff = {
  a: 1,
  b: 2,
  c: 3
};

forEachObj(stuff, logDouble);