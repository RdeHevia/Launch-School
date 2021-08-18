/*
I: email (string)
O: boolean (true if valid email)
RULES:
  - email must contain a @
  - local part: 1 or more letters and/or digits (lower or uppercase)
  - (1 or more letters).(1 or more letters) ; lower or uppercase
ALGORITHM:
  1. Check if the email has the right format
*/


function isValidEmail(email) {
  const REGEX = /^[0-9a-z]+@([a-z]+\.)+[a-z]+$/gi;
  return !!email.match(REGEX);
}

console.log(isValidEmail('Foo@baz.com.ph'));          // returns true
console.log(isValidEmail('Foo@mx.baz.com.ph'));       // returns true
console.log(isValidEmail('foo@baz.com'));             // returns true
console.log(isValidEmail('foo@baz.ph'));              // returns true
console.log(isValidEmail('HELLO123@baz'));            // returns false
console.log(isValidEmail('foo.bar@baz.to'));          // returns false
console.log(isValidEmail('foo@baz.'));                // returns false
console.log(isValidEmail('foo_bat@baz'));             // returns false
console.log(isValidEmail('foo@bar.a12'));             // returns false
console.log(isValidEmail('foo_bar@baz.com'));         // returns false
console.log(isValidEmail('foo@bar.....com'));         // returns false