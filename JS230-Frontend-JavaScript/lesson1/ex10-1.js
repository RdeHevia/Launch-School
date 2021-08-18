/*
Write a JavaScript function that returns the p elements in the DOM represented by this HTML:

ALGO:
  - tags = []
  walk over the nodes of document. For each node:
    - if the nodeName === tag: push the node into tags
  - return tags
*/

function filterNodesByTag (tag, node = document) {
  let nodes = [];

  forEachNode((node) => {
    if (node.nodeName === tag.toUpperCase()) nodes.push(node);
  })

  return nodes;
}

/*
ALGO:
  - callback(node)
  - iterate over the childs of the node. For each child
    - callback(child)
*/

function forEachNode(callback, node = document) {
  callback(node);

  node.childNodes.forEach(child => forEachNode(callback, child));
}

function getPharagraphs2() {
  return document.getElementsByTagName('p');
}

