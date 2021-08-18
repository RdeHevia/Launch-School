/*
INPUT: array of objects
OUTPUT: array of objects with fixed information
RULES:
  - country: should be Canada
  - name: capital letters
  - name: remove dots
ALGORITHM:
  - make a deep copy of the array
  - map the elements of the array. for each object:
    - change the country to UK
    - remove dots from name
    - capitalize name
===========
deepCopy:
ALGO:
  - transform data into string with JSON format
  - parse string with JSON format
*/


let bands = [
  { name: 'sunset rubdown', country: 'UK', active: false },
  { name: 'women', country: 'Germany', active: false },
  { name: 'a silver mt. zion', country: 'Spain', active: true },
];

function deepCopy(data) {
  return JSON.parse(JSON.stringify(data));
}

function processBands(data) {
  return deepCopy(data).map(band => {
    band.country = 'Canada';
    band.name = band.name.replace(/\./g,'').replace(/\b[a-z]/g, (match) => {
      return match.toUpperCase();
    });
    return band;
  });
}


console.log(processBands(bands));

// should return:
// [
//   { name: 'Sunset Rubdown', country: 'Canada', active: false },
//   { name: 'Women', country: 'Canada', active: false },
//   { name: 'A Silver Mt Zion', country: 'Canada', active: true },
// ]