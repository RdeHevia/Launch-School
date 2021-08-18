let rlSync = require("readline-sync");
let name = rlSync.question('What is your name?');

if (!name.match(/!$/)) {
  console.log(`Hello ${name}.`);
} else {
  name = name.replace(/!$/,'').toUpperCase();
  console.log(`HELLO ${name}. WHY ARE YOU SCREAMING?`);
}
