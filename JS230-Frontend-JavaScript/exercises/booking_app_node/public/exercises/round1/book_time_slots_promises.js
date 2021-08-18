/* eslint-disable max-nested-callbacks */
/* eslint-disable max-lines-per-function */

// retrieve schedules and add as options to form
document.addEventListener('DOMContentLoaded', () => {
  let select = document.querySelector('select');
  select.addEventListener('click', event => {
    if (select.options.length !== 0) return undefined;
    let staffPromise = makeRequest('GET', '/api/staff_members', 'json', null);
    let schedulesPromise = makeRequest('GET', '/api/schedules', 'json', null);

    addSchedulesToForm(staffPromise, schedulesPromise);
  });
});

// submit booking form
document.addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector('#booking_form');
  form.addEventListener('submit', event => {
    event.preventDefault();
    let formData = new FormData(form);
    let json = formDataToJson(formData);

    let bookingSubmissionPromise = makeRequest('POST', '/api/bookings', '', json);
    handleBookingFormSubmission(bookingSubmissionPromise);
  });
});
// makeRequest (returns promise)
function makeRequest(method, path, responseType, json) {
  let xhrPromise = new Promise(resolve => {
    let xhr = new XMLHttpRequest();
    xhr.open(method, path);
    xhr.responseType = responseType;
    xhr.addEventListener('load', () => resolve(xhr));
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(json || '');
  });

  return xhrPromise;
}

function addSchedulesToForm(staffPromise, schedulesPromise) {
  let promises = Promise.all([staffPromise, schedulesPromise]);

  promises.then(xhrs => {
    let staff = xhrs[0].response;
    let schedules = xhrs[1].response;
    let availableSchedules = schedules
      .filter(schedule => !schedule.student_email);

    let select = document.querySelector('select');
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

function findMemberById(staff, id) {
  return staff.filter(member => member.id === id)[0];
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

function handleBookingFormSubmission(bookingSubmissionPromise) {
  bookingSubmissionPromise.then(xhr => {
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
      let studentForm = document.querySelector('#new_student');
      bindSubmitListenerToStudentForm(studentForm);
    }
  });
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
}

// submit new student form
function bindSubmitListenerToStudentForm(studentForm) {
  studentForm.addEventListener('submit', event => {
    event.preventDefault();
    let formData = new FormData(studentForm);
    let json = formDataToJson(formData);
    let studentSubmissionPromise = makeRequest('POST', studentForm.action, '', json);
    studentSubmissionPromise.then(xhr => {
      alert(xhr.responseText);
      let studentEmail = document.querySelector('#email').value;
      document.querySelector('#student_email').value = studentEmail;
      document.querySelector('.submit button').click();
      studentForm.remove();
    });
  });
}