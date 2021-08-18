function swapCase(string) {
  return string.replace(/[a-z]/gi, (letter) => {
    if (letter === letter.toLowerCase()) {
      return letter.toUpperCase();
    } else {
      return letter.toLowerCase();
    }
  });
}

console.log(swapCase('CamelCase'));              // "cAMELcASE"
console.log(swapCase('Tonight on XYZ-TV'));      // "tONIGHT ON xyz-tv"