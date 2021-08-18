function isUrl(str) {
  console.log(!!str.match(/^https?:\/\/\w+\.[a-z]+$/));
}

isUrl('http://launchschool.com');   // -> true
isUrl('https://example.com');       // -> true
isUrl('https://example.com hello'); // -> false
isUrl('   https://example.com');    // -> false