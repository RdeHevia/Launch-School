document.addEventListener('DOMContentLoaded', () => {
  let resetButton = document.querySelector('#buttons input[type="button"]');
  resetButton.addEventListener('click', event => {
    document.querySelector('form').reset();
  });
});

document.addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector('form');
  form.addEventListener('submit', event => {
    event.preventDefault();
    let formData = new FormData(form);
    let entries = formData.entries();
    let json = {};
    for (let pair of entries) {
      json[pair[0]] = pair[1];
    }
    let textArea = document.querySelector('textarea');
    textArea.value = JSON.stringify(json);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector('form');
  form.addEventListener('change', event => {
    let formData = new FormData(form);
    let entries = formData.entries();
    let json = {};
    for (let pair of entries) {
      json[pair[0]] = pair[1];
    }
    let textArea = document.querySelector('textarea');
    textArea.value = JSON.stringify(json);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector('form');
  form.addEventListener('keyup', event => {
    let formData = new FormData(form);
    let entries = formData.entries();
    let json = {};
    for (let pair of entries) {
      json[pair[0]] = pair[1];
    }
    let textArea = document.querySelector('textarea');
    textArea.value = JSON.stringify(json);
  });
});