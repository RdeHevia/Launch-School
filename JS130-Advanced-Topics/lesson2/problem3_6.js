function Pet(name, image) {
  this.name = name;
  this.image =  image;
}

var Image;
var catImage;
var pudding;

Pet.prototype.walk = function() {
  console.log(`${this.name} is walking.`);
};

Image = class {
  constructor(file) {
    this.file = file;
  }
};

catImage = new Image("cat.png");
pudding = new Pet("Pudding", catImage);

console.log(catImage);
console.log(pudding);