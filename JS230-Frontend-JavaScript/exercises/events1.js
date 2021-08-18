function callback1() {
  console.log('callback1');
}

function callback2() {
  console.log('callback2');
}

function callback3() {
  console.log('callback3');
}

/*
INPUT: n callbacks
  - data type: function
  - n is the number of callbacks
OUTPUT: call all the callbacks in random order from 0 to 2n seconds
  - also, logs elapsed time every second
EXAMPLE:
cb1, cb2, cb3:
  n = 3
  timeFrame = [0, 3*2] = [0, 6] seconds
  cb1: random number = 2.3
  cb2: random number = 0.1
  cb3: random number = 5.3
  callbacks are called in the following order:
  - t = 0.1s: cb2
  - t = 2.3s: cb1
  - t = 5.3s: cb3
*/

/*
DS:
  - callbacks = [cb1, cb2...]
ALGORITHM:
  - callbacks: input callbacks
  - nbrOfCallbacks = callbacks.length
  - timeFrameInSeconds = [0, 2*nbrOfCallbacks]
  - log the elapsed time every second starting at 1
  - iterate over callbacks. for each callback:
    - timeOfExecution: randomNumber(...timeFrameInSeconds) * 1000
    - setTimeOut(cb, timeOfExecution)
*/


function randomizer(...callbacks) {
  let nbrOfCallbacks = callbacks.length;

  let timeFrameInSeconds = [0, 2 * nbrOfCallbacks];

  logElapsedTime(timeFrameInSeconds[1]);

  callbacks.forEach(callback => {
    let timeOfExecution = randomNumber(...timeFrameInSeconds) * 1000;
    setTimeout(callback, timeOfExecution);
  });
}

function logElapsedTime(upperLimitInSeconds) {
  let seconds = new Array(upperLimitInSeconds).fill(1).map((_, idx) => idx + 1);
  seconds.forEach(second => {
    setTimeout(() => console.log(second), second * 1000);
  });
  return undefined;
}

/*
randomNumber(lowerLimit, upperLimit)
ALGO:
  return lowerLimit + Math.random() * (upperLimit - lowerLimit)
*/

function randomNumber(lowerLimit = 0, upperLimit = 1) {
  return lowerLimit + (Math.random() * (upperLimit - lowerLimit));
}

randomizer(callback1, callback2, callback3);

// Output:
// 1
// 2
// "callback2"
// 3
// "callback3"
// 4
// 5
// "callback1"
// 6