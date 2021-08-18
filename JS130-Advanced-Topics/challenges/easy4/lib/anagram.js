/*
TYPE Anagram:
- word
- match() (polymorphism). Return an array with matching anagrams
------------------
METHOD match(comparingWords)
INPUT: comparingWords (array of strings) and this.word
OUTPUT: array with words that match this.word
RULES: 
  - 2 words are anagrams if:
    - they aren't the same word (same characters in the same order)
    - they have formed by the same letters (case insensitive)
  - if no matches -> return empty array
ALGORITHM:
  1. For each word of comparingWords.
    1.1 Check if the comparingWord and this.word are formed by the same letters
      - yes -> add to anagram array
      - no -> continue
  2/ Return anagram array
*/
class Anagram {
  constructor (word) {
    this.word = word;
  }

  match(comparingWords) {
    console.log(comparingWords);
    return comparingWords.filter(this.isAnagramOf,this);
  }

  isAnagramOf(comparingWord) {
    let word1 = this.word.toLowerCase();
    let word2 = comparingWord.toLowerCase();

    if (word1 === word2) {
      return false;
    } else {
      return this.sortAlphabetically(word1) === this.sortAlphabetically(word2);
    }
  }

  sortAlphabetically(string) {
    return string.split('').sort().join('');
  }
}

module.exports = Anagram;