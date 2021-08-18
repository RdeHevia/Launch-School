{/* <a href="https://www.launchschool.com">
  Home
  <img src="https://d24f1whwu8r3u4.cloudfront.net/assets/launch-logo-b6d01bd15ee9da31457ee3c315845718823aa8a741858be598ab35042a312348.svg" />
</a> */}

document.querySelector('img').addEventListener('click', event => {
  event.stopPropagation();
}, false);

/*
Markup structure: a > img
CurrentTarget: img
Target: img
Listening phase: bubbling
Bubbling:
  - event fires on img
  - propagation stopped
*/

/*
stopPropagation prevents the event from continuing the capturing and bubbling
phases after it fires. However it doesn't prevent the default behavior of any
element. Thus, even though the propagation is stopped, the anchor element still
performs its default behavior: following the link.
*/