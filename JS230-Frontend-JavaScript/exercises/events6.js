/*
ALGO:
  - listen on changes on the form. When a change event fires:
    - retrieve the value of the selection
    - look up the corresponding values in the lookup table
    - in the form, hide all the elements that are not included in the list
    - 
*/

function getClassifications(animal) {
  const ANIMALS = {
    Animals: ['Classifications', 'Vertebrate', 'Warm-blooded','Cold-blooded', 'Mammal', 'Bird'],
    Bear: [ 'Vertebrate', 'Warm-blooded', 'Mammal' ],
    Turtle: [ 'Vertebrate', 'Cold-blooded' ],
    Whale: [ 'Vertebrate', 'Warm-blooded', 'Mammal' ],
    Salmon: [ 'Vertebrate', 'Cold-blooded' ],
    Ostrich: [ 'Vertebrate', 'Warm-blooded', 'Bird' ]
  };

  return ANIMALS[animal];
}

function getAnimals(classification) {
  const ANIMALS = {
    Animals: ['Classifications', 'Vertebrate', 'Warm-blooded','Cold-blooded', 'Mammal', 'Bird'],
    Bear: [ 'Vertebrate', 'Warm-blooded', 'Mammal' ],
    Turtle: [ 'Vertebrate', 'Cold-blooded' ],
    Whale: [ 'Vertebrate', 'Warm-blooded', 'Mammal' ],
    Salmon: [ 'Vertebrate', 'Cold-blooded' ],
    Ostrich: [ 'Vertebrate', 'Warm-blooded', 'Bird' ]
  };

  let filteredAnimals = [];

  if (classification === 'Classifications') {
    return Object.keys(ANIMALS);
  }

  for (let animal in ANIMALS) {
    if (ANIMALS[animal].includes(classification) && animal !== 'Animals') {
      filteredAnimals.push(animal);
    }
  }

  return filteredAnimals;
}

function filterOptions(selectElement, valuesToFilter) {
  let options = [...selectElement.children];

  options.forEach(option => {
    option.removeAttribute('selected');
    if (!valuesToFilter.includes(option.value)) {
      option.style.display = 'none';
    } else {
      option.style.display = '';
      if (valuesToFilter[0] === option.value) {
        option.setAttribute('selected', '');
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  let animalsSelect = document.querySelector('#animals');
  let classificationsSelect = document.querySelector('#animal-classifications');

  animalsSelect.addEventListener('change', event => {
    let animal = event.target.value;
    let classifications = getClassifications(animal);
    filterOptions(classificationsSelect, classifications);
  });

  classificationsSelect.addEventListener('change', event => {
    let classification = event.target.value;
    let animals = getAnimals(classification);
    filterOptions(animalsSelect, animals);
  });
});