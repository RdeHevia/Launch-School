"use strict";

function makeList() {
  todos: [];

  return {
    printAction(item, action) {
      console.log(`${item} ${action}!`);
    },

    add(item) {
      this.todos.push(item);
      this.printAction(item, 'added');
    },

    remove(item) {
      this.todos = this.todos.filter(todo => todo !== item);
      this.printAction(item, 'removed');
    },

    list() {
      this.todos.forEach(item => console.log(item));
    }

  };
}

let list = makeList();
list.add('peas');
list.add('corn');
list.list();

list.remove('peas');
list.list();