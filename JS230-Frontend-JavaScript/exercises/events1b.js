/*
I: n callbacks
O: undefined
SIDE EFFECT:
  - invoke each callback at a random point btw now and 2n seconds
  - logs the elapsed time
ALGO:
  - setInterval 1s. clear after 10s
  - for each callback:
  - generate a randome number btw 0 and 2n
  - setTimeOut that number
*/

function randomizer(...callbacks) {
  let timeLimit = callbacks.length * 2;
  if (timeLimit === 0) return;
  logElapsed(timeLimit);
  callbacks.forEach(callback => {
    let randomTime = Math.random() * timeLimit;
    setTimeout(callback, randomTime * 1000);
  });
}

function logElapsed(timeLimit) {
  let count = 1;
  let id = setInterval(() => {
    console.log(count);
    count += 1;
    if (count > timeLimit) clearInterval(id);
  }, 1000);
}

function callback1() {
  console.log('callback1');
}

function callback2() {
  console.log('callback2');
}

function callback3() {
  console.log('callback3');
}

randomizer(callback1, callback2, callback3);