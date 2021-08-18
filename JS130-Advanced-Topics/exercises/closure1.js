/*
INPUT: function, context
OUTPUT: new function hard-bound to the context
ALGORITHM:
*/
"use strict";

function myBind(func, context) {
  return (...args) => {
    func.call(context,...args);
  };
}

let morning = {
  message: 'Good morning',
};

function greeter (name, lastName) {
  console.log(`${this.message} ${name} ${lastName}`);
}

let morningGreeter = myBind(greeter, morning);
morningGreeter('Raul', 'de Hevia');