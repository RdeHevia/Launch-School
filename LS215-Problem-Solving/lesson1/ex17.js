/*
I: word, array of words
O: array of words that are anagrams of the word argument
Examples:
  - listen, inlets -> true
    eilnst, eilnst -> true
  - listen, google -> false
  - listen, enlist -> true
  - listen, enlists -> false
    eilnst, eilnsst -> false
ALGORITHM:
  1. For each word of the list, check if the word is anagram of the other word
    - yes -> add to a result array.
  2. Return the new array
-------
areAnagrams
ALGORITHM:
  1. Sort the characters of both words alphabetically.
  2. Compare the resultant strings. If they match, it means they are anagrams.
*/

function areAnagrams(word1, word2) {
  return word1.split('').sort().join('') === word2.split('').sort().join('');
}

function anagram(word, list) {
  return list.filter(listWord => areAnagrams(word, listWord));
}

console.log(anagram('listen', ['enlists', 'google', 'inlets', 'banana']));  // [ "inlets" ]
console.log(anagram('listen', ['enlist', 'google', 'inlets', 'banana']));   // [ "enlist", "inlets" ]