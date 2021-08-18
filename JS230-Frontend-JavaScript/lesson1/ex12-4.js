// Write some JavaScript code to retrieve the text of every thumbnail caption on the page.

// ALGO
/*
- Select all the elements of the class 'thumbcaption' and save them into an array
- map the elements with its text
*/

let thumbNailsText = [...document.querySelectorAll('.thumbcaption')]
  .map(thumbnail => thumbnail.textContent.trim().replace(/\s+/g, ' '));
console.log(thumbNailsText);