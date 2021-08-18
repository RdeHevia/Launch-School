/* eslint-disable max-len */
/*
Account type (OLOO pattern)
  - init()
    * email
    * password
    * firstName
    * lastName
    * displayName
-------------
reanonymize():
  1. Check the password is valid.
  2. If the password is valid, generate a random string of 16 chars (alphanumeric)
    2.1 Create an string with all the characters.
    2.2. Count the length of the string
    2.3. Generate a random index
    2.4. Save the character for that index
    2.5. Repeat 15 more times
*/


let Account = function () {
  let userEmail, userPassword, userFirstName, userLastName;
  return {
    init(email, password, firstName, lastName) {
      userEmail = email;
      userPassword = password;
      userFirstName = firstName;
      userLastName = lastName;
      this.reanonymize(password);
      return this;
    },

    firstName(password) {
      if (this.validPassword(password)) {
        return userFirstName;
      } else {
        return 'Invalid Password';
      }
    },

    lastName (password) {
      if (this.validPassword(password)) {
        return userLastName;
      } else {
        return 'Invalid Password';
      }
    },

    email(password) {
      if (this.validPassword(password)) {
        return userEmail;
      } else {
        return 'Invalid Password';
      }
    },

    validPassword(password) {
      return userPassword === password;
    },

    resetPassword(currentPassword, newPassword) {
      if (this.validPassword(currentPassword)) {
        userPassword = newPassword;
        return true;
      } else {
        return 'Invalid Password';
      }
    },

    reanonymize(password) {
      if (this.validPassword(password)) {
        this.displayName = this.generateRandom16CharsSequence();
        return true;
      } else {
        return 'Invalid Password';
      }
    },

    generateRandom16CharsSequence() {
      let randomSequence = '';
      for (let iteration = 1; iteration <= 16; iteration += 1) {
        randomSequence += this.generateRandomChar();
      }

      return randomSequence;
    },

    generateRandomChar() {
      const CHARS = '0123456789abcdefghijklmnopqrstuvwxyz';
      const NBR_OF_POSSIBLE_CHARS = CHARS.length;
      let lowerLimit = 0;
      let upperLimit = NBR_OF_POSSIBLE_CHARS - 1;
      let randomIndex = Math.floor(
        (Math.random() * (upperLimit + 1 - lowerLimit)) + lowerLimit
      );

      return CHARS[randomIndex];
    }
  };
} ();

// let test = Object.create(Account).init('a','b','c','d');
// console.log(test);
// console.log(test.firstName());

let fooBar = Object.create(Account).init('foo@bar.com', '123456', 'foo', 'bar');
console.log(fooBar.firstName);                     // returns the firstName function
console.log(fooBar.email);                         // returns the email function
console.log(fooBar.firstName('123456'));           // logs 'foo'
console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
console.log(fooBar.displayName);                   // logs 16 character sequence
console.log(fooBar.resetPassword('123', 'abc'))    // logs 'Invalid Password';
console.log(fooBar.resetPassword('123456', 'abc')) // logs true

let displayName = fooBar.displayName;
fooBar.reanonymize('abc');                         // returns true
console.log(displayName === fooBar.displayName);   // logs false
// console.log(fooBar.generateRandom16CharsSequence());