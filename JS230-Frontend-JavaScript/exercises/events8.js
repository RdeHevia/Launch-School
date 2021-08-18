/*
INPUT: parentElement, selector, eventType, callback
  - parentElement: html element (object)
  - selector: string
  - eventType: string
  - callback: function
OUTPUT:
  - event listener added succesfully -> true
  - otherwise -> undefined
EXAMPLE:
parentElement = section
selector = p
eventType
callback
function delegateEvent delegates an eventType on section > p to the function
callback
section.addEventListener(eventType, callback). it only triggers with click
RULES:
  - all event handlers listen during the bubbling phase
*/

/*
ALGO:
  - child = parentElement.querySelector(selector)
  - if child doesn't exist -> return undefined
  - parentElement.addEventListener(eventType, event=>..)
    - if target === child: execute callback
  - return true
*/
function delegateEvent(parentElement, selector, eventType, callback) {
  if (!parentElement || !(parentElement instanceof Element)) return undefined;

  parentElement.addEventListener(eventType, event => {
    let children = [...parentElement.querySelectorAll(selector)];

    if (children.includes(event.target)) {
      callback(event);
    }
  });

  return true;
}

document.addEventListener('DOMContentLoaded', () => {
  const element1 = document.querySelector('table');
  const element2 = document.querySelector('main h1');
  const element3 = document.querySelector('main');

  const callback = ({target, currentTarget}) => {
    // console.log(target);
    alert(`Target: ${target.tagName}\nCurrent Target: ${currentTarget.tagName}`);
  };
  // Scenario 1
  // delegateEvent(element1, 'p', 'click', callback);
  // // Scenario 2
  // delegateEvent(element2, 'p', 'click', callback);
  // // Scenario 3
  // delegateEvent(element2, 'h1', 'click', callback);
  // // Scenario 4
  // delegateEvent(element3, 'h1', 'click', callback);
  // // Scenario 5
  // delegateEvent(element3, 'aside p', 'click', callback);

  // // Scenario 6
  delegateEvent(element2, 'p', 'click', callback);

  const newP = document.createElement('P');
  const newContent = document.createTextNode('New Paragraph');
  newP.appendChild(newContent);

  element2.appendChild(newP);
});