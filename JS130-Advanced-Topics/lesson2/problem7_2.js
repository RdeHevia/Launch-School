/*
makeList:
  INPUT: N/A
  OUTPUT: todo list function (1)
(1) todo list function:
  RULES:
    no argument: print all elements of the list
      - if list is empty -> print message
    argument not part of the list: add to the list
    argument part of the list: remove from the list
*/

// eslint-disable-next-line max-lines-per-function
function makeList() {
  let list = [];

  function argumentProvided(item) {
    return item !== undefined;
  }
  function add (item) {
    list.push(item);
  }

  function remove (item) {
    list = list.filter(listItem => listItem !== item);
    console.log(`${item} removed!`)
  }

  function printList () {
    list.forEach(item => console.log(item));
  }

  return function (item) {
    if (argumentProvided(item)) {
      if (list.includes(item)) {
        remove(item);
      } else {
        add(item);
      }
    } else if (list.length === 0) {
      console.log('The list is empty.');
    } else {
      printList();
    }
  };
}

let list = makeList();
list();
list("make breakfast");
list("read book");
list();
list("make breakfast");
list();