function formatDate (string) {
  const REGEX = /(\d{4})(-|\/)(\d{2})\2(\d{2})/g;

  // return string.replace(REGEX, '$4.$3.$1');

  return string.replace(REGEX, (_, p1, p2, p3, p4) => `${p4}.${p3}.${p1}`);
}

console.log(formatDate('2016-06-17')); // -> '17.06.2016'
console.log(formatDate('2017/05/03')); // -> '03.05.2017'
console.log(formatDate('2015/01-31')); // -> '2015/01-31' (no change)