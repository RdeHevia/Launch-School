let request = new XMLHttpRequest();
request.open('GET', 'https://api.github.com/repos/rails/rails');
request.responseType = 'json';

request.addEventListener('load', event => {
  let responseData = event.target.response;
  // console.log(response);
  console.log(`Status code: ${event.target.status}`);
  console.log(`Number of open issues: ${responseData['open_issues_count']}`);
});

request.addEventListener('error', event => {
  console.log('The request could not be completed!');
});

request.send();