// document.addEventListener('DOMContentLoaded', () => {

// });

// document.addEventListener('click', event => {
//   console.log(event.target.tagName);
//   if (event.target.tagName === 'A') {
//     event.preventDefault();
//     alert(`id: ${event.target.id}`);
//   }
// });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#links').addEventListener('click', event => {
    event.preventDefault();
    alert(`id: ${event.target.id}`);
  });
});