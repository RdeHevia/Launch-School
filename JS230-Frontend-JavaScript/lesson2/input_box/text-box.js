let cursorInterval;


document.addEventListener('DOMContentLoaded', () => {
  let textField = document.querySelector('.text-field');

  textField.addEventListener('click', event => {
    event.stopPropagation();
    event.target.classList.add('focused');

    cursorInterval = cursorInterval || setInterval(() => event.target.classList.toggle('cursor'), 500);

  });

});

document.addEventListener('keydown', event => {
  // event.stopPropagation();
  let textField = document.querySelector('.text-field');
  let contentDiv = document.querySelector('.content');
  if (textField.classList.contains('focused')) {
    console.log(event.key);
    if (event.key.length === 1) {
      contentDiv.textContent += event.key;
    } else if (event.key === 'Backspace') {
      let currentTextContent = contentDiv.textContent;
      contentDiv.textContent = currentTextContent.slice(0, -1);
    }
  }
});

document.addEventListener('click', () => {
  let textField = document.querySelector('.text-field');
  textField.classList.toggle('focused', false);
  clearInterval(cursorInterval);
  cursorInterval = null;
  textField.classList.remove('cursor');
});