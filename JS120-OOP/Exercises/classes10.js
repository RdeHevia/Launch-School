class Cat {
  constructor(name) {
    this.name = name;
  }

  static genericGreeting = function () {
    console.log(`Hello! I'm a cat!`);
  }

  personalGreeting = function() {
    console.log(`Hello! My name is ${this.name}`);
  }
}

let kitty = new Cat("Sophie");
Cat.genericGreeting();
kitty.personalGreeting();