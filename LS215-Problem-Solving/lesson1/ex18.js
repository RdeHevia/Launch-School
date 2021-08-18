/*
I: array of band objects: [band1, band2...]; band = {name, country, active}
O: array of band objects with the right information
RULES:
  - country: it should be 'Canada' in all cases
  - name: All words capitalized (first letter of each word)
  - name: it shouldn't contain dots (.)
ALGORITHM:
  1. For each band of the array:
    1.1. name: capitalize words
    1.2. name: remove dots
    1.3. country: change to canada
*/

function deepCopy (object) {
  return JSON.parse(JSON.stringify(object));
}

function capitalizeWords(text) {
  return text.replace(/\b\w/g, match => match.toUpperCase());
}

function removeCharacter(text, character) {
  const REGEX = new RegExp(`\\${character}`, 'g');

  return text.replace(REGEX, '');
}

// function capitalizeWords3(text) {
//   let words = text.split(' ');
//   let capitalizedWords = words.map(word => {
//     return word.replace(/^./, (firstLetter) => firstLetter.toUpperCase());
//   });
//   let capitalizedText = capitalizedWords.join(' ');
//   return capitalizedText;
// }

// function capitalizeWords2(text) {
//   let words = text.split(' ');
//   let capitalizedWords = words.map(word => word[0].toUpperCase() + word.slice(1));
//   let capitalizedText = capitalizedWords.join(' ');
//   return capitalizedText;
// }

function processBands(bands) {
  let copyOfBands = deepCopy(bands);

  let formatedBands = copyOfBands.map(band => {
    band.name = capitalizeWords(band.name);
    band.name = removeCharacter(band.name, '.');
    band.country = 'Canada';

    return band;
  });

  return formatedBands;
}

let bands = [
  { name: 'sunset rubdown', country: 'UK', active: false },
  { name: 'women', country: 'Germany', active: false },
  { name: 'a silver mt. zion', country: 'Spain', active: true },
];

console.log(processBands(bands));