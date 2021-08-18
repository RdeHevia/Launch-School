(function counter(number) {
  let count = number;
  console.log(count);
  if (count > 0) {
    counter (count - 1);
  }
})(7);