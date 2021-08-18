/*
ALGO:
  - EVENT submit
    - retrieve num1 and num2 from input
    - retrieve operator from input
    - result = arithmeticOperation (num1, num2, operator)
*/

document.addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector('form');
  form.addEventListener('submit', event => {
    event.preventDefault();

    let number1 = +document.querySelector('#number1').value;
    let number2 = +document.querySelector('#number2').value;
    let operator = document.querySelector('#operator').value;
    let result = document.querySelector('p');

    result.textContent = arithmeticOperation(number1, number2, operator);
  });
});

function arithmeticOperation (number1, number2, operator) {
  const OPERATIONS = {
    '+': (num1, num2) => num1 + num2,
    '-': (num1, num2) => num1 - num2,
    'x': (num1, num2) => num1 * num2,
    '/': (num1, num2) => num1 / num2,
  };

  return OPERATIONS[operator](number1, number2);
}