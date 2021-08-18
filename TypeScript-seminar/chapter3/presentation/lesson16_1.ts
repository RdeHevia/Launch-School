// type Arithmetic = (nbr1: number, nbr2: number) => number;

let sum = function (nbr1: number, nbr2: number): number {
  return nbr1 + nbr2;
}
type Arithmetic = typeof sum;

let subtraction: Arithmetic = function (nbrA, nbrB) {
  return sum (nbrA, -nbrB);
}

let product: Arithmetic = (a, b) => a * b;

let division: Arithmetic = (x, y) => x / y;

sum (3,5); // 8 (OK)
subtraction(3,5); // -2 (OK)
product(3,5); // 15 (OK)
division(3,5); // 0.6 (OK)

sum ('3', '5') // (NOT OK)
subtraction ('3', '5') // (NOT OK)
product ('3', '5') // (NOT OK)
division ('3', '5') // (NOT OK)