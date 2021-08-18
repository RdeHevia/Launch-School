/*
INPUT: id (integer)
OUTPUT: generation colored
  - generation: all elements that are at the same level of the tree
    regardless of if they belong to the same branch or not
EXAMPLE:
id = 4: 4, 7, 12, 16
  id = 4: level 4 (body is level 0)
  level 0: body
  level 1: article
  level 2: header, main, footer
  level 3:
    - header: span
    - main: section, section
    - footer: p
  level 4:
    - span: a (4)
    - section1: p (7)
    - section2: p (12), p (16)
*/

/*
DATA STRUCTURE:
  - 
ALGORITHM:
  - find the element of the input id
  - level: find the level of the element in the tree getTreeLevel(element)
  - find all the elements at that level
  - for each element:
    - add a class name .generation-color
*/

function colorGeneration(id) {
  id = String(id);

  let element = document.getElementById(id);
  if (!element) return null;

  let elementsAtLevel = getElementsByLevel(getLevel(element));
  elementsAtLevel.forEach(element => element.classList.add('generation-color'));
}

/*
getElementsByLevel(level)
ALGORITHM:
  - elementsAtLevel = []
  - iterate over the elements of the tree. For each element:
    - if the element is at level ->  add element to elementsAtLevel
  - return elementsAtLevel
*/

function getElementsByLevel(level) {
  let elementsAtLevel = [];
  let body = document.body;
  walk(body, element => {
    if (getLevel(element) === level) elementsAtLevel.push(element);
  });

  return elementsAtLevel;
}

/*
walk(element, callback)
ALGORITHM:
  - invoke the callback
  - children: element.children
  - if children is empty -> return undefined
  - iterate over children. for each child:
    - return walk(child, callback)
*/

function walk(element, callback) {
  callback(element);

  let children = [...element.children];
  if (children.length !== 0) {
    children.forEach(child => walk(child, callback));
  }
}
// let body = document.querySelector('body');
// console.log(body);
// walk (document.querySelector('body'), element => console.log(element));

/*
getLevel
DATA STRUCTURE:
ALGORITHM:
  - count = 0
  - WHILE element tagName !== 'BODY'
    - count += 1
    - element: parent of the element
  - return count
*/

function getLevel(element) {
  let count = 0;

  while (element.tagName !== 'BODY') {
    count += 1;
    element = element.parentElement;
  }

  return count;
}