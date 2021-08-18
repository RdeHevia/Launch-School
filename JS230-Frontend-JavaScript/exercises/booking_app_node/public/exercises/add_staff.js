/*
- add staff
- handle all possible responses from the server
REQUEST:
  - POST /api/staff_members
  - json
  - name (string), email (string)
RESPONSES:
  - Success 201
    - {id: 1}
  - Invalid input: Error 400 Bad Request
    - 'Staff can not be created. Check your inputs'
*/

/*
ALGO:
  - submit EVENT attached to form
    - serialize to multipart
    - multipart -> json
    - config request
    - load EVENT
      - status === 201: alert success message with received json
      - status !== 201: alert recieved message in text format
*/

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('form').addEventListener('submit', handleFormSubmission);
});

function handleFormSubmission (event) {
  event.preventDefault();
  let form = event.target;
  let json = serializeFormToJson(form);
  let path = form.getAttribute('action');

  let xhr = new XMLHttpRequest();
  xhr.open('POST', path);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
  xhr.addEventListener('load', event => handleResponse(event.target));

  xhr.send(json);
}

function serializeFormToJson(form) {
  let entries = [...(new FormData(form))];
  return JSON.stringify(Object.fromEntries(entries));
}

function handleResponse(xhr) {
  if (xhr.status === 201) {
    let responseData = JSON.parse(xhr.response);
    let id = responseData.id;
    alert(`Succesfully created staff with id: ${id}`);
  } else {
    alert(xhr.response);
  }
}