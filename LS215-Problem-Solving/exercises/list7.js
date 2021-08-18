// Write a function that returns a list of all substrings of a string that are 
// palindromic. That is, each substring must consist of the same sequence of 
// characters forwards as backwards. The substrings in the returned list 
// should be sorted by their order of appearance in the input string. Duplicate 
// substrings should be included multiple times.

// You may (and should) use the substrings function you wrote in the previous exercise.

// For the purpose of this exercise, you should consider all characters and pay
// attention to case; that is, 'AbcbA' is a palindrome, but 'Abcba' and
//  'Abc-bA' are not. In addition, assume that single characters are not palindromes.

/*
INPUT: string
OUTPUT: array with all palindromic substrings
  - sorted by order of appearance
  - duplicate substrings should be included multiple times
  - case sensitive
  - single chars aren't palindromes (same for empty strings)
REQUIREMENTS:
  - palindromic: same sequence of chars forwards and backwards
  - palindrome with:
    - even number of chars: e.g. abba
    - odd number of chars: e.g. aba
EXAMPLES:
AbcbA -> palindrome
Abcba -> not (case sensitive)
xABBAy:
xA
XAB
XABBA
xABBAy
AB
ABB
ABBA -> palindrome
ABBAy
BB -> palindrome
...
DATA STRUCTURE:
 - array
ALGORITHM:
 - Find all the substrings of the string. save them in an array
 - Filter the substrings that are palindromes into a new array F: isPalindrome
 - return the array
------------------
function isPalindrome(string)
INPUT: string
OUTPUT: return
  - true (if palindrome)
  - false (not palindrome)
REQUIREMENTS:
    - palindromic: same sequence of chars forwards and backwards
  - palindrome with:
    - even number of chars: e.g. abba
    - odd number of chars: e.g. aba
   - case sensitive
  - single chars aren't palindromes (same for empty strings)
ALGORITHM:
  - IF the string is 1 char long or empty -> return  false
  - IF the string reversed is ==== the input string -> return true
*/

function leadingSubstrings(string) {
  let chars = string.split('');

  return chars.map((_,idx) => chars.slice(0, idx + 1).join(''));
}

function substrings(string) {
  let chars = string.split('');
  return chars
    .map((_,idx) => {
      let substring = chars.slice(idx).join('');
      return leadingSubstrings(substring);
    }).flat();
}

function isPalindrome(string) {
  if (string.length <= 1) return false;

  return string === string.split('').reverse().join('');
}

function palindromes(string) {
  let allSubstrings = substrings(string);
  return allSubstrings.filter(isPalindrome);
}

// 1 substring, palindrome, odd
console.log(palindromes('aba')); // ['aba']
// palindrome, even
console.log(palindromes('abba')); // ['abba', 'bb']
// multiple substrings, even and odd
console.log(palindromes('AXabccbaYB')); // ['abccba', 'bccb','cc']
// duplicate substrings
console.log(palindromes('abaaba')); // ['aba', 'abaaba', 'aba']
// 1 char (no palindrome)
console.log(palindromes('x')); // []
// case sensitive (no palindrome)
console.log(palindromes('aBBa')); // ['aBBa', 'BB']
console.log(palindromes('aBba')); // []
// empty string (no palindrome)
console.log(palindromes('')); // []