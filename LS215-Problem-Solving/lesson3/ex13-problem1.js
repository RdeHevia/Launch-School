//  Time to solve 1h. Video: 27:28min
/*
INPUT: phone number
  * string
  * number? yes
  * digits (0-9)
  * ' ', -, ., () -> they should be ignored
OUTPUT: cleaned up phone number
  * string
  * if bad number -> string of ten 0's
REQUIREMENTS:
  - data types different from number or string -> bad number
  - just ignore the special characters. order, position and frequency doesn't
    matter
  - less than 10 digits -> bad number
  - 10 digits -> valid number
  - 11 digits:
    - first digit is 1 -> remove 1 (valid number)
    - otherwise -> bad number
  - more than 11 digits -> bad number
  - characters different from digits and ' ', -, ., () -> bad number
EXAMPLES:
  - 415-405-9132 -> 4154059132
  - (415) 405 9132 -> 4154059132
  - )415(-. ...40-5 91....32 -> 4154059132
  - 000 000 0000 -> bad number?
  - 415_405_1234 -> bad number
DATA STRUCTURES:
    cleaned phone number: string
ALGORITHM:
- Check the data type of the input is correct
    - is it a string OR a number? NO -> bad number
- If number input, coerce to string
- Check if the phone number has not valid special characters
    - YES -> bad number
- Remove all allowed special characters
- Check the number of digits (length of the string)
    - 10 -> return the number
    - 11: if first character is 1 -> drop it and return the rest of the number
    - >11 -> return bad number
*/



function validateEqual(actual, expected) {
  let passed = (actual === expected);
  console.log(`${passed}, actual: ${actual}, expected: ${expected}`);
}

function validDataType(phoneNumber) {
  let dataType = typeof phoneNumber;

  return (dataType === 'number' || dataType === 'string');
}

function validCharacters(phoneNumber) {
  const INVALID_CHARS_REGEX = /[^\d ()\-.]/g;

  return !phoneNumber.match(INVALID_CHARS_REGEX);
}

function removeNoDigitCharacters(phoneNumber) {
  const VALID_SPECIAL_CHARS = /[ ()\-.]/g;
  return phoneNumber.replace(VALID_SPECIAL_CHARS, '');
}


function formatPhoneNumber(phoneNumber) {
  const BAD_NUMBER = '0'.repeat(10);

  if(!validDataType(phoneNumber)) return BAD_NUMBER;

  phoneNumber = String(phoneNumber);

  if(!validCharacters(phoneNumber)) return BAD_NUMBER;

  let phoneNumberOnlyDigits = removeNoDigitCharacters(phoneNumber);

  let numberOfDigits = phoneNumberOnlyDigits.length;
  if(numberOfDigits === 10) {
    return phoneNumberOnlyDigits;
  } else if (numberOfDigits === 11) {
    if (phoneNumberOnlyDigits[0] === '1') {
      return phoneNumberOnlyDigits.slice(1);
    } else {
      return BAD_NUMBER;
    }
  } else {
    return BAD_NUMBER;
  }
}

// TEST CASES
// 10 digits, no special characters
validateEqual(formatPhoneNumber('1234567890'),'1234567890');
// 10 digits, special characters
validateEqual(formatPhoneNumber('123-456-7890'),'1234567890');
validateEqual(formatPhoneNumber('123.456.7890'),'1234567890');
validateEqual(formatPhoneNumber('123 456 7890'),'1234567890');
validateEqual(formatPhoneNumber('(123)4567890'),'1234567890');
// 10 digits, different special characters
validateEqual(formatPhoneNumber('(123) 456 7890'),'1234567890');
validateEqual(formatPhoneNumber('(123) 456 7890'),'1234567890');
// 10 digits, different special characters (position doesn't matter)
validateEqual(formatPhoneNumber('.)(123)45-6.7.8 90'),'1234567890');
// 10 digits, not allowed characters
validateEqual(formatPhoneNumber('123_456_7890'),'0000000000');
// 11 digits, first is 1, no special characters
validateEqual(formatPhoneNumber('11234567890'),'1234567890');
// 11 digits, first is 1, special characters
validateEqual(formatPhoneNumber('1-123-456-7890'),'1234567890');
// 11 digits, first is not 1, no special characters
validateEqual(formatPhoneNumber('21234567890'),'0000000000');
// 11 digits, first is not 1, special characters
validateEqual(formatPhoneNumber('21.23.45.67.890'),'0000000000');
// more than 11 digits, no special characters
validateEqual(formatPhoneNumber('12345678901234567890'),'0000000000');
//  more than 11 digits, special characters
validateEqual(formatPhoneNumber('123-456.7890 1234(567)890'),'0000000000');
// less than 10 digits, no special characters
validateEqual(formatPhoneNumber('2123'),'0000000000');
// less than 10 digits, special characters
validateEqual(formatPhoneNumber('2.1-23'),'0000000000');
// number datatype, 10 digits, first NO 0
validateEqual(formatPhoneNumber(1234567890),'1234567890');
// number datatype, 10 digits, first 0
validateEqual(formatPhoneNumber(0234567890),'0000000000');
// number datatype, 11 digits, first 0
validateEqual(formatPhoneNumber(01234567890),'1234567890');
// number datatype, 11 digits, first 1
validateEqual(formatPhoneNumber(11234567890),'1234567890');
// number datatype, 11 digits, first no 1, no 0
validateEqual(formatPhoneNumber(21234567890),'0000000000');
// different datatype
validateEqual(formatPhoneNumber(true),'0000000000');
validateEqual(formatPhoneNumber(null),'0000000000');
validateEqual(formatPhoneNumber([]),'0000000000');
validateEqual(formatPhoneNumber({}),'0000000000');
validateEqual(formatPhoneNumber(/1234567890/),'0000000000');

