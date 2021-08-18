// Write a function that takes a string and returns an object containing the 
// following three properties:

// the percentage of characters in the string that are lowercase letters
// the percentage of characters that are uppercase letters
// the percentage of characters that are neither
// You may assume that the string will always contain at least one character.

/*
INPUT: text
  - data type: string
  - contains any type of character
  - it contains at least 1 character
  - assume input is always a string
OUTPUT: percentages
  - data type: object
  {
    lowercase: string,
    uppercase: string,
    others: string (e.g. '25%')
  }
RULES:
  - percentages. assume 1 decimal of precission always (e.g. 25.7%)
  - percentage = rounded to 1 decimal(number of chars of a type / total number of chars) * 100)
EXAMPLE:
'abcd' -> {l: 100%, u: 0%, o: 0%}
'abcdEFGH' -> -> {l: 50%, u: 50%, o: 0%}
'ab!cd-EF G7H' -> -> {l: 33.3%, u: 33.3%, o: 33.3%} (note: 1 of them might be 33.4%)
DATA STRUCTURE:
  process the stats: string
ALGORITHM:
  - totalNumberOfChars: length of the string
  - numberOfLowercase: match all the lowercase letters and count the number of appearances
  - numberOfUppercase: same but with uppercase letters
  - lowercasePercentage: formula (string)
  - uppercasePercentage: formula (string)
  - othersPercentage: String(100 - +lowercasePercentage - +uppercasePercentage)
  * add the percentages to the object as strings and a % sign
  - return the object
*/

function stats(text) {
  let totalNumberOfChars = text.length;
  let nbrOfLowercase = (text.match(/[a-z]/g) || []).length;
  let nbrOfUppercase = (text.match(/[A-Z]/g) || []).length;

  let lowercasePercentage =
    ((nbrOfLowercase / totalNumberOfChars) * 100).toFixed(1);

  let uppercasePercentage =
    ((nbrOfUppercase / totalNumberOfChars) * 100).toFixed(1);

  let othersPercentage =
    (100 - +lowercasePercentage - +uppercasePercentage).toFixed(1);

  return {
    lowercase: `${lowercasePercentage}%`,
    uppercase: `${uppercasePercentage}%`,
    others: `${othersPercentage}%`,
  };
}

// TEST CASES
// only lowercase
console.log(stats('abcd')); // {l: 100.0%, u: 0.0%, o: 0.0%}
// only uppercase
console.log(stats('ABCD')); // {l: 0.0%, u: 100.0%, o: 0%}
// only others
console.log(stats('!^&$ 19293{}')); // {l: 0.0%, u: 0.0%, o: 100.0%}
// mixed
console.log(stats('abcdEFGH')); // {l: 50.0%, u: 50.0%, o: 0.0%}
console.log(stats('ab!cd-EF G7H')); // {l: 33.3%, u: 33.3%, o: 33.4%}
console.log(stats('a .1W')); // {l: 20.0%, u: 20.0%, o: 60.0%}
// 1 char only
console.log(stats('a')); // {l: 100.0%, u: 0.0%, o: 0.0%}
console.log(stats('A')); // {l: 0.0%, u: 100.0%, o: 0%}
console.log(stats('!')); // {l: 0.0%, u: 0.0%, o: 100.0%}