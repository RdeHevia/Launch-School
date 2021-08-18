document.querySelector('html').addEventListener('click', event => {
  let container = document.querySelector('#container');
  if (!container.contains(event.target)) {
    document.querySelector('#container').style = 'display: none';
  }
});
// fires by clicking anywhere. hides #container

// document.querySelector('#container').addEventListener('click', event => {
//   event.stopPropagation();
// });

// fires by clicking on #container. it stops propagation

// 1 + 2 => hides #container if clicked anywhere in the document except on
//  #container