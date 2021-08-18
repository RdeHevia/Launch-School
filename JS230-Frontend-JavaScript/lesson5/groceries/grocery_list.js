/*
- EVENT submit
  - get item name and quantity from input.
  - if quantity is '' -> quantity = 1
  - append li element inside #list_container
*/


document.addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector('form');
  document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();

    let itemName = document.querySelector('#name').value;
    let quantity = +document.querySelector('#quantity').value || 1;

    let li = document.createElement('li');
    li.textContent = `${quantity} ${itemName}`;

    document.querySelector('#list_container').appendChild(li);
    form.reset();
  });
});