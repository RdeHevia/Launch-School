/* eslint-disable max-lines-per-function */
/*
start: classification | animals
clear: classification | animals
EXAMPLES:
  - select Cold-blooded -> Cold-blooded | Salmon (,Turtle)
  - select Salmon -> Vertebrate (,Cold-blooded) | Salmon
DS:
  animalClassification{
    vertabrate: bear, turtle...
  }
ALGO:
  - 'change' EVENT listener on #animal-classification
    - read animal-classification option
    - look up animals that match the animal classification
    - remove elements from #animals
    - update #animals with the values
  - 'change' EVENT listener on #animals
    - same but the opposite
  - 'submit' EVENT listener listening on #selection-filters
    - clear form
*/

document.addEventListener('DOMContentLoaded', () => {
  let animalClassificationSelect = document.querySelector('#animal-classifications');
  let animalsSelect = document.querySelector('#animals');
  let form = document.querySelector('#selection-filters');
  let formInnerHTML = form.innerHTML;
  let clearButton = document.querySelector('#clear');

  // animalClassificationSelect.addEventListener('change', updateAnimalOptions);
  // animalsSelect.addEventListener('change', updateClassificationOptions);
  form.addEventListener('submit', event => resetForm(event, formInnerHTML));
  form.addEventListener('change', dispatcher);
});

function dispatcher(event) {
  if (event.target.id === 'animal-classifications') {
    updateAnimalOptions(event);
  } else if (event.target.id === 'animals') {
    updateClassificationOptions(event);
  }
}

function updateAnimalOptions(event) {
  const CLASSIFICATION_ANIMALS = {
    "Vertebrate": ['Bear', 'Turtle', 'Whale', 'Salmon', 'Ostrich'],
    'Warm-blooded': ['Bear', 'Whale', 'Ostrich'],
    'Cold-blooded': ['Salmon', 'Turtle'],
    "Mammal": ['Bear', 'Whale'],
    "Bird": ['Ostrich'],
    "Classifications": ['Animals', 'Bear', 'Turtle', 'Whale', 'Salmon', 'Ostrich'],
  };
  let classification = event.target.value;
  let animals = CLASSIFICATION_ANIMALS[classification];
  let animalsSelect = document.querySelector('#animals');
  deleteChildren(animalsSelect);

  let animalOptions = animals.map(animal => {
    let option = document.createElement('option');
    option.textContent = animal;
    option.value = animal;
    return option;
  });
  addOptions(animalsSelect, ...animalOptions);
}

function updateClassificationOptions(event) {
  const ANIMAL_CLASSIFICATIONS =  {
    Bear: ['Vertebrate', 'Warm-blooded', 'Mammal'],
    Turtle: ['Vertebrate', 'Cold-blooded'],
    Whale: ['Vertebrate', 'Warm-blooded', 'Mammal'],
    Salmon: ['Vertebrate', 'Cold-blooded'],
    Ostrich: ['Vertebrate', 'Warm-blooded', 'Bird'],
    Animals: ['Classifications', 'Vertebrate', 'Warm-blooded', 'Cold-blooded', 'Mammal', 'Bird'],
  };

  let animal = event.target.value;
  let classifications = ANIMAL_CLASSIFICATIONS[animal];
  let classificationSelect = document.querySelector('#animal-classifications');
  deleteChildren(classificationSelect);

  let classificationOptions = classifications.map(classification => {
    let option = document.createElement('option');
    option.textContent = classification;
    option.value = classification;
    return option;
  });
  addOptions(classificationSelect, ...classificationOptions);
}

function deleteChildren(element) {
  [...element.children].forEach(child => child.remove());
}

function addOptions(selectElement, ...options) {
  if (selectElement.tagName === 'SELECT') {
    selectElement.append(...options);
  }
}

function resetForm(event, innerHTML) {
  if (event.target.tagName === 'FORM') {
    event.preventDefault();
    console.log(event.target);
    deleteChildren(event.target);
    event.target.insertAdjacentHTML('afterbegin', innerHTML);
  }
}