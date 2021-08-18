"use strict";
// how to create stack objects that are private
function newStack () {
  let stack = [];

  return {
    push(item) {
      stack.push(item);
    },

    pop() {
      stack.pop();
    },

    printStack() {
      stack.forEach(item => console.log(item));
    }
  }
}

class Stack {
  constructor () {
    let stack = [];
  }

  push(item) {
    stack.push(item);
  }

  pop() {
    stack.pop();
  }

  printStack() {
    stack.forEach(item => console.log(item));
  }
  
}

// let stackOfPancakes = newStack();
// stackOfPancakes.push('A');
// stackOfPancakes.push('B');
// stackOfPancakes.printStack();
// stackOfPancakes.pop();
// stackOfPancakes.printStack();

let pancakes = new Stack();
// let pancakesTest = pancakes.newStack();
console.log(pancakes);
pancakes.push(3);
// console.log(pancakesTest);