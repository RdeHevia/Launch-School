"use strict";

let Account = (function () {
  let userEmail;
  let userPassword;
  let userFirstName;
  let userLastName;

  let _passwordMatches = function (password) {
    return userPassword === password;
  };

  let _generateRandomCharacter = function () {
    let lowerLimit = 48;
    let upperLimit = 122;
    let randomNumber = Math.round(lowerLimit + ((upperLimit - lowerLimit) * Math.random()));
    return String.fromCharCode(randomNumber);
  };

  let anonymize = function () {
    let characterSequence = '';
    for (let idx = 0; idx < 16; idx += 1) {
      characterSequence += _generateRandomCharacter();
    }
    return characterSequence;
  }

  return {
    init(email, password, firstName, lastName) {
      userEmail = email;
      userPassword = password;
      userFirstName = firstName;
      userLastName = lastName;

      this.displayName = anonymize();
      return this;
    },

    firstName(password) {
      if (_passwordMatches(password)) {
        return userFirstName;
      } else {
        return 'Invalid password';
      }
    },

    lastName(password) {
      if (_passwordMatches(password)) {
        return userLastName;
      } else {
        return 'Invalid password';
      }
    },

    email(password) {
      if (_passwordMatches(password)) {
        return userEmail;
      } else {
        return 'Invalid password';
      }
    },

    resetPassword(currentPassword, newPassword) {
      if (_passwordMatches(currentPassword)) {
        userPassword = newPassword;
        return true;
      } else {
        return 'Invalid password';
      }
    },

    reanonymize() {
      this.displayName = anonymize();
    },

  };
}) ();


let fooBar = Object.create(Account).init('foo@bar.com', '123456', 'foo', 'bar');
console.log(fooBar);
console.log(fooBar.firstName);                     // returns the firstName function
console.log(fooBar.email);                         // returns the email function
console.log(fooBar.firstName('123456'));           // logs 'foo'
console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
// fooBar.reanonymize();
console.log(fooBar.displayName);                   // logs 16 character sequence
console.log(fooBar.resetPassword('123', 'abc'))    // logs 'Invalid Password';
console.log(fooBar.resetPassword('123456', 'abc')) // logs true

let displayName = fooBar.displayName;
fooBar.reanonymize('abc');                         // returns true
console.log(fooBar.displayName);
console.log(displayName === fooBar.displayName);   // logs false