document.addEventListener('DOMContentLoaded', () => {
  let elem1 = document.querySelector('#elem1');

  elem1.addEventListener('click', event => alert(event.target.tagName));
  elem1.addEventListener('click', event => alert(event.currentTarget.tagName));
});

/*
Event handler on line 4:
  event type: 'click'
  listening on phase: bubbling phase
  listening on / added to / attached to / (currentTarget): elem1
  action: alert of the target tagName
Event handler on line 4:
  type: 'click'
  phase: listening on bubbling phase
  added to (currentTarget): elem1
  action: alert of the currentTarget tagName

Click on id=elem4 (MAIN):
  In this case, the target is the element MAIN with id #elem4. The event
  handlers are fired in the following order:

  1) Line 4: The 'click' event handler attached to DIV (#elem1) listening in on the
    bubbling phase and that alerts of the tagName of the target element - MAIN
    #elem4, in this case.

  2) Line 5: The 'click' event handler listening on the DIV element (#elem1) and
     that alerts of the tagName of the currentTarget element - DIV #elem1. The
     event fires in the bubbling phase.