/*
I: element id
O: [nbrOfDirectNodes, nbrOfIndirectNodes]
A:
  - select the element by id
  - find all the child nodes
  - nbrOfDirectNodes = childNodes.length
  - nbrOfIndirectNodes = nbrOfDirectnodes
  - iterate over the child nodes. for each node
    - get the id of the node: childId
    - nbrOfIndirectNodes += childNodes(childId)[0]
  return []
*/

// function childNodes(id) {
//   let parent = document.getElementById(id);
//   let children = [...parent.childNodes];
//   let nbrOfDirectNodes = children.length;
//   let nbrOfIndirectNodes = nbrOfDirectNodes;

//   let childrenElements = [...parent.children];
//   childrenElements.forEach(child => {
//     nbrOfIndirectNodes += childNodes(child.id)[0];
//   });

//   return [nbrOfDirectNodes, nbrOfIndirectNodes];
// }