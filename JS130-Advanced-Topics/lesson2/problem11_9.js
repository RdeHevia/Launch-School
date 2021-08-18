function objector (...strings) {
  let first = strings.shift();
  let last = strings.pop();
  let middle = strings.sort();
  return {
    first,
    middle,
    last,
  };
}

let {first, middle, last} = objector('a','b','c','d','e','f');
console.log(first);
console.log(middle);
console.log(last);