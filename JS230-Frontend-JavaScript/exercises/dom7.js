/*
INPUT: html document
OUTPUT: DOM as a nested array
  - starts from BODY
  - elements only
  [parentTag, [child1, child2...]]
  child: [childTag, [childOfChild1, childOfChid2...]]
RULES:
  - no children: [parentTag, []]
/*
 <body>
    <header id="1"></header>
    <main id="2">
      <div></div>
      <div></div>
    </main>
    <footer id="3"></footer>
  </body>

BODY: [HEADER, MAIN, FOOTER]
  HEADER: []
  MAIN: [DIV, DIV]
    DIV: []
    DIV: []
  FOOTER: []

[
  BODY,
  [
    [HEADER, []],
    [MAIN,
      [
        [DIV, []], [DIV, []]
      ]
    ],
    [FOOTER, []]
  ]
]
*/

/*

ALGO:
  - select body element
  - return treeTags(body)
*/

function nodesToArr2() {
  let body = document.querySelector('body');
  return treeTags(body);
}

/*
INPUT: element
OUTPUT: nested array of tags
  [elementTag, childrenTags]
  children = [child1, child2....]
  child = [childTag, childrenOfChildTags]
  childrenOfChildTags = [cOCT1, cOCT2...]
DS: 
  - tags
  - elements
ALGO:
  - find the tag of the element passed as argument
  - select the children of the element passed as argument
  - elementTree = [element, [...children]]
  - if no children found (array is empty) -> return [elementTag, []]
  - otherwise, map elementTree. for each element:
    - idx = 0: return elementTag (add element as is to the array)
    - id1 = 1: map the children subarray. for each child
      - return treeTags(child)
*/

function treeTags2(element) {
  let children = [...element.children];
  let elementTree = [element, children];

  if (children.length === 0) return [element.tagName, []];

  let elementTreeTags = elementTree.map((item, idx) => {
    if (idx === 0) return item.tagName;
    return item.map(child => treeTags2(child));
  });

  return elementTreeTags;
}

function treeTags(element) {
  let children = [...element.children];

  let elementTreeTags = [element.tagName, children.map(child => treeTags(child))];

  return elementTreeTags;
}

function nodesToArr(element = document.body) {
  let children = [...element.children];

  let elementTreeTags = [element.tagName, children.map(child => nodesToArr(child))];

  return elementTreeTags;
}

let actual;
let actualStringified;

document.addEventListener('DOMContentLoaded', () => {
  actual = nodesToArr();
  actualStringified = JSON.stringify(actual);

  let expected1 = JSON.stringify(["BODY",[["HEADER",[]],["MAIN",[]],["FOOTER",[]]]]);
  let expected2 = JSON.stringify(["BODY",[["HEADER",[]],["MAIN",[["DIV",[]],["DIV",[]]]],["FOOTER",[]]]]);
  let expected3 = JSON.stringify(["BODY",[["DIV",[["DIV",[]],["DIV",[["DIV",[]]]]]],["DIV",[]],["DIV",[["DIV",[]],["DIV",[]],["DIV",[]]]]]]);

  console.log(actual);
  console.log(`dom7-1 test: ${actualStringified === expected1}`);
  console.log(`dom7-2 test: ${actualStringified === expected2}`);
  console.log(`dom7-3 test: ${actualStringified === expected3}`);
});


