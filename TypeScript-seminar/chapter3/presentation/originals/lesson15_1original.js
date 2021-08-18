// Start
function findMultiples(integer) {
    var multiples = [];
    for (var potentialMultiple = 1; potentialMultiple <= integer; potentialMultiple += 1) {
        if (isMultiple(potentialMultiple, integer)) {
            multiples.push(potentialMultiple);
        }
    }
    return multiples;
}

function isMultiple (potentialMultiple, integer) {
    return integer % potentialMultiple === 0;
}


console.log(findMultiples(10));