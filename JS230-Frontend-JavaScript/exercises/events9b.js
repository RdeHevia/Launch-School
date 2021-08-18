/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
/*
DS: tracker ={}
  - events: array of event objects
  - list() // list all event objects (read only)
  - elements() // return array of elements (event.target)
  - clear() // clear events array
  - track(handler) // track event
*/
/*
track ALGO:
  - return handler
*/

let tracker = {
  events: [],
  add(event) {
    this.events.push(event);
  },

  list() {
    return [...this.events];
  },

  elements() {
    return this.events.map(event => event.target);
  },

  clear() {
    this.events = [];
  },

  track(handler) {
    return event => {
      this.add(event);
      handler(event);
    };
  }
};


document.addEventListener('DOMContentLoaded', () => {
  let divRed = document.querySelector('#red');
  let divBlue = document.querySelector('#blue');
  let divOrange = document.querySelector('#orange');
  let divGreen = document.querySelector('#green');

  divRed.addEventListener('click', tracker.track(event => {
    document.body.style.background = 'red';
  }));

  divBlue.addEventListener('click', tracker.track(event => {
    event.stopPropagation();
    document.body.style.background = 'blue';
  }));

  divOrange.addEventListener('click', tracker.track(event => {
    document.body.style.background = 'orange';
  }));

  divGreen.addEventListener('click', tracker.track(event => {
    document.body.style.background = 'green';
  }));

});

// console.log(tracker.list().length);
  
// console.log(tracker.elements());

// console.log(tracker.elements()[0] === document.querySelector('#blue'));

// console.log(tracker.elements()[3] === document.querySelector('#green'));

// console.log(tracker.clear());

// console.log(tracker.list());

// console.log(tracker.list()[0] = 'abc');
// console.log(tracker.list().length);

