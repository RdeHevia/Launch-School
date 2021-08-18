/* eslint-disable max-lines-per-function */
/*

*/

document.addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector('form');
  form.addEventListener('submit', event => {
    event.preventDefault();
    let email = document.querySelector('#email').value;
    let name = document.querySelector('#name').value;
    if (email === '' || name === '') {
      alert('Staff can not be created. Check your inputs');
      return;
    }
    let formData = new FormData(form);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', form.action);

    xhr.addEventListener('load', event => {
      if (xhr.status === 201) {
        let response = JSON.parse(xhr.response);
        alert(`Successfully created staff with id: ${response.id}`);
        form.reset();
      } else {
        alert(xhr.responseText);
      }
    });

    xhr.send(formData);
  });
});

// document.addEventListener('DOMContentLoaded', () => {
//   let form = document.querySelector('form');
//   form.addEventListener('submit', async event => {
//     event.preventDefault();
//     let email = document.querySelector('#email').value;
//     let name = document.querySelector('#name').value;
//     if (email === '' || name === '') {
//       alert('Staff can not be created. Check your inputs');
//       return;
//     }
//     let formData = new FormData(form);
//     let xhr = await makeRequest('POST', '/api/staff_members', 'json', formData);
//     if (xhr.status === 201) {
//       alert(`Successfully created staff with id: ${xhr.response.id}`);
//     }
//   });
// });

// function makeRequest(method, path, responseType, data) {
//   return new Promise((resolve) => {
//     let xhr = new XMLHttpRequest();
//     xhr.responseType = responseType;
//     xhr.open(method, path);

//     xhr.addEventListener('load', () => resolve(xhr));
//     xhr.send(data);
//   });
// }