// Write some JavaScript code to change the color for every odd indexed link in the table of contents to green.

/*
ALGO:
  - Select the a elements childs of li and childs of an element with id toc
    (#toc li a)
  - Save the elements into an array. 
  - Filter the elements with index 0 or even
  - Iterate over the filtered elements. Change the color of the text to green
*/

let tocLinks = [...document.querySelectorAll('#toc li a')];
tocLinks.filter((_, idx) => idx % 2 === 0).forEach(link => link.style.color = 'green');