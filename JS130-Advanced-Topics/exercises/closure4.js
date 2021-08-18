/*
function delegate
INPUT: object, name of the method on the object,
OUPUT: function that calls the given method with the given context
*/

function delegate(context, methodName, ...args) {
  return () => {
    context[methodName](...args);
  };
}

let foo = {
  name: 'test',
  bar: function(greeting) {
    console.log(greeting + ' ' + this.name);
  },
};

let baz = {
  qux: delegate(foo, 'bar', 'hello'), // returns a function that if invoked, calls foo.bar('hello')
};

baz.qux();   // logs 'hello test';

foo.bar = function() { console.log('changed'); };

baz.qux();          // logs 'changed'