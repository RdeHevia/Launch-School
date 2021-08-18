function walkTreeElements(element, callback) {
  callback(element);

  [...element.children].forEach(child => walkTreeElements(child, callback));
}

function walkTree(node, callback) {
  callback(node);

  [...node.children].forEach(child => walkTree(child, callback));
}

// let html = document.lastChild;
// let body = html.lastChild;
// let h1 = body.childNodes[1];
// h1.style.color = 'red';
// h1.style.fontSize = '48px';

// document.querySelectorAll('p').length;

// [...document.querySelectorAll('p')].map(paragraph => {
//   return paragraph.textContent.trim().match(/^[a-z]+/i)[0];
// });

// [...document.querySelectorAll('p + p')].forEach(paragraph => paragraph.classList.add('stanza'));

let firstParagraph = true;
walkTreeElements(document, element => {
  if (element.tagName === 'P' && firstParagraph) {
    firstParagraph = false;
  } else if (element.tagName === 'P') {
    element.classList.add('stanza');
  }
});