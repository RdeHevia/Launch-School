// I: callback, time in seconds
// O: undefined
// side effect: invoke the function after N seconds

function afterNSeconds (callback, delay) {
  setTimeout(callback, delay * 1000);
}

let log = () => console.log('hi');

afterNSeconds(log, 2);