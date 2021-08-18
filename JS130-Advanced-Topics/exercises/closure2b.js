/*
INPUT: (function to bind, context)
OUTPUT: returns new function hard-bound
RULES: don't use bind
*/

function myBind(func, context, ...argsApplied) {
  return function (...args) {
    return func.call(context, ...argsApplied, ...args);
  }
}

let obj = {
  message: 'hi there',
}

function greeter (name, lastName) {
  console.log(this.message + ' ' + name + ' ' + lastName);
}

let bindedGreeter = myBind(greeter, obj, 'Raul');
bindedGreeter('de Hevia');
bindedGreeter('Sanchez');