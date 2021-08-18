/*
Given a string check if it can be constructed by taking a substring of
it and appending multiple copies of the substring together. 
*/

/*
INPUT: string
  - characters: letters (lower and uppercase)
OUTPUT: boolean
  string = a substring concatenated multiple times
RULES:
  - substring min nbr of chars: 1
  - wrong data types: return null
  - the check is case insensitive: aBAb -> true
  - '' -> false
  - no input -> false
EXAMPLES:
abab = ab * 2 -> true
  a: a, ab, aba, abab
  b: b, ba, bab
  a: a, ab
  b: b

  matches:
  a 2 < 4
  ab 2 * nbrOfChars = 4 (length) <-

aba = aba * 1 -> false
aaa = a * 3 -> true
aaaa = a * 4 or aa * 2 -> true
  matches:
  a: 4 * 1 = 4 <-
  aa: 2 * 2 = 4
  aaa: 1 * 3 < 4
*/

/*
DATA STRUCTURE:
  - substrings = [substring1, substring...]; substring: string
ALGORITHM:
  - make '' default input
  - if wrong data type (no string) -> return null
  - string === '' -> return false
  - make the string lowercase
  * substrings = findSubstrings(lowerCaseString)
  - iterate over substrings. For each substring:
    * check if (stringMadeOf(lowerCaseString, substring))      
      - YES -> return true (break loop)
  - return false
*/

function madeOfSameSubstring(string = '') {
  if (typeof string !== 'string') return null;
  if (string === '') return false;

  let lowerCaseString = string.toLowerCase();
  let substrings = findSubstrings(lowerCaseString);

  for (let idx = 0; idx < substrings.length; idx += 1) {
    let substring = substrings[idx];
    if (stringMadeOf(lowerCaseString, substring)) return true;
  }

  return false;
}

/*
findSubstrings:
EXAMPLE:
abab:
  a: a, ab, aba, abab
  b: b, ba, bab
  a: a, ab
  b: b
DS:
 substrings: array of strings
ALGORITHM:
  - split the string into an array of chars
  - map the chars with the substrings that start with that char. For a char at idxI:
    - subarray: slice the array of chars from idx to end of array
    - map the chars of subarray. For a char at idxJ:
      - slice from 0 to idxJ + 1
      - join the chars together into a string
      - return the string
    return the mapped subarray
  - flat all the elements
  - return the new array
*/

function findSubstrings4(string) {
  let chars = string.split('');
  let substrings = chars
    .map((_, idxI) => {
      let subArrayOfChars = chars.slice(idxI);
      return subArrayOfChars.map((_,idxJ) => {
        return subArrayOfChars.slice(0, idxJ + 1).join('');
      });
    })
    .flat();
  return substrings;
}

function leadingSubstringsFromChars(arrayOfChars) {
  return arrayOfChars.map((_,idxI) => {
    return arrayOfChars.slice(0, idxI + 1).join('');
  });
}

function findSubstrings(string) {
  let chars = string.split('');
  let substrings = chars
    .map((_, idxI) => {
      let subArrayOfChars = chars.slice(idxI);
      return leadingSubstringsFromChars(subArrayOfChars);
    })
    .flat();
  return substrings;
}

function findSubstrings3(string) {
  let chars = string.split('');
  let substrings = chars
    .map((_, idxI) => {
      let subArrayOfChars = chars.slice(idxI);
      return subArrayOfChars.reduce((subs, char, idxJ) => {
        if (idxJ === 0) return subs.concat(char);
        return subs.concat(subs[subs.length - 1] + char);
      },[]);
    }).flat();
  console.log(substrings);
  return substrings;
}

function findSubstrings2 (string) {
  let chars = string.split('');
  let substrings = [];
  for (let idxI = 0; idxI < chars.length; idxI += 1) {
    for (let idxJ = idxI; idxJ < chars.length; idxJ += 1) {
      substrings.push(chars.slice(idxI, idxJ + 1).join(''));
    }
  }

  return substrings;
}

// console.log(findSubstrings('abab'));

/*
stringMadeOf
I: string, substring
DS:
ALGORITHM:
  - calc the nbrOfChars for both string and substring
  - nbrOfMatches: match the substring with string and count the appearances
  return nbrOfMatches * nbOfCharsSubstring === nbrOfStringChars
*/

function stringMadeOf(string, substring) {
  let nbrOfMatches = (string.match(new RegExp(substring, 'g')) || []).length;
  return nbrOfMatches * substring.length === string.length && nbrOfMatches > 1;
}

// console.log(stringMadeOf('abab','ac'));

// TEST CASES
// - wrong data types: return null
console.log(madeOfSameSubstring(null)); // null
console.log(madeOfSameSubstring([])); // null
console.log(madeOfSameSubstring(123)); // null
console.log(madeOfSameSubstring(/abc/)); // null
console.log(madeOfSameSubstring(true)); // null
console.log(madeOfSameSubstring(NaN)); // null
console.log(madeOfSameSubstring(Infinity)); // null
console.log(madeOfSameSubstring({})); // null
console.log(madeOfSameSubstring((x) => x)); // null
console.log('============================');
console.log(madeOfSameSubstring(undefined)); // false
// - '' -> false
console.log(madeOfSameSubstring('')); // false
// - no input -> false
console.log(madeOfSameSubstring('')); // false
console.log('============================');
// - the check is case insensitive: aBAb -> true
console.log(madeOfSameSubstring('abab')); // true
console.log(madeOfSameSubstring('ABAB')); // true
console.log(madeOfSameSubstring('AbaB')); // true
console.log('============================');
// - string is composed of 1 substring repeated
console.log(madeOfSameSubstring('ababab')); // true
// - string is composed of more than 1 substring repeated
console.log(madeOfSameSubstring('aaaa')); // true
console.log(madeOfSameSubstring('aaaa')); // true
console.log(madeOfSameSubstring('aBabAbaB')); // true
console.log('============================');
// - string is not composed of substrings
console.log(madeOfSameSubstring('abc')); // false
console.log(madeOfSameSubstring('AbC')); // false