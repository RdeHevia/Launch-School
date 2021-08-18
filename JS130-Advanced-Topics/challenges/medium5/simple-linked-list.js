/*
simple linked list:
  [element1, element2...]
  element1:
    data
    next: element2 (reference)
type Element:
  value
  nextElement
  datum()
  isTail()
  next()
type SimpleLinkedList:
  size()
  isEmpty()
  peek()
  head()
  push()
  pop()
*/

class Element {
  constructor (value, nextElement = null) {
    this.value = value;
    this.assignNext(nextElement);
  }

  datum() {
    return this.value;
  }
  isTail() {
    return true;
    // implementation pending
  }
  next() {
    return this.nextElement;
  }

  getValue() {
    return this.value;
  }

  assignNext(nextElement) {
    this.nextElement = nextElement;
  }
}

class SimpleLinkedList {

  static fromArray(array) {
    let list = new SimpleLinkedList();

    if (array === null) {
      return list;
    }

    array.slice().reverse().forEach (value => {
      list.push(value);
    });

    return list;
  }

  constructor () {
    this.list = [];
  }

  size() {
    return this.list.length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  push(value) {
    let nextElement = this.head();
    let element = new Element(value, nextElement);
    this.list.push(element);
  }

  pop() {
    return this.list.pop().getValue();
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    } else {
      return this.head().getValue();
    }
  }

  head() {
    let lastElement = this.list[this.size() - 1];
    return lastElement;
  }

  toArray() {
    return this.list.map(element => element.getValue()).reverse();
  }

  reverse() {
    let reversedList = this.toArray().reverse();

    return SimpleLinkedList.fromArray(reversedList);
  }
}

module.exports = {
  SimpleLinkedList,
  Element,
};