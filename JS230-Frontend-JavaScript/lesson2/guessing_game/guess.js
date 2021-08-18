/* eslint-disable max-lines-per-function */
/* eslint-disable max-len */
/*
- computer picks number 1 to 100
- when user "guess" a number
  - if computer's number < guess -> log lower than ...
  - if computer's number > guess -> log greater than ...
  - if computer's number === guess -> log
- keep track of the number of guesses. log the nubmer of guesses when the
  game ends
- new game: start again

<body>
  <main>
    <h1>Number Guessing Game</h1>
    <p>Loading...</p>
    <form action="" method="get">
      <fieldset>
        <input type="text" id="guess" maxlength="3" />
        <input type="submit" value="Guess" /> ***click event***
      </fieldset>
    </form>
    <a href="#">New game</a> ***click event***
  </main>
</body>
*/
class guessGame {

  constructor () {
    this.answer = this.randomInteger(1, 100);
    this.message = 'Guess a number from 1 to 100';
    this.count = 0;
  }

  randomInteger(lowerLimit, upperLimit) {
    return lowerLimit + Math.floor(Math.random() * (upperLimit + 1 - lowerLimit));
  }

  getMessage() {
    return this.message;
  }

  readGuess(guess) {
    if (!this._validInput(guess)) {
      this._updateMessage('Please enter an integer from 1 to 100');
    } else {
      this.guess = Number.parseInt(guess, 10);
      this._updateCount();
      this._updateMessage();
    }
  }

  _validInput(input) {
    if (typeof input !== 'string') return false;
    input = +input;
    return Number.isInteger(input) && input >= 1 && input <= 100;
  }

  _updateCount() {
    this.count += 1;
  }

  _updateMessage(overrideMessage = undefined) {
    if (overrideMessage) {
      this.message = overrideMessage;
    } else if (this.answer < this.guess) {
      this.message = `My number is lower than ${this.guess}`;
    } else if (this.answer > this.guess) {
      this.message = `My number is greater than ${this.guess}`;
    } else if (this.answer === this.guess) {
      this.message = `You guessed it! It took you ${this.count} guesses.`;
    }
  }

  isGameEnded() {
    return this.answer === this.guess;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let game = new guessGame();
  console.log(game.answer);
  let input = document.querySelector('#guess');
  let form = document.querySelector('form');
  let submitButton = document.querySelector('input[type="submit"]');

  form.addEventListener('submit', event => {
    event.preventDefault();

    game.readGuess(input.value);
    document.querySelector('main > p').textContent = game.getMessage();

    if (game.isGameEnded()) {
      submitButton.disabled = true;
      submitButton.classList.toggle('disabled', true);
    }
  });

  document.querySelector('a').addEventListener('click', event => {
    event.preventDefault();

    game = new guessGame();

    submitButton.disabled = false;
    submitButton.classList.toggle('disabled', false);

    document.querySelector('main > p').textContent = game.getMessage();
  });
});
