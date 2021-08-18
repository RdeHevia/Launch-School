declare function isMultiple (potentialMultiple: number, integer: number) : boolean;

function findMultiples(integer: number): number[] {
  let multiples = [];
  for (let potentialMultiple = 1; potentialMultiple <= integer; potentialMultiple += 1) {
    if (isMultiple(potentialMultiple, integer)) {
      multiples.push(potentialMultiple);
    }
  }

  return multiples;
}

isMultiple('1',2);