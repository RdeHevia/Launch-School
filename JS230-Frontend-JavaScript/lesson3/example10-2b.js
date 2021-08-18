/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
document.addEventListener('DOMContentLoaded', () => {
  let form = document.getElementById('form');

  // Bind to the form's submit event to handle the submit button
  // being clicked, enter being pressed within an input, etc.
  form.addEventListener('submit', event => {
    // prevent the browser from submitting the form
    event.preventDefault();

    // access the inputs using form.elements and serialize into a string
    let data = new FormData(form);
    for (let pair of data.entries()) {
      console.log(pair);
    }

    // submit the data
    let request = new XMLHttpRequest();
    request.open('POST', 'https://ls-230-book-catalog.herokuapp.com/books');

    request.addEventListener('load', () => {
      if (request.status === 201) {
        console.log(`This book was added to the catalog: ${request.responseText}`);
      }
    });

    request.send(data);
  });
});
