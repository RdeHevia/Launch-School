const walkMixin = {
  walk() {
    return `${this.name} ${this.gait()} forward.`;
  }
};

class Person {
  constructor(name) {
    this.name = name;
  }

  gait() {
    return "strolls";
  }
}

Object.assign(Person, walkMixin);

class Cat {
  constructor(name) {
    this.name = name;
  }

  gait() {
    return "saunters";
  }
}

Object.assign(Cat, walkMixin);

class Cheetah {
  constructor(name) {
    this.name = name;
  }

  gait() {
    return "runs";
  }
}

Object.assign(Cheetah, walkMixin);