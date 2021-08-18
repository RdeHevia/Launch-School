/* eslint-disable max-statements */
/* eslint-disable no-return-assign */
/* eslint-disable max-lines-per-function */

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
    this.bind();
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

  bind() {
    // arrow function is used so it doesn't lose context (arrow functions
    // take the context from its surroundings)
    this.processGuessHandler = event => this.processGuess(event);
    document.addEventListener('keyup', this.processGuessHandler);
  }

  unbind() {
    document.removeEventListener('keyup', this.processGuessHandler);
  }

  processGuess(event) {
    if (!GuessGame.isLetter(event.key)) return;
    if (this.getGuesses().includes(event.key.toUpperCase())) return;

    this.addGuess(event.key.toUpperCase());
    if (this.isLastGuessAMatch()) {
      this.updateLettersGuessed();
    } else {
      this.updateNbrOfIncorrectGuessesUsed();
    }

    if (this.isOver()) this.unbind();

    if (this.isWordGuessed()) {
      this.setMessage(GuessGame.messageWin);
      this.setBackground(GuessGame.backgroundClassWin);
    } else if (this.allGuessesUsed()) {
      this.setMessage(GuessGame.messageLose);
      this.setBackground(GuessGame.backgroundClassLose);
    }

    this.updateUI();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let game = new GuessGame();

  document.querySelector('#replay').addEventListener('click', event => {
    event.preventDefault();
    game = new GuessGame();
  });
});

