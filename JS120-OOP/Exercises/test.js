// instance objects have instance properties:

// instance properties
// instances methods


// static properties
// static methods

function Fridge (brand, finish) {
  this.brand = brand;
  this.finish = finish;
}

Fridge.prototype.cool = function () {
  console.log(`I'm cooling`);
};

Fridge.applianceType = 'Kitchen appliance';
