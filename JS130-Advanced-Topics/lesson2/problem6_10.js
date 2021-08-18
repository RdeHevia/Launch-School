"use strict";

function bind (thisArg, func) {
  return () => func.call(thisArg);
}
let obj = {};
let obj2 = {};
let boundFunc = bind(obj, function() {
  this.foo = "bar";
});

boundFunc();
boundFunc.call(obj2);
console.log(obj); // { foo: 'bar' }
console.log(obj2);