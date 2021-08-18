function walkTreeElements(element, callback) {
  callback(element);

  [...element.children].forEach(child => walkTreeElements(child, callback));
}

function countPngImgs () {
  let count = 0;
  walkTreeElements(document, element => {
    if (element.tagName === 'IMG' && element.src.match('png')) count += 1;
  });
  console.log(count);
}

document.querySelectorAll('img[src*=png]');

function colorLinksInRed() {
  walkTreeElements(document, element => {
    if (element.tagName === 'A') element.style.color = 'red';
  });
}