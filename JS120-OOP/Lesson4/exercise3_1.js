/*
properties:
  - animal
  - name
  - awake
methods:
  - sleep()
  - wake()

*/

function createPet(animal, name) {
  return {
    animal,
    name,
    awake: true,

    sleep() {
      console.log('I am sleeping.');
    },

    wake() {
      console.log('I am awake.');
    }
  };
}

let pudding = createPet("Cat", "Pudding");
console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
pudding.sleep(); // I am sleeping
pudding.wake();  // I am awake

let neptune = createPet("Fish", "Neptune");
console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
neptune.sleep(); // I am sleeping
neptune.wake();  // I am awake