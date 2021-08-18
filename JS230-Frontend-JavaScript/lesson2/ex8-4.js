/* eslint-disable max-len */
/*
INPUT: text
OUTPUT:
  - number of chars remaining
  - text color in red if chars remaining < 0
ALGORITHM:
  - event
    - callback:
      - count number of chars
      - remaining = 140 - count
      - diplay remaining
      - if remaining < 0 and textarea.invalid doesnt exists -> add class textarea.invalid
      - if remaing >= 0 and textarea.invalid exists -> remove
*/

/*
event:
  - type: keyup
  - target: textarea
  - action:
    - update .counter display value
    - update textarea class .invalid 
*/

document.addEventListener('DOMContentLoaded', () => {
  const MAX_NBR_OF_CHARS = 140;

  let textArea = document.querySelector('.composer textarea');
  let counterMessage = document.querySelector('.counter');

  counterMessage.textContent = `${MAX_NBR_OF_CHARS} characters remaining`;

  textArea.addEventListener('keyup', () => {
    let button = document.querySelector('.composer button');

    let nbrOfChars = textArea.value.length;
    let remaining = MAX_NBR_OF_CHARS - nbrOfChars;
    let invalid = remaining < 0;
    counterMessage.textContent = `${remaining} characters remaining`;

    textArea.classList.toggle('invalid', invalid);
    button.disabled = invalid;
  });
});