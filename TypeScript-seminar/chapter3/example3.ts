type SumFunction = {
  (
    x: number,
    y: number
  ) : number,
  (
    x: string,
    y: string
  ) : string
}

const sum: SumFunction = (x, y) => x + y;

console.log(sum(3, 5));
console.log(sum("Hi ", "there!"));
console.log(sum(1, 'a'));
