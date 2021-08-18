/*
<div id="elem1">1
  <section id="elem2">2
    <article id="elem3">3
      <main id="elem4">4
      </main>
    </article>
  </section>
</div>
<input type=text>
*/

let elem1 = document.querySelector('#elem1');

document.addEventListener('keypress', event => {
  setTimeout(() => alert(event.code), 7000);
});

elem1.addEventListener('click', event => {
  setTimeout(() => alert(event.target.tagName), 7000);
});

/*
In this case, four events are fired: 1) when the mouse click on div #elem1, 2) 3) 
when the key 'q' and 'w' are pressed and 4) when the mouse clicks on the element
 main with id #elem4. The handlers are fired in the following order:

Line 19) The 'click' event listening on div #elem1 in the bubbling phase.
The event listener fires when the mouse clicks on div #elem1 and that alerts
of the tagName of the target element (div #elem1) with a delay of 7000 ms.

Line 15) The 'keypress' event listener listening on document is fired twice: 
  first when the key 'q' is pressed and second when 'w' is pressed. The event 
  fires in the bubbling phase and alerts the code of the key pressed with a delay of
  7000 ms.

Line 19) The 'click' event attached to the div element with id elem1 and listening on the bubbling phase. The event
  handler fires once when the mouse clicks on the main element with id elem4.
  When fired, the setTimeout function is invoked which in turn alerts of the
  tagName of the target element (main #elem4) with a delay of 7000 ms.