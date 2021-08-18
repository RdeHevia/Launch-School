document.addEventListener('DOMContentLoaded', () => {
  let request = new XMLHttpRequest();
  request.open('GET', 'https://ls-230-web-store-demo.herokuapp.com/products');

  request.addEventListener('load', handlerLoadStore);
  request.send();

  document.querySelector('#store').addEventListener('click', handlerLink);
  document.querySelector('#store').addEventListener('submit', handlerFormSubmission);
});

function handlerLoadStore(event) {
  let store = document.getElementById('store');
  store.innerHTML = event.target.response;
}

function handlerLink(event) {
  if (event.target.tagName !== 'A') return;
  event.preventDefault();

  let path = event.target.getAttribute('href');
  console.log(path);
  let xhr = new XMLHttpRequest();
  xhr.open('GET', `https://ls-230-web-store-demo.herokuapp.com${path}`);
  xhr.addEventListener('load', handlerRenderFromXHR);
  xhr.send();
}

function handlerRenderFromXHR(event) {
  let xhr = event.target;
  let store = document.querySelector('#store');
  empty(store);

  store.insertAdjacentHTML('afterbegin', xhr.response);

}

function handlerFormSubmission(event) {
  event.preventDefault();

  let form = event.target;
  let path = form.getAttribute('action');
  let data = new FormData(form);

  let xhr = new XMLHttpRequest();
  xhr.open('POST', `https://ls-230-web-store-demo.herokuapp.com${path}`);
  xhr.setRequestHeader('Authorization', 'token AUTH_TOKEN');

  xhr.addEventListener('load', handlerRenderFromXHR);
  xhr.send(data);
}

function empty(element) {
  [...element.childNodes].forEach(child => child.remove());
}

function addProduct(name, sku, price) {
  // if (sku.length < 3 || price <= 0) return;

  let xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://ls-230-web-store-demo.herokuapp.com/v1/products');
  xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
  xhr.setRequestHeader('Authorization', 'token AUTH_TOKEN');

  let json = JSON.stringify({name, sku, price});

  xhr.addEventListener('load', () => {
    if (statusOk(xhr.status)) {
      console.log('This product was added:');
      console.log(xhr.responseText);
    } else {
      console.log(xhr.status);
      console.log(xhr.responseText);
    }
  });

  xhr.send(json);
}

function statusOk(statusCode) {
  return 200 <= statusCode && statusCode <= 299;
}