/*
ancestors method
- return prototype chain (ancestors) as an array of object names
EXAMPLE:
qux -> baz -> bar -> foo -> Object.prototype
ASSUMPTION. add ancestors to the foo object
ALGORITHM:
1. Get the name of the prototype of the calling object. Add it to an array
2. Get the name of the prototype of the prototype of the calling object.
    Add it to the array
3. Repeat steps until we reach Object.prototype.
*/

// name property added to make objects easier to identify
let foo = {
  name: 'foo',
  ancestors() {
    let arrayOfAncestors = [];
    let object = this;
    while (true) {
      let prototypeObject = Object.getPrototypeOf(object);
      if (prototypeObject === Object.prototype) {
        arrayOfAncestors.push('Object.prototype');
        break;
      }
      arrayOfAncestors.push(prototypeObject.name);
      object = prototypeObject;
    }
    return arrayOfAncestors;
  }
};
let bar = Object.create(foo);
bar.name = 'bar';
let baz = Object.create(bar);
baz.name = 'baz';
let qux = Object.create(baz);
qux.name = 'qux';

console.log(qux.ancestors());  // returns ['baz', 'bar', 'foo', 'Object.prototype']
console.log(baz.ancestors());  // returns ['bar', 'foo', 'Object.prototype']
console.log(bar.ancestors());  // returns ['foo', 'Object.prototype']
console.log(foo.ancestors());  // returns ['Object.prototype']