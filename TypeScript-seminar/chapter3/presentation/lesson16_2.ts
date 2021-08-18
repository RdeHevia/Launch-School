type ConditionFn = (element: any) => boolean;
function findIndexes(array: any[], condition: ConditionFn): number[] {
  let indexes = [];

  array.forEach((element,idx) => {
    if (condition(element)) {
      indexes.push(idx);
    }
  });

  return indexes;
}









































// Find the index of the elements that are MULTIPLES OF 3
let arr = [10, 20, 30, 40, 50, 60]; // 2, 5
findIndexes(arr,(nbr) => nbr % 3 === 0);

