const { push, pop, arr } = require("./test2");
console.log(arr);
push(3);
push(2);
arr[2] = 5;
console.log(arr);
console.log(pop());