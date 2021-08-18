document.addEventListener('DOMContentLoaded', () => {
  let store = document.getElementById('store');

  let request = new XMLHttpRequest();
  request.open('GET','https://ls-230-web-store-demo.herokuapp.com/products');

  request.addEventListener('load', () => store.innerHTML = request.response);
  request.send();

  store.addEventListener('click', event => {
    let target = event.target;
    if (target.tagName !== 'A') return undefined;

    event.preventDefault();

    let request = new XMLHttpRequest();
    request.open('GET',`https://ls-230-web-store-demo.herokuapp.com${target.getAttribute('href')}`);


    request.addEventListener('load', event => store.innerHTML = request.response);
    request.send();

    return undefined;
  });
});