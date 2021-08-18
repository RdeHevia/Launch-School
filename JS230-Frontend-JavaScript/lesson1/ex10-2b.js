/*
Update the code from Problem 1 to add the article-text class to paragraphs 
inside <div class="intro">, and nowhere else.
*/

/*
ALGO:
  - get a list of div nodes
  - filter the nodes that have class intro
  - for each node: 
    - find all the nodes with the tag 'p'
    - iterate over the 'p' nodes. for each node
      - add the class article-text to it
*/

// let divNodes = document.getElementsByTagName('div')

let introNodes = document.getElementsByClassName('intro');
[].forEach.call(introNodes, (node) => {
  let paragraphs = node.getElementsByTagName('p');
  [].forEach.call(paragraphs, (paragraph) => paragraph.classList.add('article-text'));
})

