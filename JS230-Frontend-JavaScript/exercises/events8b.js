/*
I: (parentElement, selector, eventType, handler)
O: handler attached to parentElement: return true
   handler not attached to any element (parentElement doesn't exist) -> undefined
SIDE EFFECT: delegate events to the descendents of a parent that match a
  selector
ALGO:
  - if !parentElement -> return undefined
  - attach eventType EVENT listener to parentElement
    - select element by selector
    - if target === element selected
      - callback(event)
  - return true
*/

function delegateEvent(parentElement, selector, eventType, handler) {
  if (!parentElement || !(parentElement instanceof Element)) return undefined;

  parentElement.addEventListener(eventType, event => {
    let elements = [...parentElement.querySelectorAll(selector)];
    if (elements.includes(event.target)) handler(event);
  });

  return true;
}
const callback = ({target, currentTarget}) => {
  alert(`Target: ${target.tagName}\nCurrent Target: ${currentTarget.tagName}`);
};


document.addEventListener('DOMContentLoaded', () => {
  const element1 = document.querySelector('table');
  const element2 = document.querySelector('main h1');
  const element3 = document.querySelector('main');
  console.log(delegateEvent(element1, 'p', 'click', callback));
  console.log(delegateEvent(true, 'p', 'click', callback));
  console.log(delegateEvent(element2, 'p', 'click', callback));
  console.log(delegateEvent(element2, 'h1', 'click', callback));
  console.log(delegateEvent(element3, 'h1', 'click', callback));
  console.log(delegateEvent(element3, 'aside p', 'click', callback));
  console.log(delegateEvent(element2, 'p', 'click', callback));
});

