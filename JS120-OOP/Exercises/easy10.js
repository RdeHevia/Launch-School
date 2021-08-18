/*
Classes:
Pet
   - animal
   - name
Owner
  - name
  - number of pets
Shelter
  owners:
    owner1:
      - pet1
      - pet2
      ...
    ownert2:...
  adopt(): modify number of pets of the Owner object
  printAdoptions():
*/

class Pet {
  constructor(animal, name) {
    this.animal = animal;
    this.name = name;
  }
}

class Owner {
  constructor (name) {
    this.name = name;
    this.pets = [];
  }
  addPet(pet) {
    this.pets.push(pet);
  }
  numberOfPets() {
    return this.pets.length;
  }
}

class Shelter {
  constructor () {
    this.adoptionRegistry = {};
  }

  adopt(owner, pet) {
    // 1. add pet to owner
    // 2. add owner and pet to registry
    owner.addPet(pet);
    this.addToRegistry(owner);
  }

  addToRegistry(owner) {
    if (!this.adoptionRegistry[owner.name]) {
      this.adoptionRegistry[owner.name] = owner;
    }
  }

  printAdoptions() {
    console.log(this.adoptionRegistry);
    for (let owner in this.adoptionRegistry) {
      console.log(`${owner} has adopted the following pets:`);
      this.adoptionRegistry[owner].pets.forEach(pet => {
        console.log(`a ${pet.animal} named ${pet.name}`);
      });
    }
  }
}

let butterscotch = new Pet('cat', 'Butterscotch');
let pudding      = new Pet('cat', 'Pudding');
let darwin       = new Pet('bearded dragon', 'Darwin');
let kennedy      = new Pet('dog', 'Kennedy');
let sweetie      = new Pet('parakeet', 'Sweetie Pie');
let molly        = new Pet('dog', 'Molly');
let chester      = new Pet('fish', 'Chester');

let phanson = new Owner('P Hanson');
let bholmes = new Owner('B Holmes');

let shelter = new Shelter();
shelter.adopt(phanson, butterscotch);
shelter.adopt(phanson, pudding);
shelter.adopt(phanson, darwin);
shelter.adopt(bholmes, kennedy);
shelter.adopt(bholmes, sweetie);
shelter.adopt(bholmes, molly);
shelter.adopt(bholmes, chester);
shelter.printAdoptions();
console.log(`${phanson.name} has ${phanson.numberOfPets()} adopted pets.`);
console.log(`${bholmes.name} has ${bholmes.numberOfPets()} adopted pets.`);