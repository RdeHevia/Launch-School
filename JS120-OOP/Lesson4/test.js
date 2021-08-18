function Animal() {
    this.type = "mammal";

    this.breathe = function() {
      console.log("I'm breathing");
    };
}

var animal = new Animal();

console.log(animal.__proto__);  // {constructor: ƒ}