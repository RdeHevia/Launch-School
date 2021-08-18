/*
INPUT: parentId, childId
OUTPUT: array of tag names that include all elements from parentId to childId
  (both included)
RULES:
  - childId doesn't have to be the innermost child node
  - consider only element nodes
  - consider only elements that have body as an ancestor
  - id not found -> return undefined
  - not feasable slice -> undefined
    - child element is not the child of the parent element -> not feasable
NOTES:
  - 1 parent can have many childs
  - 1 child can only have 1 parent -> better to start from the bottom
EXAMPLE:

(1,4):
4 -> 3: A, SPAN
3 -> 2: A, SPAN, HEADER
2 -> 1: A, SPAN, HEADER, ARTICLE
1 -> body: end
(2, 5):
5 -> 1: MAIN, ARTICLE
1 -> body: end
1 is not the parent with id 2 -> undefined

(11, 19):
19 -> 18
18 -> 17
17 -> 16
16 -> 11 === parentId -> stop and return the array

DATA STRUCTURE:
  - branch: [element0 (parent), element1... elementN (child)]
ALGORITHM (sliceTree):
 - child: find child element by Id
 - branch = getBranch (parentId, childId, [])
 - return branch
*/

function sliceTree (ancestorId, childId) {
  let branch = getBranch(ancestorId, childId);
  return branch;
}

/*
getBranch
INPUT: parentId, childId, branch = []
ALGORITHM:
 - branch = [...branch, child.tagName]
 - find the parent of the child
  - add the parent.tagName to branch (to the left)
  - if the id of parent === parentId passed as argument -> return branch
  - if the tagName of parent === BODY -> return undefined
  - else: return getBranch(ancestorId, parentId, branch)
*/

function sliceTree2 (ancestorId, childId) {
  let child = document.getElementById(childId);
  if (!child) return undefined;
  let branch = [child.tagName];

  while (true) {
    let parent = child.parentElement;
    if (!parent) return undefined;

    branch.unshift(parent.tagName);

    if (parent.id === String(ancestorId)) return branch;
    if (parent.tagName === 'BODY') return undefined;
    child = parent;
  }
}

function getBranch(ancestorId, childId, branch = []) {
  let child = document.getElementById(childId);
  if (!child) return undefined;

  if (branch.length === 0) branch = [child.tagName];

  let parent = child.parentElement;
  if (!parent) return undefined;

  branch = [parent.tagName, ...branch];
  // console.log(branch);
  // console.log(parent.id);
  if (parent.id === String(ancestorId)) return branch;
  if (parent.tagName === 'BODY') return undefined;
  return getBranch(ancestorId, parent.id, branch);
}

console.log(sliceTree(1, 4));
// = ["ARTICLE", "HEADER", "SPAN", "A"]
console.log(sliceTree(1, 76));
// // = undefined
console.log(sliceTree(2, 5));
// // = undefined
console.log(sliceTree(5, 4));
// // = undefined
console.log(sliceTree(1, 23));
// // = ["ARTICLE", "FOOTER"]
console.log(sliceTree(1, 22));
// // = ["ARTICLE", "MAIN", "SECTION", "P", "SPAN", "STRONG", "A"]
console.log(sliceTree(11, 19));
// // = ["SECTION", "P", "SPAN", "STRONG", "A"]