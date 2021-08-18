/*
INPUT: click
OUTPUT: move X to the last click position
ALGO:
  - listen for a click
  - when the click event fires:
    - get X and Y coordinates of the click
    - .x top: -Y
    - .x left: X
*/

// // Problem 1
// document.addEventListener('DOMContentLoaded', () => {
//   document.addEventListener('click', event => {
//     let xCoord = event.clientX;
//     let yCoord = event.clientY;
//     let cross = document.querySelector('.x');
//     cross.style.left = `${xCoord}px`;
//     cross.style.top = `${yCoord}px`;
//   });
// });

// // Problem 2
// document.addEventListener('mousemove', event => {
//   let xCoord = event.clientX;
//   let yCoord = event.clientY;
//   let cross = document.querySelector('.x');
//   cross.style.left = `${xCoord}px`;
//   cross.style.top = `${yCoord}px`;
// });

// Problem 3
document.addEventListener('mousemove', event => {
  let xCoord = event.clientX;
  let yCoord = event.clientY;
  let cross = document.querySelector('.x');
  cross.style.left = `${xCoord}px`;
  cross.style.top = `${yCoord}px`;
});

document.addEventListener('keyup', event => {
  let key = event.key;
  let crossArms = [...document.querySelector('.x').children];

  crossArms.forEach(arm => {
    switch (key) {
      case 'b':
        arm.style.background = 'blue';
        break;
      case 'g':
        arm.style.background = 'green';
        break;
      case 'r':
        arm.style.background = 'red';
    }
  });
});