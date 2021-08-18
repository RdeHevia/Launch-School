/*
I: string
O: boolean (parenthesis balanced -> true)
RULES:
  Parenthesis are balanced if:
    - The number of ( parenthesis = the number of ) parenthesis
    - For any substring of the string: the number of ( parenthesis >= the number of ) parenthesis
EXAMPLES:
Hey! -> true
What (is) this? -> (,) -> 1 - 1 = 0 -> true
((What)) (is this))?:
  1 + 1 = 2
  2 - 1 = 1
  1 - 1 = 0
  0 + 1 = 1
  1 - 1 = 0
  0 - 1 = -1
)Hey!( -> -1 + 1 = 0
ALGORITHM:
  1. Extract all the parenthesis of the string into an array, keeping the same order.
  2. Assign +1 to '(' and -1 to '('
  3. Iterate over the array of parentheisis, aggregating +1 or -1, one by one.
    If for any iteration the sum < 0 -> break the loop and return false
  4. If at the end of the iteration the sum = 0, return true. Else, return false
*/

function getEquivalentNumber(parenthesisSymbol) {
  const PARENTHESIS_EQUIVALENT_NUMBER = {
    '(': 1,
    ')': -1
  };

  return PARENTHESIS_EQUIVALENT_NUMBER[parenthesisSymbol];
}

function isBalanced (string) {
  let parentheses = string.match(/[()]/g);
  if (!parentheses) return true;

  let sum = 0;
  for (let idx = 0; idx < parentheses.length; idx += 1) {
    let parenthesis = parentheses[idx];
    sum += getEquivalentNumber(parenthesis);
    if (sum < 0) return false;
  }

  return sum === 0;
}


console.log(isBalanced('What (is) this?'));        // true
console.log(isBalanced('What is) this?'));         // false
console.log(isBalanced('What (is this?'));         // false
console.log(isBalanced('((What) (is this))?'));    // true
console.log(isBalanced('((What)) (is this))?'));   // false
console.log(isBalanced('Hey!'));                   // true
console.log(isBalanced(')Hey!('));                 // false
console.log(isBalanced('What ((is))) up('));       // false