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
  - availableSchedules = {}
  - GET all schedules. For each schedule:
    - if the student_email is not null:
      - key = `staff ${id}`
      - if the key exists: availableSchedules[key] += 1
    - if it doesn't exists: create it and set to 1
  - if aailableSchedules is empty: alert 'no available schedules'
*/

export function retrieveSchedules() {
  let xhr = setRequest('GET', '/api/schedules', 'json', 5000);
  console.log('hi')
  xhr.addEventListener('load', event => {
    let availableSchedules = {};
    let schedules = event.target.response;
    console.log(schedules);
    schedules.forEach(schedule => {
      if (schedule['student_email']) {
        let key = `staff ${schedule.id}`;
        if (availableSchedules.hasOwnProperty(key)) {
          availableSchedules[key] += 1;
        } else {
          availableSchedules[key] = 1;
        }
      }
    });
    if (JSON.stringify(availableSchedules) === '{}') {
      alert('No schedules available');
    } else {
      let message = Object.keys(availableSchedules).reduce((string, key) => {
        return string + '\n' + `${key}: ${availableSchedules[key]}`;
      }, '');
      alert(JSON.stringify(message));
    }
  });

  xhr.addEventListener('timeout', () => {
    alert('Time out. Please try again');
  });

  xhr.addEventListener('loadend', event => {
    alert('The request has completed.');
  });

  xhr.send();
}

export function setRequest(method, path, responseType, timeout) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, path);
  xhr.responseType = responseType;
  xhr.timeout = timeout;
  return xhr;
}


// function getAllSchedules () {
//   return new Promise((resolve, reject) => {
//     let xhr = setRequest('GET', '/api/schedules', 'json', 5000);

//     xhr.addEventListener('load', () => resolve(xhr.response));
//     xhr.addEventListener('timeout', () => reject(new Error()));

//     xhr.send();
//   });
// }

// async function retrieveSchedules2 () {
//   try {
//     let schedules = await getAllSchedules();
//     let availableSchedules = {};
//     schedules.forEach(schedule => {
//       if (schedule['student_email']) {
//         let key = `staff ${schedule.id}`;
//         if (availableSchedules.hasOwnProperty(key)) {
//           availableSchedules[key] += 1;
//         } else {
//           availableSchedules[key] = 1;
//         }
//       }
//     });
//     if (JSON.stringify(availableSchedules) === '{}') {
//       alert('No schedules available');
//     } else {
//       let message = Object.keys(availableSchedules).reduce((string, key) => {
//         return string + '\n' + `${key}: ${availableSchedules[key]}`;
//       }, '');
//       alert(JSON.stringify(message));
//     }
//   } catch (error) {
//     alert('Time out. Please try again');
//   }
//   alert('The request has completed.');
// }