function myReduce(array, callback, initialVal) {
  let iterable;
  let accumulator;
  if (!initialVal) {
    accumulator = array[0];
    iterable = array.slice(1);
  } else {
    accumulator = initialVal;
    iterable = array;
  }

  iterable.forEach(element => {
    accumulator = callback(accumulator, element);
  });

  return accumulator;
}

function longestWord(words) {
  return myReduce(words, longest);
}

function longest(result, currentWord) {
  return currentWord.length >= result.length ? currentWord : result;
}

console.log(longestWord(['abc', 'launch', 'targets', '']));      // "targets"