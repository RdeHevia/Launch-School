/*
INPUT: movie release data
  - data type: object
  - {
    id: number (integer),
    title: string,
    ...
  }
OUTPUT: array of objects
  - [object1, object2...]; object: {id: number (integer), title: string}
RULES:
  - id and title might exist or not
  - if they exist:
    - id: assume integer >= 0
    - title: non-empty string
  - output:
    - add only releases where both id and title are present
  - input:
    - assume input is always an array of objects or empty array
    - objects: they can be empty
DATA STRUCTURE:
  - processedData (output): [{}, {}...]
ALGORITHM:
  - check if the releases array is empty. YES -> return []
  - declare an empty array: processedData
  - iterate over the objects of the input array. for each object:
    - if the object has both id and title properties:
      - add {id:..., title: ...} to processedData
  - return the array processedData
*/

function processReleaseData2(releases) {
  if (releases.length === 0) return [];

  let processedData = [];

  releases.forEach(movie => {
    if (movie.hasOwnProperty('id') && movie.hasOwnProperty('title')) {
      processedData.push({
        id: movie.id,
        title: movie.title,
      });
    }
  });

  return processedData;
}

function processReleaseData(releases) {
  if (releases.length === 0) return [];

  let processedData = releases.filter(movie => {
    return (movie.hasOwnProperty('id') && movie.hasOwnProperty('title'));
  }).map(movie => {
    return {id: movie.id, title: movie.title};
  });

  return processedData;
}

// TEST CASES
// empty array
console.log(processReleaseData([])); // []
// array of empty objects
console.log(processReleaseData([{}])); // []
console.log(processReleaseData([{}, {}])); // []
// array with 1 object
let releases1 = [
  {
    id: 70111470,
    title: 'Die Hard',
    boxart: 'http://cdn-0.nflximg.com/images/2891/DieHard.jpg',
    uri: 'http://api.netflix.com/catalog/titles/movies/70111470',
    rating: [4.0],
    bookmark: [],
  }
];

let releases2 = [
  {
    id: 70111470,
    boxart: 'http://cdn-0.nflximg.com/images/2891/DieHard.jpg',
    uri: 'http://api.netflix.com/catalog/titles/movies/70111470',
    rating: [4.0],
    bookmark: [],
  }
];
console.log(processReleaseData(releases1)); // [{id, title}]
console.log(processReleaseData(releases2));  //[]

// array with multiple objects
let newReleases = [
  {
    id: 70111470,
    title: 'Die Hard',
    boxart: 'http://cdn-0.nflximg.com/images/2891/DieHard.jpg',
    uri: 'http://api.netflix.com/catalog/titles/movies/70111470',
    rating: [4.0],
    bookmark: [],
  },
  {
    id: 654356453,
    boxart: 'http://cdn-0.nflximg.com/images/2891/BadBoys.jpg',
    uri: 'http://api.netflix.com/catalog/titles/movies/70111470',
    rating: [5.0],
    bookmark: [{ id:432534, time:65876586 }],
  },
  {
    title: 'The Chamber',
    boxart: 'http://cdn-0.nflximg.com/images/2891/TheChamber.jpg',
    uri: 'http://api.netflix.com/catalog/titles/movies/70111470',
    rating: [4.0],
    bookmark: [],
  },
  {
    id: 675465,
    title: 'Fracture',
    boxart: 'http://cdn-0.nflximg.com/images/2891/Fracture.jpg',
    uri: 'http://api.netflix.com/catalog/titles/movies/70111470',
    rating: [5.0],
    bookmark: [{ id:432534, time:65876586 }],
  },
];

console.log(processReleaseData(newReleases)); 
// [{ id: 70111470, title: 'Die Hard'}, { id: 675465, title: 'Fracture' }];