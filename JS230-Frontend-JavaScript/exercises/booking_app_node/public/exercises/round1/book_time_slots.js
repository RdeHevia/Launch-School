/* eslint-disable max-nested-callbacks */
/* eslint-disable max-lines-per-function */
/*
- allow students to book a schedule
STRUCTURE:
Book schedule form:
 - Please select on schedule (select): Staff_name | date | hour
 - Email: email
 - Submit
New student form:
  - email
  - name
  - booking sequence: (from server)
  submit
ALGORITH:
Book schedule form:
  - EVENT: click on the select
    - XHR: GET /api/staff_members
      - send request
      - XHR: GET, /api/schedules, content type: json
        - send request
        - retrieve all available schedules
        - filter the ones with student_email === null
        - 
        - add as option elements childs of select
        - display options
  - EVENT: submit form
    - XHR: POST, /api/bookings, content type: json
      - send request
      - status code 204: alert 'schedule booked'
      - status code 404:
        - extract booking_sequence from the response
        - create new student form, fill booking_sequence and add to html
New student form:
  - EVENT: submit form
    - XHR: POST, /api/students, content type: json
      - send request
      - status code 201: 'student added'
      - status code 403 (invalid booking seq): alert response text message
      - status code 400 (invalid inputs): alert response text message
*/

// retrieve schedules and add as options to form
document.addEventListener('DOMContentLoaded', () => {
  let select = document.querySelector('select');
  select.addEventListener('click', event => {
    if (select.options.length !== 0) return undefined;
    makeRequest('GET', '/api/staff_members', 'json', null, retrieveAvailableSchedules);
  });
});

// submit booking form
document.addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector('#booking_form');
  form.addEventListener('submit', event => {
    event.preventDefault();
    let formData = new FormData(form);
    let json = formDataToJson(formData);
    console.log(json);
    makeRequest('POST', '/api/bookings', '', json, handleFormSubmission);
  });
});

function findMemberById(staff, id) {
  return staff.filter(member => member.id === id)[0];
}

function makeRequest(method, path, responseType, json, listener) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, path);
  xhr.responseType = responseType;
  xhr.addEventListener('load', event => listener(xhr, event));
  xhr.setRequestHeader('Content-Type', 'application/json');
  if (json) {
    xhr.send(json);
  } else {
    xhr.send();
  }
}

function retrieveAvailableSchedules(xhr, event) {
  let staff = xhr.response;
  let select = document.querySelector('select');
  makeRequest('GET', '/api/schedules', 'json', null, (xhr, event) => {
    let availableSchedules =
          xhr.response.filter(schedule => !schedule.student_email);

    availableSchedules.forEach(schedule => {
      let option = document.createElement('option');
      option.value = schedule.id;
      let name = findMemberById(staff, schedule['staff_id']).name;
      option.textContent =
        `${name} | ${schedule.date} | ${schedule.time}`;
      select.appendChild(option);
    });
  });
}


function formDataToJson(formData) {
  let data = {};

  let entries = formData.entries();
  for (let pair of entries) {
    if (String(+pair[1]) === pair[1]) {
      data[pair[0]] = +pair[1];
    } else {
      data[pair[0]] = pair[1];
    }
  }
  return JSON.stringify(data);
}

function handleFormSubmission(xhr, event) {
  if (xhr.status === 204) {
    alert('Appointment booked.');
    let select = document.querySelector('select');
    let form = document.querySelector('form');
    select.selectedOptions[0].remove();
    form.reset();
  } else {
    alert(xhr.responseText);
    if (xhr.responseText === 'Schedule is either booked or does not exist.') {
      return;
    }
    let bookingSequence = xhr.responseText.match(/[0-9]+$/);
    let studentEmail = document.querySelector('#student_email').value;
    renderNewStudentForm(studentEmail, bookingSequence);
  }
}

function renderNewStudentForm(studentEmail, bookingSequence) {
  const MARKUP = `
  <form id="new_student" action="/api/students" method="post">
    <article class="header">
      <h1>Please provide new student details</h1>
    </article>
    <fieldset class="input_fields student">
      <dl>
        <dt><label for="email">Email</label></dt>
        <dd><input type="email" name="email" id="email"/></dd>
      </dl>
      <dl>
        <dt><label for="name">Name</label></dt>
        <dd><input type="text" name="name" id="name"/></dd>
      </dl>
      <dl>
        <dt><label for="booking_sequence">Booking sequence</label></dt>
        <dd><input type="number" name="booking_sequence" id="booking_sequence"/></dd>
      </dl>
    </fieldset>
    <article class='submit student'>
      <button type="submit">Submit</button>
    </article>
  </form>`;
  if (document.querySelector('#new_student')) return;

  document.querySelector('form').insertAdjacentHTML('afterend',MARKUP);
  let studentForm = document.querySelector('#new_student');
  studentForm.querySelector('#email').value = studentEmail;
  studentForm.querySelector('#booking_sequence').value = bookingSequence;

    // submit new student form
  studentForm.addEventListener('submit', event => {
    console.log(event.target);
    event.preventDefault();
    let formData = new FormData(studentForm);
    let json = formDataToJson(formData);
    makeRequest('POST', studentForm.action, '', json, (xhr, event) => {
      alert(xhr.responseText);
      let studentEmail = document.querySelector('#email').value;
      document.querySelector('#student_email').value = studentEmail;
      document.querySelector('.submit button').click();
      studentForm.remove();
    });
  });
}