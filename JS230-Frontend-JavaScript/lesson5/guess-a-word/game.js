/* eslint-disable max-statements */
/* eslint-disable no-return-assign */
/* eslint-disable max-lines-per-function */
/*
start with array of words
- choose random word and remove it from the array
- game starts

game:
  - player guess a letter
    yes -> display the matching letters
    no -> remove an apple from the tree
  - if all letters have been guessed. player won!
  - if there are no apples left. player lost!
-----------

  properties:
  - word: string
  - nbrOfIncorrectGuesses: number
  - guesses: array of letters
  - maxNbrOfIncorrectguesses: number (6)
  methods:
  - chooseRandomWord()
    - if no word left, return "Sorry, I've run out of words!"

---------
randomWord()
  - pick a random word from the array
  - mutates the array
  - if no more words left in the array -> return undefined
*/
/*
GAMPLAY:
  EVENT keydown:
    - check if game.getGuesses() includes key
      - yes -> return;
    - game.addLetterGuessed(key in uppercase)
    - game.isAMatch(key)
      - yes: game.updateLettersGuesses(key)
      - no : game.updateNbrOfIncorrectGuesses()
    - game.isWordGuessed()
      - this.message = GuessGame.messageWin
    - game.allGuessesUsed()
      - this.message = GuessGame.messageLose
    - game.updateUI()
*/

class GuessGame {
  static words = [
    'apple', 'banana', 'orange', 'pear', 'strawberry',
    'blueberry', 'cherry', 'stinkyfox', 'mandarine'
  ];

  static messageNoWords = `Sorry, I've run out of words!`;
  static messageWin = `You win!`;
  static messageLose = `Sorry! You're out of guesses`;
  static backgroundClassWin = 'win';
  static backgroundClassLose = 'lose';

  static randomWord() {
    let words = GuessGame.words;
    let lastIndex = words.length - 1;
    return words.splice(GuessGame.randomInt(0, lastIndex), 1)[0] || undefined;
  }

  static randomInt(min,max) {
    return Math.floor(min + (Math.random() * (max + 1 - min)));
  }

  static isLetter(char) {
    return !!char.match(/^[a-z]$/i);
  }

  constructor () {
    let word = GuessGame.randomWord();

    if (word === undefined) {
      this.removeBlanks();
      this.setMessage(GuessGame.messageNoWords);
      this.renderMessage();
      return undefined;
    }

    this.word = word.toUpperCase();
    this.nbrOfSpaces = word.length;
    this.lettersGuessed = new Array(this.nbrOfSpaces).fill('');
    this.nbrOfIncorrectGuesses = 0;
    this.guesses = [];
    this.lastGuess = '';
    this.maxNbrOfIncorrectGuesses = 6;
    this.backgroundClass = '';
    this.setMessage('');
    this.resetUI();
  }

  resetUI() {
    this.removeBlanks();
    this.renderBlanks();
    this.renderAllApples();
    this.updateBackground();
  }

  setBackground(htmlClass = '') {
    this.backgroundClass = htmlClass;
  }

  updateBackground() {
    document.body.classList.remove(...document.body.classList);
    if (this.backgroundClass !== '') {
      document.body.classList.add(this.backgroundClass);
    }
  }

  removeBlanks() {
    let blanks1 = document.querySelectorAll('#spaces span');
    let blanks2 = document.querySelectorAll('#guesses span');
    [...blanks1, ...blanks2].forEach(blank => blank.remove());
  }

  getGuesses() {
    return [...this.guesses];
  }

  addGuess(letter) {
    this.guesses.push(letter);
    this.lastGuess = letter;
  }

  isLastGuessAMatch() {
    return this.word.includes(this.lastGuess);
  }

  updateLettersGuessed() {
    let letters = this.word.split('');
    let matchingIndexes = letters.reduce((indexes, letter, idx) => {
      if (letter === this.lastGuess) indexes = [...indexes, idx];
      return indexes;
    },[]);

    // eslint-disable-next-line no-return-assign
    matchingIndexes.forEach(idx => this.lettersGuessed[idx] = this.lastGuess);
  }

  updateNbrOfIncorrectGuessesUsed() {
    this.nbrOfIncorrectGuesses += 1;
  }

  isWordGuessed() {
    return this.word === this.lettersGuessed.join('');
  }

  allGuessesUsed() {
    return this.nbrOfIncorrectGuesses === this.maxNbrOfIncorrectGuesses;
  }

  isOver() {
    return this.isWordGuessed() || this.allGuessesUsed();
  }

  setMessage(message) {
    this.message = message;
  }

  renderBlanks() {
    let wordContainer = document.querySelector('#spaces');
    let blank = '<span></span>';
    let blankHTML = blank.repeat(this.nbrOfSpaces);

    wordContainer.insertAdjacentHTML('beforeend', blankHTML);
  }

  renderMessage() {
    let message = document.querySelector('#message');
    message.textContent = this.message;
  }

  renderGuesses() {
    let guessesContainer = document.querySelector('#guesses');
    let guessHTML = `<span>${this.lastGuess}</span>`;
    guessesContainer.insertAdjacentHTML('beforeend', guessHTML);
  }

  renderLettersGuessed() {
    let spaces = document.querySelectorAll('#spaces span');
    // eslint-disable-next-line max-len
    spaces.forEach((space, idx) => space.textContent = this.lettersGuessed[idx]);
  }

  renderApples() {
    let apples = document.querySelector('#apples');
    apples.classList.add(`guess_${this.nbrOfIncorrectGuesses}`);
  }

  renderAllApples() {
    let apples = document.querySelector('#apples');
    apples.classList.remove(...apples.classList);
  }

  updateUI() {
    this.renderGuesses();
    this.renderLettersGuessed();
    this.renderApples();
    this.renderMessage();
    this.updateBackground();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let game = new GuessGame();

  document.querySelector('#replay').addEventListener('click', event => {
    event.preventDefault();
    game = new GuessGame();
  });

  document.addEventListener('keydown', event => {
    if (game.isOver()) return;
    if (!GuessGame.isLetter(event.key)) return;
    if (game.getGuesses().includes(event.key.toUpperCase())) return;

    game.addGuess(event.key.toUpperCase());
    if (game.isLastGuessAMatch()) {
      game.updateLettersGuessed();
    } else {
      game.updateNbrOfIncorrectGuessesUsed();
    }

    if (game.isWordGuessed()) {
      game.setMessage(GuessGame.messageWin);
      game.setBackground(GuessGame.backgroundClassWin);
    } else if (game.allGuessesUsed()) {
      game.setMessage(GuessGame.messageLose);
      game.setBackground(GuessGame.backgroundClassLose);
    }

    game.updateUI();
  });
});

