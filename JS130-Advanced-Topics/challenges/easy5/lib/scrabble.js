/*
given a word, compute scrabble score
TYPE Scrabble:
  - word
  - score()
*/
/*
----------------
METHOD score():
INPUT: this.word
OUTPUT: the score of the word (number)
EXAMPLES:
quirky: 10 + 1 + 1 + 1 + 5 + 4 = 22
DATA STRUCTURE:
letter - score table -> object. Save as a static property
ALGORITHM:
1. Start with a variable sum = 0.
2. Iterate over the characters of the string. For each character:
  2.1. Check if the character is a letter. NO -> continue
  2.2. Retrieve the score for that character and add it to sum.
3. Return sum
----------------
METHOD letterScore():
INPUT: letter
OUTPUT: score of the letter
EXAMPLE:
B.
B included in 1: false,
B included in 2: false,
B included in 3: true
break
score = 3
ALGORITHM:
1. Iterate over the keys of TILE_SCORES (the score). For each score:
  1.1. Check if the array includes the letter
    - YES -> letterScore = Number(scoreGroup), break;
    - NO -> continue
2. Return letterScore
*/

class Scrabble {
  constructor (word) {
    this.word = word;
  }

  static TILE_SCORES = {
    1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
    2: ['D', 'G'],
    3: ['B', 'C', 'M', 'P'],
    4: ['F', 'H', 'V', 'W', 'Y'],
    5: ['K'],
    8: ['J', 'X'],
    10: ['Q', 'Z'],
  }

  static score(word) {
    return (new Scrabble(word)).score();
  }

  score() {
    if (this.invalidWord() || this.emptyWord()) {
      return 0;
    }

    let letters = this.filterLetters(this.word).toUpperCase();

    let wordScore = letters.split('').reduce((totalScore, letter) => {
      return totalScore + this.letterScore(letter);
    }, 0);

    return wordScore;
  }

  invalidWord() {
    return typeof this.word !== 'string';
  }

  emptyWord() {
    return this.word === '';
  }

  filterLetters(string) {
    return (string.match(/[a-z]/gi) || []).join('');
  }

  letterScore(letter) {
    const TILE_SCORES = Scrabble.TILE_SCORES;
    let score;
    letter = letter.toUpperCase();
    for (let value in TILE_SCORES) {
      if (TILE_SCORES[value].includes(letter)) {
        score = Number(value);
        break;
      }
    }

    return score;
  }
}
let word = new Scrabble('quirky');
console.log(word.score());
module.exports = Scrabble;