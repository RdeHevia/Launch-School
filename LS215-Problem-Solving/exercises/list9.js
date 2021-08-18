/*
INPUT: 
  - list of transactions: array of objects
    {id: number, movement: string, quantity: number}
  - item id: number
OUTPUT:
  - filtered list that matches the item id passed as argument
  - array of objects, same shape as the list of transactions
REQUIREMENTS:
  - list of transactions:
    - always an array
    - array can be empty
    - objects are not empty
  - quantity:
    - assume is always a positive integer
  - assume both arguments are always passed to the function
  - id doesn't match: return empty array
DATA STRUCTURE:
process the list as an array
ALGORITHM:
 - check if the array is empty. YES -> return empty array
 - iterate over the elements of the array and filter the ones that match the id
 - if no matches -> return empty array
*/

const transactions = [ { id: 101, movement: 'in',  quantity:  5 },
                       { id: 105, movement: 'in',  quantity: 10 },
                       { id: 102, movement: 'out', quantity: 17 },
                       { id: 101, movement: 'in',  quantity: 12 },
                       { id: 103, movement: 'out', quantity: 15 },
                       { id: 102, movement: 'out', quantity: 15 },
                       { id: 105, movement: 'in',  quantity: 25 },
                       { id: 101, movement: 'out', quantity: 18 },
                       { id: 102, movement: 'in',  quantity: 22 },
                       { id: 103, movement: 'out', quantity: 15 }, ];

function transactionsFor(id, list) {
  if (list.length === 0) return [];

  return list.filter(transaction => transaction.id === id);
}

// TEST CASES
// empty array
console.log(transactionsFor(101, [])); // []
// no matching id
console.log(transactionsFor(2000, transactions)); // []
// normal case
console.log(transactionsFor(101, transactions));
// returns
// [ { id: 101, movement: "in",  quantity:  5 },
//   { id: 101, movement: "in",  quantity: 12 },
//   { id: 101, movement: "out", quantity: 18 }, ]