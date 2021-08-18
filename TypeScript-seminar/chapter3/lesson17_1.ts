type ConditionFunction = (element) => boolean;

function isMultipleOf3 (nbr: number) {
  return nbr % 3 === 0;
}

isMultiple(1);
isMultipleOf3(1,2,3);

let isMultipleOf3Prime: ConditionFunction = () => true;

isMultipleOf3Prime(1);