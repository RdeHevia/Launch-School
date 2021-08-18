/*
- list all staff
- user can add multiples schedules at once
- handle all possible responses from the server
*/

/*
ALGO:
  - schedule fieldset saved as template
  - fieldset 1:
    - retrieve all staff members: GET /api/staff_members and save it for use later
    - add staff members as options:
      - value = textContent: name
      - data-staff_id: id
    - scheduleCount += 1

  - submit EVENT attached to form (container of all fieldsets)
    - extract form data of each fieldset and convert to an object
    - add each object into an array
    - convert array into json

    - POST /api/schedules
    - json {staff_id, date, time}
    - response
      - status 201: 
        - alert textResponse
        - reset form
      - status 400: alert textResponse

  - click EVENT atacched to #add_schedules button
    - use staff_member data and the template to render a new fieldset
    - scheduleCount += 1
*/

/*
View:
  - template
  - scheduleCount
  - renderNewScheduleFieldset(staffMembers)
Model:
  - staffMembers
  - addStaffMembers
Controller:
  - 
*/
class View {
  constructor() {
    this.scheduleCount = 0;
    this.template = `
    <fieldset id="schedule{{scheduleNumber}}">
      <h1>Schedule{{scheduleNumber}}</h1>
      <dl>
        <dt><label for="name_{{scheduleNumber}}">Staff Name:</label></dt>
        <dd><select name="name" id="name_{{scheduleNumber}}"></select></dd>
      </dl>

      <dl><label for="date_{{scheduleNumber}}">Date:</label></dl>
      <dl><input type="text" name="date" id="date_{{scheduleNumber}}" placeholder="mm-dd-yy"/></dl>

      <dl><label for="time_{{scheduleNumber}}">Time:</label></dl>
      <dl><input type="text" name="time" id="time_{{scheduleNumber}}" placeholder="hh:mm"/></dl>
    </fieldset>
    `;
  }

  renderNewScheduleFieldSet(staffMembers) {
    this.scheduleCount += 1;
    let html =
      this.template.replace(/{{scheduleNumber}}/g, String(this.scheduleCount));
    document.querySelector('button[type="submit"]').insertAdjacentHTML('beforebegin', html);
    let select = document.querySelector(`#name_${this.scheduleCount}`);

    staffMembers.forEach(member => {
      let option = document.createElement('option');
      option.textContent = member.name;
      option.dataset['staff_id'] = member.id;
      select.appendChild(option);
    });
  }

  resetForm() {
    document.querySelector('form').reset();
  }
}

class Model {
  constructor() {
    this.staffMembers = [];
  }

  updateStaffMembers(staffMembers) {
    this.staffMembers = staffMembers;
  }
}

class Controller {
  constructor() {
    this.model = new Model();
    this.view = new View();
  }


  init() {
    this.fetchAndRenderStaffMembers();

    let form = document.querySelector('form');
    form.addEventListener('submit', event => this.handleFormSubmission(event));

    let addSchedulesButton = document.querySelector('#add_schedules');
    addSchedulesButton.addEventListener('click', event => {
      this.handleAddScheduleFieldset(event);
    });
  }

  fetchAndRenderStaffMembers() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/staff_members');
    xhr.responseType = 'json';

    xhr.addEventListener('load', () => {
      this.model.updateStaffMembers(xhr.response);
      this.view.renderNewScheduleFieldSet(this.model.staffMembers);
    });
    xhr.send();
  }

  handleAddScheduleFieldset(event) {
    event.preventDefault();
    this.view.renderNewScheduleFieldSet(this.model.staffMembers);
  }

  handleFormSubmission(event) {
    event.preventDefault();
    let form = document.querySelector('form');
    let arrayOfData = [...form.querySelectorAll('fieldset')].map(fieldset => this.extractData(fieldset));
    let json = JSON.stringify({schedules: arrayOfData});
    let path = form.getAttribute('action');
    console.log(json);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', path);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

    xhr.addEventListener('load', () => this.handleFormSubmissionResponse(xhr));
    xhr.send(json);
  }

  handleFormSubmissionResponse(xhr) {
    switch (xhr.status) {
      case 201:
        alert (xhr.responseText);
        this.view.resetForm();
        break;
      default:
        alert(`Error ${xhr.status}: ${xhr.responseText}`);
    }
  }

  extractData(container) {
    let data = {};
    let inputs = [...container.querySelectorAll('input')];
    inputs.forEach(element => {
      data[element.name] = element.value;
    });

    let select = container.querySelector('select');
    let selectedOption = select.selectedOptions[0];

    data[select.name] = select.value;
    data["staff_id"] = selectedOption.dataset["staff_id"];
    return data;
  }
}


document.addEventListener('DOMContentLoaded', () => {
  let formController = new Controller();
  formController.init();
});