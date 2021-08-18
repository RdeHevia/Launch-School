/*
- function
- retrieve all schedules
- timeout = 5s
OUTPUT:
  - staff id: nbr od schedules
RULES:
  - alert staff_id: count for each staff with available schedules
  - timeout = 5s. t > timeout: cancel request and inform the user
ALGO:
  - retrieve all schedules: GET /api/schedules.
    - load EVENT:
      - staffSchedulesCount = {}
      - iterate over the schedules for each schedule:
        - if id included in staffSchedulesCount: staffSchedulesCount[id] = 1;
        - else: += 1
      - alert
    - timeout EVENT:
      - alert of failure. try again
*/

function getStaffSchedulesCount () {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', '/api/schedules');
  xhr.responseType = 'json';
  xhr.timeout = 5000;

  xhr.addEventListener('load', () => alertSchedulesCount(xhr.response));
  xhr.addEventListener('timeout', alertTimeout);
  xhr.addEventListener('loadend', () => alert('The request has been completed'));

  xhr.send();
}

// function handlerAlertSchedulesCount(event) {
//   let xhr = event.target;
//   let data = xhr.response;

//   let staffSchedulesCount = countSchedulesEachStaff(data);

//   alert(toMessage(staffSchedulesCount));
// }

function alertSchedulesCount(data) {
  let staffSchedulesCount = countSchedulesEachStaff(data);

  alert(toMessage(staffSchedulesCount));
}

function countSchedulesEachStaff(data) {
  let staffSchedulesCount = {};

  data.forEach(scheduleData => {
    let id = `staff ${scheduleData.staff_id}`;
    if (staffSchedulesCount.hasOwnProperty(id)) {
      staffSchedulesCount[id] += 1;
    } else {
      staffSchedulesCount[id] = 1;
    }
  });

  return staffSchedulesCount;
}

function alertTimeout() {
  alert('Maximum timeout exceed. Please try again');
}

function toMessage(object) {
  let message = '';
  Object.entries(object).forEach(entry => {
    let line = `${entry[0]}: ${entry[1]}\n`;
    message += line;
  });

  return message;
}