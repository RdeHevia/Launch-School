/*
INPUT: string
OUTPUT: string
  - first letter: capitalized
  - capitalization staggered
  - non-alphabetic chars. unchanged but count for switching
EXAMPLE:
  ALL_CAPS -> AlL_CaPs
*/

function isLetter(char) {
  return !!char.match(/[a-z]/i);
}

function staggeredCase(string) {
  let newString = string
    .split('')
    .map((char,idx) => {
      if (isLetter(char)) {
        if (idx % 2 === 0) {
          return char.toUpperCase();
        } else {
          return char.toLowerCase();
        }
      } else {
        return char;
      }
    })
    .join('');

  console.log(newString);
}

staggeredCase('I Love Launch School!');        // "I LoVe lAuNcH ScHoOl!"
staggeredCase('ALL_CAPS');                     // "AlL_CaPs"
staggeredCase('ignore 77 the 4444 numbers');   // "IgNoRe 77 ThE 4444 nUmBeRs"