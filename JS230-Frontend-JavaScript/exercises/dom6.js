/*
INPUT: id1, id2
OUTPUT:
  - swap positions of the elements
  - valid swaps: return true
  - invalid swaps: undefined
RULES:
  - assume nodes have an id value
  - assume 2 arguments always provided
  - the swap also happens for all the children of the elements
  - the two elements have to be at the same level
  - invalid:
    - one of the id's doesn't exist
    - one of the nodes is a child of the other
EXAMPLE:
(1, 2):
0)
  1
  ...
  2
1)
  aux1
  1
  ...
  aux2
  2
3) replace aux1 with 2 and aux2 with 1
  2
  ...
  1
*/

/*
ALGORITHM:
  - get element1 and 2 by id
  - if id not valid -> return undefined
  - if areAncestorAndDescendent(element1, element2) -> return undefined
  - create 2 div elements with aux1 and aux2 classes
  - add aux1 before element1
  - add aux2 before element2
  - replace aux1 with element2
  - replace aux2 iwth element1
*/

function nodeSwap (id1, id2) {

  let element1 = document.getElementById(id1);
  let element2 = document.getElementById(id2);

  if (!(element1 && element2)) return undefined;
  if (areAncestorAndDescendent(element1, element2)) return undefined;

  let aux1 = document.createElement('DIV');
  let aux2 = aux1.cloneNode(true);

  element1.insertAdjacentElement('beforebegin', aux1);
  element2.insertAdjacentElement('beforebegin', aux2);

  aux1.parentElement.replaceChild(element2, aux1);
  aux2.parentElement.replaceChild(element1, aux2);
}

/*
areAncestorAndDescendent(element1, element2)
ALGORITHM:
  - if isAncestor(element1, element2) || isAcenstor(element2, element1)
    - return true
  - else: return false
*/

function areAncestorAndDescendent(element1, element2) {
  return isAncestor(element1, element2) || isAncestor(element2, element1);
}

/*
isAncestor(potentialAncestor, element)
ALGORITHM:
  - ancestor = element
  - WHILE ancestor !== potentialAncestor || === body
    if (ancestor and potentialAncestor are the same object)
      return true
  - return false
*/

function isAncestor(potentialAncestor, element) {
  return potentialAncestor.contains(element);
}

let el1 = document.getElementById('1');
let el6 = document.getElementById('6');
// // at least one of the id attributes doesn't exist
console.log(nodeSwap(1, 20));
// // = undefined

// // at least one of the nodes is a "child" of the other
console.log(nodeSwap(1, 4));
// // = undefined
console.log(nodeSwap(9, 3));
// // = undefined

// // one swap
// console.log(nodeSwap(1, 2));

// // multiple swaps
console.log(nodeSwap(3, 1));
console.log(nodeSwap(7, 9));