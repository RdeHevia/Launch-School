/*
MARKUP STRUCTURE:
title
  - date1
    - schedule1 (staff member name | student email | hour)
    - schedule2
    - ...
  - date2
  - date3
  - ...
*/
/*
BEHAVIOR:
  - markup with title and ul container
  - load dates as li elements and add to markup
  - click on a date:
    - load all the schedules as li elements
*/

/*
ALGORITHM:
  - EVENT DOMContentLoaded:
    - load dates: AJAX GET, /api/bookings
    - add as li elements
  - add click EVENT handler to ul container (event delegation)
  - EVENT click on a li element (date):
    - date = event.target
    - load schedules for that date: AJAX GET, /api/bookings/:date
    - add as li elements
*/

// load dates
document.addEventListener('DOMContentLoaded', () => {
  let datesPromise = makeRequest('GET', '/api/bookings', 'json');
  datesPromise.then(xhr => {
    let dates = xhr.response;
    let ul = document.querySelector('#dates');
    dates.forEach(date => {
      let li = document.createElement('li');
      li.textContent = date;
      ul.append(li);
    });
  });
});

// click handler to retrieve dates
document.addEventListener('DOMContentLoaded', () => {
  let ul = document.querySelector('#dates');
  ul.addEventListener('click', event => {
    // console.log(event.target);
    let li = event.target;
    let date = li.textContent;
    // console.log(date);
    let path = `/api/bookings/${date}`;
    let bookingsPromise = makeRequest('GET', path, 'json');
    renderBookings(li, bookingsPromise);
  });
});

function makeRequest(method, path, responseType = 'text', requestContentType = 'text/plain;charset=UTF-8', json = '') {
  return new Promise (resolve => {
    let xhr = new XMLHttpRequest();
    xhr.open(method, path);
    xhr.setRequestHeader('Content-Type', requestContentType);
    xhr.responseType = responseType;

    xhr.addEventListener('load', () => resolve(xhr));
    xhr.send(json);
  });
}

function renderBookings(parent, bookingsPromise) {
  let ul = document.createElement('ul');
  bookingsPromise.then(xhr => {
    let bookings = xhr.response;
    let liElements = bookings.map(booking => {
      let li = document.createElement('li');
      let text = `${booking[0]} | ${booking[1]} | ${booking[2]}`;
      li.textContent = text;
      return li;
    });

    ul.append(...liElements);

    parent.append(ul);
  });
}
