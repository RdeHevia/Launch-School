/*
ALGO:
- let firstWords = []
- iterate over the document nodes starting at document. For each node:
- if the node name === 'P':
  - remove excess of spaces from text content
  - add the first word to firstWords
*/

function walk(node, callback) {
  callback(node);

  for (let index = 0; index < node.childNodes.length; index += 1) {
    walk(node.childNodes[index], callback);
  }
}

function getFirstWords(parentNode) {
  let firstWords = [];
  walk(parentNode, (node) => {
    if (node.nodeName === 'P') {
      let firstWord = node.firstChild.data.match(/\b\w+\b/gi)[0];
      firstWords.push(firstWord);
    }
  })

  return firstWords;
}

let addToggle = false;
walk(html, node => {

  if (node.nodeName === 'P' && !addToggle) {
    addToggle = !addToggle;
    console.log(addToggle);
  } else if (node.nodeName === 'P' && addToggle) {
    node.classList.add('paco');
  }
});

// ==================================
/*
walk(startingNode, callback)
ALGO:
  - invoke the callback passing the startingNode




/*
ALGORITHM:
  - imgCount = 0
  - pngCount = 0
  - Walk over the html nodes. For each node:
    - If nodeName === 'IMG' : 
      imgCount += 1
      if (node.src ends with '.png): pngCount += 1;
*/

function logImageCount () {
  let imgCount = 0;
  let pngCount = 0;
  walk(document, node => {
    if (node.nodeName === 'IMG') {
      imgCount += 1;
      if (node.src.match(/\.png$/)) pngCount += 1;
    }
  });

  console.log(`Number of images: ${imgCount}`);
  console.log(`Number of png images: ${pngCount}`);
}

/*
linksToRed
ALGO:
  - walk over the document nodes. For eahc node:
    - If nodeName === 'A'
      node.style.color = 'red'
*/

function changeColorOfLinks(color) {
  walk(document, node => {
    if (node.nodeName === 'A') node.style.color = color;
  })
}
