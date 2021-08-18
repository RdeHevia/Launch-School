/*
- book schedule
- if student doesn't exist, show form to register student
- handle all possible responses from server
*/

/*
fetch schedules:
  REQUEST: GET /api/schedules
  RESPONSE:
    - code 200:
      - json {schedules: []}; schedule = {id, staff_id, date, time, student_email}
fetch staff_members:
  REQUEST: GET /api/staff_members
  RESPONSE:
    - code 200:
      - json = {staff_members[]}; member = {id, name, email}
book schedule:
  REQUEST:
  - POST /api/bookings
  - json: {id: number, student_email: string}; id: id of the schedule
  RESPONSE:
  - success: code 204
  - error 404 Not found:
    - schedule not found: 'Schedule is either booked or does not exist.'
    - student not found: 'Student does not exist; booking_sequence: {sequence}'
add student:
  REQUEST:
  - POST /api/students
  - json: {email: string, name: string, booking_sequence: number}
  RESPONSE:
  - code 201 CREATED: 'Successfully added student to the database.'
  - code 403 Forbidden: 'Must have booking sequence.'
  - code 400 Bad Request: 'Please check your inputs.'
*/


/*
ALGO:
- click EVENT attached to select element
  if no options:
  - fetch schedules
  - fetch staff members
  - load EVENT attached to xhrSchedules
    - load EVENT attached to xhrStaff
      - add {name, date, time} as options to the select element of the form
- submit EVENT attached to #book_schedule form
  - serialize data into json
  - submit form
  - load EVENT
    - 204: 
      - alert 'Booked'
      - remove booked schedule from this.availableSchedules NAH
      - reset form
    - 404:
      - alert(responseText)
      - if student not found
        - display add student form
        - fill email and booking sequence
- submit EVENT attached to #register_new_student
  - serialize data into json
  - submit form
  - load EVENT
    - 201:
      - alert 'Successfully added student to the database.'
      - click on #book_schedule button
    - 403 or 400: alert(responseText)
*/

/*
View:
  - hide(element)
  - unhide(element)
  - resetForm(form)
  - renderSchedules(schedules)
Model:
  - availableSchedules = [schedule1,...]; 
    schedule = {id, staff_id, staff_name, date, time}
Controler:
*/

class View {
  hide(element) {
    element.classList.add('hidden');
  }

  unhide(element) {
    element.classList.remove('hidden');
  }

  resetSchedulesForm() {
    let form = document.querySelector('#book_schedule');
    let select = form.querySelector('select');
    this.empty(select);
    form.reset();
    // this.renderSchedules(schedules);
  }

  resetNewStudentForm() {
    let form = document.querySelector('#register_new_student');
    form.reset();
    this.hide(form);
  }

  renderSchedules(schedules) {
    let select = document.querySelector('#book_schedule select');
    schedules.forEach(schedule => {
      let option = document.createElement('option');
      let staffName = schedule.staffName;
      let date = schedule.date;
      let time = schedule.time;

      option.dataset.id = schedule.id;
      option.textContent = `${staffName} | ${date} | ${time}`;
      select.appendChild(option);
    });
  }

  empty(container) {
    [...container.children].forEach(child => child.remove());
  }
}

class Model {
  constructor() {
    this.availableSchedules = [];
  }
}

class Controller {
  constructor() {
    this.view = new View();
    this.model = new Model();
  }

  init() {

    let select = document.querySelector('#book_schedule select');
    select.addEventListener('click', event => this.handleSelectClick(event));

    let formBookSchedule = document.querySelector('#book_schedule');
    formBookSchedule.addEventListener('submit', event => this.handleBookSchedule(event));

    let formNewStudent = document.querySelector('#register_new_student');
    formNewStudent.addEventListener('submit', event => this.handleNewStudent(event));

    console.log(this);
  }

  handleSelectClick(event) {
    let select = event.target;
    if (select.children.length > 0) return;

    let xhrSchedules = new XMLHttpRequest();
    xhrSchedules.open('GET', '/api/schedules');
    xhrSchedules.responseType = 'json';

    xhrSchedules.addEventListener('load', () => this.handleSchedules(xhrSchedules.response));

    xhrSchedules.send();
  }

  handleSchedules(schedules) {
    let availableSchedules =
      schedules.filter(schedule => !schedule['student_email']);

    let xhrStaff = new XMLHttpRequest();
    xhrStaff.open('GET', '/api/staff_members');
    xhrStaff.responseType = 'json';

    xhrStaff.addEventListener('load', () => {
      this.handleAvailableSchedules(xhrStaff.response, availableSchedules);
    });

    xhrStaff.send();
  }

  handleAvailableSchedules(staff, availableSchedules) {
    let availableSchedulesWithStaffName = availableSchedules.map(schedule => {
      let staffId = schedule['staff_id'];
      let staffName = staff.find(member => member.id === staffId).name;
      return {staffName, ...schedule};
    });

    this.model.availableSchedules = availableSchedulesWithStaffName;
    this.view.renderSchedules(this.model.availableSchedules);
  }

  handleBookSchedule(event) {
    event.preventDefault();

    let form = event.target;
    let path = form.getAttribute('action');

    let id = form.querySelector('select').selectedOptions[0].dataset.id;
    let studentEmail = form.querySelector('#student_email').value;

    let json = JSON.stringify({id, student_email: studentEmail});

    let xhr = new XMLHttpRequest();
    xhr.open('POST', path);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

    xhr.addEventListener('load', () => this.handleBookScheduleResponse(xhr));
    xhr.send(json);
  }

  handleBookScheduleResponse(xhr) {
    if (xhr.status === 204) {
      alert('Booked');
      this.view.resetSchedulesForm();
    } else if (xhr.status === 404) {
      alert(xhr.responseText);
      let bookingSequence = xhr.responseText.match(/\d+/)[0];
      if (bookingSequence) {
        let formNewStudent = document.querySelector('#register_new_student');
        this.view.unhide(formNewStudent);
        formNewStudent.querySelector('#booking_sequence').value = bookingSequence;
        formNewStudent.querySelector('#email').value =
          document.querySelector('#student_email').value;
      }
    }
  }

  handleNewStudent(event) {
    event.preventDefault();
    let json = this.serializeFormToJson(event.target);
    let path = event.target.getAttribute('action');

    let xhr = new XMLHttpRequest();
    xhr.open('POST', path);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

    xhr.addEventListener('load', () => this.handleNewStudentResponse(xhr));
    xhr.send(json);
  }

  handleNewStudentResponse(xhr) {
    if (xhr.status === 201) {
      alert('Student successfully added to the database.');
      let submitButtonSchedules = document.querySelector('#book_schedule button');
      submitButtonSchedules.click();
      this.view.resetNewStudentForm();
    }
  }

  serializeFormToJson(form) {
    let entries = [...(new FormData(form))];
    return JSON.stringify(Object.fromEntries(entries));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  (new Controller()).init();
});