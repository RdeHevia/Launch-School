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
/*
INPUT: same
OUTPUT: boolean
  - item available -> true
  - not available -> false
REQUIREMENTS:
  - item available: sum of quantities > 0
  - in: add quantity
  - out: sustract quantity
  - array is empty: null
  - no match id: null
EXAMPLE:
 - 101: 5 + 12 - 18 = -1 -> false
 - 105: 10 + 25 = 35 -> true
DATA STRUCTURE:
 - array
ALGORITHM:
  - filter matching transactions
  - if no match (if the return value of helper func is an empty array) -> null
  - sum all matching transactions. for each element:
    - declare MULTIPLER: {in: 1, out: -1}
    - add MULTIPLER[movement] * quantity
  - if sum > 0 -> true. otherwise -> false
*/

function transactionsFor(id, list) {
  if (list.length === 0) return [];

  return list.filter(transaction => transaction.id === id);
}

function isItemAvailable(id, list) {
  let transactions = transactionsFor(id, list);
  if (transactions.length === 0) return null;

  const MULTIPLER = {in: 1, out: -1};

  let totalQuantity = transactions.reduce((sum, transaction) => {
    return sum + (MULTIPLER[transaction.movement] * transaction.quantity);
  }, 0);

  return totalQuantity > 0;
}

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

// item not available
console.log(isItemAvailable(101, transactions));     // false
// item available
console.log(isItemAvailable(105, transactions));     // true
// empty array
console.log(isItemAvailable(101, [])); // null
// no matching id
console.log(isItemAvailable(2000, transactions)); // null