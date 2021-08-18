/*
I: string
O: string (acronym)
EXAMPLES:
First In, First Out -> F, I, F, O -> FIFO
Hyper-text Markup Language -> H, t, M, L -> H, T, M, L -> HTML
Complementary metal-oxide semiconductor -> C, m, o, s -> CMOS
PHP: HyperText Preprocessor -> P, H P -> PHP
RULES:
- Acronym is composed of the first letter of every word, capitalized
- word separators: spaces and '-'
ALGORITHM:
  1. Split the text into words.
  2. Take the first letter of each word, capitalize it.
  3. Join all the letters together and return the resultant string.
*/

function acronym(string) {
  let words = string.split(/[ \-]/);

  const getInitial = word => word[0].toUpperCase();
  return words.map(getInitial).join('');
}

console.log(acronym('Portable Network Graphics'));                  // "PNG"
console.log(acronym('First In, First Out'));                        // "FIFO"
console.log(acronym('PHP: HyperText Preprocessor'));                // "PHP"
console.log(acronym('Complementary metal-oxide semiconductor'));    // "CMOS"
console.log(acronym('Hyper-text Markup Language'));                 // "HTML"