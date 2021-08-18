"use strict";

function makeList() {
  let todos = [];

  return {
    printAction(item, action) {
      console.log(`${item} ${action}!`);
    },

    add(item) {
      todos.push(item);
      this.printAction(item, 'added');
    },

    remove(item) {
      todos = todos.filter(todo => todo !== item);
      this.printAction(item, 'removed');
    },

    list() {
      todos.forEach(item => console.log(item));
    }

  };
}

let list = makeList();
list.add('peas');
list.add('corn');
list.list();

list.remove('peas');
list.list();