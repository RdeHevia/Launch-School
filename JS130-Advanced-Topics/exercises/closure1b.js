/*
INPUT: (function to bind, context)
OUTPUT: returns new function hard-bound
RULES: don't use bind
*/

function myBind(func, context) {
  return function (...args) {
    return func.call(context, ...args);
  }
}

let obj = {
  message: 'hi there',
}

function greeter (name) {
  console.log(this.message + ' ' + name);
}

let bindedGreeter = myBind(greeter, obj);
bindedGreeter('Raul');