/* eslint-disable quote-props */
/*
I: movie release data; array of objects [movie1, movie2...]; movie = {}
O: array of objects [movieData1, movieData2...];
    movieData = {id: integer > 0, title: non-empty string}
RULES:
  - for a given movie, id and title might not be present
  - for a given movie, keep releases only if id and title exist. otherwise, not
    include it
EXAMPLES:
  - id:70111470, title: 'Die Hard'... -> {id, title}
  - title: chamber -> not process it
ALGORITHM:
  1. Filter movies that have both id and title
  2. Return a new array with object with {id:..., title:...}
*/

function processReleaseData(data) {
  let dataWithIdAndTitle = data.filter(movieData => {
    return movieData.hasOwnProperty('id') && movieData.hasOwnProperty('title');
  });

  return dataWithIdAndTitle.map(movieData => {
    return {id: movieData.id, title: movieData.title};
  });
}

let newReleases = [
  {
    'id': 70111470,
    'title': 'Die Hard',
    'boxart': 'http://cdn-0.nflximg.com/images/2891/DieHard.jpg',
    'uri': 'http://api.netflix.com/catalog/titles/movies/70111470',
    'rating': [4.0],
    'bookmark': [],
  },
  {
    'id': 654356453,
    'boxart': 'http://cdn-0.nflximg.com/images/2891/BadBoys.jpg',
    'uri': 'http://api.netflix.com/catalog/titles/movies/70111470',
    'rating': [5.0],
    'bookmark': [{ id:432534, time:65876586 }],
  },
  {
    'title': 'The Chamber',
    'boxart': 'http://cdn-0.nflximg.com/images/2891/TheChamber.jpg',
    'uri': 'http://api.netflix.com/catalog/titles/movies/70111470',
    'rating': [4.0],
    'bookmark': [],
  },
  {
    'id': 675465,
    'title': 'Fracture',
    'boxart': 'http://cdn-0.nflximg.com/images/2891/Fracture.jpg',
    'uri': 'http://api.netflix.com/catalog/titles/movies/70111470',
    'rating': [5.0],
    'bookmark': [{ id:432534, time:65876586 }],
  },
];

console.log(processReleaseData(newReleases));
// [{ id: 70111470, title: 'Die Hard'}, { id: 675465, title: 'Fracture' }];