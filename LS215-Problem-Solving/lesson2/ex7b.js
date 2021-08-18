/*
Implement a function that checks whether an email address is valid. An email 
address has two parts: A "local part" and a "domain part." An @ sign separates 
the two parts: local-part@domain-part. The local part is the name of the 
mailbox; this is usually a username. The domain part is the domain name 
(e.g., gmail.com, yahoo.com.ph, or myCompanyName.com). The domain name 
contains a server name (sometimes called the mail server name) and a 
top-level domain (.com, .ph, etc.).

For this practice problem, use the following criteria to determine whether 
an email address is valid:

There must be one @ sign.
The local part must contain one or more letters (A-Z, a-z) and/or digits (0-9). 
It may not contain any other characters.
The domain part must contain two or more components with a single dot (.) 
between each component. Each component must contain one or more letters 
(A-Z, a-z) only.
To keep things simple, you don't need to check whether the domain part or 
top-level domain is "real" or "official".

Note: don't use this criteria for real email validation logic in your programs. 
We are using greatly simplified criteria to let you concentrate on the 
fundamentals of JavaScript, and not on the specifics of email addresses.
*/

/*
INPUT: email address
  - data type: string
OUTPUT: boolean
  - valid: true
  - invalid: false
RULES:
  - email: local-part@domain-part
  - sepator: @
  - local-part:
    - 1 or more alphanumeric characters (lower or uppercase)
    - it can't contain any other char
  - domain-part:
    - 1 or 2 components separated by a single dot
    - component: alphabetic chars (lower or uppercase)
  - input:
    - empty string: return false
    - either local or domain parts are missing -> return false
    - @ is not used -> false
    - @ is repeated -> false
    - domain-part: more than 1 dot -> false
      - more than 2 parts -> false
    - wrong data type: assume not
    - no argument passed: return false
EXAMPLE:
  raulDHS1990@gmail.com -> valid email
  raul-DHS... -> invalid
  ...@gmail2.com -> invalid

DATA STRUCTURE:
ALGORITHM:
  - if empty string or no arugment passed -> return false
  - find number of @'s
    - no -> return false
    - more than 1 -> return false
  - separate localPart from domainPart using the at separator
  * check if the local-part is valid
  * check if the domain-part is valid
  - if both are valid, return true. otherwise, return false
------------'
isLocalPartValid(localPart)
  match regex
  - local-part:
  - 1 or more alphanumeric characters (lower or uppercase)
  - it can't contain any other char
  - yes -> true
  - no -> false
isDomainPartValid(localPart)

*/

function isLocalPartValid(localPart) {
  const VALID_PATTERN = /^[0-9a-z]+$/i;
  return !!localPart.match(VALID_PATTERN);
}

function isDomainPartValid(domainPart) {
  const VALID_PATTERN = /^[a-z]+\.?[a-z]+$/i;
  return !!domainPart.match(VALID_PATTERN);
}

function validEmail(email) {
  if (email === '' || email === undefined) return false;
  let numberOfAts = (email.match(/@/g) || []).length;
  if (numberOfAts !== 1) return false;

  let [localPart, domainPart] = email.split('@');
  // console.log(localPart);
  // console.log(domainPart);
  return (isLocalPartValid(localPart) && isDomainPartValid(domainPart));
}

// TEST CASES
// empty string
console.log(validEmail('')); // false
// no argument passed
console.log(validEmail()); // false
// valid email: local-part varies, domain constant
console.log('--------------');
console.log(validEmail('raul@gmail.com')); // true
console.log(validEmail('raulDHS@gmail.com')); // true
console.log(validEmail('raulDHS1990@gmail.com')); // true
// valid email: local-part lowercase, domain-part varies
console.log('--------------');
console.log(validEmail('raul@gmail')); // true
console.log(validEmail('raul@GMail')); // true
console.log(validEmail('raul@gmail.com')); // true
console.log(validEmail('raul@gmail.CoM')); // true
// @ missing or duplicated
console.log('--------------');
console.log(validEmail('raulgmail.com')); // false
console.log(validEmail('raul-gmail.com')); // false
console.log(validEmail('raul@@gmail.com')); // false
// invalid local-part
console.log('--------------');
console.log(validEmail('@gmail.com')); // false
console.log(validEmail('raul-dehevia@gmail.com')); // false
console.log(validEmail('raul!dehevia@gmail.com')); // false
console.log(validEmail('raul.dehevia@gmail.com')); // false
console.log(validEmail('.rauldehevia@gmail.com')); // false
console.log(validEmail('rauldehevia.@gmail.com')); // false
// invalid domain-part
console.log('--------------');
console.log(validEmail('raul@gmail2')); // false
console.log(validEmail('raul@gmail-com')); // false
console.log(validEmail('raul@gmail..com')); // false
console.log(validEmail('raul@gmail.com1')); // false
