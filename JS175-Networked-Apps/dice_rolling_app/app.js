// @ts-check
/*
* specify 1) number of dices and 2)number of sides
* each dice roll should be displayed on a separate line
ALGORITHM:
1. parse rolls and sides
2. Call rollDice as indicated by number of rolls
*/
const HTTP = require('http');
const URL = require('url').URL;
const PORT = 3000;

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

const SERVER = HTTP.createServer((req,res) => {
  let method = req.method;
  let path = req.url;
  if (path === '/favicon.ico') {
    res.statusCode = 404;
    res.end();
  } else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    res.write(rollDice(path));
    res.write(`${method} ${path}\n`);

    res.end();
  }
});

SERVER.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});