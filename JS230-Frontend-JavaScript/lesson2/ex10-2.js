/*
<div id="elem1">1
  <section id="elem2">2
    <article id="elem3">3
      <main id="elem4">4
      </main>
    </article>
  </section>
</div>
*/

let elem1 = document.querySelector('#elem1');

elem1.addEventListener('click', event => alert("bubbling"));
elem1.addEventListener('click', event => alert("capturing"), true);

/*
In this case there are two event handlers attached to the same element
(div #elem1). The event handlers are called in the following order:

Line 15: The click event handler added to the div #elem1 element listening on the
         capturing phase and alerts the message 'capturing'
Line 14: The click event handler added to the div #elem1 element that alerts
         'bubbling' when called. The event is fired/called on the bubbling phase