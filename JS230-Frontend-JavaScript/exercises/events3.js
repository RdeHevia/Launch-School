/*
I: element, optionalAction
O:
  - make element bold
  - execute optional action, if provided
ALGO:
  - make the element bold
  - call the optionAction if provided
*/

// document.addEventListener('DOMContentLoaded', () => {
//   let sectionElement = document.querySelector('section');

//   makeBold(sectionElement, function(elem) {
//     elem.classList.add('highlight');
//   });

//   console.log(sectionElement.classList.contains('highlight'));
//   // = true
//   console.log(sectionElement.style.fontWeight);
//   // = "bold"
// });

// function makeBold(element, optionalAction) {
//   element.style.fontWeight = 'bold';
//   if (typeof optionalAction === 'function') optionalAction(element);
// }


function makeBold(element) {
  element.style.fontWeight = 'bold';

  const event = new CustomEvent('bolded');
  element.dispatchEvent(event);
}

document.addEventListener('DOMContentLoaded', () => {
  const sectionElement = document.querySelector('section');

  sectionElement.addEventListener('bolded', event => {
    alert(event.target.tagName);
    event.target.classList.add('highlight');
  });

  makeBold(sectionElement);
});

