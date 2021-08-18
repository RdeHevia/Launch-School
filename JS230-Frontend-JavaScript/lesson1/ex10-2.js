"use strict";

function forEachNode(callback, node = document) {
  callback(node);

  node.childNodes.forEach(child => forEachNode(callback, child));
}

function filterNodesByTag (tag, node = document) {
  let nodes = [];

  forEachNode((node) => {
    if (node.nodeName === tag.toUpperCase()) nodes.push(node);
  })

  return nodes;
}

/*
ALGO:
  - nodes = filterNodesByTag
  - iterate over nodes. for each node:
    - node.classList.add
*/
function addClassByTag(tag, className) {
  filterNodesByTag(tag).forEach(node => {
    node.classList.add(className);
  })
}