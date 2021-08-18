/* eslint-disable max-lines-per-function */
/*
- get all schedules available
- >= 1 schedule available:
  - {staff1, staff2...}
  - `staff ${id}: ${scheduleCount}`
- 0 schedule available:
  - alert user no schedules available
- server slows down when nbr of schedules to retrieve is more than 7.
  - If mroe than 5 seconds pass -> cancel retrieval and inform user to try
    again.
*/

/*
ALGO1:
  - GET all staff. For each staff id:
    - GET all schedules for the staff_id.
    - Filter the schedules with student_email === null
    - count the number elements of filtered array.
    - add `staff ${id}: ${scheduleCount}` to an object
  - return the object
*/

function availableSchedules() {
  let staffRequest = new XMLHttpRequest();
  staffRequest.open('GET', '/api/staff_members');
  staffRequest.responseType = 'json';
  staffRequest.addEventListener('load', event => {
    let staffIds = event.target.response.map(employee => employee.id);
    let schedules = {};

    staffIds.forEach(id => {
      let employeeSchedulesRequest = new XMLHttpRequest();
      employeeSchedulesRequest.open('GET', `/api/schedules/${id}`);
      employeeSchedulesRequest.responseType = 'json';
      employeeSchedulesRequest.addEventListener('load', event => {
        let count = event.target.response.length;
        schedules[`staff ${id}`] = count;
        document.body.textContent = schedules;
      });
      employeeSchedulesRequest.send();
    });
    console.log(schedules);
  });
  staffRequest.send();
  // console.log(staff);
  // return staff;
}

function retrieveSchedules() {
  const request = new XMLHttpRequest();

  // Be sure to change your host and port number accordingly
  request.open('GET','/api/schedules');
  request.timeout = 5000;
  request.responseType = 'json';

  request.addEventListener('load', event => {
    const schedules = request.response;
    const staffs = [];
    const tally = [];

    if (schedules.length > 0) {
      schedules.forEach(({staff_id}) => {
        const key = `staff ${String(staff_id)}`;
        if (!staffs.includes(key)) {
          staffs.push(key);
          tally.push(1);
        } else {
          tally[staffs.indexOf(key)] += 1;
        }
      });

      alert(tally.map((_, index) => `${staffs[index]}: ${tally[index]}`).join("\n"));
    } else {
      alert('There are currently no schedules available for booking');
    }
  });

  request.addEventListener('timeout', event => {
    alert('It is taking longer than usual, please try again later.')
  });

  request.addEventListener('loadend', event => {
    alert('The request has completed.');
  });

  request.send();
}