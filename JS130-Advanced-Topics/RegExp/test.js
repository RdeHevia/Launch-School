// Hoisting: before execution, declarations are effectively moved to the top of their scope
// Variable hoisting
//  - var: 1) variables are function scoped
function func () {
  console.log(data);
  if (true) {
    var data = 'abc';
  }

  // console.log(data);
}

func();
// FUnction hoisting
// Class hoisting