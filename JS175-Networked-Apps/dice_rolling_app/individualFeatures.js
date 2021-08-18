const HTTP = require('http');
const URL = require('url').URL;
const PORT = 3000;

// function repeat(numberOfTimes, callback, ...args) {
//   let callbackReturns = [];
//   for (let iteration = 0; iteration < numberOfTimes; iteration += 1) {
//     callbackReturns.push(callback(...args));
//   }

//   return callbackReturns;
// }

function randomInteger (min, max) {
  let randomBtw0And1 = Math.random();
  let randomInteger = Math.floor(((max - min) * randomBtw0And1) + min);
  return randomInteger;
}

function rollDie(nbrOfSides) {
  return randomInteger(1,nbrOfSides);
}

function rollDice(path) {
  let params = getParameters(path);
  console.log(params);
  let nbrOfRolls = Number(params.get('rolls'));
  let nbrOfSides = Number(params.get('sides'));
  let body = '';

  for (let iteration = 1; iteration <= nbrOfRolls; iteration += 1) {
    body += (`${iteration}) Dice rolled!: ${rollDie(nbrOfSides)}\n`);
  }

  return body;
}

function getParameters(path) {
  let url = new URL (path,`http://localhost:${PORT}`);
  return url.searchParams;
}

console.log(rollDice('?rolls=10&sides=8'));
console.log('3');