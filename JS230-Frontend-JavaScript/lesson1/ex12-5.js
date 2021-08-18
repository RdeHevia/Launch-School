/*
Write JavaScript code that extracts the classification of animals from the web 
page and logs an Object that uses the ranks as keys and the groups as values. 
You may assume the taxonomic ranks to use as keys is provided for you as an 
array.
*/

/*
INPUT: html file
OUTPUT:
{
  Kingdom: string,
  Phylum: string,
  Class: string,
  Order: string,
  Family: string
  Genus: string,
  Species: string
}
RULES:
  - table class: "infobox biota"
  - Kingdom, Phylum... and their values are td (table data) elements childs 
    of a tr (table row) elements
  - Kingdom, Phylum... are the first td element
  - values are second td elements
ALGO1:
  - Select tr elements: .infobox.biota tr
  - Save the tr elements into an array
  - map the tr array to get the children (td elements) of each tr
  - Reduce the array to an object
    - initialValue = {}
    - currentVal: td
    - taxonomicRank = first td.textContent cleaned and lowercased
    - group = second td.textContent cleaned
    - animalClassification[taxonomicRank] = group
  - return animalClassification
*/

let tableRows = [...document.querySelectorAll('.infobox.biota tr')];
let tableData = tableRows
  .map(row => [...row.children])
  .filter(data => data.length === 2);

let animalClassification = tableData.reduce((classification, data) => {
  let taxonomicRank = data[0].textContent.trim().toLowerCase();
  let group = data[1].textContent.trim();
  classification[taxonomicRank] = group;
  return classification;
}, {})

