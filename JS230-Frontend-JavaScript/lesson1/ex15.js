// Problem1
// 1
document.querySelector('#primary_heading').classList.add('heading');
// 2
// document.getElementById('primary_heading').classList.add('heading');
// 3
// document.querySelector('#primary_heading').setAttribute('class', 'heading');

// Problem2
document.querySelector('#list').classList.add('bulleted');

// Problem3
/*
RULES:
 - use onclick
 - getAttribute: to access the class
 - setAttribute: to set the class
 - class names: visible and hidden
  - function 
*/

// 1
// document.getElementById('toggle').onclick = (e) => {
//   e.preventDefault();
//   let notice = document.querySelector('#notice');
//   if (notice.getAttribute('class') === 'hidden') {
//     notice.setAttribute('class', 'visible');
//     console.log('h -> v');
//   } else if (notice.getAttribute('class') === 'visible') {
//     notice.setAttribute('class', 'hidden');
//     console.log('v -> h');
//   }
// }
// 2

document.getElementById('toggle').onclick = (e) => {
  e.preventDefault();
  let notice = document.querySelector('#notice');
  notice.classList.toggle('hidden');
  notice.classList.toggle('visible');
}

// Problem 4

document.querySelector('#notice').onclick = e => {
  e.preventDefault(); // for consistency: not needed here
  e.currentTarget.setAttribute('class', 'hidden');
}

// Problem 5

let currentText = document.querySelector('#multiplication').textContent;
let numbers =  currentText.match(/[0-9]+/g).map(number => +number);

let multiplication = numbers.reduce((product, number) => product * number);

document.getElementById('multiplication').textContent = `${currentText} ${multiplication}`;

// Problem 6

document.body.setAttribute('id', 'styled');