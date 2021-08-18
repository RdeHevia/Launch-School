// document.querySelector('html').addEventListener('click', () => {
//   document.querySelector('#container').style = 'display: none';
// });

// document.querySelector('#container').addEventListener('click', event => {
//   event.stopPropagation();
// });

// let containerStyle = document.querySelector('#container').style.display;

document.querySelector('html').addEventListener('click', (event) => {
  let container = document.querySelector('#container');

  if (!container.contains(event.target)) {
    container.style = 'display: none';
  }
});

// document.querySelector('#container').addEventListener('click', event => {
//   document.querySelector('#container').style = containerStyle;
// });