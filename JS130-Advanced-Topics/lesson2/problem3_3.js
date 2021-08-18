function foo(condition) {
  console.log(bar);

  qux = 0.5772;

  if (condition) {
    var qux = 3.1415;
    console.log(qux);
  } else {
    var bar = 24;

    var xyzzy = function() {
      var qux = 2.7183;
      console.log(qux);
    };

    console.log(qux);
    console.log(xyzzy());
  }

  qux = 42;
  console.log(qux);
}

function foo2(condition) {
  let bar;
  console.log(bar);

  let qux = 0.5772;

  if (condition) {
    qux = 3.1415;
    console.log(qux);
  } else {
    bar = 24;

    let xyzzy = function() {
      let qux = 2.7183;
      console.log(qux);
    };

    console.log(qux);
    console.log(xyzzy());
  }

  qux = 42;
  console.log(qux);
}

foo(true);
foo(false);

console.log('-------------------');

foo2(true);
foo2(false);

