let language = 'JavaScript';

let aIndex = language.indexOf('a');
let vIndex = language.indexOf('v');

console.log(language.substr(aIndex,4));
console.log(language.substr(vIndex,4));

console.log(language.substring(aIndex,4));
console.log(language.substring(vIndex,4));

console.log(language.slice(aIndex,4));
console.log(language.slice(vIndex,4));