/*
implement context menu for:
  - main
  - #sub
context menu:
  - alert box that displays the name of the respective area
  - only 1 context menu should appear
EXAMPLE:
  main.context
  sub.context + stop propagation
*/
// Solution 1
// document.addEventListener('DOMContentLoaded', () => {
//   let main = document.querySelector('main');
//   let sub = document.querySelector('#sub');

//   main.addEventListener('contextmenu', event => {
//     event.preventDefault();
//     alert(main.tagName.toLowerCase());
//   });

//   sub.addEventListener('contextmenu', event => {
//     event.preventDefault();
//     event.stopPropagation();
//     alert(event.target.id.toLowerCase());
//   });
// });

// Solution 2
document.addEventListener('DOMContentLoaded', () => {
  let main = document.querySelector('main');

  main.addEventListener('contextmenu', event => {
    event.preventDefault();
    event.stopPropagation();
    alert((event.target.id || event.target.tagName).toLowerCase());
  });
});
