/*
function newStack
INPUT: N/A
OUTPUT: new object
RULES:
  the new object hashas: a stack [], push(), pop(),printStack()
  the stack is not accesible from outside the methods
*/

function newStack() {
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
  };
}

let stackObj = newStack();
stackObj.push(1);
stackObj.push(2);
stackObj.printStack();
stackObj.pop();
stackObj.printStack();