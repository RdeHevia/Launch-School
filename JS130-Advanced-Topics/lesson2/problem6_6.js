let total = 0;

function add (num) {
  total += num;
  return total;
}

function subtract (num) {
  return add (-num);
}

console.log(add(1));       // 1
console.log(add(42));      // 43
console.log(subtract(39)); // 4
console.log(add(6));       // 10