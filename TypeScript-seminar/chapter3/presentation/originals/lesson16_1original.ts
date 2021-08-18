let sum = function (nbr1, nbr2) {
  return nbr1 + nbr2;
}

let product = (a, b) => a * b;

sum (3,5) // 8 (OK)
product(3,5) // 15 (OK)

sum ([3], [5]) // '35' (NOT OK)

