/*
PROBLEM 1:
There are two event handlers in this problem. Both are attached to elem1
(div#elem1) and listening in the bubbling phase (by default)

A click event fires on main#elem4. The event propagates from from window to main#elem4,
firing all the handlers that it encounters in its path. Since both events are
listening in the same phase (bubbling) and are attached to the same element,
the handlers will be executed subsequently in the same order that they were registered, 
alerting the tag name of event.target (MAIN) and event.currentTarget (DIV).
*/

/*
PROBLEM 2:
A click event fires on elem4 (div#elem4). The event propagates from the window
object to the target element (capturing phase) and then back to window again (bubbling phase),
firing all the handlers that it encounters in its path. The two click handlers attached to elem1
will be fired. However, the first handler is listening in the bubbling phase
while the second one is listening in the capturing phase, as indicated by the
true argument passed to it. Thus, the first handler that will be executed is the,
second one, alerting 'capturing'. Finally, the first handler will be executed,
alerting 'bubbling'
*/

/*
PROBLEM 3:
As a result of the actions performed by the user, 4 events are fired in the
following order: 'click' on div#elem1, two 'keypress' on document and 'click' on
main#elem4. Each event goes on a road-trip from window to the target element,
firing all the handlers that are listening for that event in either the capturing
or bubbling phase.

There are two event listeners: 
- a click event handler attached to div#elem1 and listening on the bubbling phase.
- a keypress event handler attached to document and listening on the bubbling phase

Considering this, the order goes as follows:

1. 'click' handler, that will alet of the target tagName (DIV) ~7 seconds
  after the event fired.
2. 'keypress' handler that will alert of the code of the key pressed (KeyQ) ~7s
  after the event fired.
3. 'keypress' handler that will alert of the code of the key pressed (KeyW) ~7s
  after the event fired.
4. 'click' handler, 'click' handler, that will alet of the target tagName (MAIN) ~7 seconds
  after the event fired.
*/