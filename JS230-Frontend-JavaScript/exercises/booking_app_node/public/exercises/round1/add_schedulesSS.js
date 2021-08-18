/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
/*
 - retrieve all staff member (GET /api/staff_members)
 - populate staff names in select#name:
  -value: staff_id
  -textContent: staff_name
 - event select#names option changes.
  - retrive all the schedules for the chosen staff
  - populate the dates in datalist#available_hours
  - event input#date changes
  - filter the schedules with the chosen date
  - populate the times for the chosen date in datalist#available_hours
*/

// Add additional schedules
document.addEventListener('DOMContentLoaded', () => {
  let addSchedulesButton = document.querySelector('.add_schedule_form button');
  let nbrOfSchedules = 1;
  addSchedulesButton.addEventListener('click', event => {
    let schedule1 = document.querySelector('.schedule1');
    let newSchedule = schedule1.cloneNode(true);

    nbrOfSchedules += 1;
    walk(newSchedule, element => {
      if (element.hasAttribute('id')) {
        let newId = element.id.replace(/[0-9]/g, nbrOfSchedules);
        element.id = newId;
      }

      if (element.hasAttribute('for')) {
        let newFor = element.getAttribute('for').replace(/[0-9]/g, nbrOfSchedules);
        element.setAttribute('for', newFor);
      }

      if (element.hasAttribute('list')) {
        let newFor = element.getAttribute('list').replace(/[0-9]/g, nbrOfSchedules);
        element.setAttribute('list', newFor);
      }

      if (element.classList.contains('schedule1')) {
        let newClass = `schedule${nbrOfSchedules}`;
        element.classList.remove('schedule1');
        element.classList.add(newClass);
      }
    });

    newSchedule.querySelector('h1').textContent = `Schedule ${nbrOfSchedules}`;
    newSchedule.querySelector(`#date${nbrOfSchedules}`).value = '';
    newSchedule.querySelector(`#time${nbrOfSchedules}`).value = '';

    // let submitButton = document.querySelector('article.submit');
    // submitButton.insertAdjacentElement('beforebegin',newSchedule);
    let formsContainer = document.querySelector('#forms');
    formsContainer.appendChild(newSchedule);
  });
});

// Load schedule 1
document.addEventListener('DOMContentLoaded', () => {
  let xhr = setRequest('GET', '/api/staff_members', 'json');
  xhr.addEventListener('load', event => {
    let staff = xhr.response;
    let staffNamesSelect = document.querySelector('#name1');
    staff.forEach(member => {
      let option = document.createElement('option');
      option.value = member.id;
      option.textContent = member.name;
      staffNamesSelect.appendChild(option);
    });
  });
  xhr.send();
});

// show available dates when staff name changes
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#forms').addEventListener('change', event => {
    event.stopPropagation();
    if (event.target.name === 'staff_id') {
      let formClass = event.target.classList[0];
      let datalists = [...document.querySelectorAll(`datalist.${formClass}`)];
      datalists.forEach(deleteOptions);
    }

    if (event.target.name === 'date') {
      let formClass = event.target.classList[0];
      let datalist = document.querySelectorAll(`datalist.${formClass}`)[1];
      deleteOptions(datalist);
    }

    if (event.target.name === "staff_id" && event.target.value !== '') {
      staffId = event.target.value;
      let formClass = event.target.classList[0];

      let xhr = setRequest('GET', `/api/schedules/${staffId}`, 'json');
      xhr.addEventListener('load', event => {
        let dates = xhr.response.map(schedule => schedule.date);

        let datalistDates = document.querySelector(`datalist.${formClass}`);

        dates.forEach(date => {
          let option = document.createElement('option');
          option.value = date;
          datalistDates.appendChild(option);
        });
      });
      xhr.send();
    }

    if (event.target.name === 'date' && event.target.value !== '') {
      let dateInput = event.target.value;
      let formClass = event.target.classList[0];

      let form = document.querySelector(`form.${formClass}`);
      let staffId = form.querySelector('select').value;

      let xhr = setRequest('GET', `/api/schedules/${staffId}`, 'json');
      xhr.addEventListener('load', event => {
        let hours = xhr.response
          .filter(schedule => schedule.date === dateInput)
          .map(schedule => schedule.time);

        let datalistHours = document.querySelectorAll(`datalist.${formClass}`)[1];
        hours.forEach(hour => {
          let option = document.createElement('option');
          option.value = hour;
          datalistHours.appendChild(option);
        });
      });
      xhr.send();
    }
  });
});

// submit forms
document.addEventListener('DOMContentLoaded', () => {
  let submitButton = document.querySelector('.submit button');
  submitButton.addEventListener('click', event => {
    event.preventDefault();
    let forms = [...document.querySelectorAll('form')];
    let formsData = forms.map(form => formDataToJson(new FormData(form)));
    console.log(formsData);
    formsData.forEach((formData, idx) => {
      let xhr = setRequest('POST', '/api/schedules');
      xhr.addEventListener('load', event => {
        if (xhr.status === 201) {
          forms[idx].reset();
        } else {
          alert(xhr.responseText);
        }
      });
      xhr.send(formData);
    });
  });
});

function setRequest(method, path, responseType = '') {
  let xhr = new XMLHttpRequest();
  xhr.open(method, path);
  xhr.responseType = responseType;
  return xhr;
}

function walk(element, callback) {
  callback(element);

  [...element.children].forEach(child => walk(child, callback));
}

function formDataToJson(formData) {
  let json = {};
  for (let pair of formData.entries()) {
    json[pair[0]] = pair[1];
  }
  return json;
}

function deleteOptions(datalist) {
  let options = [...datalist.querySelectorAll('option')];
  options.forEach(option => option.remove());
}