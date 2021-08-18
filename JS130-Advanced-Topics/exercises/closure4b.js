/*
- delegates method of an object to another object's method.
INPUT: 1) the object 2) name of the method 3) passing arguments of the method
OUTPUT: the method, as a reference and keeping the context
*/

function delegate(context, methodName, ...args) {
  return () => context[methodName](...args);
}

let foo = {
  name: 'test',
  bar: function(greeting) {
    console.log(greeting + ' ' + this.name);
  },
};

let baz = {
  qux: delegate(foo, 'bar', 'hello'),
};

baz.qux();   // logs 'hello test';

foo.bar = function() { console.log('changed'); };

baz.qux();          // logs 'changed'