// Write a function that takes a grocery list in a two-dimensional array and 
// returns a one-dimensional array. Each element in the grocery list contains a 
// fruit name and a number that represents the desired quantity of that fruit. The 
// output array is such that each fruit name appears the number of times equal to 
// its desired quantity.

// In the example below, we want to buy 3 apples, 1 orange, and 2 bananas. Thus, 
// we return an array that contains 3 apples, 1 orange, and 2 bananas.

/*
INPUT: array of arrays
  [subarray1, subarray2...], subarray: [fruit (string), quantity (number)]
OUTPUT:
  array: [fruit1, fruit1... fruit2, fruit2...]
  - each fruit is a string
  - each fruit is repeated as many times as indicated in the quantity
  REQUIREMENTS:
  - assume format is always the same
  - empty array -> return empty array
  - fruits with empty string should not be accounted
  - quantities with empty string should not be accounted
  - don't mutate the input array
  - always singular
  - quantity: integer >= 0
  - assume input is always an array
EXAMPLE:
  [['apple', 3], ['orange', 1], ['banana', 2]]
  [a, a, a, o, b, b]

  - [['apple', 0]] -> []
  - [] -> []
  - [[], []] -> []
  - ['', 5] -> []
DATA STRUCTURE:
array
ALGORITHM:
 - check if the array is empty, YES -> return []
 - declare an empty array to store the grocery list items
 - iterate over the subarrays of the input array. For each subarray:
  - if the subarray is empty or the fruit string is empty or the quantity is 0 -> don't add anything
  - otherwise, add the fruit as many times indicated by the quantity to the
    - groceries array
 - return the groceries array
*/

function buyFruit (list) {
  if (list.length === 0 ) return [];

  let fruits = [];

  for (let idx = 0; idx < list.length; idx += 1) {
    let item = list[idx];
    let fruit = item[0];
    let quantity = item[1];

    if (item.length === 0 || fruit === '' || quantity === 0) continue;
    for (let idx2 = 0; idx2 < quantity; idx2 += 1) {
      fruits.push(fruit);
    }
  }

  return fruits;

}

// TEST CASES
// empty array
console.log(buyFruit([])); // []
// array of empty arrays
console.log(buyFruit([[],[]])); // []
// fruit: empty string
console.log(buyFruit([['', 10]])); // []
// quantity: 0
console.log(buyFruit([['apple', 0]])); // []
// 1 fruit
console.log(buyFruit([['apple', 4]])); // [a, a, a, a]
// multiple fruits
console.log(buyFruit([['apple', 3], ['orange', 1], ['banana', 2]])); //   [a, a, a, o, b, b]

