const Todo = require('./todo');
const TodoList = require('./todolist');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  test('returns an array', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  test('returns the first todo', () => {
    expect(list.first()).toEqual(todo1);
  });

  test('shift: removes and returns first item', () => {
    let firstElementRemoved = list.shift();
    expect(firstElementRemoved).toEqual(todo1);
    expect(list.toArray()).toEqual([todo2, todo3]);
  })

  test('add: error if not Todo type', () => {
    expect(() => list.add({a:1})).toThrow(TypeError);
  })

  test('removeAt raises error', () => {
    expect(() => list.removeAt(10)).toThrow(ReferenceError)
  });

  test('forEach', () => {
    let result = [];
    let callback = (todo) => result.push(todo);
    list.forEach(callback);
    expect(result).toEqual([todo1, todo2, todo3]);
  })
});