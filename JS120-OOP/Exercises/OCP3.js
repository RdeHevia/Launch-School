/*
queue data structure:
[{obj {}, order: N}]
*/

class CircularQueue {
  constructor(bufferSize) {
    this.bufferSize = bufferSize;
    this.currentOrderOfAddition = 0;
    this.queue = (new Array (bufferSize)).fill('');
  }

  enqueue(obj) {
    // add object to the queue
    // ALGORITHM:
    // 1. Check if the queue is full.
      // no full -> add object after mostRecentObject added

      // full -> replace the oldest object with the new object

    //
    if (this.isQueueFull()) {
      this.replaceOldestObject(obj);
    } else {
      this.addAfterMostRecentObject(obj);
    }
  }

  isQueueFull() {
    return this.queue.filter(element => element === '').length === 0;
  }

  addAfterMostRecentObject(obj) {
    // 1.find the index of the array of most recent object added.
    // 2. Add element. If the elements hasn't been found, add at index 0. If the
    //  element has been found, add at index + 1.
    let index = this.findIndexOfMostRecentObjectAdded();
    if ((index === null) || (index === this.queue.length - 1)) {
      this.queue[0] = {object: obj, orderOfAddition: this.currentOrderOfAddition};
    } else {
      this.queue[index + 1] = {
        object: obj,
        orderOfAddition: this.currentOrderOfAddition
      };
    }
    this.currentOrderOfAddition += 1;
  }

  findIndexOfMostRecentObjectAdded() {
    // Get an array with all the orderOfAddition values. If no property -> null
    // Find the index for the maximum orderOfAddition integer.
    // return that index
    let arrayOfOrders = this.getOrderOfAdditionOfElements();
    let max = arrayOfOrders.slice().sort((a,b) => b - a)[0];
    /*
    > [1,4,2].sort((a,b)=>b-a)
    [ 4, 2, 1 ]
    > [null,0].sort((a,b)=>b-a)
    [ null, 0 ]
    > [null,0].sort((a,b)=>a-b)
    [ null, 0 ]
    */
    console.log(max);
    return arrayOfOrders.findIndex(orderInt => orderInt === max) || null;
  }

  getOrderOfAdditionOfElements() {
    let arrayOfOrders = this.queue.map(element => {
      return element.orderOfAddition || null;
    });
    return arrayOfOrders;
  }

  dequeue(obj) {
    // remove and return the oldest object in the queue
    // return null if empty
  }
}