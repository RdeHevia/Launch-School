/*
OUTPUT: word count for each h2 heading and total count
ALGORITHM:
  - retrieve a list of h2 nodes and save them into an array.
  - totalCount: reduce the array with a reduction function that
    - count the number of words for each h2 and logs it
    - sum the counts of all the nodes accumulative
  - log totalCount
*/

let headingsH2 = [...document.querySelectorAll('h2')];

let wordCount = headingsH2.map(heading => heading.textContent.split(' ').length);
let totalWordCount = wordCount.reduce((total, partial) => total + partial);

console.log(wordCount);
console.log(totalWordCount);