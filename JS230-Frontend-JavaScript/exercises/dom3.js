/*
INPUT: element id
OUTPUT: DOM tree of the **element** as a 2-dimensional array (bottom to top)
  - [level0, level1...]
    - level0: element and sibblings
    - level1; parent and its sibblings
    - level2: granparent and its sibblings
    ....
    - levelN: grandestparent and its sibblings
RULES:
  - assume all elements have an id
  - assume grandestparent id is 1

EXAMPLE:
id = 2: [[HEADER, MAIN, FOOTER], [ARTICLE]]
level 0: header, main, footer
level 1: article
*/

/*
DS:
ALGO:
  - tree = []
  - select element by id
  - find all the sibblings of the element
  - tree.push(sibblings)
  - find the parent of the element
  - domTreeTracer(parent)
  - return tree
*/

// DO AGAIN RECURSIVELY WITHOUT SIDE EFFECTS
function domTreeTracer2(id) {
  let tree = [];
  pushFamily(id, tree);
  return tree;
}
function pushFamily(id, array) {
  let element = document.getElementById(id);

  if (+id === 1) {
    array.push([element.tagName]);
  } else {
    let element = document.getElementById(id);
    let parent = element.parentElement;
    let sibblings = parent.children;
    let sibblingsTags = [...sibblings].map(sibbling => sibbling.tagName);
    array.push([sibblingsTags]);
    pushFamily(parent.id, array);
  }
  // if (parent.id !== '1') pushFamily(parent.id, array);
  // if (parent.id === '1') array.push([parent.tagName]);
}

function domTreeTracer(id) {
  let tree = getFamily(id);
  return tree;
}

function getFamily(id, tree = []) {
  let element = document.getElementById(id);

  if (+id === 1) {
    tree = [...tree,[element.tagName]];
    return tree;
  } else {
    let element = document.getElementById(id);
    let parent = element.parentElement;
    let sibblings = parent.children;
    let sibblingsTags = [...sibblings].map(sibbling => sibbling.tagName);

    tree = [...tree,[sibblingsTags]];
    return getFamily(parent.id, tree);
  }

}

console.log(domTreeTracer(1));
// = [["ARTICLE"]]
console.log(domTreeTracer(2));
// = [["HEADER", "MAIN", "FOOTER"], ["ARTICLE"]]
console.log(domTreeTracer(22));
// = [["A"], ["STRONG"], ["SPAN", "SPAN"], ["P", "P"], ["SECTION", "SECTION"], ["HEADER", "MAIN", "FOOTER"], ["ARTICLE"]]