/* eslint-disable max-lines-per-function */
document.addEventListener('DOMContentLoaded', () => {
  let timeoutId;
  document.querySelector('main').addEventListener('mouseover', event => {
    if (event.target.tagName !== 'IMG') return;
    let img = event.target;
    let figcaption = img.nextElementSibling;

    timeoutId = setTimeout(() => {
      figcaption.classList.remove('hide');
    }, 1000);
  });

  document.querySelector('main').addEventListener('mouseout', event => {
    if (event.target.tagName !== 'IMG') return;

    clearTimeout(timeoutId);
    let img = event.target;
    let figcaption = img.nextElementSibling;
    figcaption.classList.add('hide');
  });
});

/*
EVENT:
  - clear timeoutId
  - start timeout
*/