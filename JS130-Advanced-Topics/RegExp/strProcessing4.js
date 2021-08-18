function wordCap(str) {
  return str.replace(/\b[a-z]/g, (matchingStr) => matchingStr.toUpperCase());
}

console.log(wordCap('four score and seven'));       // "Four Score And Seven"
console.log(wordCap('the javaScript language'));    // "The Javascript Language"
console.log(wordCap('this is a "quoted" word'));    // 'This Is A "quoted" Word'