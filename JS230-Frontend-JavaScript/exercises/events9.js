/*
INPUT: callback
  - callback: (event: object) => undefined
OUTPUT: new function that 
  - records the event in the track object
  - executes the original callback
RULES:
*/

/*
DS:
tracker: {
  events: [event1, event2...]
  add(): push event to this.events
  list(): returns this.events
  elements(): return targets [target1, target2...]
  clear(): delete events
}
ALGO:
  - define the tracker object in the global scope
  - add the event to
*/

class Tracker {
  constructor() {
    this.events = [];
  }

  add(event) {
    this.events.push(event);
  }

  clear() {
    this.events = [];
  }

  list() {
    return [...this.events];
  }

  elements() {
    return this.events.map(event => event.target);
  }

  track(callback) {
    return event => {
      this.add(event);
      return callback(event);
    };
  }
}

let tracker = new Tracker();
let track = tracker.track.bind(tracker);


let divRed = document.querySelector('div#red');
let divBlue = document.querySelector('div#blue');
let divOrange = document.querySelector('div#orange');
let divGreen = document.querySelector('div#green');

/*
TEST ASSUMPTIONS:
  - assume user clicks in the following order: blue, red, orange, green
*/

divRed.addEventListener('click', track(event => {
  document.body.style.background = 'red';
}));

divBlue.addEventListener('click', track(event => {
  event.stopPropagation();
  document.body.style.background = 'blue';
}));

divOrange.addEventListener('click', track(event => {
  event.stopPropagation();
  document.body.style.background = 'orange';
}));

divGreen.addEventListener('click', track(event => {
  event.stopPropagation();
  document.body.style.background = 'green';
}));

// console.log(tracker.list().length);
// // 4
// console.log(tracker.elements());
// // [div#blue, div#red, div#orange, div#green]
// console.log(tracker.elements()[0] === document.querySelector('#blue'));
// // true
// console.log(tracker.elements()[3] === document.querySelector('#green'));
// // true
// console.log(tracker.clear());
// // 0
// console.log(tracker.list());
// // []
// tracker.list()[0] = 'abc';
// console.log(tracker.list().length);
// // 0