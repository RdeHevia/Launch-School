document.addEventListener('DOMContentLoaded', () => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'hts://api.github.com/repos/rails/rails');
  xhr.responseType = 'json';

  xhr.addEventListener('load', () => {
    console.log(xhr.status);
    console.log(xhr.response['open_issues']);
  });

  xhr.addEventListener('error', () => console.log('The request could not be completed!'));

  xhr.send();
});