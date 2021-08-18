/*
INPUT: function, context
OUTPUT: new function hard-bound to the context
ALGORITHM:
*/
"use strict";

function myBind(func, context, ...initialArgs) {
  return (...remainingArgs) => {
    return func.call(context,...initialArgs,...remainingArgs);
  };
}

let morning = {
  message: 'Good morning',
};

function greeter (name, firstLastName, secondLastName) {
  console.log(`${this.message} ${name} ${firstLastName} ${secondLastName}`);
}

let morningGreeter = myBind(greeter, morning);
morningGreeter('Raul', 'de Hevia');

// let raulMorningGreeter = myBind(greeter, morning,'Raul');
// raulMorningGreeter('de Hevia');

let raulDeHeviaMorningGreeter = myBind(greeter,morning,'Raul','de Hevia');
raulDeHeviaMorningGreeter ('Sanchez');
raulDeHeviaMorningGreeter();

function addNumbers(num1, num2) {
  return num1 + num2;
}

let addFive = myBind(addNumbers, null, 5);

let test = addFive(10); // 15
console.log(test);