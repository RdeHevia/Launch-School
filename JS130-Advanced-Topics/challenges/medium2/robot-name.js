/*
type Robot:
  - name: LLNNN, random
  name(): return this.name
  reset(): generate a new name
------------
reset():
  1. Generate 2 random letters and 3 random digits
  2. Assign the new name to this.randomName
*/

Math.seedrandom = require('seedrandom');

class Robot {

  static robotNames = [];

  static trackName(name) {
    Robot.robotNames.push(name);
  }

  static nameIsUnique(name) {
    return !Robot.robotNames.includes(name);
  }

  constructor () {
    this.reset();
    Robot.trackName(this.randomName);
  }

  name() {
    return this.randomName;
  }

  reset() {
    let randomLetters = this.generate2RandomLetters();
    let randomDigits = this.generate3RandomNumbers();
    let randomName = randomLetters + randomDigits;
    if (!Robot.nameIsUnique(randomName)) {
      this.reset();
    } else {
      this.randomName = randomName;
    }
  }

  generate2RandomLetters() {
    const NBR_OF_LETTERS = 2;
    const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return this.generateRandomChars(LETTERS, NBR_OF_LETTERS);
  }

  generate3RandomNumbers() {
    const NBR_OF_DIGITS = 3;
    const DIGITS = '1234567890';
    return this.generateRandomChars(DIGITS, NBR_OF_DIGITS);
  }

  generateRandomChars(chars, nbrOfRandomChars) {
    let length = chars.length;
    let firstIndex = 0;
    let randomChars = '';

    for (let iteration = 1; iteration <= nbrOfRandomChars; iteration += 1) {
      let randomIndex = Math.floor(Math.random() * length) + firstIndex;
      randomChars += chars[randomIndex];
    }
    return randomChars;
  }
}

module.exports = Robot;